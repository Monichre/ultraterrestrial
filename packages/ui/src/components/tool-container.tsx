import React from 'react'
import { transform } from 'typescript'
// box-border [-webkit-font-smoothing:inherit] [place-content:center_flex-start] items-center flex [flex-flow:column] gap-2.5 h-min overflow-hidden relative w-[1198px] will-change-transform p-10
export const ToolContainer: React.FC = () => {
  return (
    <div
      className="content-center items-center box-border flex-col text-xs h-min justify-start relative w-[74.88rem] flex rounded-3xl gap-[0.63rem] overflow-hidden p-10 bg-neutral-950"
      style={{ willChange: "transform" }}
    >
      <div
        className="content-start items-start flex-col h-min justify-start relative w-full flex gap-6"
        style={{ flexShrink: "0" }}
      >
        <div
          className="content-center items-center h-min justify-between relative w-full flex"
          style={{ flexShrink: "0" }}
        >
          <div
            className="content-start items-start flex-grow flex-wrap h-min justify-start relative w-[67.38rem] flex gap-3"
            style={{ flexShrink: "0" }}
          >
            {["All", "Audio", "Blockchain", "Code", "Content Writer", "GPT", "Graphic Design", "Image", "Interior", "Music", "Video", "Voice to Text", "Web Design"].map( ( label, index ) => (
              <div key={index} className="relative" style={{ flexShrink: "0" }}>
                <div className="contents">
                  <div className="content-center items-center bg-zinc-900 cursor-pointer h-min justify-start py-3 px-5 relative w-min flex rounded-xl overflow-hidden">
                    <div className="flex-col justify-start absolute flex" style={{ flexShrink: "0" }}>
                      <h3 className="text-white font-medium h-5 leading-[1.13rem] w-min">{label}</h3>
                    </div>
                  </div>
                </div>
              </div>
            ) )}
          </div>
          <div className="cursor-pointer h-10 relative w-10" style={{ flexShrink: "0" }}>
            <div className="h-10 opacity-40 w-10 flex rounded-xl overflow-hidden" style={{ pointerEvents: "none" }}>
              <button className="items-center h-10 justify-center text-center w-10 flex" style={{ appearance: "auto" }}>
                <svg className="text-white h-6 w-6 overflow-hidden" fill="rgb(0, 0, 0)" height="24" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
                  <path d="M232.49,215.51,185,168a92.12,92.12,0,1,0-17,17l47.53,47.54a12,12,0,0,0,17-17ZM44,112a68,68,0,1,1,68,68A68.07,68.07,0,0,1,44,112Z" fill="rgb(255, 255, 255)" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div
          className="content-start items-start flex-col h-min justify-start relative w-full flex gap-6"
          style={{ flexShrink: "0" }}
        >
          <div
            className="auto-rows-min grid-cols-[356.656px_356.672px_356.672px] grid-rows-[repeat(2,_min-content)] h-min justify-center relative w-full grid gap-6"
            style={{ flexShrink: "0" }}
          >
            <div className="self-start justify-self-start relative w-96" style={{ flexShrink: "0" }}>
              <div className="contents">
                <a className="content-start items-start bg-neutral-900 text-blue-700 cursor-pointer flex-col flex-wrap h-min justify-start relative w-96 flex rounded-3xl overflow-hidden p-6" href="https://bonsai.fyi/./blog/chaingpt">
                  <div
                    className="content-start items-start flex-col h-min justify-start relative w-full flex gap-[0.63rem]"
                    style={{ flexShrink: "0" }}
                  >
                    <div
                      className="content-start items-start h-min justify-between relative w-full flex"
                      style={{ flexShrink: "0" }}
                    >
                      <div className="h-16 relative w-16 rounded-xl" style={{ flexShrink: "0" }}>
                        <div className="h-16 absolute select-none w-16 rounded-xl" style={{ pointerEvents: "none" }}>
                          <div className="contents rounded-xl">
                            <img
                              className="h-16 object-cover w-16 rounded-xl overflow-clip"
                              src="https://framerusercontent.com/images/eJOWrx13NY4TsUhefhrBIwfEA.png"
                              style={{ overflowClipMargin: "content-box" }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="content-start items-start flex-col h-min justify-start min-w-[12.50rem] pt-3 relative w-full flex gap-1"
                      style={{ flexShrink: "0" }}
                    >
                      <div className="flex-col justify-start absolute w-full flex" style={{ flexShrink: "0", wordBreak: "break-word" }}>
                        <h2 className="text-white text-lg font-medium h-6 leading-[1.38rem] w-80">ChainGPT</h2>
                      </div>
                      <div className="flex-col justify-start absolute w-full flex" style={{ flexShrink: "0", wordBreak: "break-word" }}>
                        <p className="text-zinc-500 font-medium h-20 leading-[1.63rem] w-80">State-of-the-art AI model that has been making waves in the field of AI and blockchain.</p>
                      </div>
                    </div>
                  </div>
                  <div
                    className="content-center items-center h-min justify-start pt-3.5 relative w-full flex gap-2 overflow-hidden"
                    style={{ flexShrink: "0" }}
                  >
                    <div className="content-center items-center h-min justify-start py-3 px-5 relative w-min flex rounded-xl overflow-hidden" style={{ flexShrink: "0" }}>
                      <div className="flex-col justify-start absolute flex" style={{ flexShrink: "0" }}>
                        <p className="text-white font-medium h-5 leading-5 w-8">GPT</p>
                      </div>
                    </div>
                    <div className="content-center items-center h-min justify-start py-3 px-5 relative w-min flex rounded-xl overflow-hidden" style={{ flexShrink: "0" }}>
                      <div className="flex-col justify-start absolute flex" style={{ flexShrink: "0" }}>
                        <p className="text-white font-medium h-5 leading-5 w-20">Blockchain</p>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};


