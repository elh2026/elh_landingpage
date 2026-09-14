'use client'

import { useState } from 'react'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { MdChevronRight } from 'react-icons/md'

interface IProps {
  data: {
    label: string
    href: string
    clickable?: boolean
    children?: {
      href: string
      label: string
      clickable?: boolean
      children?: {
        href: string
        label: string
        clickable?: boolean
      }[]
    }[]
  }[]

  handleClick: (path: string) => void
}

const NavBar = ({ data, handleClick }: IProps) => {
  const pathname = usePathname()
  const [hover, setHover] = useState<string | null>(null)
  const [closing, setClosing] = useState<string | null>(null)
  const [subHover, setSubHover] = useState<string | null>(null)
  const [subClosing, setSubClosing] = useState<string | null>(null)
  const [isSubClosingDone, setIsSubClosingDone] = useState<boolean>(true)
  const safeHref = (href: string) => (href && href !== '#' ? href : '/products/')

  const handleEnter = (label: string) => {
    if (!isSubClosingDone && hover !== label) return
    setHover(label)
    setClosing(null)
  }

  const handleLeave = (label: string) => {
    setHover(null)
    setClosing(label)
    setTimeout(() => setClosing(null), 300)
  }

  const handleSubEnter = (label: string) => {
    setSubHover(label)
    setSubClosing(null)
    setIsSubClosingDone(false)
  }

  const handleSubLeave = (label: string) => {
    setSubHover(null)
    setSubClosing(label)
    setTimeout(() => {
      setSubClosing(null)
      setIsSubClosingDone(true)
    }, 300)
  }

  return (
    <ul className="nav hidden items-center gap-x-8 xl:flex">
      {data.map(({ label, href, children, clickable }) => {
        const isOpen = hover === label || closing === label

        return (
          <li
            key={label}
            onMouseEnter={() => handleEnter(label)}
            onMouseLeave={() => handleLeave(label)}
            className={`relative z-10 pb-1 text-white ${pathname === href ? 'active' : ''}`}
          >
            {clickable ? (
              <button onClick={() => handleClick(href)} className="flex items-center">
                {label}
                {children?.length ? (
                  <span
                    className={`ml-1 transition-transform duration-300 ${
                      hover === label ? 'rotate-[270deg]' : 'rotate-90'
                    }`}
                  >
                    <MdChevronRight />
                  </span>
                ) : null}
              </button>
            ) : (
              <Link href={safeHref(href)} className="flex items-center">
                {label}
                {children?.length ? (
                  <span
                    className={`ml-1 transition-transform duration-300 ${
                      hover === label ? 'rotate-[270deg]' : 'rotate-90'
                    }`}
                  >
                    <MdChevronRight />
                  </span>
                ) : null}
              </Link>
            )}
            {children?.length && (
              <ul
                className={`absolute-center-x text-primary-blue top-6 z-10 min-w-44 space-y-2 rounded-sm border bg-white text-sm whitespace-nowrap shadow-md transition-all duration-300 ${
                  isOpen
                    ? 'pointer-events-auto translate-y-0 scale-100 p-6 pr-12 opacity-100'
                    : 'pointer-events-none -translate-y-2 scale-95 p-0 opacity-0'
                }`}
              >
                {children.map((item, index) => {
                  const hasSub = !!item.children?.length
                  const isSubOpen = subHover === item.label || subClosing === item.label
                  const lastIndex = index + 1 - children.length === 0
                  return (
                    <li
                      key={item.label}
                      onMouseEnter={() => handleSubEnter(item.label)}
                      onMouseLeave={() => handleSubLeave(item.label)}
                      className={`relative z-20 transition-opacity duration-200 ${hover === label ? 'opacity-100' : 'opacity-0'}`}
                      style={{ transitionDelay: `${index * 60}ms` }}
                    >
                      <div className="flex items-center">
                        {item.clickable ? (
                          <button onClick={() => handleClick(item.href)}>{item.label}</button>
                        ) : (
                          <Link href={safeHref(item.href)}>{item.label}</Link>
                        )}
                        {hasSub && (
                          <span className="ml-1 rotate-90">
                            <MdChevronRight />
                          </span>
                        )}
                      </div>

                      {hasSub && (
                        <ul
                          className={`absolute top-0 z-20 w-max min-w-44 rounded-sm border bg-white p-4 whitespace-nowrap transition-all duration-300 ${lastIndex ? 'top-8 right-[30%]' : 'right-[110%]'} ${
                            isSubOpen
                              ? 'pointer-events-auto translate-y-0 scale-100 opacity-100'
                              : 'pointer-events-none -translate-y-2 scale-95 opacity-0'
                          }`}
                        >
                          {item.children?.map((subItem) => (
                            <li key={subItem.label} className="py-1">
                              <Link href={safeHref(subItem.href)}>{subItem.label}</Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  )
                })}
              </ul>
            )}
          </li>
        )
      })}
    </ul>
  )
}

export default NavBar
