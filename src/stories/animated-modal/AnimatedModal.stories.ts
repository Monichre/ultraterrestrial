import type { Meta, StoryObj } from '@storybook/react';
import { AnimatedModal } from '@/components/animated-modal';

const meta = {
  title: 'Components/AnimatedModal',
  component: AnimatedModal,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
  args: {

  },
} satisfies Meta<typeof AnimatedModal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Demo: Story = {
  args: {

  },
};

