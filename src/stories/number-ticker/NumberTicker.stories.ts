import type { Meta, StoryObj } from '@storybook/react';
import { NumberTicker } from '@/components/number-ticker';

const meta = {
  title: 'Components/NumberTicker',
  component: NumberTicker,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
  args: {

  },
} satisfies Meta<typeof NumberTicker>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Demo: Story = {
  args: {

  },
};


