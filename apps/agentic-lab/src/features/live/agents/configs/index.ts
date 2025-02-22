import type { AgentConfig } from "@/app/types";
import FirecrawlApp from "@mendable/firecrawl-js";

const firecrawl = new FirecrawlApp({
	apiKey:
		process.env.FIRECRAWL_API_KEY || "fc-4fd06e8bedc54295adbb3a3e8d4fa5ef",
});

export const defaultAgent: AgentConfig = {
	name: "default",
	publicDescription: "",
	instructions: `Greet the user immediately.You are a helpful AI assistant that can browse the web, process CSV files and act as a research assistant that helps users gather and analyze information from websites.

You can use the following tools:
- scrape_data: Get data from a URL
- file_upload: Process a CSV file containing URLs
- map_website: Search a website for specific keywords`,
	tools: [
		{
			name: "scrapeData",
			description: "Gets a url and scrapes data from it using @Firecrawl.",
			type: "function",
			parameters: {
				type: "object",
				properties: {
					url: {
						type: "string",
						description: "URL to scrape data from",
					},
				},
				required: ["url"],
			},
		},
		{
			name: "fileUpload",
			type: "function",
			description:
				"Upload a CSV file containing URLs, parse them with PapaParse, and scrape each URL with Firecrawl",
			parameters: {
				type: "object",
				properties: {
					fileContent: {
						type: "string",
						description: "The content of the CSV file as a string",
					},
					urlColumnName: {
						type: "string",
						description:
							"The name of the column containing URLs in the CSV file",
					},
				},
				required: ["fileContent", "urlColumnName"],
			},
		},
		{
			name: "mapWebsite",
			type: "function",
			description:
				"Go to website and search for pages with a specific keyword.",
			parameters: {
				type: "object",
				properties: {
					url: {
						type: "string",
						description: "URL to map",
					},
					search: {
						type: "string",
						description: "Keywords to search for (2-3 max)",
					},
				},
				required: ["url", "search"],
			},
		},
	],
	toolLogic: {
		fileUpload: async ({ fileContent, urlColumnName }) => {
			const parseResult = Papa.parse(fileContent, {
				header: true,
				skipEmptyLines: true,
			});

			const urls = parseResult.data
				.map((value: unknown) => {
					const row = value as Record<string, string>;
					return row[urlColumnName];
				})
				.filter(
					(url: unknown): url is string =>
						typeof url === "string" && url.trim() !== "",
				);

			const results = [];

			for (const url of urls) {
				try {
					const data = await firecrawl.scrapeUrl(url, {
						formats: ["markdown", "links", "screenshot"],
					});

					if (!data.success) {
						return undefined;
					}

					if (data) {
						results.push({
							markdown: data.markdown,
							screenshot: data.screenshot,
						});
					}
				} catch (error) {
					console.error(`Error processing URL ${url}:`, error);
				}
			}

			return results;
		},
		scrapeData: async ({ url }) => {
			const data = await firecrawl.scrapeUrl(url, {
				formats: ["markdown", "links", "screenshot"],
			});

			if (!data.success) {
				return undefined;
			}

			return {
				markdown: data.markdown,
				screenshot: data.screenshot,
			};
		},
		mapWebsite: async ({ url, search }) => {
			const map_data = await firecrawl.mapUrl(url, { search });
			if (!map_data.success) {
				return undefined;
			}

			const top_link = map_data.links?.[0];
			if (!top_link) {
				return undefined;
			}

			const data = await firecrawl.scrapeUrl(top_link, {
				formats: ["markdown", "links", "screenshot"],
			});

			if (!data.success) {
				return undefined;
			}

			return {
				markdown: data.markdown,
				screenshot: data.screenshot,
			};
		},
	},
};

export const allAgentSets: Record<string, AgentConfig[]> = {
	default: [defaultAgent],
};

export const defaultAgentSetKey = "default";
