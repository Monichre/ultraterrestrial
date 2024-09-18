import type { Meta, StoryObj } from '@storybook/react'
import { VercelToolbar } from '@/components/toolbar/vercel-toolbar'
import { MindMapProvider, StateOfDisclosureProvider } from '@/providers'

import networkGraphData from '@/stories/data/network-graph-data.json'
const meta = {
  title: 'Components/Tool Bars/VercelToolbar',
  component: VercelToolbar,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
  args: {},
  decorators: [
    (Story: any) => (
      <StateOfDisclosureProvider stateOfDisclosure={networkGraphData}>
        <MindMapProvider>{Story()}</MindMapProvider>
      </StateOfDisclosureProvider>
    ),
  ],
} satisfies Meta<typeof VercelToolbar>

export default meta

type Story = StoryObj<typeof meta>

export const Demo: Story = {
  render: () => (
    <div className='h-screen w-screen flex flex-col justify-end'>
      <VercelToolbar />
      {/* Add your component's story content here */}
    </div>
  ),
  args: {},
}
