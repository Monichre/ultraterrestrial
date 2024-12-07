"use client"


import { AddIcon, DotIcon, OracleIcon, SlashIcon } from "@/components/icons"
import { cn } from "@/utils/cn"
import { ICON_GREEN } from "@/utils/constants"
import { Brain } from "lucide-react"
import { useCallback } from "react"


interface OracleInputProps {
  containerRef: any
  activeCommand: string | null
  inputValue: string
  setInputValue: ( value: string ) => void
  handleKeyDown: ( e: KeyboardEvent ) => void
  setIsOpen: ( isOpen: boolean ) => void
  inputRef: any
}
export function ToggleButton( { icon, label, isActive, onClick, useMemory }: any ) {
  return (
    <button
      type="button"
      onClick={onClick}
    >

      <div className="flex items-center text-sm cursor-pointer hover:shadow-sm hover:shadow-indigo-500/50 hover:ring-indigo-500/50 group/tab mb-1 relative flex w-fit items-center gap-3 rounded-xl  px-2 py-1 text-xs ring-1 ring-neutral-200 duration-200 bg-neutral-800 ring-neutral-700 bg-neutral-950 bg-gradient-to-b from-black/90">
        <Brain
          stroke={ICON_GREEN}
          className={cn(
            "w-4 h-4",
            useMemory
              ? "text-[#00d5ff]"
              : "text-black/40 dark:text-white/40"
          )}
        />

        <div
          className={cn(
            "relative inline-flex h-4 w-8 items-center rounded-full transition-colors",
            useMemory
              ? "bg-[#00d5ff]"
              : "bg-black/20 dark:bg-white/20"
          )}
        >
          <div
            className={cn(
              "absolute h-3 w-3 transform rounded-full bg-white transition-transform shadow-sm",
              useMemory
                ? "translate-x-4"
                : "translate-x-1"
            )}
          />

        </div>


      </div>
    </button>
  )
}
export const OracleInput = ( {
  activeModel,
  activeCommand,
  inputValue,
  setInputValue,
  handleKeyDown,
  setIsOpen,

  loadModelData

}: any ) => {


  const handleInputFocus = () => {
    setIsOpen( !!activeCommand )
  }
  const handleChange = ( e: React.ChangeEvent<HTMLInputElement> ) => {
    setInputValue( e.target.value )

  }
  const handleLoadingModelData = useCallback( () => {

    loadModelData( activeModel )
  }, [activeModel, loadModelData] )

  console.log( "🚀 ~ file: oracle-input.tsx:85 ~ handleLoadingModelData ~ activeModel:", activeModel )

  return (
    <>
      <div className="relative flex items-center flex-wrap gap-2 px-3 h-auto min-h-[48px] z-50">

        {activeCommand && (
          <div className="flex items-center gap-2 text-sm bg-black/10 dark:bg-white/10 px-2 py-1 rounded-md">
            <span className="flex items-center gap-1.5 flex-shrink-0">

              <DotIcon className="w-4 h-4 text-black/50 dark:text-white/50" />
              <span className="text-black/70 dark:text-white/70">

                {activeCommand}
              </span>
            </span>
          </div>
        )}

        {/* Input Container */}
        <div
          className="rounded-xl border border-transparent flex gap-2 items-center relative w-full p-2 px-2.5 duration-200 border border-white/30 border-neutral-700/30 text-neutral-500 bg-neutral-950 bg-gradient-to-b from-black/90"
          style={{
            borderRadius: 25,
            padding: '12px 16px',
          }}
        >
          {/* Input Section */}
          <div className="flex items-center gap-1 justify-start w-full">

            <div className="w-6 h-6 rounded-full flex items-center justify-center">



              <SlashIcon className="h-6 w-6" fill={ICON_GREEN} />



              {/* {activeModel} */}
            </div>


            <input
              type="text"

              value={inputValue}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              // onFocus={() => setIsOpen( !!activeCommand )}
              placeholder={activeCommand ? "Type your message..." : "Type / for commands..."}
              className="bg-transparent text-zinc-200 text-sm focus:outline-none flex-1"
            />

            <div className="w-6 h-6 rounded-full flex items-center justify-center ml-auto" onClick={handleLoadingModelData}>
              {activeModel ? <AddIcon className="h-6 w-6" fill={ICON_GREEN} /> : <OracleIcon className="h-6 w-6" fill={ICON_GREEN} />}
            </div>

          </div>
        </div>
      </div>

    </>
  )
} 