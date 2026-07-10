'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { NAV_LINKS, SOCIALS } from '@/constants'

const SECTION_IDS = ['about', 'music', 'merch', 'contact']

const NavLink = ({
  title,
  link,
  isActive,
  onClick,
}: {
  title: string
  link: string
  isActive: boolean
  onClick?: () => void
}) => {
  const isHashLink = link.startsWith('#')

  const className = `cursor-pointer font-bold transition hover:text-primary ${isActive ? 'text-primary' : 'text-gray-200'}`

  if (isHashLink) {
    return (
      <a href={link} className={className} onClick={onClick}>
        {title}
      </a>
    )
  }

  return (
    <Link href={link} className={className} onClick={onClick}>
      {title}
    </Link>
  )
}

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const getOffsets = () => {
      return SECTION_IDS.map((id) => {
        const el = document.getElementById(id)
        return el
          ? { id, top: el.getBoundingClientRect().top + window.scrollY }
          : null
      }).filter(Boolean) as { id: string; top: number }[]
    }

    let offsets = getOffsets()
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY + 100
          let current = ''

          for (let i = offsets.length - 1; i >= 0; i--) {
            if (offsets[i].top <= scrollY) {
              current = offsets[i].id
              break
            }
          }

          setActiveSection(current)
          ticking = false
        })
        ticking = true
      }
    }

    const handleResize = () => {
      offsets = getOffsets()
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleResize)
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const isGameActive =
    typeof window !== 'undefined' && window.location.pathname === '/game'

  return (
    <div
      className={`fixed top-0 z-50 h-[65px] w-full px-4 transition-all duration-300 md:px-10 ${
        isScrolled
          ? 'bg-background/50 shadow-lg backdrop-blur-lg'
          : 'bg-background'
      }`}
    >
      <div className="grid h-full w-full grid-cols-3 items-center">
        <Link href="/" className="flex items-center justify-self-start">
          <div className="cursor-pointer">
            <Image
              src="/logo.png"
              alt="Logo"
              loading="eager"
              width={658}
              height={231}
              draggable={false}
              className="relative z-10 h-auto w-[130px]"
            />
          </div>
        </Link>

        <div className="hidden justify-self-center md:flex">
          <div className="flex items-center justify-center gap-6 rounded-full border-[rgba(112,66,248,0.38)] bg-[rgba(3,0,20,0.37)] px-6 py-[10px] whitespace-nowrap text-gray-200">
            {NAV_LINKS.map((link) => {
              const sectionId = link.link.replace('#', '')
              const isActive =
                link.link === '/'
                  ? activeSection === '' && !isGameActive
                  : link.link.startsWith('#')
                    ? activeSection === sectionId
                    : isGameActive && link.link === '/game'

              return (
                <NavLink
                  key={link.title}
                  title={link.title}
                  link={link.link}
                  isActive={isActive}
                />
              )
            })}
          </div>
        </div>

        <div className="hidden flex-row gap-5 justify-self-end md:flex">
          {SOCIALS.map(({ link, name, icon: Icon }) => (
            <Link
              href={link}
              target="_blank"
              rel="noreferrer noopener"
              key={name}
            >
              <Icon className="hover:border-primary hover:text-primary h-9 w-9 rounded-full border border-white p-2 text-white transition" />
            </Link>
          ))}
        </div>

        <button
          className={`col-start-3 flex flex-col items-center justify-center gap-[4px] justify-self-end md:hidden ${isMobileMenuOpen ? 'hamburger-open' : ''}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className="hamburger-line block h-[2.5px] w-6 rounded bg-white" />
          <span className="hamburger-line block h-[2.5px] w-6 rounded bg-white" />
          <span className="hamburger-line block h-[2.5px] w-6 rounded bg-white" />
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="bg-background border-primary/20 absolute top-[65px] left-0 flex w-full flex-col items-center border-t p-5 md:hidden"
          >
            <div className="flex flex-col items-center gap-4">
              {NAV_LINKS.map((link) => {
                const sectionId = link.link.replace('#', '')
                const isActive =
                  link.link === '/'
                    ? activeSection === '' && !isGameActive
                    : link.link.startsWith('#')
                      ? activeSection === sectionId
                      : isGameActive && link.link === '/game'

                return (
                  <button
                    key={link.title}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <NavLink
                      title={link.title}
                      link={link.link}
                      isActive={isActive}
                    />
                  </button>
                )
              })}
            </div>

            <div className="mt-6 flex justify-center gap-6">
              {SOCIALS.map(({ link, name, icon: Icon }) => (
                <Link
                  href={link}
                  target="_blank"
                  rel="noreferrer noopener"
                  key={name}
                >
                  <Icon className="hover:border-primary hover:text-primary h-9 w-9 rounded-full border border-white p-2 text-white transition" />
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
