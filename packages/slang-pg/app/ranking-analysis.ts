import { sql } from "@vercel/postgres"
// lib/ranking/types.ts
export interface RankingMetrics {
  credibility: {
    eventParticipation: number    // From event_subject_matter_experts
    topicExpertise: number        // From topic_subject_matter_experts
    organizationalAuthority: number// From organization_members
    peerRecognition: number       // From cross-references
    documentedContributions: number// From testimonies
  }

  caseEvidence: {
    documentationQuality: number   // Based on available evidence
    witnessCredibility: number     // Linked to personnel credibility
    historicalSignificance: number // From Koi's analysis and other lists
    scientificAnalysis: number     // From research references
    crossValidation: number        // Multiple source verification
  }
}

export interface WeightingFactors {
  EVENT_PARTICIPATION: number
  TOPIC_EXPERTISE: number
  ORGANIZATIONAL_ROLE: number
  PEER_RECOGNITION: number
  DOCUMENTED_EVIDENCE: number
  DISTRIBUTION_WEIGHT: number
}

// lib/ranking/analysis.ts



const DEFAULT_WEIGHTS: WeightingFactors = {
  EVENT_PARTICIPATION: 0.25,
  TOPIC_EXPERTISE: 0.25,
  ORGANIZATIONAL_ROLE: 0.20,
  PEER_RECOGNITION: 0.15,
  DOCUMENTED_EVIDENCE: 0.15,
  DISTRIBUTION_WEIGHT: 0.15
}

export async function analyzePersonnel( weights: Partial<WeightingFactors> = {} ) {
  const finalWeights = { ...DEFAULT_WEIGHTS, ...weights }

  try {
    const query = `
      WITH 
      -- Expert Distribution Analysis
      distribution_metrics AS (
        SELECT 
          kf.id,
          -- Topics Distribution
          COUNT(DISTINCT tsme.topic_id) as topic_count,
          -- Events Distribution
          COUNT(DISTINCT esme.event_id) as event_count,
          -- Testimonies Distribution
          COUNT(DISTINCT t.id) as testimony_count,
          -- Organizations Distribution
          COUNT(DISTINCT om.organization_id) as org_count
        FROM key_figures kf
        LEFT JOIN topic_subject_matter_experts tsme ON tsme.subject_matter_expert_id = kf.id
        LEFT JOIN event_subject_matter_experts esme ON esme.subject_matter_expert_id = kf.id
        LEFT JOIN testimonies t ON t.witness_id = kf.id
        LEFT JOIN organization_members om ON om.member_id = kf.id
        GROUP BY kf.id
      ),
      
      -- Peer Recognition Analysis
      peer_recognition AS (
        SELECT 
          kf.id,
          COUNT(DISTINCT referenced_by_id) as reference_count
        FROM key_figures kf
        LEFT JOIN testimonies t ON t.witness_id = kf.id
        LEFT JOIN jsonb_array_elements_text(t.documentation->'references') as referenced_by_id ON true
        GROUP BY kf.id
      ),
      
      -- Topic Expertise Depth
      topic_expertise AS (
        SELECT 
          kf.id,
          jsonb_object_agg(
            t.name,
            jsonb_build_object(
              'expertise_level', COUNT(DISTINCT tsme.id),
              'related_testimonies', COUNT(DISTINCT tt.testimony_id)
            )
          ) as expertise_details
        FROM key_figures kf
        JOIN topic_subject_matter_experts tsme ON tsme.subject_matter_expert_id = kf.id
        JOIN topics t ON t.id = tsme.topic_id
        LEFT JOIN topics_testimonies tt ON tt.topic_id = t.id
        GROUP BY kf.id
      ),
      
      -- Event Participation Impact
      event_impact AS (
        SELECT 
          kf.id,
          jsonb_object_agg(
            e.name,
            jsonb_build_object(
              'participation_level', COUNT(DISTINCT esme.id),
              'related_testimonies', COUNT(DISTINCT t.id)
            )
          ) as event_details
        FROM key_figures kf
        JOIN event_subject_matter_experts esme ON esme.subject_matter_expert_id = kf.id
        JOIN events e ON e.id = esme.event_id
        LEFT JOIN testimonies t ON t.event_id = e.id
        GROUP BY kf.id
      )
      
      -- Calculate Final Scores
      SELECT 
        kf.id,
        kf.name,
        kf.role,
        dm.topic_count,
        dm.event_count,
        dm.testimony_count,
        dm.org_count,
        pr.reference_count,
        te.expertise_details,
        ei.event_details,
        ROUND(
          (
            (COALESCE(dm.event_count, 0) * ${finalWeights.EVENT_PARTICIPATION}) +
            (COALESCE(dm.topic_count, 0) * ${finalWeights.TOPIC_EXPERTISE}) +
            (COALESCE(dm.org_count, 0) * ${finalWeights.ORGANIZATIONAL_ROLE}) +
            (COALESCE(pr.reference_count, 0) * ${finalWeights.PEER_RECOGNITION}) +
            (COALESCE(dm.testimony_count, 0) * ${finalWeights.DOCUMENTED_EVIDENCE}) +
            (
              (COALESCE(dm.topic_count, 0) + 
               COALESCE(dm.event_count, 0) + 
               COALESCE(dm.testimony_count, 0) + 
               COALESCE(dm.org_count, 0)) * ${finalWeights.DISTRIBUTION_WEIGHT}
            )
          ) * 100.0 / (
            SELECT MAX(total_score) FROM (
              SELECT 
                (event_count + topic_count + testimony_count + org_count + reference_count) as total_score
              FROM distribution_metrics
              JOIN peer_recognition USING (id)
            ) scores
          ),
          2
        ) as authority_score
      FROM key_figures kf
      JOIN distribution_metrics dm ON dm.id = kf.id
      LEFT JOIN peer_recognition pr ON pr.id = kf.id
      LEFT JOIN topic_expertise te ON te.id = kf.id
      LEFT JOIN event_impact ei ON ei.id = kf.id
      ORDER BY authority_score DESC
    `

    return await sql.query( query )
  } catch ( error ) {
    console.error( 'Error analyzing personnel:', error )
    throw new Error( 'Failed to analyze personnel' )
  }
}

