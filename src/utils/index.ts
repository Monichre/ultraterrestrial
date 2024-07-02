import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const mergeStyles = (styleArray: any[]) =>
  styleArray.map((style: any) => `${style}`).join(' ')

export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
