import renderToCanvas from '@/lib/3d/helpers/render-to-canvas'
import * as THREE from 'three'

export default async function renderToSprite(
  content: { canvas: any; width: any; height: any; Component: any },
  { width, height }: any
) {
  const canvas: any = await renderToCanvas(content, {
    width,
    height,
  })
  const map = new THREE.CanvasTexture(canvas)
  const material = new THREE.SpriteMaterial({ map })
  const sprite = new THREE.Sprite(material)
  sprite.scale.set(width / 100, height / 100, 0.1)
  return sprite
}
