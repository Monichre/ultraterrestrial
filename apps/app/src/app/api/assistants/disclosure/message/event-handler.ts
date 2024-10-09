import { openai } from '@/services/openai/openai.client'
import EventEmitter from "events"
import type OpenAI from "openai"
export class AssistantStreamEventHandler extends EventEmitter {
  client: OpenAI
  constructor( client: OpenAI ) {
    super()
    this.client = client
  }

  async onEvent( event: { event: string; data: Record<string, any> } ) {
    console.log( "🚀 ~ file: event-handler.ts:10 ~ AssistantStreamEventHandler ~ onEvent ~ event:", event )
    try {
      console.log( event )
      // Retrieve events that are denoted with 'requires_action'
      // since these will have our tool_calls
      if ( event.event === "thread.run.requires_action" ) {
        await this.handleRequiresAction(
          event.data,
          event.data.id,
          event.data.thread_id,
        )
      }
    } catch ( error ) {
      console.error( "Error handling event:", error )
    }
  }

  async handleRequiresAction( data: any, runId: any, threadId: any ) {
    try {
      const toolOutputs =
        data.required_action.submit_tool_outputs.tool_calls.map( ( toolCall: { function: { name: string }; id: any } ) => {
          if ( toolCall.function.name === "getCurrentTemperature" ) {
            return {
              tool_call_id: toolCall.id,
              output: "57",
            }
          } else if ( toolCall.function.name === "getRainProbability" ) {
            return {
              tool_call_id: toolCall.id,
              output: "0.06",
            }
          }
        } )
      // Submit all the tool outputs at the same time
      await this.submitToolOutputs( toolOutputs, runId, threadId )
    } catch ( error ) {
      console.error( "Error processing required action:", error )
    }
  }

  async submitToolOutputs( toolOutputs: any, runId: any, threadId: any ) {
    try {
      // Use the submitToolOutputsStream helper
      const stream = this.client.beta.threads.runs.submitToolOutputsStream(
        threadId,
        runId,
        { tool_outputs: toolOutputs },
      )
      for await ( const event of stream ) {
        this.emit( "event", event )
      }
    } catch ( error ) {
      console.error( "Error submitting tool outputs:", error )
    }
  }
}

const assistantEventHandler: any = new AssistantStreamEventHandler( openai )
assistantEventHandler.on( "event", assistantEventHandler.onEvent.bind( assistantEventHandler ) )

export { assistantEventHandler }
