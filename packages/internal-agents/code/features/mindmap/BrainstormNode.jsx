import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Handle, Position } from 'react-flow-renderer'; // Adjust the import based on your flow library
import classNames from 'classnames';
import { useFlowStore } from '../../hooks/useFlowStore'; // Adjust the path based on your project structure
import FlowNodeTitle from '../FlowNodeTitle'; // Adjust the path based on your project structure
import NodeDiscuss from '../NodeDiscuss'; // Adjust the path based on your project structure
import { BaaS } from '../../services/BaaS'; // Adjust the path based on your project structure
import { FlowNodeTypeEnum } from '../../constants/FlowNodeTypes'; // Adjust the path based on your project structure
import MarkdownContent from '../MarkdownContent'; // Adjust the path based on your project structure
import ArrowRightIcon from 'react-icons/ai'; // Adjust the import based on your icon library
import DragHandleDots2Icon from 'react-icons/md'; // Adjust the import based on your icon library
import ExpandedButton from '../ExpandedButton'; // Adjust the path based on your project structure

const BrainstormNode = ({ id, data }) => {
    const { updateNode, selectedNodeId, globalStatus, focusedNodeId } = useFlowStore(store => ({
        updateNode: store.updateNode,
        selectedNodeId: store.selectedNodeId,
        globalStatus: store.globalStatus,
        focusedNodeId: store.focusedNodeId
    }));
    const isSelected = selectedNodeId === id;
    const [isEditing, setIsEditing] = useState(false);
    const valueRef = useRef(null);

    useEffect(() => {
        if (!valueRef.current || data.value !== valueRef.current.value) {
            valueRef.current.value = data.value;
        }
    }, [data.value]);

    const isAgentSettings = globalStatus?.status === "agentSettings" && globalStatus.anchorIds.includes(id);

    return (
        <>
            <FlowNodeTitle
                isNodeSelected={isSelected}
                isNodeFocused={focusedNodeId === id}
                title={data.title}
                type={FlowNodeTypeEnum.StormResponse}
                setTitle={(newTitle) => {
                    BaaS.flowNode.update({
                        id: id,
                        data: JSON.stringify({
                            ...data,
                            title: newTitle
                        })
                    });
                    updateNode(id, { title: newTitle });
                }}
            />
            {data?.comment && <NodeDiscuss id={id} comment={data.comment} />}
            <motion.div
                initial={{ rotate: 5, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 5, opacity: 0 }}
                className={classNames(
                    { "pointer-events-none": globalStatus },
                    { "nowheel nopan": isSelected && isEditing },
                    isSelected
                        ? "ring-indigo-500/20 dark:ring-indigo-500/40 ring-8"
                        : "ring ring-neutral-200/50 hover:ring-indigo-500/20 dark:hover:bg-neutral-800 dark:ring-neutral-600/30 dark:hover:ring-indigo-500/40",
                    "nodrag peer/wrap flex w-60 flex-col items-stretch gap-2 rounded-lg bg-white/80 p-3 text-black duration-500 dark:bg-neutral-900 dark:text-neutral-50 pt-10 pb-2"
                )}
            >
                <div className="prose cursor-text select-text resize-none font-inter text-sm dark:prose-invert focus:outline-none prose-pre:bg-[#1e1e1e]">
                    <MarkdownContent
                        id={id}
                        content={data.value.toString()}
                        className="mark-scroll-bar overflow-y-auto leading-6"
                    />
                </div>
            </motion.div>
            <div className="absolute -left-6 top-0 hidden cursor-move p-2 px-1 opacity-0 duration-200 hover:opacity-100 peer-hover/wrap:opacity-100 md:block">
                <DragHandleDots2Icon />
            </div>
            {isSelected && (
                <div className="pointer-events-none absolute left-0 top-0 w-full h-full"></div>
            )}
            {isAgentSettings && (
                <div className="absolute left-1/2 top-1/2 flex w-full h-full -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-xl bg-neutral-50/10">
                    <ArrowRightIcon className="text-yellow-800 text-5xl" />
                </div>
            )}
            <ExpandedButton
                haveToShow={isSelected}
                data={data}
                nodeId={id}
            />
            <Handle
                id="in"
                type="target"
                position={Position.Top}
                className="pointer-events-none invisible"
            />
            <Handle
                id="out"
                type="source"
                position={Position.Bottom}
                className="pointer-events-none invisible"
            />
        </>
    );
};

export default BrainstormNode;