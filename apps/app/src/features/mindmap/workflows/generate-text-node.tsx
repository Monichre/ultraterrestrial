import {
	type Node,
	type NodeProps,
	Position,
	useUpdateNodeInternals,
} from "@xyflow/react";

import { Button } from "@/components/ui/button";

import { cn } from "@/utils";

import { LabeledHandle } from "@/components/labeled-handle";
import { ModelSelector } from "@/components/ui/model-selector";
import { BaseNode } from "@/features/mindmap/workflows/base-node";
import {
	EditableHandle,
	EditableHandleDialog,
} from "@/features/mindmap/workflows/editable-handle";
import type {
	NodeHeader,
	NodeHeaderAction,
	NodeHeaderActions,
	NodeHeaderIcon,
	NodeHeaderTitle,
} from "@/features/mindmap/workflows/node-header";
import { NodeHeaderStatus } from "@/features/mindmap/workflows/node-header-status";
import { Separator } from "@radix-ui/react-separator";
import { Bot, PlusIcon, Trash } from "lucide-react";
import type { Model } from "openai-edge";
import { useCallback } from "react";

export type GenerateTextData = {
	status: "processing" | "error" | "success" | "idle" | undefined;
	config: {
		model: Model;
	};
	dynamicHandles: {
		tools: {
			id: string;
			name: string;
			description?: string;
		}[];
	};
};

export type GenerateTextNode = Node<GenerateTextData, "generate-text">;

interface GenerateTextNodeProps extends NodeProps<GenerateTextNode> {
	disableModelSelector?: boolean;
	onModelChange: (model: Model) => void;
	onCreateTool: (name: string, description?: string) => boolean;
	onRemoveTool: (handleId: string) => void;
	onUpdateTool: (
		toolId: string,
		newName: string,
		newDescription?: string,
	) => boolean;
	onDeleteNode: () => void;
}

export function GenerateTextNode({
	id,
	selected,
	deletable,
	disableModelSelector,
	data,
	onModelChange,
	onCreateTool,
	onRemoveTool,
	onUpdateTool,
	onDeleteNode,
}: GenerateTextNodeProps) {
	const updateNodeInternals = useUpdateNodeInternals();

	const handleModelChange = useCallback(
		(value: string) => {
			onModelChange?.(value as Model);
		},
		[onModelChange],
	);

	const handleCreateTool = useCallback(
		(name: string, description?: string) => {
			if (!onCreateTool) {
				return false;
			}
			const result = onCreateTool(name, description);
			if (result) {
				updateNodeInternals(id);
			}
			return result;
		},
		[onCreateTool, id, updateNodeInternals],
	);

	const removeHandle = useCallback(
		(handleId: string) => {
			onRemoveTool?.(handleId);
			updateNodeInternals(id);
		},
		[onRemoveTool, id, updateNodeInternals],
	);

	return (
		<BaseNode
			selected={selected}
			className={cn("w-[350px] p-0 hover:ring-orange-500", {
				"border-orange-500": data.status === "processing",
				"border-red-500": data.status === "error",
			})}
		>
			<NodeHeader className="m-0">
				<NodeHeaderIcon>
					<Bot />
				</NodeHeaderIcon>
				<NodeHeaderTitle>Generate Text</NodeHeaderTitle>
				<NodeHeaderActions>
					<NodeHeaderStatus status={data.status} />
					{deletable && (
						<NodeHeaderAction
							onClick={onDeleteNode}
							variant="ghost"
							label="Delete node"
						>
							<Trash />
						</NodeHeaderAction>
					)}
				</NodeHeaderActions>
			</NodeHeader>
			<Separator />
			<div className="p-4 flex flex-col gap-4">
				<ModelSelector
					value={data.config.model}
					onChange={handleModelChange}
					disabled={disableModelSelector}
					disabledModels={[
						"gpt-4o",
						"gpt-4o-mini",
						"deepseek-r1-distill-llama-70b",
					]}
				/>
			</div>
			<div className="grid grid-cols-[2fr,1fr] gap-2 pt-2 text-sm">
				<div className="flex flex-col gap-2 min-w-0">
					<LabeledHandle
						id="system"
						title="System"
						type="target"
						position={Position.Left}
					/>
					<LabeledHandle
						id="prompt"
						title="Prompt"
						type="target"
						position={Position.Left}
						className="col-span-2"
					/>
				</div>
				<div className="justify-self-end">
					<LabeledHandle
						id="result"
						title="Result"
						type="source"
						position={Position.Right}
					/>
				</div>
			</div>
			<div className="border-t border-gray-200 mt-2 dark:border-gray-800">
				<div>
					<div className="flex items-center justify-between py-2 px-4 bg-gray-100 dark:bg-gray-800">
						<span className="text-sm font-medium">Tool outputs</span>
						<EditableHandleDialog
							variant="create"
							onSave={handleCreateTool}
							align="end"
							showDescription
						>
							<Button variant="outline" size="sm" className="h-7 px-2">
								<PlusIcon className="h-4 w-4 mr-1" />
								New tool output
							</Button>
						</EditableHandleDialog>
					</div>
					<div className="flex flex-col">
						{data.dynamicHandles.tools.map((tool) => (
							<EditableHandle
								key={tool.id}
								nodeId={id}
								handleId={tool.id}
								name={tool.name}
								description={tool.description}
								type="source"
								position={Position.Right}
								wrapperClassName="w-full"
								onUpdateTool={onUpdateTool}
								onDelete={removeHandle}
								showDescription
							/>
						))}
					</div>
				</div>
			</div>
		</BaseNode>
	);
}
