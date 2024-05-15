'use client'

import { hexToRgba, palette } from '@/utils/constants/colors'
import { ArrowRightIcon, SearchIcon } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import styled, { css, keyframes } from 'styled-components'

export const SearchContainer: any = styled.div`
  width: 50px;
  height: 50px;
  box-sizing: border-box;
  border-radius: 50px;
  border: 1px solid ${palette.gray};
  padding: 5px;
  background: transparent;
  transition: all 0.5s;
  background: transparent;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;

  ${({ hover }: any) =>
    hover &&
    css`
      width: 50%;

      @media (min-width: 768px) {
        width: 80%;
      }
    `}
`

export const SearchInput: any = styled.input`
  // position: absolute;
  // top: 0;
  // left: 0;
  width: 100%;
  height: 24px;
  line-height: 16px;
  font-size: 16px;
  outline: 0;
  border: 0;

  border-radius: 20px;
  background: transparent;
  padding: 0 20px;
  margin: 0;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;

  display: ${(props: any) => (props.showSearchInput ? 'block' : 'none')};
`

/** icons */
const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`

const IconCommonCss = css`
  height: 1.25rem;
  width: 1.25rem;
  fill: none;
  z-index: 10;
  background: transparent;
  animation: ${fadeIn} 1s linear;
`

export const IconMagnifyingGlass = styled(SearchIcon)`
  ${IconCommonCss}
`

export const IconRightArrow = styled(ArrowRightIcon)`
  ${IconCommonCss}
  align-self: flex-end;
  // margin-right: 8px;
  cursor: pointer;
  position: absolute;
  top: 14px;
  right: 16px;

  fill: #fff;
  &:hover {
    fill: #fff;
  }
`

export const Search = () => {
  const targetRef: any = useRef(null)
  const [isHovered, setIsHovered] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const showSearchInput = isHovered || isFocused

  useEffect(() => {
    targetRef.current.value = ''
  }, [showSearchInput, targetRef])

  return (
    <SearchContainer
      className='absolute z-50 top-4 right-4'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      hover={showSearchInput}
    >
      <SearchInput ref={targetRef} showSearchInput={showSearchInput} />
      {showSearchInput ? <IconRightArrow /> : <IconMagnifyingGlass />}
    </SearchContainer>
  )
}
