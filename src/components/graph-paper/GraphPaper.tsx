'use client'

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import './graph-paper.css' // Include your CSS styles
import { GraphPaperAnimation } from './main'
export const GraphPaper = () => {
  // // Refs for canvases and DOM elements
  // const planeCanvasRef: any = useRef(null)
  // const mainCanvasRef: any = useRef(null)
  // const textNodesRef: any = useRef([])
  // const socialRef: any = useRef(null)
  // const mouseDivRef: any = useRef(null)
  // const doc = useRef({ width: 1000, height: 1000 })
  // // Mutable variables using refs

  // const plane = useRef({
  //   xCell: 0,
  //   yCell: 0,
  //   cells: [] as number[],
  //   xCenter: 0,
  //   yCenter: 0,
  //   centerCoords: [0, 0],
  // })
  // const context: any = useRef({ plane: null, main: null })
  // const mouse = useRef({
  //   x: 0,
  //   y: 0,
  //   coords: { x: 0, y: 0 },
  //   down: { state: false, x: 0, y: 0 },
  // })

  // // State variables
  // const [state, setState]: any = useState({
  //   area: 0,
  //   time: Date.now(),
  //   lt: 0,
  //   planeProgress: 0,
  //   dotsProgress: 0,
  //   fadeInProgress: 0,
  //   textProgress: 0,
  //   stepOffset: 0,
  //   textOffset: 0,
  //   markupOffset: 0,
  //   glitches: [],
  //   animLines: [],
  //   animNumbers: [],
  //   tabIsActive: true,
  //   planeIsDrawn: false,
  //   mousePower: 0,
  //   textPixelData: [],
  //   text: {},
  //   delta: 0,
  //   dlt: performance.now(),
  //   needRedraw: true,
  // })

  // const cfg = {
  //   cell: 35,
  //   sectionWidth: 8,
  //   sectionHeight: 1,
  //   numberOffset: 5,
  //   shadowBlur: true,
  //   bgColor: '#181818',
  // }

  // // Tools and helper functions
  // const tools = useMemo(
  //   () => ({
  //     drawPath(
  //       ctx: {
  //         save: () => void
  //         beginPath: () => void
  //         closePath: () => void
  //         restore: () => void
  //       },
  //       fn: { (): void; (): void; (): void; (): void }
  //     ) {
  //       ctx.save()
  //       ctx.beginPath()
  //       fn()
  //       ctx.closePath()
  //       ctx.restore()
  //     },
  //     random(min: number, max: number, int: boolean) {
  //       let result = min + Math.random() * (max + (int ? 1 : 0) - min)
  //       return int ? parseInt(result) : result
  //     },
  //     getVectorLength(p1: number[], p2: number[]) {
  //       return Math.sqrt(
  //         Math.pow(p1[0] - p2[0], 2) + Math.pow(p1[1] - p2[1], 2)
  //       )
  //     },
  //     easing(t: number, b: number, c: number, d: number, s: undefined) {
  //       return c * ((t = t / d - 1) * t * t + 1) + b
  //     },
  //     cellEasing(t: number, b: number, c: number, d: number, s: undefined) {
  //       return c * (t /= d) * t * t * t + b
  //     },
  //   }),
  //   []
  // )
  // const start = () => {
  //   initEvents()
  //   canvasInit()
  //   loop()
  //   initCheckingInterval()
  //   splitText()
  // }
  // const getTextPixels = useCallback(() => {
  //   const ctx = context.current.main
  //   const { xCell, yCell } = plane.current

  //   tools.drawPath(ctx, () => {
  //     ctx.fillStyle = 'white'
  //     ctx.textBaseline = state.text.baseLine
  //     ctx.font = state.text.font
  //     const text = state.text.value
  //     const h = parseInt(ctx.font)
  //     const w = ctx.measureText(text).width
  //     const x = doc.current.width / 2 - w / 2
  //     const y = yCell * 1.75
  //     ctx.fillText(text, x, y)
  //   })

  //   const imageData = ctx.getImageData(
  //     0,
  //     0,
  //     doc.current.width,
  //     doc.current.height
  //   ).data
  //   const textPixelData: { x: number; y: number; value: any }[] = []
  //   const offset = 10
  //   for (let h = 0; h < doc.current.height; h += offset) {
  //     for (let w = 0; w < doc.current.width; w += offset) {
  //       const pixel = imageData[(w + h * doc.current.width) * 4 - 1]
  //       if (pixel === 255)
  //         textPixelData.push({
  //           x: w,
  //           y: h,
  //           value: tools.random(0, 1, true),
  //         })
  //     }
  //   }
  //   ctx.clearRect(0, 0, doc.current.width, doc.current.height)
  //   setState((prevState: any) => ({
  //     ...prevState,
  //     textPixelData,
  //   }))
  // }, [state.text.baseLine, state.text.font, state.text.value, tools])

  // // Initialize on component mount
  // useEffect(() => {
  //   bindNodes()
  //   getDimensions()
  //   mouse.current.x = doc.current.width / 2
  //   mouse.current.y = doc.current.height / 2
  //   start()

  //   // Cleanup on unmount
  //   return () => {
  //     window?.removeEventListener('resize', resizeHandler)
  //     document.removeEventListener('mousemove', mouseMoveHandler)
  //     document.removeEventListener('mousedown', mouseDownHandler)
  //     document.removeEventListener('mouseup', mouseUpHandler)
  //     document.removeEventListener('contextmenu', contextMenuHandler)
  //     cancelAnimationFrame(animationFrameId.current)
  //     clearInterval(checkingIntervalId.current)
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])

  // // Refs to store interval and animation frame IDs
  // const animationFrameId: any = useRef(null)
  // const checkingIntervalId: any = useRef(null)

  // const bindNodes = () => {
  //   // In React, we use refs
  //   // textNodesRef.current is an array of text nodes
  // }

  // const getDimensions = useCallback(() => {
  //   doc.current.height = window?.innerHeight
  //   doc.current.width = window?.innerWidth
  // }, [])
  // const updatePlane = useCallback(() => {
  //   const { width: w, height: h } = doc.current

  //   const cell = Math.round(w / cfg.cell)

  //   const xPreSize = w / cell
  //   plane.current.xCell =
  //     (w / xPreSize) % 2 !== 0 ? w / (w / xPreSize + 1) : xPreSize

  //   const yPreSize = h / Math.round(cell * (h / w))
  //   plane.current.yCell =
  //     (h / yPreSize) % 2 !== 0 ? h / (h / yPreSize + 1) : yPreSize

  //   plane.current.cells = [
  //     Math.round(w / plane.current.xCell),
  //     Math.round(h / plane.current.yCell),
  //   ]
  //   plane.current.xCenter = Math.round(plane.current.cells[1] / 2)
  //   plane.current.yCenter = Math.round(plane.current.cells[0] / 2)
  //   plane.current.centerCoords = [
  //     plane.current.yCenter * plane.current.xCell,
  //     plane.current.xCenter * plane.current.yCell,
  //   ]
  // }, [cfg.cell])

  // const resizeHandler = useCallback(() => {
  //   getDimensions()
  //   setState((prevState: any) => ({
  //     ...prevState,
  //     area: (doc.current.width * doc.current.height) / 1000000,
  //     needRedraw: true,
  //   }))
  //   if (mainCanvasRef.current) {
  //     mainCanvasRef.current.width = doc.current.width
  //     mainCanvasRef.current.height = doc.current.height
  //   }
  //   if (planeCanvasRef.current) {
  //     planeCanvasRef.current.width = doc.current.width
  //     planeCanvasRef.current.height = doc.current.height
  //   }
  //   updatePlane()
  //   updateTextConfig()
  //   if (state.planeIsDrawn) getTextPixels()
  // }, [getDimensions, getTextPixels, state.planeIsDrawn, updatePlane])

  // const splitText = () => {
  //   textNodesRef.current.forEach((el: { innerText: any; innerHTML: any }) => {
  //     const value = el.innerText
  //     el.innerHTML = value.split('').reduce((acc: string, cur: any) => {
  //       return acc + `<span class="letter">${cur}</span>`
  //     }, '')
  //   })
  // }

  // const animateText = () => {
  //   const callback = () => {
  //     socialRef.current.classList.add('active')
  //     mouseDivRef.current.classList.add('active')
  //   }
  //   textNodesRef.current.forEach(
  //     (
  //       el: {
  //         classList: { add: (arg0: string) => void }
  //         querySelectorAll: (arg0: string) => any
  //       },
  //       elIndex: number
  //     ) => {
  //       el.classList.add('active')
  //       const letters = el.querySelectorAll('.letter')
  //       const length = Math.round(letters.length / 2) + 1
  //       for (let i = 0; i < length; i++) {
  //         const [letter1, letter2] = [letters[i], letters[letters.length - i]]
  //         setTimeout(() => {
  //           if (letter1) letter1.classList.add('active')
  //           if (letter2) letter2.classList.add('active')
  //           if (i === length - 1 && elIndex === textNodesRef.current.length - 1)
  //             callback()
  //         }, i * 100)
  //       }
  //     }
  //   )
  // }

  // const canvasInit = useCallback(() => {
  //   const font = '10px Montserrat'
  //   const lineCapAndJoin = 'round'
  //   const color = `rgba(255,255,255,0.1)`

  //   const planeCanvas: any = planeCanvasRef.current
  //   const mainCanvas: any = mainCanvasRef.current

  //   context.current.plane = planeCanvas.getContext('2d')
  //   context.current.plane.lineCap = lineCapAndJoin
  //   context.current.plane.lineJoin = lineCapAndJoin
  //   context.current.plane.font = font
  //   context.current.plane.fillStyle = color
  //   context.current.plane.strokeStyle = color

  //   context.current.main = mainCanvas.getContext('2d')
  //   context.current.main.lineCap = lineCapAndJoin
  //   context.current.main.lineJoin = lineCapAndJoin
  //   context.current.main.font = font
  //   context.current.main.fillStyle = color
  //   context.current.main.strokeStyle = color

  //   getTextPixels()
  // }, [getTextPixels])

  // const initEvents = useCallback(() => {
  //   window?.addEventListener('resize', resizeHandler)
  //   document?.addEventListener('mousemove', mouseMoveHandler)
  //   document?.addEventListener('mousedown', mouseDownHandler)
  //   document?.addEventListener('mouseup', mouseUpHandler)
  //   document?.addEventListener('contextmenu', contextMenuHandler)

  //   resizeHandler()
  // }, [resizeHandler])

  // const drawPlane = useCallback(() => {
  //   const ctx = context.current.plane

  //   if (ctx) {
  //     ctx.clearRect(0, 0, doc.current.width, doc.current.height)

  //     const { xCell, yCell, cells, xCenter, yCenter } = plane.current

  //     const p = tools.easing(state.planeProgress, 0, 1, 1)
  //     const cp = state.planeProgress
  //     const dp = state.dotsProgress

  //     // Draw center lines, grid lines, and dots
  //     // Implement the drawing logic as per your original code
  //     // For brevity, the detailed drawing code is not included here
  //   }
  // }, [state.dotsProgress, state.planeProgress, tools])

  // const drawText = useCallback(() => {
  //   const ctx = context.current.main
  //   const { yCell } = plane.current
  //   const mp = tools.cellEasing(state.mousePower, 0, 1, 1)
  //   const length = state.textPixelData.length
  //   const p = state.textOffset

  //   // Draw background text
  //   tools.drawPath(ctx, () => {
  //     if (cfg.shadowBlur) {
  //       ctx.shadowColor = 'rgba(255,255,255,0.025)'
  //       ctx.shadowBlur = 30 * state.mousePower
  //     }
  //     ctx.globalAlpha = state.fadeInProgress * 0.95
  //     ctx.textBaseline = state.text.baseLine
  //     ctx.fillStyle = cfg.bgColor
  //     ctx.font = state.text.font
  //     const text = state.text.value
  //     const x = doc.current.width / 2 - ctx.measureText(text).width / 2
  //     const y = yCell * 1.75
  //     ctx.fillText(text, x, y)
  //   })

  //   // Draw pixelated text effect
  //   state.textPixelData.forEach(
  //     (pixel: { x: any; y: any; value: any }, i: number) => {
  //       const { x, y, value } = pixel
  //       const x2 = (3 + mp * 50) * Math.sin(p * i)
  //       const y2 = (10 + mp * 50) * Math.cos(p * i)
  //       const per = (1 - mp) * (i / length)
  //       tools.drawPath(ctx, () => {
  //         if (!per) return
  //         ctx.globalAlpha = state.fadeInProgress
  //         ctx.font = '8px Montserrat'

  //         ctx.fillStyle = `rgba(255,255,255,${per * 0.3})`
  //         if (i % 2 === 0) ctx.fillText(value + '', x, y + y2 * -1)

  //         ctx.fillStyle = `rgba(255,255,255,${per})`
  //         ctx.fillRect(x + x2, y, 5 * per * (1 - mp), 1)
  //         ctx.fillRect(x, y + y2, 1, 5 * per * (1 - mp))
  //       })
  //     }
  //   )
  // }, [
  //   cfg.bgColor,
  //   cfg.shadowBlur,
  //   state.fadeInProgress,
  //   state.mousePower,
  //   state.text.baseLine,
  //   state.text.font,
  //   state.text.value,
  //   state.textOffset,
  //   state.textPixelData,
  //   tools,
  // ])

  // const draw = useCallback(() => {
  //   drawPlane()
  //   if (state.planeIsDrawn) {
  //     drawText()
  //     // Call other drawing functions like drawGlitches, drawAnimLines, etc.
  //   }
  // }, [drawPlane, drawText, state.planeIsDrawn])

  // const updateTextConfig = () => {
  //   setState((prevState: any) => ({
  //     ...prevState,
  //     text: {
  //       baseLine: 'top',
  //       font: '800 170px Montserrat',
  //       value: 'FAJJET',
  //     },
  //   }))
  // }

  // const initCheckingInterval = () => {
  //   // checkingIntervalId.current = setInterval(() => {
  //   //   setState((prevState: { time: number; lt: number; tabIsActive: any }) => ({
  //   //     ...prevState,
  //   //     tabIsActive: prevState.time <= prevState.lt ? false : true,
  //   //     lt: prevState.time,
  //   //     needRedraw: !prevState.tabIsActive,
  //   //   }))
  //   // }, 100)
  // }

  // const updateState = useCallback(() => {
  //   const now = performance.now()
  //   const delta = now - state.dlt

  //   let mousePower = state.mousePower
  //   if (mouse.current.down.state) {
  //     mousePower += 0.001 * delta
  //     if (mousePower >= 1) {
  //       mousePower = 1
  //       mouseDivRef.current.classList.remove('active')
  //     }
  //   } else {
  //     mousePower -= 0.001 * delta
  //     if (mousePower <= 0) mousePower = 0
  //   }

  //   const mp = tools.cellEasing(mousePower, 0, 1, 1)

  //   let dotsProgress = state.dotsProgress
  //   if (state.planeProgress >= 0.2) {
  //     dotsProgress += 0.00035 * delta
  //     if (dotsProgress >= 1) dotsProgress = 1
  //   }

  //   let planeProgress = state.planeProgress + 0.00035 * delta
  //   if (planeProgress >= 1) planeProgress = 1

  //   let fadeInProgress = state.fadeInProgress
  //   let stepOffset = state.stepOffset
  //   let textOffset = state.textOffset
  //   let markupOffset = state.markupOffset
  //   let textProgress = state.textProgress

  //   if (state.planeIsDrawn) {
  //     fadeInProgress += 0.00015 * delta
  //     if (fadeInProgress >= 1) fadeInProgress = 1

  //     stepOffset += 0.002 * delta + mp * (0.0035 * delta)
  //     textOffset += 0.00005 * delta + mp * (0.002 * delta)
  //     markupOffset += 0.00015 * delta + mp * (0.00035 * delta)

  //     textProgress += 0.0005 * delta
  //     if (textProgress >= 1) textProgress = 1
  //   }

  //   setState((prevState: any) => ({
  //     ...prevState,
  //     delta,
  //     dlt: now,
  //     mousePower,
  //     dotsProgress,
  //     planeProgress,
  //     fadeInProgress,
  //     stepOffset,
  //     textOffset,
  //     markupOffset,
  //     textProgress,
  //   }))
  // }, [
  //   state.dlt,
  //   state.dotsProgress,
  //   state.fadeInProgress,
  //   state.markupOffset,
  //   state.mousePower,
  //   state.planeIsDrawn,
  //   state.planeProgress,
  //   state.stepOffset,
  //   state.textOffset,
  //   state.textProgress,
  //   tools,
  // ])
  // const loop = useCallback(() => {
  //   const animate = () => {
  //     const ctx = context.current.main
  //     const currentTime = Date.now()
  //     setState((prevState: any) => ({
  //       ...prevState,
  //       time: currentTime,
  //     }))
  //     ctx.clearRect(0, 0, doc.current.width, doc.current.height)
  //     updateState()
  //     draw()
  //     if (state.needRedraw)
  //       setState((prevState: any) => ({
  //         ...prevState,
  //         needRedraw: false,
  //       }))
  //     animationFrameId.current = requestAnimationFrame(animate)
  //   }
  //   animate()
  // }, [draw, state.needRedraw, updateState])

  // // Implement other drawing functions similarly...

  // // Event handlers
  // const mouseMoveHandler = (e: { clientX: number; clientY: number }) => {
  //   mouse.current.x = e.clientX
  //   mouse.current.y = e.clientY
  //   mouse.current.coords = {
  //     x: (mouse.current.x / doc.current.width - 0.5) / 0.5,
  //     y: ((mouse.current.y / doc.current.height - 0.5) / 0.5) * -1,
  //   }
  // }

  // const mouseDownHandler = (e: { clientX: any; clientY: any }) => {
  //   mouse.current.down = {
  //     state: true,
  //     x: e.clientX,
  //     y: e.clientY,
  //   }
  // }

  // const mouseUpHandler = () => {
  //   mouse.current.down.state = false
  // }

  // const contextMenuHandler = (e: { preventDefault: () => void }) => {
  //   e.preventDefault()
  // }

  // useEffect(() => {
  //   doc.current = { width: window?.innerWidth, height: window?.innerHeight }
  //   initEvents()
  //   canvasInit()
  //   loop()
  //   initCheckingInterval()
  //   splitText()
  // }, [canvasInit, initEvents, loop])

  useEffect(() => {
    const animation = new GraphPaperAnimation()
  }, [])

  return (
    <>
      {/* SVG Symbols */}
      <svg display='none'>
        <symbol
          version='1.1'
          x='0px'
          y='0px'
          width='31.665px'
          height='31.665px'
          viewBox='0 0 31.665 31.665'
          style={{
            // @ts-ignore
            enableBackground: 'new 0 0 31.665 31.665',
          }}
          xmlSpace='preserve'
        >
          <g>
            <path
              d='M16.878,0.415c-0.854-0.565-1.968-0.552-2.809,0.034L1.485,9.214c-0.671,0.468-1.071,1.233-1.071,2.052v9.444
            c0,0.84,0.421,1.623,1.122,2.086l12.79,8.455c0.836,0.553,1.922,0.553,2.758,0l13.044-8.618c0.7-0.463,1.122-1.246,1.122-2.086
            v-9.279c0-0.839-0.421-1.622-1.121-2.085L16.878,0.415z M26.621,10.645l-4.821,3.237l-4.521-3.288L17.25,4.127L26.621,10.645z
             M13.979,4.133v6.329l-4.633,3.24l-4.621-3.099L13.979,4.133z M3.458,13.722l2.991,2.004l-2.991,2.093V13.722z M14.058,27.215
            l-9.331-6.258l4.661-3.258l4.67,3.133V27.215z M12.286,15.674l3.021-2.113l3.519,2.313l-3.119,2.095L12.286,15.674z M17.354,27.215
            V20.83l4.463-2.991l4.805,3.159L17.354,27.215z M27.954,17.927l-3.168-2.082l3.168-2.125V17.927z'
            />
          </g>
        </symbol>
        <symbol
          version='1.1'
          id='twitter'
          x='0px'
          y='0px'
          viewBox='0 0 612 612'
          style={{
            // @ts-ignore
            enableBackground: 'new 0 0 612 612',
          }}
          xmlSpace='preserve'
        >
          <g>
            <g>
              <path
                d='M612,116.258c-22.525,9.981-46.694,16.75-72.088,19.772c25.929-15.527,45.777-40.155,55.184-69.411
                c-24.322,14.379-51.169,24.82-79.775,30.48c-22.907-24.437-55.49-39.658-91.63-39.658c-69.334,0-125.551,56.217-125.551,125.513
                c0,9.828,1.109,19.427,3.251,28.606C197.065,206.32,104.556,156.337,42.641,80.386c-10.823,18.51-16.98,40.078-16.98,63.101
                c0,43.559,22.181,81.993,55.835,104.479c-20.575-0.688-39.926-6.348-56.867-15.756v1.568c0,60.806,43.291,111.554,100.693,123.104
                c-10.517,2.83-21.607,4.398-33.08,4.398c-8.107,0-15.947-0.803-23.634-2.333c15.985,49.907,62.336,86.199,117.253,87.194
                c-42.947,33.654-97.099,53.655-155.916,53.655c-10.134,0-20.116-0.612-29.944-1.721c55.567,35.681,121.536,56.485,192.438,56.485
                c230.948,0,357.188-191.291,357.188-357.188l-0.421-16.253C573.872,163.526,595.211,141.422,612,116.258z'
              />
            </g>
          </g>
        </symbol>
      </svg>
      <main>
        <canvas id='plane-canvas'></canvas>
        <canvas id='main-canvas'></canvas>
        <div className='mouse'>Hold mouse1 button</div>
        <div className='plate'>
          <h2 className='text-animation' data-js='text'>
            frontend developer
          </h2>
          <p className='text-animation' data-js='text'>
            Russia, Saint-Petersburg
          </p>
          <div className='social'>
            <a
              target='_blank'
              rel='noopener noreferrer'
              className='social__twitter'
              href='https://twitter.com/fajjet'
            ></a>
            <a
              target='_blank'
              rel='noopener noreferrer'
              className='social__codepen'
              href='https://codepen.io/fajjet'
            ></a>
          </div>
        </div>
      </main>
    </>
  )
}
