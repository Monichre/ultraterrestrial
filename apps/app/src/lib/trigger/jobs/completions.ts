
import { task } from "@trigger.dev/sdk/v3"
import OpenAI from "openai"
import { summarize } from "@/services/agents/disclosure/functions/summarize"
export const openai = new OpenAI( {
  apiKey: process.env.OPENAI_API_KEY,
} )

export const openaiTask = task( {
  id: "openai-summarize-task",
  //specifying retry options overrides the defaults defined in your trigger.config file
  retry: {
    maxAttempts: 10,
    factor: 1.8,
    minTimeoutInMs: 500,
    maxTimeoutInMs: 30_000,
    randomize: false,
  },
  run: async ( payload: { documents: string[] } ) => {
    return await summarize( payload.documents )
  },
} )
