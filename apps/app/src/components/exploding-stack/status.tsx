"use client";

import { cn } from "@/lib/utils";
import { AlignJustify, DollarSign, Globe, SquareStack } from "lucide-react";
import type { StatusCardProps, StatusItemProps } from "./types";

export function StatusItem({ icon, label, value }: StatusItemProps) {
	return (
		<>
			<dt className="flex items-center gap-2 text-muted-foreground">
				{icon}
				<span>{label}</span>
			</dt>
			<dd className="text-right font-medium">{value}</dd>
		</>
	);
}

export function StatusCard({
	className,
	name = "Course Waitlist",
	domain = "course.craftofui.com",
	count = "23,602",
	prepaid = "16,280",
}: StatusCardProps) {
	return (
		<div
			className={cn(
				"flex flex-col overflow-hidden rounded-md border bg-card p-4",
				className,
			)}
		>
			<dl className="grid grid-cols-2 gap-3 text-sm">
				<StatusItem
					icon={<AlignJustify className="h-4 w-4" />}
					label="Name"
					value={name}
				/>
				<StatusItem
					icon={<Globe className="h-4 w-4" />}
					label="Domain"
					value={domain}
				/>
				<StatusItem
					icon={<SquareStack className="h-4 w-4" />}
					label="Count"
					value={count}
				/>
				<StatusItem
					icon={<DollarSign className="h-4 w-4" />}
					label="Prepaid"
					value={
						<span className="relative text-green-500 pl-4">
							{prepaid}
							<span className="absolute left-0 top-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-green-500" />
						</span>
					}
				/>
			</dl>
		</div>
	);
}
