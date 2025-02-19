// import {
//   CopilotRuntime,
//   OpenAIAdapter, copilotKitEndpoint, copilotRuntimeNextJSAppRouterEndpoint,
//   langGraphPlatformEndpoint
// } from '@copilotkit/runtime'

// import { NextRequest } from 'next/server'
// import OpenAI from "openai"


// const openai = new OpenAI( { apiKey: process.env.OPENAI_API_KEY } )
// const serviceAdapter = new OpenAIAdapter( { openai } )
// const deploymentUrl = process.env.DEPLOYMENT === 'local' ? process.env.LOCAL_DEPLOYMENT_URL : process.env.DEPLOYMENT_URL

// const llmAdapter = new OpenAIAdapter( { openai } as any )
// const langsmithApiKey = process.env.LANGSMITH_API_KEY as string

// /*
// export const POST = async (req: NextRequest) => {
//   const searchParams = req.nextUrl.searchParams
//   const deploymentUrl = searchParams.get('lgcDeploymentUrl') || process.env.LGC_DEPLOYMENT_URL;

//   const remoteEndpoint = deploymentUrl ? langGraphPlatformEndpoint({
//     deploymentUrl,
//     langsmithApiKey,
//     agents: [
//       {
//         name: "research_agent",
//         description: "Research agent",
//       },
//       {
//         name: "research_agent_google_genai",
//         description: "Research agent",
//         assistantId: "9dc0ca3b-1aa6-547d-93f0-e21597d2011c",
//       },
//     ],
//   }) : copilotKitEndpoint({
//     url: process.env.REMOTE_ACTION_URL || "http://localhost:8000/copilotkit",
//   })

//   const runtime = new CopilotRuntime({
//     remoteEndpoints: [remoteEndpoint],
//   });

//   const { handleRequest } = copilotRuntimeNextJSAppRouterEndpoint({
//     runtime,
//     serviceAdapter: llmAdapter,
//     endpoint: "/api/copilotkit",
//   });

//   return handleRequest(req);
// };
// */

// export const POST = async ( req: NextRequest ) => {
//   const remoteEndpoint = deploymentUrl ? langGraphPlatformEndpoint( {
//     deploymentUrl: deploymentUrl!,
//     langsmithApiKey: process.env.LANGSMITH_API_KEY!,
//     agents: [
//       {
//         name: "research_agent",
//         description: "Research agent",
//       },
//       {
//         name: "disclosure_agent",
//         description: "Disclosure agent",
//         assistantId: process.env.DISCLOSURE_ASSISTANT_ID,
//       },
//       {
//         name: "graph_agent",
//         description: "Graph agent",

//       },
//       // {
//       //   name: "research_agent_google_genai",
//       //   description: "Research agent",
//       //   assistantId: "9dc0ca3b-1aa6-547d-93f0-e21597d2011c",
//       // },
//     ],
//   } ) : copilotKitEndpoint( {
//     url: "http://localhost:8000",

//   } )


//   const runtime = new CopilotRuntime( {
//     remoteEndpoints: [
//       remoteEndpoint
//     ]
//   } )

//   const { handleRequest } = copilotRuntimeNextJSAppRouterEndpoint( {
//     runtime,
//     serviceAdapter,
//     endpoint: '/api/copilotkit',
//   } )

//   return handleRequest( req )
// }

import {
  CopilotRuntime,
  OpenAIAdapter,
  copilotKitEndpoint,
  copilotRuntimeNextJSAppRouterEndpoint,
  langGraphPlatformEndpoint,
} from "@copilotkit/runtime"
import { NextRequest } from "next/server"
import OpenAI from "openai"

const openai = new OpenAI( { apiKey: process.env.OPENAI_API_KEY } )
const llmAdapter = new OpenAIAdapter( { openai } as any )
const langsmithApiKey = process.env.LANGSMITH_API_KEY as string

export const POST = async ( req: NextRequest ) => {
  const searchParams = req.nextUrl.searchParams
  const deploymentUrl = searchParams.get( 'lgcDeploymentUrl' ) || process.env.LGC_DEPLOYMENT_URL

  const remoteEndpoint = deploymentUrl ? langGraphPlatformEndpoint( {
    deploymentUrl,
    langsmithApiKey,
    agents: [
      {
        name: "research_agent",
        description: "Research agent",
      },
      {
        name: "research_agent_google_genai",
        description: "Research agent",
        assistantId: "9dc0ca3b-1aa6-547d-93f0-e21597d2011c",
      },
    ],
  } ) : copilotKitEndpoint( {
    url: process.env.REMOTE_ACTION_URL || "http://localhost:8000/copilotkit",
  } )

  const runtime = new CopilotRuntime( {
    remoteEndpoints: [remoteEndpoint],
  } )

  const { handleRequest } = copilotRuntimeNextJSAppRouterEndpoint( {
    runtime,
    serviceAdapter: llmAdapter,
    endpoint: "/api/copilotkit",
  } )

  return handleRequest( req )
}