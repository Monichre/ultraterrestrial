"use client";

import { cn } from "@/lib/utils";
import { Box, Database, MoreHorizontal } from "lucide-react";
import type { SubscribersTableProps, TableHeaderProps } from "./types";

export function TableHeader({
	title,
	badgeText,
	badgeIcon = <Database className="h-4 w-4" />,
	onOpenOptions,
}: TableHeaderProps) {
	return (
		<div className="flex items-center gap-2 p-2 px-3">
			<span className="text-base font-medium">{title}</span>
			{badgeText && (
				<span className="flex items-center gap-1 rounded-md bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
					{badgeIcon}
					<span>{badgeText}</span>
				</span>
			)}
			{onOpenOptions && (
				<button
					type="button"
					onClick={onOpenOptions}
					className="ml-auto rounded-sm p-1.5 opacity-70 hover:bg-muted hover:opacity-100"
					aria-label="Open database options"
				>
					<MoreHorizontal className="h-4 w-4" />
				</button>
			)}
		</div>
	);
}

export function SubscribersTable({ data, className }: SubscribersTableProps) {
	return (
		<div
			className={cn(
				"flex flex-col overflow-hidden rounded-md border bg-card",
				className,
			)}
		>
			<TableHeader
				title="Subscribers"
				badgeText="Database"
				onOpenOptions={() => {}}
			/>
			<div className="overflow-x-auto">
				<table className="w-full border-collapse text-sm">
					<thead>
						<tr className="border-b bg-muted/50">
							<th className="px-3 py-2 text-left font-medium">
								<div className="flex items-center gap-2">
									<Box className="h-4 w-4 text-primary" />
									<span>id</span>
								</div>
							</th>
							<th className="px-3 py-2 text-left font-medium">email</th>
							<th className="px-3 py-2 text-left font-medium">name</th>
							<th className="px-3 py-2 text-left font-medium">paid</th>
						</tr>
					</thead>
					<tbody>
						{data.map((row) => (
							<tr key={row.id} className="border-b">
								<td className="px-3 py-2">
									<div className="flex items-center gap-2">
										<Box className="h-4 w-4 text-primary" />
										<span>{row.id}</span>
									</div>
								</td>
								<td className="px-3 py-2">{row.email}</td>
								<td className="px-3 py-2 max-w-[12ch] truncate">
									<span>{row.name}</span>
								</td>
								<td
									className={cn("px-3 py-2", row.paid ? "text-green-500" : "")}
								>
									{row.paid ? "true" : "false"}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
