import {types} from "mobx-state-tree"
import {enqueueSnackbar} from "notistack"

const pwaModel = types
    .model({
        newVersionExist: false
    })
    .volatile(self => ({
        serviceWorker: null
    }))
    .actions(self => ({
        afterCreate() {
            navigator.serviceWorker.ready.then(self['setServiceWorker'])
        },
        setServiceWorker(value) {
            console.log('[sw] получен')
            self.serviceWorker = value
        },
        setNewVersionExist(value) {
            console.log('newServiceWorker', value)
            self.newVersionExist = true
            this.setServiceWorker(value)
        },
        updateVersion() {
            if (!self.serviceWorker) {
                console.log('[sw] отсутствует')
                enqueueSnackbar('Приложение не установлено', {variant: "info"})
                return
            }
            const worker = self.serviceWorker.waiting
            if (!worker) {
                window.location.reload()
                return
            }
            worker.postMessage({type: 'SKIP_WAITING'})
            worker.addEventListener('statechange', (e) => {
                if (e.target.state === 'activated')
                    window.location.reload()
            })
        }
    }))
export default pwaModel