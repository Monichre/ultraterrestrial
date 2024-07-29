import type { Meta, StoryObj } from '@storybook/react';
import { ShootingStars } from '@/components/shooting-stars';

const meta = {
  title: 'Components/ShootingStars',
  component: ShootingStars,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
  args: {

  },
} satisfies Meta<typeof ShootingStars>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Demo: Story = {
  args: {

  },
};


