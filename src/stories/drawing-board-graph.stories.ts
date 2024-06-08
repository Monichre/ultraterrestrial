import type { Meta, StoryObj } from '@storybook/react'

import { DrawingBoardReactThreeFiberGraph } from '@/features/3d/drawing-board/graph'
import { graphData as allEntityGraphData } from '@/stories/data/graph-data'

const meta = {
  title: 'Components/Drawing Board/React Three Fiber',
  component: DrawingBoardReactThreeFiberGraph,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
  args: { allEntityGraphData },
} satisfies Meta<typeof DrawingBoardReactThreeFiberGraph>

export default meta

type Story = StoryObj<typeof meta>

export const DrawingBoardR3FGraphStory: Story = {
  args: {
    allEntityGraphData,
  },
}
