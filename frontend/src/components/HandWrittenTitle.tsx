import { motion, cubicBezier, type Variants } from 'framer-motion'

interface HandWrittenTitleProps {
  title?: string
  subtitle?: string
  className?: string
}

const drawVariants: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 2.5, ease: cubicBezier(0.43, 0.13, 0.23, 0.96) },
      opacity: { duration: 0.5 },
    },
  },
}

function HandWrittenTitle({ title = 'Hand Written', subtitle, className = '' }: HandWrittenTitleProps) {
  const wrapperClass = ['handwritten-wrapper', className].filter(Boolean).join(' ')

  return (
    <div className={wrapperClass}>
      <motion.svg
        width="100%"
        height="100%"
        viewBox="0 0 1200 600"
        initial="hidden"
        animate="visible"
        className="handwritten-svg"
        role="presentation"
        aria-hidden="true"
      >
        <title>Founders Curve</title>
        <motion.path
          d="M 950 90 
             C 1250 300, 1050 480, 600 520
             C 250 520, 150 480, 150 300
             C 150 120, 350 80, 600 80
             C 850 80, 950 180, 950 180"
          fill="none"
          strokeWidth="12"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial="hidden"
          animate="visible"
          variants={drawVariants}
          className="handwritten-path"
        />
      </motion.svg>
      <div className="handwritten-content">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="handwritten-title"
        >
          {title}
        </motion.h2>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="handwritten-subtitle"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </div>
  )
}

export { HandWrittenTitle }
