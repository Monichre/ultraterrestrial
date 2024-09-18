import type { Meta, StoryObj } from '@storybook/react'
import { MindMapToolbar } from '@/components/toolbar/mindmap-toolbar'

const meta = {
  title: 'Components/Tool Bars/MindMapToolbar',
  component: MindMapToolbar,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
  args: {},
} satisfies Meta<typeof MindMapToolbar>

export default meta

type Story = StoryObj<typeof meta>

export const Demo: Story = {
  args: {},
}
