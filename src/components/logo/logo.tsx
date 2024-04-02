import Image from 'next/image'

import { AspectRatio } from '@/components/ui/aspect-ratio'

export interface LogoProps {}

export const Logo: React.FC<LogoProps> = (props: LogoProps) => {
  return (
    <div className='x-[80px] w-[80px] max-w-32 p-8 relative'>
      <Image src='/gold-circle-logo.png' alt='logo' fill objectFit='contain' />
    </div>
  )
}
