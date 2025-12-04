import { useEffect, useState, type CSSProperties, type ComponentPropsWithoutRef, type ElementType } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../lib/utils'

type Sparkle = {
  id: string
  x: string
  y: string
  color: string
  delay: number
  scale: number
  lifespan: number
}

const defaultSparkleColors = {
  first: '#9E7AFF',
  second: '#FE8BBB',
}

type SparklesTextProps<T extends ElementType = 'div'> = {
  as?: T
  text: string
  className?: string
  sparklesCount?: number
  colors?: {
    first: string
    second: string
  }
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'text' | 'children' | 'color'>

const SparklesText = <T extends ElementType = 'div'>(props: SparklesTextProps<T>) => {
  const {
    as,
    text,
    className,
    sparklesCount = 10,
    colors = defaultSparkleColors,
    ...rest
  } = props

  const Component = (as ?? 'div') as ElementType
  const [sparkles, setSparkles] = useState<Sparkle[]>([])

  useEffect(() => {
    const { first, second } = colors

    const createSparkle = (): Sparkle => {
      const x = `${Math.random() * 100}%`
      const y = `${Math.random() * 100}%`
      const color = Math.random() > 0.5 ? first : second
      const delay = Math.random() * 2
      const scale = Math.random() * 1 + 0.3
      const lifespan = Math.random() * 10 + 5
      return {
        id: `${Date.now()}-${x}-${y}`,
        x,
        y,
        color,
        delay,
        scale,
        lifespan,
      }
    }

    const initialize = () => {
      setSparkles(Array.from({ length: sparklesCount }, createSparkle))
    }

    const interval = window.setInterval(() => {
      setSparkles((current) =>
        current.map((sparkle) => {
          if (sparkle.lifespan <= 0) {
            return createSparkle()
          }
          return { ...sparkle, lifespan: sparkle.lifespan - 0.1 }
        }),
      )
    }, 100)

    initialize()

    return () => {
      window.clearInterval(interval)
    }
  }, [colors.first, colors.second, sparklesCount])

  const style = {
    '--sparkles-first-color': colors.first,
    '--sparkles-second-color': colors.second,
  } as CSSProperties

  return (
    <Component className={cn('sparkles-text', className)} style={style} {...rest}>
      <span className="sparkles-text-inner">
        {sparkles.map((sparkle) => (
          <Sparkle key={sparkle.id} {...sparkle} />
        ))}
        <strong>{text}</strong>
      </span>
    </Component>
  )
}

const Sparkle = ({ id, x, y, color, delay, scale }: Sparkle) => {
  return (
    <motion.svg
      key={id}
      className="sparkle"
      initial={{ opacity: 0, left: x, top: y }}
      animate={{ opacity: [0, 1, 0], scale: [0, scale, 0], rotate: [75, 120, 150] }}
      transition={{ duration: 0.8, repeat: Infinity, delay }}
      width="21"
      height="21"
      viewBox="0 0 21 21"
    >
      <path
        d="M9.82531 0.843845C10.0553 0.215178 10.9446 0.215178 11.1746 0.843845L11.8618 2.72026C12.4006 4.19229 12.3916 6.39157 13.5 7.5C14.6084 8.60843 16.8077 8.59935 18.2797 9.13822L20.1561 9.82534C20.7858 10.0553 20.7858 10.9447 20.1561 11.1747L18.2797 11.8618C16.8077 12.4007 14.6084 12.3916 13.5 13.5C12.3916 14.6084 12.4006 16.8077 11.8618 18.2798L11.1746 20.1562C10.9446 20.7858 10.0553 20.7858 9.82531 20.1562L9.13819 18.2798C8.59932 16.8077 8.60843 14.6084 7.5 13.5C6.39157 12.3916 4.19225 12.4007 2.72023 11.8618L0.843814 11.1747C0.215148 10.9447 0.215148 10.0553 0.843814 9.82534L2.72023 9.13822C4.19225 8.59935 6.39157 8.60843 7.5 7.5C8.60843 6.39157 8.59932 4.19229 9.13819 2.72026L9.82531 0.843845Z"
        fill={color}
      />
    </motion.svg>
  )
}

export { SparklesText }
