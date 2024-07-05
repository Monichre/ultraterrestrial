'use client'

import useCanvasCursor from '@/hooks/useCanvasCursor'

export const CanvasCursor = () => {
  useCanvasCursor()

  return <canvas className='pointer-events-none fixed inset-0' id='canvas' />
}
