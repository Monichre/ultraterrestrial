import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { WavRecorder, WavStreamPlayer } from "@/services/wavtools";
import { instructions } from "@/utils/conversation_config";
import { WavRenderer } from "@/utils/wav_renderer";
import FirecrawlApp from "@mendable/firecrawl-js";
import { RealtimeClient } from "@openai/realtime-api-beta";
import type { ItemType } from "@openai/realtime-api-beta/dist/lib/client";
import { FileIcon, Loader2, Mic, Square, X } from "lucide-react";
import type * as React from "react";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import "./console.css";

const firecrawl = new FirecrawlApp({
	apiKey: "fc-e271f58f93fe4b3fa4885b3234dfa8fb",
});

const client = new RealtimeClient({
	apiKey: process.env.OPENAI_API_KEY || "",
	dangerouslyAllowAPIKeyInBrowser: true,
	debug: true,
});

// Initialize base configuration
client.updateSession({ instructions });
client.updateSession({ input_audio_transcription: { model: "whisper-1" } });

const wavRecorder = new WavRecorder({ sampleRate: 24000 });
const wavStreamPlayer = new WavStreamPlayer({ sampleRate: 24000 });

interface ConversationItem extends ItemType {
	formatted: {
		text?: string;
		transcript?: string;
		audio?: any;
		tool?: {
			name: string;
			arguments: string;
		};
		file?: {
			url: string;
		};
		output?: string;
	};
}

