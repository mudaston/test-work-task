import { useEffect } from 'react'

export function useClickOutside(ref, changeStateFunc) {
  useEffect(() => {
    const clickOutsideHandler = (e) => {
      if (ref.current.contains(e.target)) return

      changeStateFunc(false)
    }

    document.addEventListener('mousedown', clickOutsideHandler)

    return () => {
      document.removeEventListener('mousedown', clickOutsideHandler)
    }
  }, [])
}
