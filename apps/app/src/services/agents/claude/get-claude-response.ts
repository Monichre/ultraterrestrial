import { generateText, streamObject, streamText } from 'ai'
import { anthropic } from '@ai-sdk/anthropic'
import { KNOWLEDGE_GRAPH_PROMPT } from '@/services/agents/prompts/knowledge-graph.prompt'
import { Nodes } from '@/features/3d/drawing-board/nodes'
import sdk from '@anthropic-ai/sdk'
import component from '@deck.gl/core/dist/lifecycle/component'
import { an } from '@liveblocks/react/dist/suspense-fYGGJ3D9'
import { AI } from '@raycast/api'
import { ReactFlow } from '@xyflow/react'
import { complex } from 'framer-motion'
import { one } from 'maath/dist/declarations/src/vector2'
import next from 'next'
import openai from 'openai'
import { render } from 'react-dom'
import feature from 'react-mapbox-gl/lib/feature'
import { a, to } from 'react-spring'
import { context } from 'shadergradient'

export async function getClaudeResponse( prompt ) {
  const response = await generateText( {
    model: anthropic( 'claude-3-5-sonnet-20241022' ),
    prompt,
  } )
  return response.text
}

export const streamClaudeResponse = async ( prompt: string ) => {
  const result: any = await streamText( {
    model: anthropic( 'claude-3-5-sonnet-20241022' ),
    prompt: KNOWLEDGE_GRAPH_PROMPT,
    // tools: 
  } )

  return streamObject( result )




}
