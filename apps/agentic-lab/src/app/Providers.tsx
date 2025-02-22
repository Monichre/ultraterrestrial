"use client";

import { EventProvider } from "@/contexts/EventContext";
import { TranscriptProvider } from "@/contexts/TranscriptContext";
import { LiveblocksProvider } from "@liveblocks/react";

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<LiveblocksProvider authEndpoint="/api/liveblocks-auth" throttle={16}>
			<TranscriptProvider>
				<EventProvider>{children}</EventProvider>
			</TranscriptProvider>
		</LiveblocksProvider>
	);
}
