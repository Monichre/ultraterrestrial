import React from 'react';



export const TestCard = () => {
  return (
    <div className="relative h-[200px] w-full md:h-[260px]"></div>
      <div className="group relative w-[100px] md:w-[140px]"></div>
        <div className="right-68 duration-250 absolute top-0 flex h-[120px] w-[100px] -rotate-6 flex-col items-center justify-between rounded-xl bg-white p-1 shadow-menu transition-all group-hover:rotate-0 group-hover:shadow-fullscreen dark:border dark:border-white/5 dark:bg-[#1A1A1A] md:h-[160px] md:w-[140px]">
          <div className="h-4"></div>
          <div className="w-14 h-12 md:w-20 md:h-14 border border-black/5 group-hover:border-black/10 rounded-md dark:border-white/5 dark:group-hover:border-white/10 py-2 px-4 flex flex-col items-center justify-center gap-2">
            <div className="rounded-full h-2 w-2 bg-[#E5E5E5] group-hover:bg-[#E8E8E8] dark:bg-[#242424] dark:group-hover:bg-[#2E2E2E] transition-colors duration-300"></div>
            <div className="w-full flex flex-col gap-1">
              <div className="rounded-[1px] h-1 w-full bg-[#f2f2f2] group-hover:bg-[#E8E8E8] dark:bg-[#242424] dark:group-hover:bg-[#2E2E2E] transition-colors duration-300"></div>
              <div className="rounded-[1px] h-1 w-2/5 bg-[#f2f2f2] group-hover:bg-[#E8E8E8] dark:bg-[#242424] dark:group-hover:bg-[#2E2E2E] transition-colors duration-300"></div>
              <div className="rounded-[1px] h-1 w-3/5 bg-[#f2f2f2] group-hover:bg-[#E8E8E8] dark:bg-[#242424] dark:group-hover:bg-[#2E2E2E] transition-colors duration-300"></div>
            </div>
          </div>
          <div className="w-full self-end p-2">
            <div className="text-xs text-[#DEDEDE] dark:text-[#333333]">01</div>
            <div className="text-xs font-medium text-[#171717] dark:text-[#D9D9D9] dark:group-hover:text-white">Cards</div>
          </div>
          <div className="absolute top-24 h-10 w-full bg-transparent md:top-36"></div>
        </div>
      </div>
      <div className="group absolute right-36 top-2 w-[100px] md:right-56 md:w-[140px]">
        <div className="duration-250  flex h-[120px] w-[100px] rotate-12 flex-col items-center justify-between rounded-xl bg-white p-1 shadow-menu transition-all group-hover:rotate-0 group-hover:shadow-fullscreen dark:border dark:border-white/5 dark:bg-[#1A1A1A] md:right-52 md:h-[160px] md:w-[140px]">
          <div className="h-8 md:h-4"></div>
          <div className="font-neuemontrealmono text-[38px] text-[#F2F2F2] transition-colors duration-300 group-hover:text-[#E8E8E8] dark:text-[#242424] dark:group-hover:text-[#2E2E2E] md:text-[56px]">H1</div>
          <div className="w-full self-end p-2">
            <div className="text-xs text-[#DEDEDE] dark:text-[#333333]">02</div>
            <div className="text-xs font-medium text-[#171717] dark:text-[#D9D9D9] dark:group-hover:text-white">Text</div>
          </div>
          <div className="absolute top-24 h-10 w-full bg-transparent md:top-36"></div>
        </div>
      </div>
      <div className="group absolute right-20 top-0 w-[100px] md:right-28 md:w-[140px]">
        <div className="duration-250 flex h-[120px] w-[100px] -rotate-6  flex-col items-center justify-between rounded-xl bg-white p-1 shadow-menu transition-all group-hover:rotate-0 group-hover:shadow-fullscreen dark:border dark:border-white/5 dark:bg-[#1A1A1A] md:right-32 md:h-[160px] md:w-[140px]">
          <div className="h-4"></div>
          <div className="h-12 text-[#F2F2F2] transition-colors duration-300 group-hover:text-[#E8E8E8] dark:text-[#242424] dark:group-hover:text-[#2E2E2E] md:h-16">
            <svg width="60" height="60" viewBox="0 0 60 60" className="fill-current w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M30.001 50.678c15.227 0 27.57-10.8 27.57-24.124 0-13.323-12.343-24.124-27.57-24.124-15.226 0-27.57 10.8-27.57 24.124 0 5.416 2.04 10.416 5.484 14.442.745 1.857 1.409 4.108 1.409 6.236 0 4.847-3.446 10.339-3.446 10.339s6.892 0 13.785-3.447a29.854 29.854 0 005.758-3.777c1.49.218 3.02.331 4.58.331z"></path>
            </svg>
          </div>
          <div className="w-full self-end p-2">
            <div className="text-xs text-[#DEDEDE] dark:text-[#333333]">03</div>
            <div className="text-xs font-medium text-[#171717] dark:text-[#D9D9D9] dark:group-hover:text-white">Icons</div>
          </div>
          <div className="absolute top-24 h-10 w-full bg-transparent md:top-36"></div>
        </div>
      </div>
      <div className="group absolute right-2 top-0 w-[100px] md:w-[140px]">
        <div className="duration-250 flex h-[120px] w-[100px] rotate-12 flex-col items-center justify-between rounded-xl bg-white p-1 shadow-menu transition-all group-hover:-top-10 group-hover:rotate-0 group-hover:shadow-fullscreen dark:border dark:border-white/5 dark:bg-[#1A1A1A] md:h-[160px] md:w-[140px]">
          <div className="h-4"></div>
          <div className="flex h-8 w-9/12 items-center justify-center rounded-full bg-[#f2f2f2] font-neuemontrealmono text-sm text-[#d6d6d6] transition-colors duration-300 group-hover:bg-[#E8E8E8] group-hover:text-[#C2C2C2] dark:bg-[#242424] dark:text-[#1A1A1A] dark:group-hover:bg-[#2E2E2E] dark:group-hover:text-[#121212] md:h-10 md:w-8/12 md:text-lg">Hello</div>
          <div className="w-full self-end p-2">
            <div className="text-xs text-[#DEDEDE] dark:text-[#333333]">04</div>
            <div className="text-xs font-medium text-[#171717] dark:text-[#D9D9D9] dark:group-hover:text-white">Buttons</div>
          </div>
          <div className="absolute top-24 h-10  w-full bg-transparent md:top-36"></div>
        </div>
      </div>
    </div>
  );
}

