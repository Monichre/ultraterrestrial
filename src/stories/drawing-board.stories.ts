import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { R3FDrawingBoardFlexLayout } from '@/features/3d/drawing-board'
import { graphData as allEntityGraphData } from '@/stories/data/graph-data'

const meta = {
  title: 'Components/Drawing Board/Flex Layout',
  component: R3FDrawingBoardFlexLayout,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
  args: { allEntityGraphData },
} satisfies Meta<typeof R3FDrawingBoardFlexLayout>

export default meta

type Story = StoryObj<typeof meta>

export const R3FDrawingBoardFlexLayoutStory: Story = {
  args: {
    allEntityGraphData,
  },
}
