import { motion } from 'framer-motion'
import type { CSSProperties } from 'react'
import { cn } from '../lib/utils'

type ElegantShapeProps = {
  style?: CSSProperties
  delay?: number
  width?: number
  height?: number
  rotate?: number
  gradient?: string
}

const ElegantShape = ({
  style,
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = 'linear-gradient(90deg, rgba(255,255,255,0.25), transparent)',
}: ElegantShapeProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -150, rotate: rotate - 15 }}
      animate={{ opacity: 1, y: 0, rotate }}
      transition={{
        duration: 2.4,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96],
        opacity: { duration: 1.2 },
      }}
      style={style}
      className="shader-shape"
    >
      <motion.div
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
        style={{ width, height }}
        className="relative"
      >
        <div
          className="shader-shape-core"
          style={{ backgroundImage: gradient }}
        >
          <div className="shader-shape-highlight" />
        </div>
      </motion.div>
    </motion.div>
  )
}

const shapes: ElegantShapeProps[] = [
  {
    delay: 0.3,
    width: 600,
    height: 140,
    rotate: 12,
    gradient: 'linear-gradient(90deg, rgba(99,102,241,0.55), transparent)',
    style: { left: '-15%', top: '15%' },
  },
  {
    delay: 0.5,
    width: 500,
    height: 120,
    rotate: -15,
    gradient: 'linear-gradient(90deg, rgba(244,114,182,0.55), transparent)',
    style: { right: '-10%', top: '70%' },
  },
  {
    delay: 0.4,
    width: 320,
    height: 90,
    rotate: -8,
    gradient: 'linear-gradient(90deg, rgba(167,139,250,0.5), transparent)',
    style: { left: '5%', bottom: '8%' },
  },
  {
    delay: 0.6,
    width: 220,
    height: 70,
    rotate: 20,
    gradient: 'linear-gradient(90deg, rgba(251,191,36,0.5), transparent)',
    style: { right: '15%', top: '12%' },
  },
  {
    delay: 0.7,
    width: 180,
    height: 50,
    rotate: -25,
    gradient: 'linear-gradient(90deg, rgba(34,211,238,0.5), transparent)',
    style: { left: '20%', top: '8%' },
  },
  {
    delay: 0.45,
    width: 260,
    height: 70,
    rotate: 30,
    gradient: 'linear-gradient(90deg, rgba(110,231,183,0.5), transparent)',
    style: { left: '35%', top: '65%' },
  },
  {
    delay: 0.55,
    width: 320,
    height: 80,
    rotate: -32,
    gradient: 'linear-gradient(90deg, rgba(129,140,248,0.5), transparent)',
    style: { right: '35%', bottom: '15%' },
  },
]

const FloatingShader = ({ className }: { className?: string }) => {
  return (
    <div className={cn('shader-backdrop', className)} aria-hidden="true">
      <div className="shader-gradient" />
      <div className="shader-shape-layer">
        {shapes.map((shape, index) => (
          <ElegantShape key={`shader-shape-${index}`} {...shape} />
        ))}
      </div>
      <div className="shader-fade" />
    </div>
  )
}

export { FloatingShader }