// Cross-validation with evidence analysis
export async function validateRankings( personnelRankings: any[], caseRankings: any[] ) {
  try {
    const query = `
      WITH 
      -- Evidence Quality Assessment
      evidence_assessment AS (
        SELECT 
          t.witness_id,
          t.event_id,
          jsonb_array_length(t.documentation) as doc_count,
          (t.documentation->>'verification_level')::float as verification_level
        FROM testimonies t
        WHERE t.documentation IS NOT NULL
      ),
      
      -- Cross-reference Validation
      cross_references AS (
        SELECT 
          t1.witness_id as expert_id,
          t2.witness_id as referenced_by_id,
          COUNT(*) as reference_count
        FROM testimonies t1
        JOIN testimonies t2 ON t2.documentation @> 
          jsonb_build_array(jsonb_build_object('expert_reference', t1.witness_id))
        GROUP BY t1.witness_id, t2.witness_id
      )
      
      -- Calculate Validation Scores
      SELECT 
        kf.id,
        ROUND(
          AVG(
            CASE 
              WHEN ea.verification_level IS NOT NULL 
              THEN ea.verification_level 
              ELSE 0.5 
            END * 
            CASE 
              WHEN cr.reference_count IS NOT NULL 
              THEN LEAST(cr.reference_count * 0.1, 1.0)
              ELSE 0.5 
            END
          ) * 100,
          2
        ) as validation_score
      FROM key_figures kf
      LEFT JOIN evidence_assessment ea ON ea.witness_id = kf.id
      LEFT JOIN cross_references cr ON cr.expert_id = kf.id
      GROUP BY kf.id
    `

    const validationResults = await sql.query( query )

    // Combine original rankings with validation scores
    return personnelRankings.map( ranking => {
      const validation = validationResults.rows.find( v => v.id === ranking.id )
      return {
        ...ranking,
        validatedScore: Math.round( ( ranking.authority_score + ( validation?.validation_score || 0 ) ) / 2 )
      }
    } )
  } catch ( error ) {
    console.error( 'Error validating rankings:', error )
    throw new Error( 'Failed to validate rankings' )
  }
}