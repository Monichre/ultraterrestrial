import {
  CopilotRuntime,
  OpenAIAdapter,
  copilotRuntimeNextJSAppRouterEndpoint,
} from '@copilotkit/runtime'
import { NextRequest } from 'next/server'

// const copilotKit = new CopilotRuntime()
// return copilotKit.response(
//   req,
//   new OpenAIAssistantAdapter({
//     assistantId: 'your-assistant-id',
//   })
// )

// import OpenAI from 'openai'

// const openai = new OpenAI()
// const serviceAdapter = new OpenAIAdapter({ openai })

const runtime = new CopilotRuntime()

export const POST = async (req: NextRequest) => {
  // const { handleRequest } = copilotRuntimeNextJSAppRouterEndpoint({
  //   runtime,
  //   serviceAdapter,
  //   endpoint: req.nextUrl.pathname,
  // })

  const { handleRequest } = copilotRuntimeNextJSAppRouterEndpoint({
    runtime: new CopilotRuntime(),
    serviceAdapter: new OpenAIAdapter(),
    endpoint: req.nextUrl.pathname,
  })

  return handleRequest(req)
}
