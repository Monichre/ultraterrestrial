import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { SpatialGallery } from '@/components/visualizations/spatial-gallery'

const meta = {
  title: 'Components/Spatial Gallery',
  component: SpatialGallery,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',

    nextjs: {
      router: {
        pathname: '/explore/events/',
        asPath: '/profile/1',
        query: {
          id: '',
        },
      },
    },
  },
  args: {
    images: [],
  },
} satisfies Meta<typeof SpatialGallery>

export default meta

const pexel = ( id ) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260`
const images = [
  // Front
  { position: [0, 0, 1.5], rotation: [0, 0, 0], url: pexel( 1103970 ) },
  // Back
  { position: [-0.8, 0, -0.6], rotation: [0, 0, 0], url: pexel( 416430 ) },
  { position: [0.8, 0, -0.6], rotation: [0, 0, 0], url: pexel( 310452 ) },
  // Left
  {
    position: [-1.75, 0, 0.25],
    rotation: [0, Math.PI / 2.5, 0],
    url: pexel( 327482 ),
  },
  {
    position: [-2.15, 0, 1.5],
    rotation: [0, Math.PI / 2.5, 0],
    url: pexel( 325185 ),
  },
  {
    position: [-2, 0, 2.75],
    rotation: [0, Math.PI / 2.5, 0],
    url: pexel( 358574 ),
  },
  // Right
  {
    position: [1.75, 0, 0.25],
    rotation: [0, -Math.PI / 2.5, 0],
    url: pexel( 227675 ),
  },
  {
    position: [2.15, 0, 1.5],
    rotation: [0, -Math.PI / 2.5, 0],
    url: pexel( 911738 ),
  },
  {
    position: [2, 0, 2.75],
    rotation: [0, -Math.PI / 2.5, 0],
    url: pexel( 1738986 ),
  },
]

type Story = StoryObj<typeof meta>
export const SpatialGalleryDemo = {
  args: {
    images,
  },
}
