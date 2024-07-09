import type { Meta, StoryObj } from '@storybook/react';
import { MindmapSidebar } from '@/components/mindmap-sidebar';

const meta = {
  title: 'Components/MindmapSidebar',
  component: MindmapSidebar,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
  args: {

  },
} satisfies Meta<typeof MindmapSidebar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Demo: Story = {
  args: {

  },
};


