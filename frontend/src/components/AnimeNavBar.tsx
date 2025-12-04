import { AnimatePresence, motion } from 'framer-motion'
import { type LucideIcon } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { cn } from '../lib/utils'

export type NavItem = {
  name: string
  url: string
  icon: LucideIcon
}

type AnimeNavBarProps = {
  items: NavItem[]
  className?: string
  defaultActive?: string
  brand?: string
}

export function AnimeNavBar({
  items,
  className,
  defaultActive,
  brand = 'NoxusDynamics',
}: AnimeNavBarProps) {
  const [mounted, setMounted] = useState(false)
  const [hoveredTab, setHoveredTab] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<string>(defaultActive ?? items[0]?.name ?? '')
  const [isMobile, setIsMobile] = useState(false)

  const navItems = useMemo(() => items ?? [], [items])

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) {
      return
    }

    const sections = navItems
      .filter((item) => item.url.startsWith('#'))
      .map((item) => {
        const element = document.querySelector<HTMLElement>(item.url)
        return element ? { element, name: item.name } : null
      })
      .filter(Boolean) as { element: HTMLElement; name: string }[]

    if (sections.length === 0) {
      return
    }

    let ticking = false

    const updateActiveFromScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight * 0.35
      let currentSection = sections[0]?.name ?? (navItems[0]?.name ?? '')

      for (const section of sections) {
        const offsetTop = section.element.getBoundingClientRect().top + window.scrollY
        if (scrollPosition >= offsetTop) {
          currentSection = section.name
        }
      }

      setActiveTab((prev) => (prev === currentSection ? prev : currentSection))
      ticking = false
    }

    const handleScroll = () => {
      if (!ticking) {
        ticking = true
        window.requestAnimationFrame(updateActiveFromScroll)
      }
    }

    updateActiveFromScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [mounted, navItems])

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleNavClick = (name: string, url: string) => {
    setActiveTab(name)
    if (url.startsWith('#')) {
      const target = document.querySelector(url)
      target?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  if (!mounted) {
    return null
  }

  return (
    <div className={cn('anime-nav-wrapper', className)}>
      <div className="anime-nav-inner">
        <motion.div
          className="anime-nav"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        >
          <div className="anime-nav-logo">{brand}</div>
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = activeTab === item.name
            const isHovered = hoveredTab === item.name

            return (
              <a
                key={item.name}
                href={item.url}
                onClick={(event) => {
                  event.preventDefault()
                  handleNavClick(item.name, item.url)
                }}
                onMouseEnter={() => setHoveredTab(item.name)}
                onMouseLeave={() => setHoveredTab(null)}
                className={cn('anime-nav-item', isActive && 'anime-nav-item-active')}
              >
                {isActive && (
                  <motion.div
                    className="anime-nav-item-highlight"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.03, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <div className="anime-nav-highlight-layer" />
                    <div className="anime-nav-highlight-layer" />
                    <div className="anime-nav-highlight-layer" />
                    <div className="anime-nav-highlight-layer" />
                    <div className="anime-nav-highlight-shine" />
                  </motion.div>
                )}

                <motion.span
                  className={cn('anime-nav-item-label', isMobile && 'anime-nav-item-label-hidden')}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  {item.name}
                </motion.span>
                <motion.span
                  className={cn('anime-nav-item-icon', !isMobile && 'anime-nav-item-icon-hidden')}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon size={18} strokeWidth={2.5} />
                </motion.span>

                <AnimatePresence>
                  {isHovered && !isActive && (
                    <motion.div
                      className="anime-nav-item-hover"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                    />
                  )}
                </AnimatePresence>

                {isActive && (
                  <motion.div
                    layoutId="anime-mascot"
                    className="anime-nav-mascot"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  >
                    <div className="anime-nav-mascot-body">
                      <motion.div
                        className="anime-nav-mascot-face"
                        animate={
                          hoveredTab
                            ? {
                                scale: [1, 1.1, 1],
                                rotate: [0, -5, 5, 0],
                                transition: { duration: 0.5, ease: 'easeInOut' },
                              }
                            : {
                                y: [0, -3, 0],
                                transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
                              }
                        }
                      >
                        <motion.div className="anime-nav-eye left" animate={hoveredTab ? { scaleY: [1, 0.2, 1] } : {}} />
                        <motion.div className="anime-nav-eye right" animate={hoveredTab ? { scaleY: [1, 0.2, 1] } : {}} />
                        <motion.div className="anime-nav-blush left" animate={{ opacity: hoveredTab ? 0.8 : 0.6 }} />
                        <motion.div className="anime-nav-blush right" animate={{ opacity: hoveredTab ? 0.8 : 0.6 }} />
                        <motion.div
                          className="anime-nav-mouth"
                          animate={hoveredTab ? { scaleY: 1.5, y: -1 } : { scaleY: 1, y: 0 }}
                        />
                        <AnimatePresence>
                          {hoveredTab && (
                            <>
                              <motion.div
                                className="anime-nav-sparkle sparkle-right"
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0 }}
                              >
                                ✨
                              </motion.div>
                              <motion.div
                                className="anime-nav-sparkle sparkle-left"
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0 }}
                                transition={{ delay: 0.1 }}
                              >
                                ✨
                              </motion.div>
                            </>
                          )}
                        </AnimatePresence>
                      </motion.div>
                      <motion.div
                        className="anime-nav-mascot-shadow"
                        animate={
                          hoveredTab
                            ? {
                                y: [0, -4, 0],
                                transition: { duration: 0.3, repeat: Infinity, repeatType: 'reverse' },
                              }
                            : {
                                y: [0, 2, 0],
                                transition: {
                                  duration: 1,
                                  repeat: Infinity,
                                  ease: 'easeInOut',
                                  delay: 0.5,
                                },
                              }
                        }
                      />
                    </div>
                  </motion.div>
                )}
              </a>
            )
          })}
        </motion.div>
      </div>
    </div>
  )
}