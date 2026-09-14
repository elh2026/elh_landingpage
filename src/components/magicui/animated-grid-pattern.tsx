'use client'

import { useEffect as E, useId as I, useRef as R, useState as S, ComponentPropsWithoutRef as C } from 'react'

import { motion as M } from 'motion/react'

import { cn as N } from '@/lib/utils'

type P = C<'svg'> & {
  width?: number
  height?: number
  x?: number
  y?: number
  strokeDasharray?: any
  numSquares?: number
  maxOpacity?: number
  duration?: number
}

export function A(p: P) {
  const {
    width: w = 40,
    height: h = 40,
    x: _x = -1,
    y: _y = -1,
    strokeDasharray: sd = 0,
    numSquares: ns = 30,
    className: cnx,
    maxOpacity: mo = 0.5,
    duration: d = 2,
    ...rest
  } = p

  const i = I()
  const r = R(null)
  const [dim, setD] = S({ width: 0, height: 0 })
  const [q, setQ] = S(() => Array.from({ length: ns }, (_, k) => ({ id: k, pos: [0, 0] })))

  function g() {
    return [Math.floor((Math.random() * dim.width) / w), Math.floor((Math.random() * dim.height) / h)]
  }

  const u = (j: number) => {
    setQ((s) => s.map((n) => (n.id === j ? { ...n, pos: g() } : n)))
  }

  E(() => {
    const obs = new ResizeObserver((e) => {
      for (const a of e) {
        const nextDim = { width: a.contentRect.width, height: a.contentRect.height }
        setD(nextDim)
        if (nextDim.width && nextDim.height) {
          setQ(
            Array.from({ length: ns }, (_, k) => ({
              id: k,
              pos: [Math.floor((Math.random() * nextDim.width) / w), Math.floor((Math.random() * nextDim.height) / h)],
            })),
          )
        }
      }
    })
    if (r.current) obs.observe(r.current)
    return () => {
      if (r.current) obs.unobserve(r.current)
    }
  }, [h, ns, w])

  return (
    <svg
      ref={r}
      aria-hidden="true"
      className={N('fill-primary-blue pointer-events-none absolute inset-0 h-full w-full stroke-gray-400/30', cnx)}
      {...rest}
    >
      <defs>
        <pattern id={i} width={w} height={h} patternUnits="userSpaceOnUse" x={_x} y={_y}>
          <path d={`M.5 ${h}V.5H${w}`} fill="none" strokeDasharray={sd} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${i})`} />
      <svg x={_x} y={_y} className="overflow-visible">
        {q.map(({ pos: [a, b], id: k }, z) => (
          <M.rect
            initial={{ opacity: 0 }}
            animate={{ opacity: mo }}
            transition={{
              duration: d,
              repeat: 1,
              delay: z * 0.1,
              repeatType: 'reverse',
            }}
            onAnimationComplete={() => u(k)}
            key={`${a}-${b}-${z}`}
            width={w - 1}
            height={h - 1}
            x={a * w + 1}
            y={b * h + 1}
            fill="currentColor"
            strokeWidth="0"
          />
        ))}
      </svg>
    </svg>
  )
}
