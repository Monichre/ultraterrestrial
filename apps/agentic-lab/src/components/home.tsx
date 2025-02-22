"use client";

import { WebResultsProvider } from "@/contexts/WebResultsContext";
import { Live } from "@/features/live/Live";
// Start of Selection
import dynamic from "next/dynamic";

const StorageTldraw = dynamic(() =>
	import("@/components/StorageTldraw").then((mod) => mod.StorageTldraw),
);
const ConsolePage = dynamic(() =>
	import("@/components/console").then((mod) => mod.ConsolePage),
);
const Room = dynamic(() => import("@/app/Room").then((mod) => mod.Room));

export const Home = () => {
	return (
		<Room>
			<WebResultsProvider>
				<div className="flex flex-row h-[100vh] w-[100vw]">
					<div className="h-screen w-[33vw] ">
						{/* <ConsolePage /> */}
						<Live />
					</div>
					<div className="h-full w-[66vw]">
						<StorageTldraw />
					</div>
				</div>
			</WebResultsProvider>
		</Room>
	);
};
