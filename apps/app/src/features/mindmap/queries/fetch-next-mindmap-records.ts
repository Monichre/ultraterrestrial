"use server";

import { xata } from "@/db/xata/client";
import { convertDatabaseRecordToMindMapNode } from "@/features/mindmap/utils/conversions";
import type { XataRecord } from "@xata.io/client";

// Type for the input parameters
type FetchNextMindmapRecordsParams = {
	table: string;
	size: number;
	offset: number;
	cursor?: string;
};

// Type for the return data structure
export type MindMapNode = {
	id: string;
	data: {
		label: string;
		[key: string]: unknown;
	};
	type: string;
};

export type FetchNextMindmapRecordsResult = {
	nodes: MindMapNode[];
	meta: {
		cursor?: string;
	};
};

/**
 * Server action to fetch paginated records from specified table and convert them to mindmap nodes
 */
export async function fetchNextMindmapRecords(
	params: FetchNextMindmapRecordsParams,
): Promise<FetchNextMindmapRecordsResult> {
	const { table, size, offset, cursor } = params;

	console.log("🚀 ~ offset:", offset);
	console.log("🚀 ~ size:", size);
	console.log("🚀 ~ table:", table);
	console.log("🚀 ~ cursor:", cursor);

	// Instead of using offset directly, use pagination properly with cursor
	let data: {
		records: (XataRecord & Record<string, unknown>)[];
		meta: { page: { cursor?: string } };
	};

	try {
		// If we have a cursor, use it for pagination
		if (cursor) {
			data = await xata.db[`${table}`].select("*").getPaginated({
				pagination: { size, cursor },
			});
		} else {
			// Otherwise get the first page
			data = await xata.db[`${table}`].select("*").getPaginated({
				pagination: { size },
			});
		}

		const { records } = data;
		const nextCursor = data.meta.page.cursor;

		console.log("🚀 ~ records:", records);
		console.log("🚀 ~ nextCursor:", nextCursor);

		// Transform database records to MindMap nodes
		const nodes = records.map(
			(record: XataRecord & Record<string, unknown>) => {
				console.log("🚀 ~ returnrecords.map ~ record:", record);

				const formatted = convertDatabaseRecordToMindMapNode(record);

				console.log("🚀 ~ returnrecords.map ~ formatted:", formatted);

				return {
					...formatted,
					type: table,
				};
			},
		);

		return {
			nodes,
			meta: {
				cursor: nextCursor,
			},
		};
	} catch (error) {
		console.error("Error fetching records:", error);
		return {
			nodes: [],
			meta: { cursor: undefined },
		};
	}
}
