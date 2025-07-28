import { useEffect, useState } from 'react'

export default function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)
    if (media.matches !== matches) {
      setMatches(media.matches)
    }
    const listener = () => setMatches(media.matches)
    media.addEventListener('change', listener)
    return () => media.removeEventListener('change', listener)
  }, [matches, query])

  return matches
}

const MOBILE_BREAKPOINT_WIDTH = 768
const TABLET_BREAKPOINT_WIDTH = 1024


export const useIsMobile = () => useMediaQuery(`(max-width: ${MOBILE_BREAKPOINT_WIDTH - 1}px)`)
export const useIsTablet = () => useMediaQuery(`(max-width: ${TABLET_BREAKPOINT_WIDTH - 1}px)`)
