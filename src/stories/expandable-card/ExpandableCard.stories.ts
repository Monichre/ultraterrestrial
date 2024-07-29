import type { Meta, StoryObj } from '@storybook/react';
import { ExpandableCard } from '@/components/expandable-card';

const meta = {
  title: 'Components/ExpandableCard',
  component: ExpandableCard,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
  args: {

  },
} satisfies Meta<typeof ExpandableCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Demo: Story = {
  args: {

  },
};


