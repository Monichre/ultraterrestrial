import type { Meta, StoryObj } from '@storybook/react'
import { MindMap } from '@/components/mind-map'
import { graphData as allEntityGraphData } from '@/stories/data/graph-data'
// @ts-ignore
const meta = {
  title: 'Components/MindMap',
  component: MindMap,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
  args: {
    // @ts-ignore
    allEntityGraphData,
  },
} satisfies Meta<typeof MindMap>

export default meta

type Story = StoryObj<typeof meta>

export const Demo: Story = {
  args: {
    // @ts-ignore
    allEntityGraphData,
  },
}
