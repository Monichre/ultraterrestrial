'use client'

export function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

export const paletteTwo = {
  green: `#6FB08C`,
  darkBlue: `#000100`,
  cambridge: `#407663`,
  richBlack: `#000102`,
  black: `#030304`,
}

export const paletteAltTwo = {
  khaki: `#B2A581`,
  black: `#000001`,
  gray: `#4E5969`,
  smoke: `#130F0E`,
  silver: `#C5CBCC`,
}

export const NEONS = {
  pink: `#E393E6`,
  green: `#79FFE1`,
  blue: `#27F1FF`,
  orange: `#F7A072`,
  yellow: `#FEED72`,
}

export const DOMAIN_MODEL_COLORS = {
  topics: NEONS.pink,
  events: NEONS.green,
  personnel: NEONS.blue,
  organizations: NEONS.yellow,
  testimonies: NEONS.pink,
  root: `#27F1FF`,
}

export const palette: Record<string, string> = {
  forest: `#407663`,
  darkBlue: `#09101D`,
  cambridge: `#6FB08C`,
  richBlack: `#030513`,
  black: `#060404`,
  silver: `#C5CBCC`,
  gray: `#4e5969`,
  brown: `#28180B`,
  smoke: `#130F0E`,
  khaki: `#B2A581`,
  ...NEONS,
}
