"use client"


import { Command } from "cmdk"
import { AnimatePresence, motion } from "framer-motion"

import { AiStarIcon, FlyingSaucerIcon } from "@/components/icons"
import { OracleInput, ToggleButton } from "@/features/ai/components/ai-inputs/oracle-input"
import { Cross1Icon, FileIcon as File, LightningBoltIcon } from "@radix-ui/react-icons"

import { MagicWandIcon } from "@/components/icons"
import { capitalize, ICON_GREEN } from "@/utils"
import { Brain } from "lucide-react"
import { useCallback, useRef, useState } from "react"



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
      <Cross1Icon className="w-3 h-3 dark:text-white" />
    </button>
  </div>
)

export function EnhanceAIInput( { modelActions, addDataToMindMap }: any ) {
  const menuRef = useRef<HTMLDivElement>( null )
  const [isOpen, setIsOpen] = useState( false )
  const [activeCommand, setActiveCommand] = useState<string | null>( null )
  const inputRef = useRef<HTMLInputElement>( null )
  const containerRef = useRef<HTMLDivElement>( null )
  const [inputValue, setInputValue] = useState( "" )

  const [state, setState] = useState( {

    selectedModel: null,
    isModelMenuOpen: false,
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


  // const handleKeyDown = ( e: React.KeyboardEvent<HTMLTextAreaElement> ) => {
  //   if ( e.key === "Enter" && !e.shiftKey ) {
  //     e.preventDefault()
  // updateState( { value: "" } )
  // adjustHeight( true )
  //   }
  // }

  const handleKeyDown = useCallback(
    ( e: React.KeyboardEvent ) => {
      if ( e.key === "Enter" && !e.shiftKey ) {
        e.preventDefault()

        // adjustHeight( true )
        // handleButtonClick()
      }

      if ( e.key === "Backspace" && inputValue === "" || e.key === "Backspace" && inputValue === " " ) {
        setActiveCommand( null )

        setIsOpen( false )
      }
      if ( e.key === "/" ) {
        setIsOpen( true )
      }
    },
    [activeCommand, inputValue]
  )

  const handleCommandSelect = ( commandId: string ) => {
    const command = COMMANDS.find( ( cmd ) => cmd.id === commandId )
    if ( command ) {
      setInputValue( "" )
      setActiveCommand( commandId )
      setIsOpen( false )

    }
  }

  // useEffect( () => {
  //   if ( inputValue )
  // }, [activeModel] )


  const handleLoadingModelData = () => {
    console.log( "loading model data" )

    addDataToMindMap( state.selectedModel )



  }

  const COMMANDS = [
    {
      id: "chat",
      label: "Chat",
      description: "Start a conversation",
      icon: FlyingSaucerIcon,
      prefix: "/chat",
    },
    {
      id: "generate",
      label: "Generate",
      description: "Generate code or content",
      icon: MagicWandIcon,
      prefix: "/generate",
    },
    {
      id: "analyze",
      label: "Analyze",
      description: "Analyze code or text",
      icon: LightningBoltIcon,
      prefix: "/analyze",
    },
  ]

  return (
    <div className="p-4 flex flex-col w-[500px]">

      <div className="relative w-full overflow-hidden">
        {/* <div className="border-b border-black/10 dark:border-white/10"> */}
        <div className="flex flex-col justify-between items-center px-4 py-2 text-sm text-zinc-600 dark:text-zinc-400">
          <div className="relative w-full z-50" ref={menuRef} >
            <div className="flex w-full justify-between items-center content-center px-2">

              <motion.button
                onClick={toggleModelMenu}
                className="flex items-center gap-2 group relative z-50"
              >

                <div className="cursor-pointer hover:shadow-sm hover:shadow-indigo-500/50 hover:ring-indigo-500/50 group/tab mb-1 relative flex w-fit items-center gap-3\1 rounded-xl  px-2 py-1 text-xs ring-1 ring-neutral-200 duration-200 ring-neutral-700 bg-neutral-950 bg-gradient-to-b from-black/90">
                  <AiStarIcon className='w-5 h-5' fill={ICON_GREEN} />
                  <span className="text-white text-sm font-sm">Oracle {state.selectedModel && `| ${capitalize( state.selectedModel )}`} </span>
                </div>


              </motion.button>

              <ToggleButton
                icon={<Brain className="w-4 h-4" />}
                label="Memory"
              />

            </div>

            <motion.div
              ref={menuRef}
              className="rounded-xl relative flex gap-2 items-center relative w-full duration-200 text-neutral-500 willChange gpu-transform text-neutral-500 bg-neutral-950 bg-gradient-to-b from-black/90"

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
                            updateState( { selectedModel: model.name.toLowerCase(), isModelMenuOpen: false } )
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

          </div>

        </div>
      </div>


      <OracleInput
        activeModel={state.selectedModel}
        activeCommand={activeCommand}
        inputValue={inputValue}
        setInputValue={setInputValue}
        handleKeyDown={handleKeyDown}
        setIsOpen={setIsOpen}
        loadModelData={handleLoadingModelData}

      />

      <AnimatePresence>
        {isOpen && !activeCommand && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0, }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.15 }}
            className="absolute bottom-[34px] left-0 h-[300px] left-0 w-full z-40 flex justify-center items-center"
          >
            <div className="rounded-lg shadow-lg w-[444px] mt-2 rounded-lg shadow-lg h-full border border-neutral-700/30 text-neutral-500 bg-black bg-gradient-to-b from-black">


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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* </motion.div> */}



      {/* </div> */}

    </div >

    // </div>

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