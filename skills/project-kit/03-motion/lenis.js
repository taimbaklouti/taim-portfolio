import Lenis from 'lenis'

export const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.0 - Math.pow(2, -10 * t)),
  smoothWheel: true,
  autoRaf: true,
  respectReducedMotion: true,
})

export function scrollTo(target, options) {
  lenis.scrollTo(target, options)
}

let scrollBlocked = false
let savedOverflow = ''

export function blockScroll() {
  if (scrollBlocked) return
  scrollBlocked = true

  const html = document.documentElement
  const body = document.body

  savedOverflow = body.style.overflow || ''
  html.style.overflow = 'hidden'
  body.style.overflow = 'hidden'
}

export function unblockScroll() {
  if (!scrollBlocked) return
  scrollBlocked = false

  const html = document.documentElement
  const body = document.body

  body.style.overflow = savedOverflow
  html.style.overflow = savedOverflow
  savedOverflow = ''
}

export function withScrollLock(fn) {
  blockScroll()
  try {
    return fn()
  } finally {
    unblockScroll()
  }
}
