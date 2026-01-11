import { motion } from 'framer-motion'
import { cn } from '../lib/utils'

interface AnimatedTextProps {
  text?: string
  className?: string
  shadowColors?: {
    first?: string
    second?: string
    third?: string
    fourth?: string
    glow?: string
  }
}

const defaultShadows = {
  first: '#07bccc',
  second: '#e601c0',
  third: '#e9019a',
  fourth: '#f40468',
  glow: '#f40468',
}

function TextRewind({ text = 'LINE', className = '', shadowColors = defaultShadows }: AnimatedTextProps) {
  const shadows = { ...defaultShadows, ...shadowColors }

  const textShadowValue = `10px 10px 0px ${shadows.first}, 15px 15px 0px ${shadows.second}, 20px 20px 0px ${shadows.third}, 25px 25px 0px ${shadows.fourth}, 45px 45px 10px ${shadows.glow}`

  return (
    <div className="text-rewind-wrapper">
      <motion.div
        className={cn(
          'text-rewind',
          className,
        )}
        initial={{ textShadow: textShadowValue }}
        animate={{ textShadow: textShadowValue }}
        whileHover={{ textShadow: 'none' }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        {text}
      </motion.div>
    </div>
  )
}

export { TextRewind }
