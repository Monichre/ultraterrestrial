import type { Meta, StoryObj } from '@storybook/react'
import { within, userEvent, expect } from '@storybook/test'

import { Page } from './Page'

// const Test = () => {
//   return (
//     <div className="absolute bottom-4 left-1/2 flex w-auto -translate-x-1/2 flex-col justify-end gap-3 rounded-2xl bg-white px-2 py-2 shadow-lg dark:bg-[#1A1A1A] dark:shadow-inner-shadow-dark-float md:bottom-[120px] items-center justify-end">
//       <div className="flex h-auto gap-1">
//         <div className="container flex h-auto w-[260px] flex-nowrap overflow-x-auto rounded-lg px-px md:w-[420px]">
//           <button aria-label="Go to link" className="relative flex h-full w-auto min-w-min flex-1 items-center justify-center whitespace-nowrap rounded-[10px] px-3 text-sm font-medium transition-colors ease-out text-[#666666] hover:text-[#171717] dark:text-white/80 dark:hover:text-white" type="button">Create Webhook</button>
//           <button aria-label="Go to link" className="relative flex h-full w-auto min-w-min flex-1 items-center justify-center whitespace-nowrap rounded-[10px] px-3 text-sm font-medium transition-colors ease-out text-[#666666] hover:text-[#171717] dark:text-white/80 dark:hover:text-white" type="button">Connect Repositories</button>
//           <button aria-label="Go to link" className="relative flex h-full w-auto min-w-min flex-1 items-center justify-center whitespace-nowrap rounded-[10px] px-3 text-sm font-medium transition-colors ease-out text-[#666666] hover:text-[#171717] dark:text-white/80 dark:hover:text-white" type="button">Create API Key</button>
//           <button aria-label="Go to link" className="relative flex h-full w-auto min-w-min flex-1 items-center justify-center whitespace-nowrap rounded-[10px] px-3 text-sm font-medium transition-colors ease-out text-[#666666] hover:text-[#171717] dark:text-white/80 dark:hover:text-white" type="button">Share Workspace</button>
//         </div>
//         <div className="flex items-center justify-center gap-1">
//           <div className="h-[24px] w-[2px] rounded-full bg-black/5 dark:bg-white/5"></div>
//           <button className="transition-color flex h-9 w-9 items-center justify-center rounded-lg bg-transparent p-1 text-[#666666] transition-colors ease-out hover:bg-light-superlight-bg hover:text-[#171717] dark:text-white/80 dark:hover:bg-dark-bgSuperlightHover dark:hover:text-white" type="button">
//             <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
//               <path fillRule="evenodd" clipRule="evenodd" d="M2.5 4.167c0-.46.373-.833.833-.833h13.334a.833.833 0 010 1.667H3.333a.833.833 0 01-.833-.834zm0 5.834c0-.46.373-.834.833-.834h13.334a.833.833 0 010 1.667H3.333a.833.833 0 01-.833-.833zm0 5.833c0-.46.373-.833.833-.833h13.334a.833.833 0 110 1.666H3.333a.833.833 0 01-.833-.833z" fill="currentColor"></path>
//             </svg>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

const meta = {
  title: 'Page',
  component: Page,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Page>

export default meta
type Story = StoryObj<typeof meta>

export const LoggedOut: Story = {}

// More on interaction testing: https://storybook.js.org/docs/writing-tests/interaction-testing
export const LoggedIn: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const loginButton = canvas.getByRole('button', { name: /Log in/i })
    await expect(loginButton).toBeInTheDocument()
    await userEvent.click(loginButton)
    await expect(loginButton).not.toBeInTheDocument()

    const logoutButton = canvas.getByRole('button', { name: /Log out/i })
    await expect(logoutButton).toBeInTheDocument()
  },
}

// import type { Meta } from '@storybook/react';

// import { YourComponent } from './YourComponent';

// const meta: Meta<typeof YourComponent> = {
//   component: YourComponent,
//   decorators: [
//     (Story) => (
//       <div style={{ margin: '3em' }}>
//         {/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  */}
//         <Story />
//       </div>
//     ),
//   ],
// };

// export default meta;
