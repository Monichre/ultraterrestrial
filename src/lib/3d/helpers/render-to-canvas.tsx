import { renderToStaticMarkup } from 'react-dom/server'

function loadImage(url: string) {
  const image = new window.Image()
  return new Promise((resolve) => {
    image.onload = () => resolve(image)
    image.src = url
  })
}

export default async function renderToCanvas(
  {
    canvas,
    width,
    height,
    Component,
  }: {
    canvas: HTMLCanvasElement
    width: number
    height: number
    Component: React.ComponentType<any>
  },
  p0: { width: any; height: any }
) {
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')
  const url = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">
      <style type="text/css">
        <![CDATA[
          ${document.getElementById('styles')!.innerHTML}
        ]]>
      </style>
      <foreignObject width=${width} height=${height}>
      ${renderToStaticMarkup(<Component />)}
      </foreignObject>
      </svg>`
  const image: any = await loadImage(url)
  ctx!.drawImage(image, 0, 0)
}