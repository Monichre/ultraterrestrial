"use client";
// @ts-ignore
import { Room } from "@/features/collab/room";
import dynamic from "next/dynamic";
import { use } from "react";

const LiveUsers = dynamic(
	() => import("@/features/collab/live-users").then((mod) => mod.LiveUsers),
	{ ssr: false },
);

export default function Page(props: { params: Promise<{ roomId: string }> }) {
	const params = use(props.params);
	return (
		<Room roomId={params.roomId}>
			<LiveUsers />
		</Room>
	);
}
