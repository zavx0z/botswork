import {useCallback, useEffect, useState} from 'react'
import {isIOS} from "react-device-detect"

const useKeyboardAndViewport = (threshold = 0.7) => {
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false)
  const [viewportHeight, setViewportHeight] = useState(
      window.visualViewport?.height ?? window.innerHeight
  )

  const handleResize = useCallback(() => {
    let height
    if (window.visualViewport)
      height = window.visualViewport.height
    else
      height = window.innerHeight
    // console.log(window.visualViewport.height, window.innerHeight, document.body.clientHeight)
    const thresholdInPx = threshold > 1 ? threshold : window.screen.height * threshold
    const isKeyboard = height < thresholdInPx
    setViewportHeight(height)
    setIsKeyboardOpen(isKeyboard)
    // if (isIOS && isKeyboard) window.scrollTo(0, 0)

  }, [threshold])

  const scrollTop = () => {
    // if (isKeyboardOpen)
      window.scrollTo(0, 0)
  }

  useEffect(() => {
    if (isIOS) {
      window.addEventListener('touchmove', scrollTop)
      window.addEventListener('scroll', scrollTop)
    }
    window.addEventListener('resize', handleResize)
    window.addEventListener('orientationchange', handleResize)
    window.visualViewport.addEventListener('resize', handleResize)
    return () => {
      if (isIOS) {
        window.removeEventListener('touchmove', scrollTop)
        window.removeEventListener('scroll', scrollTop)
      }
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('orientationchange', handleResize)
      window.visualViewport.removeEventListener('resize', handleResize)
    }
  }, [handleResize])

  return {isKeyboardOpen, viewportHeight}
}

export default useKeyboardAndViewport
