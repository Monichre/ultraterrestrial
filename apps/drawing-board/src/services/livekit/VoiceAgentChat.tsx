// in next.js, "use client" is needed to indicate it shouldn't be
// server side rendered
"use client"

import "@livekit/components-styles"

import {
  LiveKitRoom,
  useVoiceAssistant,
  BarVisualizer,
  RoomAudioRenderer,
  VoiceAssistantControlBar,
} from "@livekit/components-react"

export function MyVoiceAgent() {
  return (
    <LiveKitRoom
      token={myToken}
      serverUrl={serverUrl}
      connect={true}
      audio={true}
    >
      <SimpleVoiceAssistant />
      <VoiceAssistantControlBar />
      <RoomAudioRenderer />
    </LiveKitRoom>
  )
}

function SimpleVoiceAssistant() {
  const { state, audioTrack } = useVoiceAssistant()
  return (
    <div className="h-80">
      <BarVisualizer state={state} barCount={5} trackRef={audioTrack} style={{}} />
      <p className="text-center">{state}</p>
    </div>
  )
}