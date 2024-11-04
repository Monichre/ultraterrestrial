import type { Meta, StoryObj } from '@storybook/react'

import { MindMapProvider, StateOfDisclosureProvider } from '@/providers'

import { MindMapBottomMenu } from '@/features/mindmap/components/menus'
import networkGraphData from '@/stories/data/network-graph-data.json'
const meta = {
  title: 'Components/Tool Bars/MindMapBottomMenu',
  component: MindMapBottomMenu,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
  args: {},
  decorators: [
    ( Story: any ) => (
      <StateOfDisclosureProvider stateOfDisclosure={networkGraphData}>
        <MindMapProvider>{Story()}</MindMapProvider>
      </StateOfDisclosureProvider>
    ),
  ],
} satisfies Meta<typeof MindMapBottomMenu>

export default meta

type Story = StoryObj<typeof meta>

export const Demo: Story = {
  render: () => (
    <div className='h-screen w-screen flex flex-col justify-end'>
      <MindMapBottomMenu />
      {/* Add your component's story content here */}
    </div>
  ),
  args: {},
}
