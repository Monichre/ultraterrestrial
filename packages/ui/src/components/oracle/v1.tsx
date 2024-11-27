export const OracleV1 = () => {
  return (
    <div className="text-color(display-p3 0.113 0.125 0.14) bottom-[env(safe-area-inset-bottom)] left-1/2 fixed right-[11.00rem] top-[35.88rem] w-full rounded-3xl overflow-visible p-1.5 bg-neutral-100 sm:absolute  sm:ml-0 sm:mr-0 sm:mb-2 sm:w-96">
      <div className="left-[0.25rem] px-3 absolute top-[-2.00rem] flex max-w-[calc(100%_-_4px)] text-xs md:pl-0  md:pr-0">
        <div className="items-center cursor-pointer py-1 px-2 relative flex w-fit mb-1 rounded-xl gap-3">
          <div className="bg-neutral-200 items-center bottom-0 justify-center left-0 absolute top-0 flex h-full rounded-full overflow-hidden">
            <svg className="w-4 h-4" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" fill="none" stroke="color(display-p3 0.113 0.125 0.14)" />
              <path d="M5 3v4" fill="none" stroke="color(display-p3 0.113 0.125 0.14)" />
              <path d="M19 17v4" fill="none" stroke="color(display-p3 0.113 0.125 0.14)" />
              <path d="M3 5h4" fill="none" stroke="color(display-p3 0.113 0.125 0.14)" />
              <path d="M17 19h4" fill="none" stroke="color(display-p3 0.113 0.125 0.14)" />
            </svg>
          </div>
          <p className="text-ellipsis max-w-full ml-5 overflow-hidden">Oracle Mode</p>
        </div>
      </div>
      <div className="relative mb-1.5">
        <p className="bg-neutral-200/[0.5] flex-col text-sm font-medium py-3 px-4 flex rounded-2xl">
          <span className="text-neutral-400 text-xs">Goal:</span>
          <span className="text-neutral-500 overflow-x-hidden overflow-y-auto">Identify and summarize 12 methods for visualizing geospatial data on a map.</span>
        </p>
        <div
          className="bg-white items-stretch flex-col py-4 px-3 flex h-48 max-h-48 mb-1.5 overflow-y-auto rounded-2xl gap-2 text-sm font-medium"
          style={{
            outlineOffset: "2px",
          }}>
          <div className="bg-neutral-100 items-center justify-between flex rounded-xl p-1">
            <div className="items-center flex-grow flex h-full text-neutral-500">
              <div className="bg-neutral-200 items-center cursor-grab justify-center inline-flex w-6 h-6 my-1 ml-1 rounded-full">
                <svg className="w-3 h-3" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="5" fill="none" r="1" stroke="#737373" />
                  <circle cx="19" cy="5" fill="none" r="1" stroke="#737373" />
                  <circle cx="5" cy="5" fill="none" r="1" stroke="#737373" />
                  <circle cx="12" cy="12" fill="none" r="1" stroke="#737373" />
                  <circle cx="19" cy="12" fill="none" r="1" stroke="#737373" />
                  <circle cx="5" cy="12" fill="none" r="1" stroke="#737373" />
                  <circle cx="12" cy="19" fill="none" r="1" stroke="#737373" />
                  <circle cx="19" cy="19" fill="none" r="1" stroke="#737373" />
                  <circle cx="5" cy="19" fill="none" r="1" stroke="#737373" />
                </svg>
              </div>
              <textarea className="cursor-text flex-grow text-xs py-1 px-1.5 w-72 h-full overflow-hidden" defaultValue="Gather information from various sources such as SafeGraph, Boost Labs, Mapbox, Domo, KDnuggets, and Wolfram Language about methods for visualizing geospatial data on a map." />
            </div>
            <button className="text-neutral-400 bg-white items-center cursor-pointer justify-center flex w-6 h-6 border-2 border-gray-200 border-solid rounded-full overflow-hidden p-1">
              <svg className="w-3 h-3 rounded-full" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 6h18" fill="none" stroke="#a3a3a3" />
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" fill="none" stroke="#a3a3a3" />
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" fill="none" stroke="#a3a3a3" />
                <line fill="none" stroke="#a3a3a3" x1="10" x2="10" y1="11" y2="17" />
                <line fill="none" stroke="#a3a3a3" x1="14" x2="14" y1="11" y2="17" />
              </svg>
            </button>
          </div>
          <div className="bg-neutral-100 items-center justify-between flex rounded-xl p-1">
            <div className="items-center flex-grow flex h-full text-neutral-500">
              <div className="bg-neutral-200 items-center cursor-grab justify-center inline-flex w-6 h-6 my-1 ml-1 rounded-full">
                <svg className="w-3 h-3" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="5" fill="none" r="1" stroke="#737373" />
                  <circle cx="19" cy="5" fill="none" r="1" stroke="#737373" />
                  <circle cx="5" cy="5" fill="none" r="1" stroke="#737373" />
                  <circle cx="12" cy="12" fill="none" r="1" stroke="#737373" />
                  <circle cx="19" cy="12" fill="none" r="1" stroke="#737373" />
                  <circle cx="5" cy="12" fill="none" r="1" stroke="#737373" />
                  <circle cx="12" cy="19" fill="none" r="1" stroke="#737373" />
                  <circle cx="19" cy="19" fill="none" r="1" stroke="#737373" />
                  <circle cx="5" cy="19" fill="none" r="1" stroke="#737373" />
                </svg>
              </div>
              <textarea className="cursor-text flex-grow text-xs py-1 px-1.5 w-72 h-full overflow-hidden" defaultValue="Filter and analyze the gathered information to identify 12 distinct methods for geospatial data visualization." />
            </div>
            <button className="text-neutral-400 bg-white items-center cursor-pointer justify-center flex w-6 h-6 border-2 border-gray-200 border-solid rounded-full overflow-hidden p-1">
              <svg className="w-3 h-3 rounded-full" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 6h18" fill="none" stroke="#a3a3a3" />
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" fill="none" stroke="#a3a3a3" />
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" fill="none" stroke="#a3a3a3" />
                <line fill="none" stroke="#a3a3a3" x1="10" x2="10" y1="11" y2="17" />
                <line fill="none" stroke="#a3a3a3" x1="14" x2="14" y1="11" y2="17" />
              </svg>
            </button>
          </div>
          <div className="bg-neutral-100 items-center justify-between flex rounded-xl p-1">
            <div className="items-center flex-grow flex h-full text-neutral-500">
              <div className="bg-neutral-200 items-center cursor-grab justify-center inline-flex w-6 h-6 my-1 ml-1 rounded-full">
                <svg className="w-3 h-3" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="5" fill="none" r="1" stroke="#737373" />
                  <circle cx="19" cy="5" fill="none" r="1" stroke="#737373" />
                  <circle cx="5" cy="5" fill="none" r="1" stroke="#737373" />
                  <circle cx="12" cy="12" fill="none" r="1" stroke="#737373" />
                  <circle cx="19" cy="12" fill="none" r="1" stroke="#737373" />
                  <circle cx="5" cy="12" fill="none" r="1" stroke="#737373" />
                  <circle cx="12" cy="19" fill="none" r="1" stroke="#737373" />
                  <circle cx="19" cy="19" fill="none" r="1" stroke="#737373" />
                  <circle cx="5" cy="19" fill="none" r="1" stroke="#737373" />
                </svg>
              </div>
              <textarea className="cursor-text flex-grow text-xs py-1 px-1.5 w-72 h-full overflow-hidden" defaultValue="Organize the identified methods into a summarized report explaining each method's advantages and use-cases." />
            </div>
            <button className="text-neutral-400 bg-white items-center cursor-pointer justify-center flex w-6 h-6 border-2 border-gray-200 border-solid rounded-full overflow-hidden p-1">
              <svg className="w-3 h-3 rounded-full" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 6h18" fill="none" stroke="#a3a3a3" />
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" fill="none" stroke="#a3a3a3" />
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" fill="none" stroke="#a3a3a3" />
                <line fill="none" stroke="#a3a3a3" x1="10" x2="10" y1="11" y2="17" />
                <line fill="none" stroke="#a3a3a3" x1="14" x2="14" y1="11" y2="17" />
              </svg>
            </button>
          </div>
          <div className="bg-neutral-100 items-center justify-between flex rounded-xl p-1">
            <div className="items-center flex-grow flex h-full text-neutral-500">
              <div className="bg-neutral-200 items-center cursor-grab justify-center inline-flex w-6 h-6 my-1 ml-1 rounded-full">
                <svg className="w-3 h-3" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="5" fill="none" r="1" stroke="#737373" />
                  <circle cx="19" cy="5" fill="none" r="1" stroke="#737373" />
                  <circle cx="5" cy="5" fill="none" r="1" stroke="#737373" />
                  <circle cx="12" cy="12" fill="none" r="1" stroke="#737373" />
                  <circle cx="19" cy="12" fill="none" r="1" stroke="#737373" />
                  <circle cx="5" cy="12" fill="none" r="1" stroke="#737373" />
                  <circle cx="12" cy="19" fill="none" r="1" stroke="#737373" />
                  <circle cx="19" cy="19" fill="none" r="1" stroke="#737373" />
                  <circle cx="5" cy="19" fill="none" r="1" stroke="#737373" />
                </svg>
              </div>
              <textarea className="cursor-text flex-grow text-xs py-1 px-1.5 w-72 h-full overflow-hidden" defaultValue="Generate a comparison chart or table highlighting key differences and considerations for each visualization method." />
            </div>
            <button className="text-neutral-400 bg-white items-center cursor-pointer justify-center flex w-6 h-6 border-2 border-gray-200 border-solid rounded-full overflow-hidden p-1">
              <svg className="w-3 h-3 rounded-full" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 6h18" fill="none" stroke="#a3a3a3" />
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" fill="none" stroke="#a3a3a3" />
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" fill="none" stroke="#a3a3a3" />
                <line fill="none" stroke="#a3a3a3" x1="10" x2="10" y1="11" y2="17" />
                <line fill="none" stroke="#a3a3a3" x1="14" x2="14" y1="11" y2="17" />
              </svg>
            </button>
          </div>
        </div>
        <p className="text-neutral-400 text-xs justify-between px-1.5 flex mb-1.5">
          Review this recipe
          <button className="items-start cursor-pointer text-center w-32 h-4">
            Share to Community
            <svg className="inline w-3.5 h-3.5" fill="none" height="15" viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg">
              <path clipRule="evenodd" d="M3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6465L10.2929 4L6 4C5.72386 4 5.5 3.77614 5.5 3.5C5.5 3.22386 5.72386 3 6 3L11.5 3C11.6326 3 11.7598 3.05268 11.8536 3.14645C11.9473 3.24022 12 3.36739 12 3.5L12 9.00001C12 9.27615 11.7761 9.50001 11.5 9.50001C11.2239 9.50001 11 9.27615 11 9.00001V4.70711L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536Z" fill="rgb(163, 163, 163)" fillRule="evenodd" />
            </svg>
          </button>
        </p>
        <div className="text-neutral-400 relative w-full mb-1.5 border-2 border-gray-200 border-solid rounded-2xl overflow-hidden p-1.5">
          <div className="bg-neutral-200 left-0 absolute top-0 z-[-10] w-full h-full rounded-2xl" />
          <div className="items-center justify-between flex w-full rounded-2xl">
            <div className="items-center flex">
              <button className="bg-zinc-50 items-center cursor-pointer justify-center inline-flex w-7 h-7 border-2 border-gray-200 border-solid rounded-full p-1.5">
                <svg className="inline w-3 h-3" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12h14" fill="none" stroke="#a3a3a3" />
                  <path d="M12 5v14" fill="none" stroke="#a3a3a3" />
                </svg>
              </button>
            </div>
            <div className="items-center flex gap-1 text-xs font-medium">
              <button className="bg-zinc-50 items-center cursor-pointer justify-center py-1 px-2 text-center inline-flex w-14 h-6 border-2 border-gray-200 border-solid rounded-xl">Cancel</button>
              <button className="text-neutral-200 bg-neutral-700 items-center cursor-pointer justify-center py-1 px-2 text-center inline-flex w-24 h-6 border-2 border-gray-200 border-solid rounded-xl">Confirm & Run</button>
            </div>
          </div>
        </div>
      </div>
      <div className="items-center justify-center relative flex">
        <div className="bg-red-500/[0.7] bg-gradient-to-r from-blue-500/[0.7] to-teal-500/[0.7] bottom-0 blur-2xl left-0 absolute top-0 w-full h-full rounded-full" />
        <div className="bg-neutral-800 items-center py-2 px-3 relative flex w-full rounded-2xl gap-2">
          <button className="items-center cursor-pointer justify-center relative flex w-9 h-9 p-2">
            <svg className="left-[0.25rem] absolute top-[0.25rem] w-7 h-7" fill="none" viewBox="0 0 100 100">
              <circle cx="50" cy="50" fill="none" r="40" stroke="#737373" />
              <circle cx="50" cy="50" fill="none" r="40" stroke="#818cf8" />
            </svg>
          </button>
          <p className="flex-col justify-center flex w-full" />
          <div className="items-center justify-between flex">
            <div className="flex-col flex gap-1">
              <span className="text-neutral-100 text-sm overflow-x-auto overflow-y-hidden">Gather information from various sources such as SafeGraph, Boost Labs, Mapbox, Domo, KDnuggets, and Wolfram Language about methods for visualizing geospatial data on a map.</span>
              <span className="text-neutral-400 text-xs">Oracle is using tools to complete sub-tasks.</span>
            </div>
            <div className="items-center justify-center flex rounded-full p-1 text-xs text-yellow-200/[0.4] font-semibold">
              <p className="items-center justify-center inline-flex w-5 h-5 border-2 border-yellow-200/[0.4] border-solid rounded-full">4</p>
            </div>
          </div>
          <p />
        </div>
      </div>
    </div>

  )
}