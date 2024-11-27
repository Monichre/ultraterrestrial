import { useEntity } from '@/hooks'
import { motion } from 'framer-motion'

export function SubjectMatterExpertCard( { card }: any ) {
  const {
    handleHoverLeave,
    entity,
    showMenu,
    setShowMMenu,
    bookmarked,
    setBookmarked,
    relatedDataPoints,
    saveNote,
    updateNote,
    userNote,
    connectionListConnections,
    handleHoverEnter,
    findConnections,
  } = useEntity( { card } )
  console.log( 'personnel card:', card )
  console.log( 'personel entity:', entity )
  const test = false
  const { popularity, rank, photo, name, role }: any = entity

  const image: any = photo[0] || { url: '/astro-3.png' }


  return (
    // <CoreNodeContainer className='motion-scale-in-0 motion-opacity-in-0'  >

    //   <CoreNodeContent className='min-h-[100xp] w-full'>

    <motion.div

      className='relative flex cursor-pointer items-center justify-center'
      animate={{
        width: 300,
        height: 400,
        y: 0,
      }}
      initial={false}

    >
      <motion.img
        src={image?.url}
        alt='image'
        className='z-[2] h-full w-full bg-zinc-600 object-cover'
        width={300}
        height={300}
        style={{
          borderRadius: 16,
          // border: `1px solid ${ card?.color }`
        }}
      />



      <motion.div

        className='absolute h-full w-full'
        style={{
          borderRadius: 20,
        }}
        animate={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 20 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.15 }}
        layoutId='content'
      >
        <motion.div
          className='absolute z-[3] flex h-full w-full flex-col items-center justify-end gap-2 bg-gradient-to-b from-transparent to-black p-4'
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}

          style={{
            borderRadius: 16,
          }}
        >

          <div className='flex w-full flex-col items-center justify-between gap-1'>
            <motion.span
              className='font-semibold text-white'
              layoutId='title'
            >
              {name}
            </motion.span>
            <motion.span
              className='font-semibold text-blue-500 opacity-75'
              layoutId='url'
            >
              {role}
            </motion.span>
          </div>
          <motion.p
            className='mt-1 text-center text-sm text-white opacity-90'
            layoutId='description'
          >
            Popularity: {popularity}
          </motion.p>
        </motion.div>

      </motion.div>

    </motion.div>







  )
}
