import type { Meta, StoryObj } from '@storybook/react';
import { CanvasCursor } from '@/components/ui/canvas-cursor';

const meta = {
  title: 'Components/CanvasCursor',
  component: CanvasCursor,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
  args: {

  },
} satisfies Meta<typeof CanvasCursor>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Demo: Story = {
  args: {

  },
};

