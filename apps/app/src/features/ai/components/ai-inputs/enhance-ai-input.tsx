"use client"


import { Command } from "cmdk"
import { AnimatePresence, motion } from "framer-motion"

import { AddIcon, AiStarIcon, ConnectionsIcon, FlyingSaucerIcon, OracleIcon, PlusIcon, ThinTwinklyStar } from "@/components/icons"
import { OracleInput, ToggleButton } from "@/features/ai/components/ai-inputs/oracle-input"
import { Cross1Icon, FileIcon as File, LightningBoltIcon } from "@radix-ui/react-icons"

import { MagicWandIcon } from "@/components/icons"
import { capitalize, ICON_GREEN } from "@/utils"
import { Brain, SearchIcon } from "lucide-react"
import { useCallback, useRef, useState } from "react"
import { TextShimmer } from "@/components/animated/text-effect"



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
      description: "Start a conversation with our Disclosure Agent",
      icon: () => <LightningBoltIcon stroke={ICON_GREEN} />,
      prefix: "/chat",
    },
    {
      id: "Search",
      label: "Search",
      description: "Search existing records across our database, curated and validated web resources and our own AI knowledge base",
      icon: () => <SearchIcon stroke={ICON_GREEN} />,
      prefix: "/search",
    },
    {
      id: "Add",
      label: "Add",
      description: "Add a new item to the mind map",
      icon: () => <AddIcon stroke={ICON_GREEN} />,
      prefix: "/add",
    },
    {
      id: "Connect",
      label: "Connect",
      description: "Connect to a database",
      icon: () => <ThinTwinklyStar stroke={ICON_GREEN} />,
      prefix: "/connect",
    },
    {
      id: "analyze",
      label: "Analyze",
      description: "Analyze the existing records on your mind map and generate new insights",
      icon: () => <MagicWandIcon stroke={ICON_GREEN} />,
      prefix: "/analyze",
    },
  ]

  return (
    <div className="p-4 flex flex-col w-[500px]">

      <div className="relative w-full h-auto overflow-hidden">
        {/* <div className="border-b border-black/10 dark:border-white/10"> */}
        <div className="flex flex-col justify-between items-center px-4 py-2 text-sm text-zinc-600 dark:text-zinc-400">
          <div className="relative w-full z-50" ref={menuRef} >
            <div className="flex w-full justify-between items-center content-center px-2">

              <motion.button
                onClick={toggleModelMenu}
                className="flex items-center gap-2 group relative z-50"
              >

                <div className="cursor-pointer hover:shadow-sm hover:shadow-indigo-500/50 flex hover:ring-indigo-500/50 relative w-fit gap-3\1 rounded-xl align-center items-center content-center px-2 py-1 text-xs ring-1 ring-neutral-200 duration-200 ring-neutral-700 bg-neutral-950 bg-gradient-to-b from-black/90">
                  <AiStarIcon className='w-4 h-4 mr-2' stroke={ICON_GREEN} />
                  <TextShimmer as="span" className="inline-block mr-2">Oracle {state?.selectedModel && `| ${capitalize( state?.selectedModel )}`} </TextShimmer>
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
                          <div className="flex items-center justify-start gap-2 flex-1">
                            {model.icon}
                            <span className="capitalize">{model.name}</span>
                          </div>
                          <span className="text-xs text-zinc-500 dark:text-zinc-400 capitalize">
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
        isOpen={isOpen}
        loadModelData={handleLoadingModelData}

      />

      <AnimatePresence>
        {isOpen && !activeCommand && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0, }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.15 }}
            className="absolute bottom-0 left-0 w-full h-auto z-40 flex justify-center items-center"
          >
            <div className="rounded-lg shadow-lg w-[444px] h-[400px] mt-2 rounded-lg border border-neutral-700/30 text-neutral-500 bg-black bg-gradient-to-b from-black relative rounded-tl-lg rounded-tr-lg ">


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
                      {command.icon()}
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


    </div >



  )
}

