import type { Meta, StoryObj } from '@storybook/react'
import { Radar } from '@/components/animations/radar/Radar'
import { RadarLayout } from '@/components/animations/radar/RadarLayout'
import { RadarPulseBeams } from '@/components/animations/radar'

const meta = {
  title: 'Components/Radar',
  component: Radar,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
  args: {},
} satisfies Meta<typeof Radar>

export default meta

type Story = StoryObj<typeof meta>

export const DemoRadar: Story = {
  // render: (args) => <Radar {...args} />,
  args: {},
}

export const RadarLayoutDemo: Story = {
  args: {},
  render: (args) => (
    <div className='w-screen h-screen'>
      <RadarLayout />
    </div>
  ),
}

export const PulseRadar: Story = {
  args: {},
  render: (args) => (
    <div className='w-screen h-screen'>
      <RadarPulseBeams />
    </div>
  ),
}
