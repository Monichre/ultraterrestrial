export function DotGridBackground({ children }: any) {
  return (
    <div className='h-full w-full bg-black  bg-dot-white/[0.2] bg-dot-black/[0.2] absolute top-0 left-0 flex items-center justify-center'>
      {/* Radial gradient for the container to give a faded look */}
      <div className='absolute pointer-events-none inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]'></div>
      {children}
    </div>
  )
}