export const SmartFunctionalCardUI = () => {
  return (
    <div className="flex h-[400px] w-full items-center justify-center rounded-lg border border-light-border dark:border-dark-border md:h-[640px] md:flex-1">
      <div className="relative w-full h-full">
        <div className="absolute bottom-4 left-1/2 flex w-auto -translate-x-1/2 flex-col justify-end gap-3 rounded-2xl bg-white px-2 py-2 shadow-lg dark:bg-[#1A1A1A] dark:shadow-inner-shadow-dark-float md:bottom-[120px] items-center justify-end">
          <div className="flex h-auto gap-1">
            <div className="container flex h-auto w-[260px] flex-nowrap overflow-x-auto rounded-lg px-px md:w-[420px]">
              <button aria-label="Go to link" className="relative flex h-full w-auto min-w-min flex-1 items-center justify-center whitespace-nowrap rounded-[10px] px-3 text-sm font-medium transition-colors ease-out text-[#666666] hover:text-[#171717] dark:text-white/80 dark:hover:text-white">Create Webhook</button>
              <button aria-label="Go to link" className="relative flex h-full w-auto min-w-min flex-1 items-center justify-center whitespace-nowrap rounded-[10px] px-3 text-sm font-medium transition-colors ease-out text-[#666666] hover:text-[#171717] dark:text-white/80 dark:hover:text-white">Connect Repositories</button>
              <button aria-label="Go to link" className="relative flex h-full w-auto min-w-min flex-1 items-center justify-center whitespace-nowrap rounded-[10px] px-3 text-sm font-medium transition-colors ease-out text-[#666666] hover:text-[#171717] dark:text-white/80 dark:hover:text-white">Create API Key</button>
              <button aria-label="Go to link" className="relative flex h-full w-auto min-w-min flex-1 items-center justify-center whitespace-nowrap rounded-[10px] px-3 text-sm font-medium transition-colors ease-out text-[#666666] hover:text-[#171717] dark:text-white/80 dark:hover:text-white">Share Workspace</button>
            </div>
            <div className="flex items-center justify-center gap-1">
              <div className="h-[24px] w-[2px] rounded-full bg-black/5 dark:bg-white/5"></div>
              <button className="transition-color flex h-9 w-9 items-center justify-center rounded-lg bg-transparent p-1 text-[#666666] transition-colors ease-out hover:bg-light-superlight-bg hover:text-[#171717] dark:text-white/80 dark:hover:bg-dark-bgSuperlightHover dark:hover:text-white">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M2.5 4.167c0-.46.373-.833.833-.833h13.334a.833.833 0 010 1.667H3.333a.833.833 0 01-.833-.834zm0 5.834c0-.46.373-.834.833-.834h13.334a.833.833 0 010 1.667H3.333a.833.833 0 01-.833-.833zm0 5.833c0-.46.373-.833.833-.833h13.334a.833.833 0 110 1.666H3.333a.833.833 0 01-.833-.833z" fill="currentColor"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute hidden w-auto gap-3 -translate-x-1/2 -bottom-10 left-1/2 md:bottom-8 md:flex">
        <button aria-label="Settings" className="h-8 w-32 rounded-full font-mono text-sm transition-all ease-in-out dark:border dark:border-dark-bgSuperlightHover md:w-auto md:px-2 md:py-1 text-[#171717]d shadow-sm dark:bg-[#141414] dark:text-white">/settings</button>
        <button aria-label="Create project" className="h-8 w-32 rounded-full font-mono text-sm transition-all ease-in-out dark:border dark:border-dark-bgSuperlightHover md:w-auto md:px-2 md:py-1 bg-white text-[#666666] shadow-lg hover:bg-[#fafafa] hover:text-[#171717] dark:bg-[#1a1a1a] dark:text-white/80 dark:shadow-tooltip dark:hover:bg-[#1a1a1a] dark:hover:text-white">/create-project</button>
      </div>
    </div>
  );
}