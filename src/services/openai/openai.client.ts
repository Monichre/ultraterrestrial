import { wrapOpenAI } from "langsmith/wrappers"
import OpenAI from 'openai'
export { traceable } from "langsmith/traceable"

export const openai = wrapOpenAI( new OpenAI( {
  apiKey: process.env.OPENAI_API_KEY,
} ) )
