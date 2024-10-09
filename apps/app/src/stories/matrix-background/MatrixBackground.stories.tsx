import type { Meta, StoryObj } from '@storybook/react'
import { MatrixBackground } from '@/components/backgrounds/matrix-background'
import type { AnyConstructors } from 'three/examples/jsm/nodes/shadernode/ShaderNode'

const meta = {
  title: 'Components/MatrixBackground',
  component: MatrixBackground,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
  args: {},
} satisfies Meta<typeof MatrixBackground>

export default meta

type Story = StoryObj<typeof meta>

export const Demo: Story = {
  args: {},
  render: ( args: any ) => (
    <div className='h-screen w-screen'>
      <MatrixBackground />
    </div>
  ),
}
