'use client'

import React, {
  createContext,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react'
import { AnimatePresence, MotionConfig, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/utils'
import { useOutsideClick } from '@/hooks/useOutsideClick'

const CultButton = motion( Button )

const TRANSITION = {
  type: 'spring',
  bounce: 0.05,
  duration: 0.3,
}

interface CultUIPopoverContextType {
  isOpen: boolean
  openCultUIPopover: () => void
  closeCultUIPopover: () => void
  uniqueId: string
  note: string
  setNote: ( note: string ) => void
}

const CultUIPopoverContext = createContext<
  CultUIPopoverContextType | undefined
>( undefined )

function useCultUIPopover() {
  const context = useContext( CultUIPopoverContext )
  if ( !context ) {
    throw new Error(
      'useCultUIPopover must be used within a CultUIPopoverProvider'
    )
  }
  return context
}

function useCultUIPopoverLogic() {
  const uniqueId = useId()
  const [isOpen, setIsOpen] = useState( false )
  const [note, setNote] = useState( '' )

  const openCultUIPopover = () => setIsOpen( true )
  const closeCultUIPopover = () => {
    setIsOpen( false )
    setNote( '' )
  }

  return {
    isOpen,
    openCultUIPopover,
    closeCultUIPopover,
    uniqueId,
    note,
    setNote,
  }
}

interface CultUIPopoverRootProps {
  children: React.ReactNode
  className?: string
}

export function CultUIPopoverRoot( {
  children,
  className,
}: CultUIPopoverRootProps ) {
  const popoverLogic = useCultUIPopoverLogic()
  const ref: any = useRef()

  useOutsideClick( ref, () => {
    if ( popoverLogic?.isOpen ) {
      popoverLogic?.closeCultUIPopover()
    }
  } )

  return (
    <CultUIPopoverContext.Provider value={popoverLogic}>
      <MotionConfig transition={TRANSITION}>
        <div
          ref={ref}
          className={cn(
            'relative flex items-center justify-center isolate',
            className
          )}
        >
          {children}
        </div>
      </MotionConfig>
    </CultUIPopoverContext.Provider>
  )
}

interface CultUIPopoverTriggerProps {
  children: React.ReactNode
  className?: string
  variant?: string
}

export function CultUIPopoverTrigger( {
  children,
  className,
  variant,
}: CultUIPopoverTriggerProps ) {
  const { openCultUIPopover, uniqueId } = useCultUIPopover()

  return (
    <CultButton
      key='button'
      variant={variant}
      layoutId={`popover-${uniqueId}`}
      className={cn(
        'flex h-9 items-center border border-zinc-950/10 bg-white px-3 text-zinc-950 dark:border-zinc-50/10 dark:bg-zinc-700 dark:text-zinc-50',
        className
      )}
      style={{
        borderRadius: 8,
      }}
      onClick={openCultUIPopover}
    >
      <motion.span layoutId={`popover-label-${uniqueId}`} className='text-sm'>
        {children}
      </motion.span>
    </CultButton>
  )
}

interface CultUIPopoverContentProps {
  children: React.ReactNode
  className?: string
}

export function CultUIPopoverContent( {
  children,
  className,
}: CultUIPopoverContentProps ) {
  const { isOpen, closeCultUIPopover, uniqueId } = useCultUIPopover()
  const formContainerRef = useRef<HTMLDivElement>( null )

  useOutsideClick( formContainerRef, closeCultUIPopover )

  useEffect( () => {
    const handleKeyDown = ( event: KeyboardEvent ) => {
      if ( event.key === 'Escape' ) {
        closeCultUIPopover()
      }
    }

    document.addEventListener( 'keydown', handleKeyDown )

    return () => {
      document.removeEventListener( 'keydown', handleKeyDown )
    }
  }, [closeCultUIPopover] )

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={formContainerRef}
          layoutId={`popover-${uniqueId}`}
          className={cn(
            'absolute h-[200px] w-[364px] overflow-hidden border border-zinc-950/10 bg-white outline-none dark:bg-black z-50 r-0', // Changed z-90 to z-50
            className
          )}
          style={{
            borderRadius: 12,
            top: 'auto', // Remove any top positioning
            left: '100%', // Remove any left positioning
            transform: 'none', // Remove any transform
          }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

interface CultUIPopoverFormProps {
  children: React.ReactNode
  onSubmit?: ( note: string ) => void
  className?: string
}

export function CultUIPopoverForm( {
  children,
  onSubmit,
  className,
}: CultUIPopoverFormProps ) {
  const { note, closeCultUIPopover } = useCultUIPopover()

  const handleSubmit = ( e: React.FormEvent ) => {
    e.preventDefault()
    onSubmit?.( note )
    closeCultUIPopover()
  }

  return (
    <form
      className={cn( 'flex h-full flex-col', className )}
      onSubmit={handleSubmit}
    >
      {children}
    </form>
  )
}

interface CultUIPopoverLabelProps {
  children: React.ReactNode
  className?: string
}

export function CultUIPopoverLabel( {
  children,
  className,
}: CultUIPopoverLabelProps ) {
  const { uniqueId, note } = useCultUIPopover()

  return (
    <motion.span
      layoutId={`popover-label-${uniqueId}`}
      aria-hidden='true'
      style={{
        opacity: note ? 0 : 1,
      }}
      className={cn(
        'absolute left-4 top-3 select-none text-sm text-zinc-500 dark:text-zinc-400',
        className
      )}
    >
      {children}
    </motion.span>
  )
}

interface CultUIPopoverTextareaProps {
  className?: string
}

export function CultUIPopoverTextarea( {
  className,
}: CultUIPopoverTextareaProps ) {
  const { note, setNote } = useCultUIPopover()

  return (
    <textarea
      className={cn(
        'h-full w-full resize-none rounded-md bg-transparent px-4 py-3 text-sm outline-none',
        className
      )}
      autoFocus
      value={note}
      onChange={( e ) => setNote( e.target.value )}
    />
  )
}

interface CultUIPopoverFooterProps {
  children: React.ReactNode
  className?: string
}

export function CultUIPopoverFooter( {
  children,
  className,
}: CultUIPopoverFooterProps ) {
  return (
    <div
      key='close'
      className={cn( 'flex justify-between px-4 py-3', className )}
    >
      {children}
    </div>
  )
}

interface CultUIPopoverCloseButtonProps {
  className?: string
}

export function CultUIPopoverCloseButton( {
  className,
}: CultUIPopoverCloseButtonProps ) {
  const { closeCultUIPopover } = useCultUIPopover()

  return (
    <button
      type='button'
      className={cn( 'flex items-center', className )}
      onClick={closeCultUIPopover}
      aria-label='Close popover'
    >
      <X size={16} className='text-zinc-900 dark:text-zinc-100' />
    </button>
  )
}

interface CultUIPopoverSubmitButtonProps {
  className?: string
}

export function CultUIPopoverSubmitButton( {
  className,
}: CultUIPopoverSubmitButtonProps ) {
  return (
    <button
      className={cn(
        'relative ml-1 flex h-8 shrink-0 scale-100 select-none appearance-none items-center justify-center rounded-lg border border-zinc-950/10 bg-transparent px-2 text-sm text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-800 focus-visible:ring-2 active:scale-[0.98] dark:border-zinc-50/10 dark:text-zinc-50 dark:hover:bg-zinc-800',
        className
      )}
      type='submit'
      aria-label='Submit note'
    >
      Submit
    </button>
  )
}

export function CultUIPopoverHeader( {
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
} ) {
  return (
    <div
      className={cn(
        'px-4 py-2 font-semibold text-zinc-900 dark:text-zinc-100',
        className
      )}
    >
      {children}
    </div>
  )
}

export function CultUIPopoverBody( {
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
} ) {
  return <div className={cn( 'p-4', className )}>{children}</div>
}

// New component: CultUIPopoverButton
export function CultUIPopoverButton( {
  children,
  onClick,
  className,
}: {
  children: React.ReactNode
  onClick?: () => void
  className?: string
} ) {
  return (
    <button
      className={cn(
        'flex w-full items-center gap-2 rounded-md px-4 py-2 text-left text-sm hover:bg-zinc-100 dark:hover:bg-zinc-700',
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
