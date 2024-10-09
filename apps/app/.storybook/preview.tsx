import React from 'react'
import type { Preview } from '@storybook/react'
import { withConsole } from '@storybook/addon-console'
import { faker } from '@faker-js/faker'
// import { StateOfDisclosureProvider } from '../src/providers'

// import networkGraphData from '../src/stories/data/network-graph-data.json'
import '../src/app/globals.css' // replace with the name of your tailwind css file
export const generateDummyCardData = (total: number) => {
  const cards: any = []

  for (let i = 0; i < total; i++) {
    cards.push({
      description: faker.lorem.sentence(),
      latitude: faker.location.latitude(),
      location: `${faker.location.city()} ${faker.location.country()}`,
      longitude: faker.location.longitude(),
      photos: [
        // @ts-ignore
        faker.image.url(),
        // @ts-ignore// @ts-ignore
        faker.image.url(),
        // @ts-ignore
        faker.image.url(),
      ], // Array of image URLs
      // @ts-ignore
      photo: faker.image.url(), // Single image URL
      name: faker.person.fullName(),
      role: faker.person.jobTitle(),
      date: faker.date.between({ from: '2000-01-01', to: Date.now() }),
      color: faker.color.rgb(),
      type: faker.word.noun(),
      label: faker.word.noun(),
      fill: faker.color.rgb(),
      id: faker.database.mongodbObjectId(),
    })
  }
  console.log('cards: ', cards)

  return cards
}

// Generate 10 dummy card data objects
export const dummyCards: any = generateDummyCardData(10)

// const AppDecorator = (storyFn) => {
//   return (
//     <StateOfDisclosureProvider stateOfDisclosure={networkGraphData}>
//       {storyFn()}
//     </StateOfDisclosureProvider>
//   )
// }

// const ConsoleDecorator: any = (storyFn, context) =>
//   withConsole()(storyFn)(context)

//  decorators: [(storyFn, context) => withConsole()(storyFn)(context)],

// decorators: [
//   (Story, context) => (
//     <div className='dark'> {withConsole()(Story)(context)} </div>
//   ),
// ],
const preview: Preview = {
  decorators: [],
  args: {
    cards: dummyCards,
  },
  parameters: {
    parameters: {
      // ...
      nextjs: {
        appDirectory: true,
      },
      controls: {
        matchers: {
          color: /(background|color)$/i,
          date: /Date$/i,
        },
      },
    },
  },

  tags: ['autodocs'],
}
export default preview
