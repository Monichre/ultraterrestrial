import { AvatarImage } from '@/components/ui/avatar'
import { QuoteIcon } from 'lucide-react'

export const BlockQuote = ({
  quote,
  author,
  image,
}: {
  quote: string
  author: string
  image?: string | any
}) => {
  return (
    <blockquote className='bg-amber-500/15 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400 border-l-4 border-amber-500/70 py-2 px-4 rounded-xl'>
      <p className='inline italic'>
        <QuoteIcon
          aria-hidden='true'
          className='size-3 mr-1 fill-amber-700 stroke-none -translate-y-1 inline'
        />
        {quote}
        <QuoteIcon
          aria-hidden='true'
          className='size-3 ml-1 fill-amber-700 stroke-none translate-y-1 inline'
        />
      </p>
      {image ? (
        <div className='flex'>
          <AvatarImage src={image} />
          <p className='text-sm text-end tracking-tighter italic font-semibold mt-1.5'>
            {author}
          </p>
        </div>
      ) : (
        <p className='text-sm text-end tracking-tighter italic font-semibold mt-1.5'>
          {author}
        </p>
      )}
    </blockquote>
  )
}
