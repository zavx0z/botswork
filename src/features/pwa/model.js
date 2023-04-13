import {types} from "mobx-state-tree"

 const pwaModel = types
    .model({
        newVersionExist: false
    })
    .volatile(self => ({
        serviceWorker: null
    }))
    .actions(self => ({
        setNewVersionExist(value) {
            console.log('newServiceWorker', value)
            self.newVersionExist = true
            self.serviceWorker = value
        },
        updateVersion() {
            const worker = self.serviceWorker.waiting
            if (!worker) {
                window.location.reload()
                return
            }
            worker.postMessage({type: 'SKIP_WAITING'})
            worker.addEventListener('statechange', (e) => {
                if (e.target.state === 'activated') {
                    window.location.reload()
                }
            })
        }
    }))
export default pwaModel