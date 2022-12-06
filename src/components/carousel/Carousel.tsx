import { Fade, Grow, Slide } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Flex, FlexProps } from 'rebass'

export const Carousel = ({
  content,
  duration,
  fadeDuration,
}: {
  content: JSX.Element[]
  duration?: number
  fadeDuration?: number
}) => {
  const [index, setIndex] = useState<number>(0)

  useEffect(() => {
    let interval = setInterval(() => {
      setIndex((i) => (i === content.length - 1 ? 0 : i + 1))
    }, (duration ?? 5) * 1000)

    return () => clearInterval(interval)
  }, [index, setIndex, content, duration])

  return (
    <>
      {content.map((comp, i) => (
        <Fade
          in={i === index}
          key={i}
          mountOnEnter
          unmountOnExit
          style={{
            width: '100%',
            position: i === index ? 'relative' : 'absolute',
            transitionDelay: i === index ? `${fadeDuration ?? 50}ms` : '0ms',
          }}
        >
          {comp}
        </Fade>
      ))}
    </>
  )
}
