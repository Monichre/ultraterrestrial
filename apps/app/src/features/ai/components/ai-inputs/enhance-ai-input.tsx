"use client"


import { MyFavoriteStarIllustration } from "@/components/icons/icons"
import { useAutoResizeTextarea, useClickOutside } from "@/hooks"
import { Command } from "cmdk"
import { AnimatePresence, motion } from "framer-motion"
import {
  Brain,
  File,
  MessageSquare,
  Search,
  Settings,
  Wand2,
  X
} from "lucide-react"
import { useCallback, useRef, useState } from "react"

const AI_MODELS = [
  { name: "GPT-4", description: "The popular kid" },
  { name: "GPT-3.5", description: "Time flies, he is old now..." },
  { name: "Claude", description: "Yes, the best for coding" },
].map( ( model ) => ( { ...model, icon: <Brain className="w-4 h-4" /> } ) )

const MIN_HEIGHT = 40

const FileDisplay = ( {
  fileName,
  onClear,
}: {
  fileName: string
  onClear: () => void
} ) => (
  <div className="flex items-center gap-2 bg-black/5 dark:bg-white/5 w-fit px-3 py-1 rounded-lg">
    <File className="w-4 h-4 dark:text-white" />
    <span className="text-sm dark:text-white">{fileName}</span>
    <button
      type="button"
      onClick={onClear}
      className="ml-1 p-0.5 rounded-full hover:bg-black/10 dark:hover:bg-white/10"
    >
      <X className="w-3 h-3 dark:text-white" />
    </button>
  </div>
)

