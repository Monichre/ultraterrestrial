import type { Meta, StoryObj } from '@storybook/react'
import { BlockQuote } from '@/components/blockquote'

const meta = {
  title: 'Components/BlockQuote',
  component: BlockQuote,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
  args: {},
} satisfies Meta<typeof BlockQuote>

export default meta

type Story = StoryObj<typeof meta>

export const Demo: Story = {
  args: {
    quote: `There's a number of extraterrestrial vehicles out there that have been spotted. I happen to be privileged enough to be in on the fact that we've been visited on this planet, and the UFO phenomenon is real.`,
    author: 'Edgar Mitchell',
  },
}
