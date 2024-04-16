import { PlanetMenu } from '@/components/planet-menu'
import { Home } from '@/components/home'
import { AnimatedHero, WordPullUp, LetterPullUp } from '@/components/hero'
import { Suspense } from 'react'

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
  return (
    <div className='h-[100vh] overflow-hidden'>
      <Suspense fallback={null}>
        <PlanetMenu />

        <LetterPullUp />
        <Home />
      </Suspense>
      {/* <Hero /> */}

      {/* <Timeline>
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
        </Timeline> */}
    </div>
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