export function EnhanceAIInput( { modelActions, modelActionMap, activeModel, setActiveModel, isExpanded, setIsExpanded }: { modelActions: any, modelActionMap: any, activeModel: string, setActiveModel: ( activeModel: string ) => void, isExpanded: boolean, setIsExpanded: ( isExpanded: boolean ) => void } ) {
  const menuRef = useRef<HTMLDivElement>( null )
  const [isOpen, setIsOpen] = useState( isExpanded )
  const [activeCommand, setActiveCommand] = useState<string | null>( null )
  const inputRef = useRef<HTMLInputElement>( null )
  const containerRef = useRef<HTMLDivElement>( null )
  const [inputValue, setInputValue] = useState( "" )

  const [state, setState] = useState( {
    value: "",
    fileName: "",
    isPrivacyMode: false,
    selectedModel: activeModel,
    isMenuOpen: false,
    isModelMenuOpen: false,
  } )

  const { textareaRef, adjustHeight } = useAutoResizeTextarea( {
    minHeight: MIN_HEIGHT,
    maxHeight: 200,
  } )

  const updateState = useCallback(
    ( updates: Partial<typeof state> ) =>
      setState( ( prev ) => ( { ...prev, ...updates } ) ),
    []
  )

  const toggleModelMenu = () => {
    updateState( { isModelMenuOpen: !state.isModelMenuOpen } )
    // updateState( { isMenuOpen: true } )
  }

  useClickOutside( menuRef, () => {
    if ( state.isMenuOpen ) updateState( { isMenuOpen: false } )
    if ( state.isModelMenuOpen ) updateState( { isModelMenuOpen: false } )
  } )

  // const handleKeyDown = ( e: React.KeyboardEvent<HTMLTextAreaElement> ) => {
  //   if ( e.key === "Enter" && !e.shiftKey ) {
  //     e.preventDefault()
  // updateState( { value: "" } )
  // adjustHeight( true )
  //   }
  // }
  const handleButtonClick = () => {
    if ( !inputValue.trim() && !activeCommand ) return
    setInputValue( "" )
    setIsOpen( false )
    setActiveCommand( null )
  }

  const handleKeyDown = useCallback(
    ( e: React.KeyboardEvent ) => {
      if ( e.key === "Enter" && !e.shiftKey ) {
        e.preventDefault()

        adjustHeight( true )
        handleButtonClick()
      }

      if ( e.key === "Backspace" && inputValue === "" && activeCommand ) {
        setActiveCommand( null )
      }
      if ( e.key === "/" ) {
        setIsOpen( true )
      }
    },
    [activeCommand, inputValue, handleButtonClick]
  )

  const handleCommandSelect = ( commandId: string ) => {
    const command = COMMANDS.find( ( cmd ) => cmd.id === commandId )
    if ( command ) {
      setInputValue( "" )
      setActiveCommand( commandId )
      setIsOpen( false )
      inputRef.current?.focus()
    }
  }



  const COMMANDS = [
    {
      id: "chat",
      label: "Chat",
      description: "Start a conversation",
      icon: MessageSquare,
      prefix: "/chat",
    },
    {
      id: "generate",
      label: "Generate",
      description: "Generate code or content",
      icon: Wand2,
      prefix: "/generate",
    },
    {
      id: "analyze",
      label: "Analyze",
      description: "Analyze code or text",
      icon: Search,
      prefix: "/analyze",
    },
  ]

  return (
    <div className="p-4 flex flex-col w-[500px]">

      <div className="relative w-full h-full overflow-hidden rounded-2xl">
        {/* <div className="border-b border-black/10 dark:border-white/10"> */}
        <div className="flex justify-between items-center px-4 py-2 text-sm text-zinc-600 dark:text-zinc-400">
          <div className="relative w-full" ref={menuRef} >
            <motion.button
              onClick={toggleModelMenu
              }
              className="flex items-center gap-2 group"
            >
              <div className="cursor-pointer hover:shadow-sm hover:shadow-indigo-500/50 hover:ring-indigo-500/50 group/tab mb-1 relative flex w-fit items-center gap-3 rounded-xl  px-2 py-1 text-xs ring-1 ring-neutral-200 duration-200 bg-neutral-800 ring-neutral-700 bg-neutral-950 bg-gradient-to-b from-black/90">
                <Settings className="w-3.5 h-3.5" />
                <span className="text-sm font-medium">Oracle Mode: {state.selectedModel}</span>
              </div>

            </motion.button>

            <motion.div
              ref={menuRef}
              className="rounded-xl relative flex gap-2 items-center relative w-full duration-200 text-neutral-500 bg-neutral-950 bg-gradient-to-b from-black/90 willChange gpu-transform border border-neutral-700/30 text-neutral-500 bg-neutral-950 bg-gradient-to-b from-black/90"

              initial={{
                height: 0,
              }}
              animate={{

                height: state.isModelMenuOpen ? 250 : '0',
              }}
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 30,
                // duration: 0.2,
                staggerChildren: 0.1,
                delayChildren: 0.2,
              }}

            >
              <AnimatePresence >

                {state.isModelMenuOpen && (
                  <motion.div
                    key="model-menu"
                    // className="h-full w-full"
                    // className="absolute top-0 left-0 mt-1 w-64 bg-white dark:bg-zinc-800 rounded-md shadow-lg py-1 z-50 border border-black/10 dark:border-white/10"
                    className="pb-0 flex flex-col h-full items-end rounded-xl justify-evenly absolute w-full text-neutral-500 bg-neutral-950 bg-gradient-to-b from-black/90"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  // exit={{ opacity: 0, y: 20 }}

                  >

                    {modelActions.map( ( model, index ) => (
                      <motion.div className="w-full shrink-0 px-2"
                        key={model.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                      // exit={{ opacity: 0, y: 20 }}
                      >
                        <button
                          type="button"
                          key={model.name}
                          className="w-full px-3 py-1.5 text-left hover:bg-black/5 dark:hover:bg-white/5 flex items-center gap-2 text-sm transition-colors dark:text-white"
                          onClick={() =>
                            updateState( { selectedModel: model.name, isModelMenuOpen: false } )
                          }
                        >
                          <div className="flex items-center gap-2 flex-1">
                            {model.icon}
                            <span>{model.name}</span>
                          </div>
                          <span className="text-xs text-zinc-500 dark:text-zinc-400">
                            {model.description}
                          </span>
                        </button>
                      </motion.div>
                    ) )}
                  </motion.div>


                )}
              </AnimatePresence>
            </motion.div>



            {/* </div> */}


          </div>
        </div>



        <div className="relative" ref={containerRef}>



          <div className="flex items-center flex-wrap gap-2 px-3 h-auto min-h-[48px] py-2">
            {activeCommand &&
              ( () => {
                const activeCmd = COMMANDS.find(
                  ( cmd ) => cmd.id === activeCommand
                )
                if ( !activeCmd ) return null

                return (
                  <div className="flex items-center gap-2 text-sm bg-black/10 dark:bg-white/10 px-2 py-1 rounded-md">
                    <span className="flex items-center gap-1.5 flex-shrink-0">
                      <activeCmd.icon className="w-4 h-4 text-black/50 dark:text-white/50" />
                      <span className="text-black/70 dark:text-white/70">
                        {activeCmd.label}
                      </span>
                    </span>
                  </div>
                )
              } )()}
            <div className="rounded-xl border border-transparent flex gap-2 items-center relative w-full p-2 px-2.5 duration-200 border border-white/30 border-neutral-700/30 text-neutral-500 bg-neutral-950 bg-gradient-to-b from-black/90" style={{
              borderRadius: 25,
              padding: '12px 16px',
            }}>

              <div className=" flex items-center gap-2 flex items-center justify-center">
                <div className="w-6 h-6 rounded-full  flex items-center justify-center">
                  <MyFavoriteStarIllustration />
                </div>
                <input
                  type="text"
                  ref={inputRef}

                  value={inputValue}
                  onChange={( e ) => setInputValue( e.target.value )}
                  onKeyDown={handleKeyDown}
                  onFocus={() => setIsOpen( !!activeCommand )}
                  placeholder={
                    activeCommand
                      ? "Type your message..."
                      : "Type / for commands..."
                  }
                  className="bg-transparent text-zinc-200 text-sm focus:outline-none flex-1"

                />
              </div>
            </div>




          </div>
        </div>

        <AnimatePresence>
          {isOpen && !activeCommand && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.15 }}
              className="absolute w-full mt-2 rounded-lg bg-black/5 dark:bg-white/5 shadow-lg "
            >
              <Command className="w-full">
                <Command.List className="py-2">
                  {COMMANDS.map( ( command ) => (
                    <Command.Item
                      key={command.id}
                      onSelect={() =>
                        handleCommandSelect( command.id )
                      }
                      className="px-3 py-2.5 flex items-center gap-3 text-sm hover:bg-black/10 dark:hover:bg-white/10 cursor-pointer group"
                    >
                      <command.icon className="w-4 h-4 text-black/50 dark:text-white/50 group-hover:text-black/70 dark:group-hover:text-white/70" />
                      <div className="flex flex-col">
                        <span className="font-medium text-black/70 dark:text-white/70">
                          {command.label}
                        </span>
                        <span className="text-xs text-black/50 dark:text-white/50">
                          {command.description}
                        </span>
                      </div>
                      <span className="ml-auto text-xs text-black/30 dark:text-white/30">
                        {command.prefix}
                      </span>
                    </Command.Item>
                  ) )}
                </Command.List>
              </Command>
            </motion.div>
          )}
        </AnimatePresence>


      </div>

    </div>

  )
}


{/* <Textarea
                            id="ai-input-10"
                            ref={textareaRef}
                            value={state.value}
                            placeholder="Type your message..."
                            className={cn(
                                "w-full rounded-xl pl-14 pr-10 border-none resize-none bg-transparent dark:text-white placeholder:text-black/70 dark:placeholder:text-white/70",
                                `min-h-[${MIN_HEIGHT}px]`
                            )}
                            onKeyDown={handleKeyDown}
                            onChange={(e) => {
                                updateState({ value: e.target.value });
                                adjustHeight();
                            }}
                        />

                        <button
                            type="button"
                            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-xl bg-black/5 dark:bg-white/5 p-1"
                        >
                            <ArrowRight
                                className={cn(
                                    "w-4 h-4 dark:text-white",
                                    state.value ? "opacity-100" : "opacity-30"
                                )}
                            />
                        </button> */}