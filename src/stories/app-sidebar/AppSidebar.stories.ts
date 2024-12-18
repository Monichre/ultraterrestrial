import type { Meta, StoryObj } from '@storybook/react'
import { AppSidebar } from '@/components/app-sidebar'

const meta = {
  title: 'Components/AppSidebar',
  component: AppSidebar,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
  args: {},
} satisfies Meta<typeof AppSidebar>

export default meta

type Story = StoryObj<typeof meta>

export const Demo: Story = {
  // @ts-ignore
  args: {
    open: false,
  },
}
