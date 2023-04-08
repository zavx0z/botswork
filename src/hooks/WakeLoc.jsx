import {useEffect} from 'react'

function useWakeLock() {
    useEffect(() => {
        let wakeLock = null

        const requestWakeLock = async () => {
            try {
                wakeLock = await navigator.wakeLock.request('screen')
                console.log('Wake Lock is active!')
            } catch (err) {
                console.error(`${err.name}, ${err.message}`)
            }
        }

        const releaseWakeLock = async () => {
            try {
                await wakeLock.release()
                console.log('Wake Lock has been released.')
            } catch (err) {
                console.error(`${err.name}, ${err.message}`)
            }
        }

        const handleVisibilityChange = () => {
            if (document.visibilityState === 'visible') {
                requestWakeLock()
            } else {
                releaseWakeLock()
            }
        }

        document.addEventListener('visibilitychange', handleVisibilityChange)

        return () => {
            releaseWakeLock()
            document.removeEventListener('visibilitychange', handleVisibilityChange)
        }
    }, [])
}

export default useWakeLock
