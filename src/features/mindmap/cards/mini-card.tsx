'use client'
import { EntityCardUtilityMenu } from '@/features/mindmap/cards/entity-card'

import { format, compareAsc } from 'date-fns'
import { useEntityCardLogic } from '@/hooks'
import { motion } from 'framer-motion'

export const MiniCard = ({ card }: any) => {
  const {
    findConnections,
    entity,
    bookmarked,
    userNote,
    saveNote,
    updateNote,
  } = useEntityCardLogic({ card })
  const { location, date, photos, id, color, name, type } = entity
  const [image] = photos || [null]
  return (
    <div
      className={`relative rounded-[calc(var(--radius)-2px)] p-[1px] bg-black !w-[350px] h-[220px] entity-group-node-child-card`}
      style={{ border: `1px solid ${color}` }}
      id={`entity-group-node-child-card-${id}`}
    >
      <div
        style={{
          borderRadius: '4px',
        }}
        className='h-full w-full relative dark:bg-transparent dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] px-3 py-4'
      >
        <div
          className={`relative w-full h-full pl-3 flex justify-start-center items-center`}
          style={{ borderLeft: `1px solid ${color}` }}
        >
          <motion.div className='absolute top-0 left-0 w-full h-full z-0 after:absolute after:top-0 after:left-0 after:w-full after:z-1 after:h-full after:bg-black after:opacity-80'>
            <motion.img
              src={image.url || image.src}
              alt='What I Talk About When I Talk About Running - book cover'
              className='h-full w-full'
            />
          </motion.div>
          <motion.div className='absolute top-0 left-0 w-full h-full z-1 flex flex-col justify-start p-4'>
            <h2
              className='text-white font-bebasNeuePro text-xl whitespace-normal w-fit capitalize '
              style={{ textWrap: 'pretty' }}
            >
              {name}
            </h2>

            {type === 'personnel' && (
              <p className='date text-1xl text-[#78efff] text-uppercase font-bebasNeuePro tracking-wider w-auto ml-auto mt-1'>
                {card?.credibility
                  ? `Credibility Score: ${card?.credibility}`
                  : card.rank
                    ? `Platform Ranking: ${card?.rank}`
                    : ''}
              </p>
            )}

            <div className='w-full mt-4'>
              {date && (
                <p className='font-light text-[#78efff] font-bebasNeuePro tracking-wider text-sm mr-auto'>
                  {format(date, 'MMMM dd, yyyy')}
                </p>
              )}
              {location && (
                <p className='font-light text-[#78efff] font-bebasNeuePro tracking-wider  text-sm'>
                  {location}
                </p>
              )}
            </div>
          </motion.div>
        </div>
        <motion.div
          className='absolute bg-transparent bottom-2 right-0 flex'
          animate={{ opacity: 1, bottom: 10 }}
          initial={{ opacity: 0, bottom: -5 }}
          exit={{ opacity: 0, bottom: -5 }}
        >
          <EntityCardUtilityMenu
            updateNote={updateNote}
            saveNote={saveNote}
            userNote={userNote}
            bookmarked={bookmarked}
            findConnections={findConnections}
          />
        </motion.div>
      </div>
    </div>
  )
}