export function ConsolePage() {
	// State
	const [items, setItems] = useState<ConversationItem[]>([]);
	const [isConnected, setIsConnected] = useState(false);
	const [isRecording, setIsRecording] = useState(false);
	const [canPushToTalk, setCanPushToTalk] = useState(true);
	const [webData, setWebData] = useState<
		Array<{ markdown: string; screenshot: string }>
	>([]);
	const [isLoading, setIsLoading] = useState(false);

	// Refs
	const clientCanvasRef = useRef<HTMLCanvasElement>(null);
	const serverCanvasRef = useRef<HTMLCanvasElement>(null);
	const conversationRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		wavRecorder.begin();
		wavStreamPlayer.connect();
		return () => {
			client.reset();
		};
	}, []);

	// Audio visualization
	useEffect(() => {
		let isLoaded = true;

		const render = () => {
			if (!isLoaded) return;

			const renderCanvas = (
				canvas: HTMLCanvasElement | null,
				ctx: CanvasRenderingContext2D | null,
				source: any,
				color: string,
			) => {
				if (canvas && ctx) {
					if (!canvas.width || !canvas.height) {
						canvas.width = canvas.offsetWidth;
						canvas.height = canvas.offsetHeight;
					}
					ctx.clearRect(0, 0, canvas.width, canvas.height);
					const result = source
						? source.getFrequencies("voice")
						: { values: new Float32Array([0]) };
					WavRenderer.drawBars(canvas, ctx, result.values, color, 10, 0, 8);
				}
			};

			renderCanvas(
				clientCanvasRef.current,
				clientCanvasRef.current?.getContext("2d") || null,
				wavRecorder.recording ? wavRecorder : null,
				"#1a1a1a",
			);

			renderCanvas(
				serverCanvasRef.current,
				serverCanvasRef.current?.getContext("2d") || null,
				wavStreamPlayer.analyser ? wavStreamPlayer : null,
				"#1a1a1a",
			);

			requestAnimationFrame(render);
		};

		render();
		return () => {
			isLoaded = false;
		};
	}, []);

	// Auto-scroll conversation
	useEffect(() => {
		if (conversationRef.current) {
			conversationRef.current.scrollTop = conversationRef.current.scrollHeight;
		}
	}, [items]);

	const connectConversation = async () => {
		setIsLoading(true);
		try {
			setIsConnected(true);
			setItems([]);
			await client.connect();
			client.sendUserMessageContent([{ type: "input_text", text: "Hello!" }]);

			if (client.getTurnDetectionType() === "server_vad") {
				await wavRecorder.record((data) => client.appendInputAudio(data.mono));
			}
		} catch (error) {
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	};

	const disconnectConversation = async () => {
		setIsConnected(false);
		setItems([]);
		client.disconnect();
		await wavRecorder.end();
		await wavStreamPlayer.interrupt();
	};

	const startRecording = async () => {
		setIsRecording(true);
		const trackSampleOffset = await wavStreamPlayer.interrupt();
		if (trackSampleOffset?.trackId) {
			await client.cancelResponse(
				trackSampleOffset.trackId,
				trackSampleOffset.offset,
			);
		}
		await wavRecorder.record((data) => client.appendInputAudio(data.mono));
	};

	const stopRecording = async () => {
		setIsRecording(false);
		await wavRecorder.pause();
		client.createResponse();
	};

	const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		setIsLoading(true);
		const reader = new FileReader();
		reader.onload = async (event) => {
			const fileContent = event.target?.result as string;
			if (!fileContent) return;

			try {
				client.sendUserMessageContent([
					{
						type: "input_text",
						text: "Processing CSV file with URLs...",
					},
				]);

				client.sendUserMessageContent([
					{
						type: "input_text",
						text: fileContent,
					},
				]);
			} finally {
				setIsLoading(false);
			}
		};
		reader.readAsText(file);
	};

	// Client event handlers
	useEffect(() => {
		client.on("conversation.updated", async ({ item, delta }: any) => {
			if (delta?.audio) {
				wavStreamPlayer.add16BitPCM(delta.audio, item.id);
			}
			if (item.status === "completed" && item.formatted.audio?.length) {
				const wavFile = await WavRecorder.decode(
					item.formatted.audio,
					24000,
					24000,
				);
				item.formatted.file = wavFile;
			}
			setItems(client.conversation.getItems());
		});
	}, []);

	return (
		<div className="h-full w-full flex flex-col justify-end items-center">
			{/* Preview Panel */}
			<Card className="w-full h-[25vh] border-b-2">
				{webData.length > 0 && (
					<ScrollArea className="h-full p-4">
						{webData.map(({ markdown, screenshot }, index) => (
							<div key={index} className="mb-8">
								{screenshot && (
									<img
										src={screenshot}
										alt="Page preview"
										className="w-full rounded-lg mb-4"
									/>
								)}
								<div className="prose prose-sm dark:prose-invert">
									<ReactMarkdown>{markdown}</ReactMarkdown>
								</div>
							</div>
						))}
					</ScrollArea>
				)}
			</Card>
			{/* Main Chat Area */}
			<Card className="w-full flex-1 flex flex-col h-[25vh]  ">
				{/* Chat Messages */}
				<ScrollArea className="flex-1 p-4">
					<div className="space-y-4">
						{items.map((item) => (
							<div
								key={item.id}
								className={`flex ${item.role === "assistant" ? "justify-start" : "justify-end"}`}
							>
								<Card
									className={`max-w-[80%] px-4 py-2 ${
										item.role === "assistant"
											? "bg-secondary"
											: "bg-primary text-primary-foreground"
									}`}
								>
									{/* Tool Response */}
									{item.type === "function_call_output" && (
										<pre className="text-sm font-mono whitespace-pre-wrap">
											{item.formatted.output}
										</pre>
									)}

									{/* Tool Call */}
									{item.formatted.tool && (
										<div className="text-sm font-mono">
											{item.formatted.tool.name}({item.formatted.tool.arguments}
											)
										</div>
									)}

									{/* User Message */}
									{!item.formatted.tool && item.role === "user" && (
										<div>
											{item.formatted.transcript ||
												(item.formatted.audio?.length
													? "(awaiting transcript)"
													: item.formatted.text || "(item sent)")}
										</div>
									)}

									{/* Assistant Message */}
									{!item.formatted.tool && item.role === "assistant" && (
										<div>
											{item.formatted.transcript ||
												item.formatted.text ||
												"(truncated)"}
										</div>
									)}

									{/* Audio Player */}
									{item.formatted.file && (
										<audio
											src={item.formatted.file.url}
											controls
											className="mt-2 w-full"
										/>
									)}
								</Card>
							</div>
						))}
					</div>
				</ScrollArea>

				{/* Visualization */}
				<div className="h-12 border-t flex items-center justify-end px-4 space-x-2 bg-secondary/20">
					<canvas ref={clientCanvasRef} className="h-8 w-24" />
					<canvas ref={serverCanvasRef} className="h-8 w-24" />
				</div>

				{/* Controls */}
				<div className="border-t p-4">
					<div className="flex items-center justify-between space-x-4">
						{isConnected && canPushToTalk && (
							<Button
								variant={isRecording ? "destructive" : "default"}
								size="sm"
								disabled={!isConnected || !canPushToTalk}
								onMouseDown={startRecording}
								onMouseUp={stopRecording}
								className="flex-1"
							>
								{isRecording ? (
									<>
										<Square className="w-4 h-4 mr-2" />
										Release to Send
									</>
								) : (
									<>
										<Mic className="w-4 h-4 mr-2" />
										Push to Talk
									</>
								)}
							</Button>
						)}

						<Button
							variant={isConnected ? "destructive" : "default"}
							size="sm"
							onClick={
								isConnected ? disconnectConversation : connectConversation
							}
							disabled={isLoading}
						>
							{isLoading ? (
								<Loader2 className="w-4 h-4 mr-2 animate-spin" />
							) : isConnected ? (
								<>
									<X className="w-4 h-4 mr-2" />
									Disconnect
								</>
							) : (
								<>
									<Mic className="w-4 h-4 mr-2" />
									Connect
								</>
							)}
						</Button>

						<div className="relative">
							<Button variant="secondary" size="sm">
								<FileIcon className="w-4 h-4 mr-2" />
								Upload CSV
							</Button>
							<input
								type="file"
								accept=".csv"
								onChange={handleFileUpload}
								className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
							/>
						</div>
					</div>
				</div>
			</Card>
		</div>
	);
}
