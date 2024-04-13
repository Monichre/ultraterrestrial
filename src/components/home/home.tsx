'use client'

import { PlanetMenu } from '../planet-menu'
import { Astronaut } from '../ui/home/astronaut/astronaut'

export interface HomeProps {}

export const Home: React.FC<HomeProps> = ({ children }: any) => {
  return (
    <>
      <PlanetMenu />

      <Astronaut />
    </>
  )
}
