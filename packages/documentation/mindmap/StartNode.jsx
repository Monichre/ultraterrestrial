import React, { memo, useEffect, useRef } from 'react';
import { Tooltip } from '@material-ui/core'; // Adjust the import based on your Tooltip library
import { LuGitBranchPlus } from 'react-icons/lu'; // Adjust the import based on your icon library
import { FloRing, Handle, Position } from 'react-flow-renderer'; // Adjust the import based on your flow library
import { useFlowStore } from '../../hooks/useFlowStore'; // Adjust the path based on your project structure
import { useTranslation } from 'react-i18next';
import { useI18n } from '../../hooks/useI18n'; // Adjust the path based on your project structure
import classNames from 'classnames';

const NEW_BRANCH_TIMEOUT = 3000;

const StartNode = memo(function StartNode() {
    const [globalStatus, selectedNodeId, textCursorPosition, isView, aboutToDeleteNodes] = useFlowStore(store => [
        store.globalStatus,
        store.selectedNodeId,
        store.textCursorPosition,
        store.isView,
        store.aboutToDeleteNodes
    ]);

    const hasInitializedRef = useRef(false);
    const isCreatingNewBranch = !selectedNodeId;
    const { t: translate } = useTranslation();
    const { t: i18nTranslate } = useI18n({
        source: {
            en: { newBranchTooltip: "New Branch +" },
            zh: { newBranchTooltip: "新分支 +" },
            tw: { newBranchTooltip: "新分支 +" },
            jp: { newBranchTooltip: "新しいブランチ +" }
        },
        ns: "startNode"
    });

    useEffect(() => {
        const hasInitialized = hasInitializedRef.current;
        hasInitializedRef.current = true;

        if (!isView && hasInitialized && isCreatingNewBranch && (aboutToDeleteNodes.length === 0)) {
            Jt.message(translate("new_branch.title"), {
                description: translate("new_branch.desc"),
                duration: NEW_BRANCH_TIMEOUT
            });
        }
    }, [aboutToDeleteNodes.length, isCreatingNewBranch, isView, translate]);

    return (
        <div className={classNames(globalStatus && "pointer-events-none opacity-50", "relative")}>
            <Tooltip
                title={i18nTranslate("newBranchTooltip")}
                enterDelay={300}
            >
                <button
                    className={classNames(
                        isCreatingNewBranch
                            ? "ring-8 ring-indigo-500/20 dark:ring-indigo-500/40"
                            : "ring ring-neutral-200/50 hover:ring-indigo-500/20 dark:ring-neutral-600/30 dark:hover:ring-indigo-500/40",
                        "group flex items-center justify-center rounded-full bg-neutral-50 p-2 duration-500 hover:scale-105 dark:bg-neutral-800"
                    )}
                >
                    <p className="text-3xl">
                        <LuGitBranchPlus
                            className={classNames("text-lg group-hover:hidden", isCreatingNewBranch && "text-indigo-700 dark:text-indigo-400")}
                        />
                        <LuGitBranchPlus
                            className="hidden text-indigo-800 text-xl group-hover:block dark:text-indigo-500"
                        />
                    </p>
                </button>
            </Tooltip>
            {isCreatingNewBranch && selectedNodeId === 0 && (
                <FloRing
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)"
                    }}
                    className="scale-140"
                />
            )}
            <Handle
                id="out"
                type="source"
                position={Position.Bottom}
                className="invisible pointer-events-none"
            />
        </div>
    );
});

export default StartNode;