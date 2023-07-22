import React, { memo, useState, ReactNode, useRef, useEffect } from 'react'
import { Flex } from 'rebass'
import { Button, ButtonProps } from './Button'

const DownArrow = ({ color = 'white' }: { color?: string }) => {
  return (
    <div
      style={{
        display: 'inline-block',
        marginLeft: '.255em',
        verticalAlign: '.255em',
        content: '',
        borderTop: '.3em solid',
        borderRight: '.3em solid transparent',
        borderBottom: 0,
        borderLeft: '.3em solid transparent',
        color,
      }}
    />
  )
}

export function useComponentVisible(initialIsVisible: boolean) {
  const [isComponentVisible, setIsComponentVisible] = useState(initialIsVisible)
  const ref = useRef<any>(null)

  const handleClickOutside = (event: Event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsComponentVisible(false)
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true)
    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  }, [])

  return { ref, isComponentVisible, setIsComponentVisible }
}

export const ButtonDropdown = memo(
  ({
    children,
    display,
    ...rest
  }: ButtonProps & {
    display?: ((v: () => void) => ReactNode) | ReactNode
  }) => {
    const { ref, isComponentVisible, setIsComponentVisible } =
      useComponentVisible(false)

    return (
      <Flex style={{ position: 'relative', width: 'auto', height: 'auto' }}>
        <Button {...rest} onClick={() => setIsComponentVisible((v) => !v)}>
          {children}
        </Button>

        <Flex
          ref={ref}
          sx={{
            position: 'absolute',
            top: '100%',
            width: 'auto',
            height: 'auto',
            right: 0,
            zIndex: 9999,
          }}
        >
          {isComponentVisible &&
            (!!display && typeof display === 'function'
              ? display(() => setIsComponentVisible(false))
              : display)}
        </Flex>
      </Flex>
    )
  }
)

ButtonDropdown.displayName = 'ButtonDropdown'

export const CustomDropdown = memo(
  ({
    children,
    display,
    ...rest
  }: {
    display?: ((v: () => void) => ReactNode) | ReactNode
    children: (v: () => void) => ReactNode
  }) => {
    const { ref, isComponentVisible, setIsComponentVisible } =
      useComponentVisible(false)

    return (
      <Flex style={{ position: 'relative', width: 'auto', height: 'auto' }}>
        {children(() => setIsComponentVisible((v) => !v))}
        <Flex
          ref={ref}
          sx={{
            position: 'absolute',
            top: '100%',
            width: 'auto',
            height: 'auto',
            right: 0,
            zIndex: 9999,
          }}
        >
          {isComponentVisible &&
            (!!display && typeof display === 'function'
              ? display(() => setIsComponentVisible(false))
              : display)}
        </Flex>
      </Flex>
    )
  }
)

CustomDropdown.displayName = 'ButtonDropdown'
