import React, { memo, useEffect, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import classNames from 'classnames';
import { useFlowStore } from '../../hooks/useFlowStore'; // Adjust the path based on your project structure
import { useTranslation } from 'react-i18next';
import { useI18n } from '../../hooks/useI18n'; // Adjust the path based on your project structure
import CommandMenu from './CommandMenu'; // Ensure these components are created accordingly
import ModelMenu from './ModelMenu';
import ChatModeMenu from './ChatModeMenu';

const ToolBarMenu = memo(function ToolBarMenu({
    className,
    focusedIndex,
    clearFocusedIndex,
    handleCommandOption,
    currentMenu,
    touchableCommandList,
    touchableModelList,
    handleModelOption,
    handleChatModeOption,
    chatModeList
}) {
    const models = useFlowStore(state => state.models);
    const { t: translate } = useTranslation();
    const { t: i18nTranslate } = useI18n({
        ns: "command-menu",
        source: {
            en: { no_available_commands: "No available commands in this mode" },
            es: { no_available_commands: "No hay comandos disponibles en este modo" },
            jp: { no_available_commands: "このモードには利用可能なコマンドがありません" },
            zh: { no_available_commands: "此模式下无可用指令" },
            tw: { no_available_commands: "此模式下無可用指令" }
        }
    });

    const { chatMode, resetComparisonModels } = useFlowStore(state => ({
        chatMode: state.chatMode,
        resetComparisonModels: state.resetComparisonModels
    }));

    const isComparisonMode = chatMode === 'comparison';
    const commands = useMemo(() => (true /* replace with actual user check */ ? touchableCommandList : ['Vs.quote_node']), [/* dependencies */]);

    useEffect(() => {
        if (chatMode !== 'comparison') {
            resetComparisonModels();
        }
    }, [chatMode, resetComparisonModels]);

    const handleClick = (event) => {
        event.stopPropagation();
        const dataType = event.target.getAttribute("datatype");
        const dataValue = event.target.getAttribute("data-value");
        if (dataType) {
            switch (dataType) {
                case "command":
                    handleCommandOption(dataValue);
                    break;
                case "model":
                    if (isComparisonMode) return;
                    handleModelOption(dataValue);
                    break;
                case "chatMode":
                    handleChatModeOption(dataValue);
                    break;
                default:
                    break;
            }
        }
    };

    return (
        <motion.div
            onHoverStart={(e) => { e.stopPropagation(); clearFocusedIndex(); }}
            onHoverEnd={(e) => { e.stopPropagation(); clearFocusedIndex(); }}
            onClick={handleClick}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1, transition: { type: "spring", duration: 0.4 } }}
            exit={{ height: 0, opacity: 0, transition: { duration: 0.2 } }}
            className={classNames(
                "relative overflow-hidden w-full rounded-t-5/2xl border border-b-0 border-neutral-200 bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-800",
                className
            )}
        >
            <AnimatePresence mode="popLayout" initial={false}>
                {currentMenu === "command" && (
                    <motion.div
                        initial={{ x: -500 }}
                        animate={{ x: 0 }}
                        exit={{ x: -500 }}
                        transition={{ ease: "easeInOut" }}
                    >
                        <CommandMenu
                            commands={commands}
                            focusedIndex={focusedIndex}
                            translate={i18nTranslate}
                        />
                        {commands.length === 0 && (
                            <div className="py-4 text-center text-xs opacity-60">
                                {i18nTranslate("no_available_commands")}
                            </div>
                        )}
                    </motion.div>
                )}
                {currentMenu === "model" && (
                    <motion.div
                        initial={{ x: 500 }}
                        animate={{ x: 0 }}
                        exit={{ x: 500 }}
                        transition={{ ease: "easeInOut" }}
                        className="flex flex-col items-stretch"
                    >
                        <div className="relative flex select-none items-center justify-between border-neutral-500/10 p-4 py-2 dark:border-neutral-500/50">
                            <div className="grow text-center">
                                <p className="font-medium text-neutral-800 dark:text-neutral-200">
                                    {isComparisonMode ? "Select Models for Comparison" : "Switch AI Model"}
                                </p>
                            </div>
                            {isComparisonMode && (
                                <div className="shrink-0">
                                    <ModelMenu touchableModelList={touchableModelList} />
                                </div>
                            )}
                        </div>
                        <div className={classNames("flex flex-col items-stretch", chatMode === 'plugin' && currentMenu === "model" && "mark-scroll-bar max-h-72 overflow-y-auto")}>
                            {touchableModelList.map((model, index) => (
                                <ModelOption
                                    key={model}
                                    model={model}
                                    isFocused={index === focusedIndex}
                                    index={index}
                                    isFirstOfTier={chatMode === 'plugin' ? index === 0 : index === 0 || models[touchableModelList[index - 1]].tier !== models[model].tier}
                                />
                            ))}
                        </div>
                    </motion.div>
                )}
                {currentMenu === "chatMode" && (
                    <motion.div
                        initial={{ x: -500 }}
                        animate={{ x: 0 }}
                        exit={{ x: -500 }}
                        transition={{ ease: "easeInOut" }}
                        className="flex flex-col items-stretch"
                    >
                        <div className="relative flex select-none items-center justify-center border-neutral-500/10 p-4 py-2 dark:border-neutral-500/50">
                            <p className="font-medium text-neutral-800 dark:text-neutral-200">
                                {translate("switch_chat_mode")}
                            </p>
                        </div>
                        <ChatModeMenu
                            chatModeList={chatModeList}
                            focusedIndex={focusedIndex}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
});

