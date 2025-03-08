"use client";

// import { ErrorIndicator } from "@/components/error-indicator";
// import { CONTENT_CREATOR_ROUTING_WORKFLOW } from "@/components/flow-routing/lib/content-creator-routing";
// import { NodesPanel } from "@/components/nodes-panel";
import { Button } from "@/components/ui/button";
import { useWorkflow } from "@/features/mindmap/hooks/useWorkFlow";
import { GenerateTextNodeController } from "@/features/mindmap/workflows/generate-text-node-controller";
import { PromptCrafterNodeController } from "@/features/mindmap/workflows/prompt-crafter-node-controller";
import { StatusEdgeController } from "@/features/mindmap/workflows/status-edge-controller";
import { TextInputNodeController } from "@/features/mindmap/workflows/text-input-node-controller";
import { VisualizeTextNodeController } from "@/features/mindmap/workflows/visualize-text-node-controller";
// import type { FlowNode } from "@/lib/flow/workflow";
import {
	Background,
	Controls,
	type EdgeTypes,
	MiniMap,
	type NodeTypes,
	Panel,
	ReactFlow,
	ReactFlowProvider,
	useReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { type DragEvent, useEffect } from "react";
import { shallow } from "zustand/shallow";

const nodeTypes: NodeTypes = {
	"generate-text": GenerateTextNodeController,
	"visualize-text": VisualizeTextNodeController,
	"text-gray-200 dark:text-gray-800": TextInputNodeController,
	"prompt-crafter": PromptCrafterNodeController,
};

const edgeTypes: EdgeTypes = {
	status: StatusEdgeController,
};

export function Flow() {
	const store = useWorkflow(
		(store) => ({
			nodes: store.nodes,
			edges: store.edges,
			onNodesChange: store.onNodesChange,
			onEdgesChange: store.onEdgesChange,
			onConnect: store.onConnect,
			startExecution: store.startExecution,
			createNode: store.createNode,
			workflowExecutionState: store.workflowExecutionState,
			initializeWorkflow: store.initializeWorkflow,
		}),
		shallow,
	);

	// biome-ignore lint/correctness/useExhaustiveDependencies: We want to initialize the workflow only once
	useEffect(() => {
		store.initializeWorkflow(
			CONTENT_CREATOR_ROUTING_WORKFLOW.nodes,
			CONTENT_CREATOR_ROUTING_WORKFLOW.edges,
		);
	}, []);

	const { screenToFlowPosition } = useReactFlow();

	const onDragOver = (event: DragEvent) => {
		event.preventDefault();
		event.dataTransfer.dropEffect = "move";
	};

	const onDrop = (event: DragEvent) => {
		event.preventDefault();

		const type = event.dataTransfer.getData(
			"application/reactflow",
		) as FlowNode["type"];

		if (!type) {
			return;
		}

		const position = screenToFlowPosition({
			x: event.clientX,
			y: event.clientY,
		});

		store.createNode(type, position);
	};

	const onStartExecution = async () => {
		const result = await store.startExecution();
		if (result.status === "error") {
			console.error(result.error);
		}
	};

	return (
		<ReactFlow
			nodes={store.nodes}
			edges={store.edges}
			onNodesChange={store.onNodesChange}
			onEdgesChange={store.onEdgesChange}
			onConnect={store.onConnect}
			nodeTypes={nodeTypes}
			edgeTypes={edgeTypes}
			onDragOver={onDragOver}
			onDrop={onDrop}
			fitView
		>
			
			{/* Import these components at the top of the file */}
			{/* import { Panel } from 'reactflow' */}
			{/* import { NodesPanel } from '@/components/workflow/nodes-panel' */}
			{/* import { ErrorIndicator } from '@/components/workflow/error-indicator' */}
			
			<Controls />
			<Background />
			<MiniMap />
			<div className="absolute top-0 left-0 z-10 p-4">
				{/* Replace with your actual NodesPanel component */}
				<div className="bg-white p-4 rounded shadow-md">
					<h3 className="text-sm font-medium mb-2">Nodes</h3>
					{/* Node items would go here */}
				</div>
			</div>
			<div className="absolute top-0 right-0 z-10 p-4 flex gap-2 items-center">
				{/* Replace with your actual ErrorIndicator component */}
				{store.workflowExecutionState.errors.length > 0 && (
					<div className="text-red-500">
						{store.workflowExecutionState.errors.length} error(s)
					</div>
				)}
				<Button
					onClick={onStartExecution}
					title={
						store.workflowExecutionState.timesRun > 1
							? "Disabled for now"
							: "Run the workflow"
					}
					disabled={
						store.workflowExecutionState.errors.length > 0 ||
						store.workflowExecutionState.isRunning ||
						store.workflowExecutionState.timesRun > 1
					}
				>
					{store.workflowExecutionState.isRunning ? "Running..." : "Run Flow"}
				</Button>
			</Panel>
		</ReactFlow>
	);
}

export default function Page() {
	return (
		<div className="w-screen h-screen">
			<ReactFlowProvider>
				<Flow />
			</ReactFlowProvider>
		</div>
	);
}
