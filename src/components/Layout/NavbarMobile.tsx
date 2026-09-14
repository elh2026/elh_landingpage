'use client'

import React, { useRef, useState } from 'react'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { MdChevronRight } from 'react-icons/md'
import { FaBars } from 'react-icons/fa6'

import useClickOutside from '@/hooks/useClickOutSide'

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

const NavbarMobile = ({ data, handleClick }: IProps) => {
  const navbarRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})
  const safeHref = (href: string) => (href && href !== '#' ? href : '/products/')

  useClickOutside(navbarRef, () => {
    setOpen(false)
  })

  const toggle = (key: string) => {
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const handleOpenSubMenu = (isSub: boolean, label: string, href: string) => {
    if (isSub) {
      toggle(label)
    } else {
      router.push(safeHref(href))
      setOpen(false)
    }
  }

  return (
    <div ref={navbarRef} className="relative -mx-4 px-4 xl:hidden">
      <button
        onClick={() => setOpen(!open)}
        aria-label="toggle mobile menu"
        className="relative isolate z-[999] flex bg-transparent text-white"
        type="button"
      >
        <FaBars />
      </button>

      <div
        data-toggle={open}
        className="bg-primary-blue absolute top-0 left-0 z-40 h-svh w-0 text-white backdrop-blur-sm transition-[width] duration-400 ease-in-out data-[toggle=false]:pointer-events-none data-[toggle=false]:delay-[400ms] data-[toggle=true]:w-full"
      >
        <div
          data-toggle={open}
          className="mt-4 p-4 opacity-0 transition-opacity duration-300 ease-in-out data-[toggle=false]:delay-[0ms] data-[toggle=true]:opacity-100 data-[toggle=true]:delay-[200ms]"
        >
          {data.map(({ label, href, children, clickable }) => (
            <div key={label} className="mb-2">
              <button
                type="button"
                onClick={() => {
                  clickable ? handleClick(href) : handleOpenSubMenu(!!children?.length, label, href)
                }}
                className="flex w-full items-center justify-between text-left"
              >
                <p className={`text-xl ${pathname === href ? 'text-primary-orange' : ''}`}>{label}</p>
                {children?.length ? (
                  <p>
                    <MdChevronRight
                      className={`text-2xl transition-transform ${expanded[label] ? 'rotate-[270deg]' : 'rotate-90'}`}
                    />
                  </p>
                ) : null}
              </button>

              {children?.length && expanded[label] && (
                <ul className="mt-2 ml-4 space-y-2">
                  {children.map((item) => (
                    <li key={item.label}>
                      {item.children?.length ? (
                        <button
                          type="button"
                          onClick={() => {
                            item.clickable ? handleClick(item.href) : toggle(item.label)
                          }}
                          className="flex w-full cursor-pointer items-center justify-between text-left"
                        >
                          <span className={`${pathname === item.href ? 'text-primary-orange' : ''}`}>{item.label}</span>
                          <MdChevronRight
                            className={`transition-transform ${expanded[item.label] ? 'rotate-[270deg]' : 'rotate-90'}`}
                          />
                        </button>
                      ) : item.clickable ? (
                        <button
                          onClick={() => {
                            handleClick(item.href)
                            setOpen(false)
                          }}
                          className={`block ${pathname === item.href ? 'text-primary-orange' : ''}`}
                        >
                          {item.label}
                        </button>
                      ) : (
                        <Link
                          href={safeHref(item.href)}
                          onClick={() => setOpen(false)}
                          className={`block ${pathname === item.href ? 'text-primary-orange' : ''}`}
                        >
                          {item.label}
                        </Link>
                      )}

                      {!!item.children?.length && expanded[item.label] && (
                        <ul className="mt-2 ml-4 space-y-1 text-sm">
                          {item.children.map((subItem) => (
                            <li key={subItem.label}>
                              <Link
                                href={safeHref(subItem.href)}
                                onClick={() => setOpen(false)}
                                className={`${pathname === subItem.href ? 'text-primary-orange' : ''}`}
                              >
                                {subItem.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default NavbarMobile
