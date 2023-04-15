import pwaModel from "./pwaModel"

const pwaStore = pwaModel.create({})

window.addEventListener('storage', e => {
    if (e.key === process.env.REACT_APP_ACCESS_TOKEN)
        e.newValue ?
            setTimeout(() => window.location.href = '/', 1000) :
            window.location.reload()
})

export default pwaStore