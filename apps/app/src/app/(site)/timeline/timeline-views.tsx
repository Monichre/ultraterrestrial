"use client";

import type { EventsRecord } from "@/db/xata";
import { HistoricalEventsTimeline } from "@/features/events/historical-events-timeline";
import { ViewSelector } from "@/features/events/historical-events-timeline/view-selector";

import type { JSONData } from "@xata.io/client";
import { useState } from "react";
import type { ViewMode } from "storybook/internal/types";

interface TimelinePageClientProps {
	events: JSONData<EventsRecord>[];
}

export function TimelineViews({ events }: TimelinePageClientProps) {
	const [viewMode, setViewMode] = useState<ViewMode>("timeline");

	return (
		<div className="timeline-page relative">
			<div className="absolute top-5 left-4 z-50">
				<ViewSelector value={viewMode} onChange={setViewMode} />
			</div>

			{viewMode === "timeline" && <HistoricalEventsTimeline events={events} />}

			{viewMode === "worldmap" && (
				<div className="h-screen w-full flex items-center justify-center text-white">
					World Map View Coming Soon
				</div>
			)}

			{viewMode === "journey" && (
				<div className="h-screen w-full flex items-center justify-center text-white">
					3D Journey View Coming Soon
				</div>
			)}
		</div>
	);
}
