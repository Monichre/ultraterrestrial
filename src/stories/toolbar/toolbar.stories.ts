import type { Meta, StoryObj } from '@storybook/react';
import { Toolbar } from '@/components/toolbar';

const meta = {
  title: 'Components/Toolbar',
  component: Toolbar,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
  args: {

  },
} satisfies Meta<typeof Toolbar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Demo: Story = {
  args: {

  },
};


