"use client";

import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { BottomToolbar } from "@/components/BottomToolbar";
// UI components
import { Transcript } from "@/components/Transcript";

// Types

import { useEvent } from "@/contexts/EventContext";
// Context providers & hooks
import { useTranscript } from "@/contexts/TranscriptContext";
import { useHandleServerEvent } from "./hooks/useHandleServerEvent";

// Utilities
import { createRealtimeConnection } from "@/lib/realtimeConnection";

import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useWebResults } from "@/contexts/WebResultsContext";
// Agent configs
import { allAgentSets, defaultAgent } from "@/features/live/agents/configs";
import ReactMarkdown from "react-markdown";

export function Live() {
	const { webResults, addWebResult } = useWebResults();
	const { transcriptItems, addTranscriptMessage, addTranscriptBreadcrumb } =
		useTranscript();
	const { logClientEvent, logServerEvent } = useEvent();

	const [selectedAgentName, setSelectedAgentName] = useState<string>("");
	const [selectedAgentConfigSet, setSelectedAgentConfigSet] = useState(null);

	const [dataChannel, setDataChannel] = useState<RTCDataChannel | null>(null);
	const pcRef = useRef<RTCPeerConnection | null>(null);
	const dcRef = useRef<RTCDataChannel | null>(null);
	const audioElementRef = useRef<HTMLAudioElement | null>(null);
	const [sessionStatus, setSessionStatus] = useState<any>("DISCONNECTED");

	const [isEventsPaneExpanded, setIsEventsPaneExpanded] =
		useState<boolean>(true);
	const [userText, setUserText] = useState<string>("");
	const [isPTTActive, setIsPTTActive] = useState<boolean>(false);
	const [isPTTUserSpeaking, setIsPTTUserSpeaking] = useState<boolean>(false);
	const [isAudioPlaybackEnabled, setIsAudioPlaybackEnabled] =
		useState<boolean>(true);

	const sendClientEvent = (eventObj: any, eventNameSuffix = "") => {
		if (dcRef.current && dcRef.current.readyState === "open") {
			logClientEvent(eventObj, eventNameSuffix);
			dcRef.current.send(JSON.stringify(eventObj));
		} else {
			logClientEvent(
				{ attemptedEvent: eventObj.type },
				"error.data_channel_not_open",
			);
			console.error(
				"Failed to send message - no data channel available",
				eventObj,
			);
		}
	};

	const handleServerEventRef = useHandleServerEvent({
		setSessionStatus,
		selectedAgentName,
		selectedAgentConfigSet,
		sendClientEvent,
		setSelectedAgentName,
	});

	useEffect(() => {
		const agents = allAgentSets["default"];
		const agentKeyToUse = "default";

		setSelectedAgentName(agentKeyToUse);
		setSelectedAgentConfigSet(agents);
	}, []);

	useEffect(() => {
		if (selectedAgentName && sessionStatus === "DISCONNECTED") {
			console.log("🚀 ~ useEffect ~ selectedAgentName:", selectedAgentName);

			connectToRealtime();
		}
	}, [selectedAgentName, sessionStatus]);

	useEffect(() => {
		if (
			sessionStatus === "CONNECTED" &&
			selectedAgentConfigSet &&
			selectedAgentName
		) {
			const currentAgent = selectedAgentConfigSet.find(
				(a) => a.name === selectedAgentName,
			);
			addTranscriptBreadcrumb(`Agent: ${selectedAgentName}`, currentAgent);
			updateSession(true);
		}
	}, [selectedAgentConfigSet, selectedAgentName, sessionStatus]);
	// useEffect(() => {
	// 	if (sessionStatus === "CONNECTED") {
	// 		const currentAgent = defaultAgent;

	// 		console.log("🚀 ~ useEffect ~ currentAgent:", currentAgent);

	// 		addTranscriptBreadcrumb(`Agent: Default Agent`, currentAgent);
	// 		updateSession(true);
	// 	}
	// }, [sessionStatus, addTranscriptBreadcrumb]);

	console.log("🚀 ~ useEffect ~ sessionStatus:", sessionStatus);
	useEffect(() => {
		if (sessionStatus === "CONNECTED") {
			console.log(
				`updatingSession, isPTTACtive=${isPTTActive} sessionStatus=${sessionStatus}`,
			);
			updateSession();
		}
	}, [isPTTActive, sessionStatus]);

	const fetchEphemeralKey = async (): Promise<string | null> => {
		logClientEvent({ url: "/session" }, "fetch_session_token_request");
		const tokenResponse = await fetch("/api/session");

		console.log("🚀 ~ fetchEphemeralKey ~ tokenResponse:", tokenResponse);

		const data = await tokenResponse.json();

		console.log("🚀 ~ fetchEphemeralKey ~ data:", data);

		logServerEvent(data, "fetch_session_token_response");

		if (!data.client_secret?.value) {
			logClientEvent(data, "error.no_ephemeral_key");
			console.error("No ephemeral key provided by the server");
			setSessionStatus("DISCONNECTED");
			return null;
		}

		return data.client_secret.value;
	};

	const connectToRealtime = async () => {
		if (sessionStatus !== "DISCONNECTED") return;
		setSessionStatus("CONNECTING");

		try {
			const EPHEMERAL_KEY = await fetchEphemeralKey();

			console.log("🚀 ~ connectToRealtime ~ EPHEMERAL_KEY:", EPHEMERAL_KEY);

			if (!EPHEMERAL_KEY) {
				return;
			}

			if (!audioElementRef.current) {
				audioElementRef.current = document.createElement("audio");
			}
			audioElementRef.current.autoplay = isAudioPlaybackEnabled;

			const { pc, dc } = await createRealtimeConnection(
				EPHEMERAL_KEY,
				audioElementRef,
			);
			pcRef.current = pc;
			dcRef.current = dc;

			dc.addEventListener("open", () => {
				logClientEvent({}, "data_channel.open");
			});
			dc.addEventListener("close", () => {
				logClientEvent({}, "data_channel.close");
			});
			dc.addEventListener("error", (err: any) => {
				logClientEvent({ error: err }, "data_channel.error");
			});
			dc.addEventListener("message", (e: MessageEvent) => {
				handleServerEventRef.current(JSON.parse(e.data));
			});

			setDataChannel(dc);
		} catch (err) {
			console.error("Error connecting to realtime:", err);
			setSessionStatus("DISCONNECTED");
		}
	};

	const disconnectFromRealtime = () => {
		if (pcRef.current) {
			pcRef.current.getSenders().forEach((sender) => {
				if (sender.track) {
					sender.track.stop();
				}
			});

			pcRef.current.close();
			pcRef.current = null;
		}
		setDataChannel(null);
		setSessionStatus("DISCONNECTED");
		setIsPTTUserSpeaking(false);

		logClientEvent({}, "disconnected");
	};

	const sendSimulatedUserMessage = (text: string) => {
		const id = uuidv4().slice(0, 32);
		addTranscriptMessage(id, "user", text, true);

		sendClientEvent(
			{
				type: "conversation.item.create",
				item: {
					id,
					type: "message",
					role: "user",
					content: [{ type: "input_text", text }],
				},
			},
			"(simulated user text message)",
		);
		sendClientEvent(
			{ type: "response.create" },
			"(trigger response after simulated user text message)",
		);
	};

	const updateSession = (shouldTriggerResponse = false) => {
		sendClientEvent(
			{ type: "input_audio_buffer.clear" },
			"clear audio buffer on session update",
		);

		const currentAgent = defaultAgent;

		const turnDetection = isPTTActive
			? null
			: {
					type: "server_vad",
					threshold: 0.5,
					prefix_padding_ms: 300,
					silence_duration_ms: 200,
					create_response: true,
				};

		const instructions = currentAgent?.instructions || "";
		const tools = currentAgent?.tools || [];

		const sessionUpdateEvent = {
			type: "session.update",
			session: {
				modalities: ["text", "audio"],
				instructions,
				voice: "coral",
				input_audio_format: "pcm16",
				output_audio_format: "pcm16",
				input_audio_transcription: { model: "whisper-1" },
				turn_detection: turnDetection,
				tools,
			},
		};

		sendClientEvent(sessionUpdateEvent);

		if (shouldTriggerResponse) {
			sendSimulatedUserMessage("hi");
		}
	};

	const cancelAssistantSpeech = async () => {
		const mostRecentAssistantMessage = [...transcriptItems]
			.reverse()
			.find((item) => item.role === "assistant");

		if (!mostRecentAssistantMessage) {
			console.warn("can't cancel, no recent assistant message found");
			return;
		}
		if (mostRecentAssistantMessage.status === "DONE") {
			console.log("No truncation needed, message is DONE");
			return;
		}

		sendClientEvent({
			type: "conversation.item.truncate",
			item_id: mostRecentAssistantMessage?.itemId,
			content_index: 0,
			audio_end_ms: Date.now() - mostRecentAssistantMessage.createdAtMs,
		});
		sendClientEvent(
			{ type: "response.cancel" },
			"(cancel due to user interruption)",
		);
	};

	const handleSendTextMessage = () => {
		if (!userText.trim()) return;
		cancelAssistantSpeech();

		sendClientEvent(
			{
				type: "conversation.item.create",
				item: {
					type: "message",
					role: "user",
					content: [{ type: "input_text", text: userText.trim() }],
				},
			},
			"(send user text message)",
		);
		setUserText("");

		sendClientEvent({ type: "response.create" }, "trigger response");
	};

	const handleTalkButtonDown = () => {
		if (sessionStatus !== "CONNECTED" || dataChannel?.readyState !== "open")
			return;
		cancelAssistantSpeech();

		setIsPTTUserSpeaking(true);
		sendClientEvent({ type: "input_audio_buffer.clear" }, "clear PTT buffer");
	};

	const handleTalkButtonUp = () => {
		if (
			sessionStatus !== "CONNECTED" ||
			dataChannel?.readyState !== "open" ||
			!isPTTUserSpeaking
		)
			return;

		setIsPTTUserSpeaking(false);
		sendClientEvent({ type: "input_audio_buffer.commit" }, "commit PTT");
		sendClientEvent({ type: "response.create" }, "trigger response PTT");
	};

	const onToggleConnection = () => {
		if (sessionStatus === "CONNECTED" || sessionStatus === "CONNECTING") {
			disconnectFromRealtime();
			setSessionStatus("DISCONNECTED");
		} else {
			connectToRealtime();
		}
	};

	useEffect(() => {
		const storedPushToTalkUI = localStorage.getItem("pushToTalkUI");
		if (storedPushToTalkUI) {
			setIsPTTActive(storedPushToTalkUI === "true");
		}
		const storedLogsExpanded = localStorage.getItem("logsExpanded");
		if (storedLogsExpanded) {
			setIsEventsPaneExpanded(storedLogsExpanded === "true");
		}
		const storedAudioPlaybackEnabled = localStorage.getItem(
			"audioPlaybackEnabled",
		);
		if (storedAudioPlaybackEnabled) {
			setIsAudioPlaybackEnabled(storedAudioPlaybackEnabled === "true");
		}
	}, []);

	useEffect(() => {
		localStorage.setItem("pushToTalkUI", isPTTActive.toString());
	}, [isPTTActive]);

	useEffect(() => {
		localStorage.setItem("logsExpanded", isEventsPaneExpanded.toString());
	}, [isEventsPaneExpanded]);

	useEffect(() => {
		localStorage.setItem(
			"audioPlaybackEnabled",
			isAudioPlaybackEnabled.toString(),
		);
	}, [isAudioPlaybackEnabled]);

	useEffect(() => {
		if (audioElementRef.current) {
			if (isAudioPlaybackEnabled) {
				audioElementRef.current.play().catch((err) => {
					console.warn("Autoplay may be blocked by browser:", err);
				});
			} else {
				audioElementRef.current.pause();
			}
		}
	}, [isAudioPlaybackEnabled]);

	const agentSetKey = "default";

	const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		// Only accept CSV files
		if (!file.name.endsWith(".csv")) {
			console.error("Please upload a CSV file");
			return;
		}

		const reader = new FileReader();
		reader.onload = async (event) => {
			const fileContent = event.target?.result as string;
			if (!fileContent) return;

			// First, send a message indicating file processing
			const processingMsgId = uuidv4().slice(0, 32);
			addTranscriptMessage(
				processingMsgId,
				"user",
				"Processing CSV file...",
				true,
			);

			// Send the processing event
			sendClientEvent(
				{
					type: "conversation.item.create",
					item: {
						id: processingMsgId,
						type: "message",
						role: "user",
						content: [{ type: "input_text", text: "Processing CSV file..." }],
					},
				},
				"(file upload processing message)",
			);

			// Send the file content
			const fileContentId = uuidv4().slice(0, 32);
			addTranscriptMessage(fileContentId, "user", fileContent, true);

			sendClientEvent(
				{
					type: "conversation.item.create",
					item: {
						id: fileContentId,
						type: "message",
						role: "user",
						content: [{ type: "input_text", text: fileContent }],
					},
				},
				"(send file content)",
			);

			// Trigger the agent's response
			sendClientEvent(
				{ type: "response.create" },
				"(trigger response for file processing)",
			);
		};

		reader.readAsText(file);
	};

	return (
		<>
			<div className="text-base flex flex-col h-screen bg-gray-100 text-gray-800 relative">
				<Card className="w-full h-[50vh] border-b-2">
					{webResults.length > 0 && (
						<ScrollArea className="h-full p-4">
							{webResults.map(({ markdown, screenshot }, index) => (
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
				<div className="flex flex-1 gap-2 px-2 overflow-hidden relative">
					<Transcript
						userText={userText}
						setUserText={setUserText}
						onSendMessage={handleSendTextMessage}
						canSend={
							sessionStatus === "CONNECTED" &&
							dcRef.current?.readyState === "open"
						}
					/>

					{/* <Events isExpanded={isEventsPaneExpanded} /> */}
				</div>

				<BottomToolbar
					sessionStatus={sessionStatus}
					onToggleConnection={onToggleConnection}
					isPTTActive={isPTTActive}
					setIsPTTActive={setIsPTTActive}
					isPTTUserSpeaking={isPTTUserSpeaking}
					handleTalkButtonDown={handleTalkButtonDown}
					handleTalkButtonUp={handleTalkButtonUp}
					isEventsPaneExpanded={false}
					handleFileUpload={handleFileUpload}
					setIsEventsPaneExpanded={setIsEventsPaneExpanded}
					isAudioPlaybackEnabled={isAudioPlaybackEnabled}
					setIsAudioPlaybackEnabled={setIsAudioPlaybackEnabled}
				/>
			</div>
		</>
	);
}
