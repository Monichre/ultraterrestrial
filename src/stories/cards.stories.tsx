// import { RootNodeCard } from '@/features/mindmap/cards/root-node-card/root-node-card'
import { StarsCard, type StarsCardProps } from '@/components/ui/card/stars-card'

import type { Meta, StoryObj } from '@storybook/react'
//

// import { MiniCard } from '@/features/mindmap/cards/mini-card'

const meta = {
  title: 'Components/Card Stories',
  component: StarsCard,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
  args: {},
} satisfies Meta<typeof StarsCard>

export default meta
type Story = StoryObj<typeof StarsCard>

export const StarsCardStory: Story = {
  args: {},
  render: (args: any) => (
    <div className='h-[100vh] w-[100vw] flex column justify-center align-center items-center content-center'>
      <StarsCard>
        <div>poop</div>
      </StarsCard>
    </div>
  ),
}
// export const MiniCardStory: Story = {
//   // args: { card: cards[0] },
//   render: (args: any) => (
//     <div className='h-[100vh] w-[100vw] flex column justify-center align-center items-center content-center'>
//       {/* <MiniCard {...args} /> */}
//     </div>
//   ),
// }

// export const GroupCardStory: Story = {
//   args: {},
//   render: (args: any) => (
//     <div className='h-[100vh] w-[100vw] flex column justify-center align-center items-center content-center'></div>
//   ),
// }

// export const SubjectMatterExpertCardStory: Story = {
//   args: {},
//   render: (args: any) => (
//     <div className='h-[100vh] w-[100vw] flex column justify-center align-center items-center content-center'></div>
//   ),
// }
// export const TestimonyCardStory: Story = {
//   args: {},
//   render: (args: any) => (
//     <div className='h-[100vh] w-[100vw] flex column justify-center align-center items-center content-center'></div>
//   ),
// }

// export const TopicCardStory: Story = {
//   args: {},
//   render: (args: any) => (
//     <div className='h-[100vh] w-[100vw] flex column justify-center align-center items-center content-center'></div>
//   ),
// }

// export const CaseFileCardStory: Story = {
//   args: {},
//   render: (args: any) => (
//     <div className='h-[100vh] w-[100vw] flex column justify-center align-center items-center content-center'></div>
//   ),
// }

// type Story = StoryObj<typeof ConnectionCard>

// export const GlowingStarsCardDemo = {
//   render: (args: JSX.IntrinsicAttributes & StarsCardProps) => (
//     <StarsCard {...args} />
//   ),
// }

// export const CardStory = {
//   render: (
//     args: JSX.IntrinsicAttributes &
//       HTMLAttributes<HTMLDivElement> &
//       RefAttributes<HTMLDivElement>

// }

// export const MindMapEntityCardStory: Story = {
//   render: (args: any) => (
//     <div className='h-[100vh] w-[100vw] flex column justify-center align-center items-center content-center'>
//       <MindMapEntityCard {...args} />
//     </div>
//   ),
//   args: {
//     data: {
//       name: 'Roswell UFO Sighting',
//       date: '2/5/1947',
//       location: 'Roswell, New Mexico',
//       photos: [
//         {
//           src: '/foofighters.webp',
//         },
//       ],
//     },
//   },
// }
