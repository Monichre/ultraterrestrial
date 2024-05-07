import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { DrawingBoard } from './drawing-board'

const meta = {
  title: 'Components/DrawingBoard',
  component: DrawingBoard,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
  args: {},
} satisfies Meta<typeof DrawingBoard>

export default meta

type Story = StoryObj<typeof meta>

export const DrawingBoardDemo: Story = {
  args: {},
}
