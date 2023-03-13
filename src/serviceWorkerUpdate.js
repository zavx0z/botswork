import React from 'react'

export function useServiceWorkerUpdate() {
    const [waitingWorker, setWaitingWorker] = React.useState(null)
    const handleNewServiceWorker = (registration) => {
        console.log('Найден новый сервисный работник. Обновление...')
        if (registration.waiting) {
            setWaitingWorker(registration.waiting)
        }
    }

    const handleUpdateClick = () => {
        if (waitingWorker) {
            console.log('Отправка сообщения сервисному работнику для пропуска ожидания и активации нового сервисного работника...')
            waitingWorker.postMessage({type: 'SKIP_WAITING'})
        }
    }

    React.useEffect(() => {
        if ('serviceWorker' in navigator) {
            console.log('Регистрация сервисного работника...')
            navigator.serviceWorker.register('/service-worker.js').then((registration) => {
                console.log('Сервисный работник зарегистрирован.')
                if (registration.waiting) {
                    setWaitingWorker(registration.waiting)
                }
                registration.addEventListener('updatefound', () => {
                    handleNewServiceWorker(registration)
                })
            })

            navigator.serviceWorker.addEventListener('controllerchange', () => {
                console.log('Сервисный работник изменился. Перезагрузка страницы...')
                window.location.reload()
            })
        }
    }, [])

    return handleUpdateClick
}