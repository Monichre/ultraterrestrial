import { createClient } from '@/lib/supabase/server'

import { unfurl } from 'unfurl.js'
import Header from '@/components/Header'
// import FlowUi from '@/components/flow-ui/flow-ui'
import { BellIcon, CheckIcon } from '@radix-ui/react-icons'
import { cn } from '@/utils'
import { Button } from '@/components/ui/button'
// import { motion } from 'framer-motion'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Timeline } from '@/components/timeline'
import dayjs from 'dayjs'

// export function FadeDown() {
//   const FADE_DOWN_ANIMATION_VARIANTS = {
//     hidden: { opacity: 0, y: -10 },
//     show: { opacity: 1, y: 0, transition: { type: 'spring' } },
//   }
//   return (
//     <motion.div
//       initial='hidden'
//       animate='show'
//       viewport={{ once: true }}
//       variants={{
//         hidden: {},
//         show: {
//           transition: {
//             staggerChildren: 0.15,
//           },
//         },
//       }}
//     >
//       <motion.h1
//         className='text-center font-display text-4xl font-bold tracking-[-0.02em] drop-shadow-sm md:text-7xl md:leading-[5rem]'
//         variants={FADE_DOWN_ANIMATION_VARIANTS}
//       >
//         Fade Down
//       </motion.h1>
//       <motion.p
//         className='mt-6 text-center md:text-2xl'
//         variants={FADE_DOWN_ANIMATION_VARIANTS}
//       >
//         Animation Preview
//       </motion.p>
//       <motion.div
//         className='mx-auto mt-6 flex items-center justify-center space-x-5'
//         variants={FADE_DOWN_ANIMATION_VARIANTS}
//       >
//         If you&apos;re seeing this, thank you for trying my project out! - C.J.A
//       </motion.div>
//     </motion.div>
//   )
// }

export default async function Index() {
  const canInitSupabaseClient = () => {
    // This function is just for the interactive tutorial.
    // Feel free to remove it once you have Supabase connected.
    try {
      createClient()
      return true
    } catch (e) {
      return false
    }
  }

  const supabase = createClient()

  let { data, error }: any = await supabase.from('topics').select('*')
  let { data: eventData }: any = await supabase.from('events').select('*')
  function extractUrls(text) {
    const urlRegex = /(https?:\/\/[^\s]+)/g
    return text.match(urlRegex)
  }
  const events = await Promise.all(
    eventData.map(async (event) => {
      const url = extractUrls(event.description)
      const preview =
        url && url[0] ? await unfurl(url).catch((err) => null) : null

      return {
        ...event,
        preview: { ...preview } || null,
      }
    })
  )

  const topics = data.map(
    ({ id, name, description, key_personnel: subjectMatterExperts }: any) => ({
      id,
      name,
      description,

      subjectMatterExperts,
    })
  )

  return (
    <>
      <Header />
      <div className=' w-full'>
        <Timeline>
          {events.map((event: any) => (
            <Card key={event?.id} className={cn('w-[380px]')}>
              <CardHeader>
                <CardTitle>{event?.name}</CardTitle>
              </CardHeader>
              <CardContent className='grid gap-4'>
                <div className=' flex items-center space-x-4 rounded-md border p-4'>
                  <BellIcon />
                  {event?.preview && (
                    <div className='flex-1 space-y-1'>
                      <p className='text-sm font-medium leading-none'>
                        {event?.preview?.title}
                      </p>
                      <p className='text-sm font-medium leading-none'>
                        {event?.preview?.description}
                      </p>
                    </div>
                  )}
                </div>
                <div>
                  <p className='text-sm text-muted-foreground'>
                    {dayjs(event?.date).format('DD/MM/YYYY')}
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button className='w-full'>{event?.place}</Button>
              </CardFooter>
            </Card>
          ))}
        </Timeline>
      </div>
    </>
  )
}

// Behavior Patterns	Classifying observed behaviors
// Physical Characteristics	Analyzing different physical traits
// Impact + Human Interaction	Examining the effects on humans
// Historical Perspectives	Interactions across historical periods
// Scientific Theories	Exploring various scientific explanations
// Legal + Policy	Laws, regulations, and policies
// Ethical Considerations	Communication and  intervention
// Public Perception	Media, public opinion, and pop culture
// Origins and Intent	Comprehensive view of current theories
