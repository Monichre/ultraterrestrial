import { fileURLToPath } from 'node:url'
import { cli, defineAgent, multimodal, WorkerOptions, type JobContext } from '@livekit/agents'
import * as openai from '@livekit/agents-plugin-openai'
import { z } from 'zod'

export default defineAgent( {
  entry: async ( ctx: JobContext ) => {
    await ctx.connect()

    const participant = await ctx.waitForParticipant()

    console.log( `starting assistant example agent for ${participant.identity}` )

    const model = new openai.realtime.RealtimeModel( {
      instructions: 'You are a helpful assistant.',
    } )

    const agent = new multimodal.MultimodalAgent( {
      model,
    } )

    const session = await agent
      .start( ctx.room, participant )
      .then( ( session ) => session as openai.realtime.RealtimeSession )

    session.conversation.item.create( {
      type: 'message',
      role: 'assistant',
      content: [{ type: 'input_text', text: 'Say "How can I help you today?"' }],
    } )
    session.response.create()
  },
} )

cli.runApp( new WorkerOptions( { agent: fileURLToPath( import.meta.url ) } ) )
