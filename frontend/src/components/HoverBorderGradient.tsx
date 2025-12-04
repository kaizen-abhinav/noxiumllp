import { motion } from 'framer-motion'
import {
  useEffect,
  useState,
  type ButtonHTMLAttributes,
  type ElementType,
  type MouseEvent,
  type PropsWithChildren,
} from 'react'
import { cn } from '../lib/utils'

type Direction = 'TOP' | 'LEFT' | 'BOTTOM' | 'RIGHT'

const directions: Direction[] = ['TOP', 'LEFT', 'BOTTOM', 'RIGHT']

const movingMap: Record<Direction, string> = {
  TOP: 'radial-gradient(20.7% 50% at 50% 0%, rgb(255 255 255) 0%, rgba(255, 255, 255, 0) 100%)',
  LEFT: 'radial-gradient(16.6% 43.1% at 0% 50%, rgb(255 255 255) 0%, rgba(255, 255, 255, 0) 100%)',
  BOTTOM:
    'radial-gradient(20.7% 50% at 50% 100%, rgb(255 255 255) 0%, rgba(255, 255, 255, 0) 100%)',
  RIGHT:
    'radial-gradient(16.2% 41.2% at 100% 50%, rgb(255 255 255) 0%, rgba(255, 255, 255, 0) 100%)',
}

const highlight =
  'radial-gradient(75% 181.15942028985506% at 50% 50%, #3275f8 0%, rgba(255, 255, 255, 0) 100%)'

type HoverBorderGradientProps = PropsWithChildren<{
  as?: ElementType
  containerClassName?: string
  className?: string
  duration?: number
  clockwise?: boolean
}> &
  ButtonHTMLAttributes<HTMLButtonElement>

export function HoverBorderGradient({
  children,
  containerClassName,
  className,
  as: Tag = 'button',
  duration = 1,
  clockwise = true,
  onMouseEnter,
  onMouseLeave,
  ...props
}: HoverBorderGradientProps) {
  const [hovered, setHovered] = useState(false)
  const [direction, setDirection] = useState<Direction>('TOP')

  const rotateDirection = (current: Direction): Direction => {
    const currentIndex = directions.indexOf(current)
    const nextIndex = clockwise
      ? (currentIndex - 1 + directions.length) % directions.length
      : (currentIndex + 1) % directions.length
    return directions[nextIndex]
  }

  useEffect(() => {
    if (hovered) {
      return
    }

    const interval = window.setInterval(() => {
      setDirection((prev) => rotateDirection(prev))
    }, duration * 1000)

    return () => window.clearInterval(interval)
  }, [hovered, duration, clockwise])

  return (
    <Tag
      onMouseEnter={(event: MouseEvent<HTMLElement>) => {
        setHovered(true)
        onMouseEnter?.(event as MouseEvent<HTMLButtonElement>)
      }}
      onMouseLeave={(event: MouseEvent<HTMLElement>) => {
        setHovered(false)
        onMouseLeave?.(event as MouseEvent<HTMLButtonElement>)
      }}
      className={cn('hover-border-gradient', containerClassName)}
      {...props}
    >
      <div className={cn('hover-border-gradient-content', className)}>{children}</div>
      <motion.div
        className="hover-border-gradient-motion"
        style={{ filter: 'blur(2px)' }}
        initial={{ background: movingMap[direction] }}
        animate={{
          background: hovered ? [movingMap[direction], highlight] : movingMap[direction],
        }}
        transition={{ ease: 'linear', duration }}
      />
      <div className="hover-border-gradient-bg" />
    </Tag>
  )
}
