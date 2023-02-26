const api = {
    root: `${process.env.REACT_APP_HOST}/api`,
    get runTask() {
        return `${this.root}/task`
    },
    get getTask() {
        return `${this.root}/get-task`
    },
    get statisticResult() {
        return `${this.root}/statistic-result`
    },
    get tag() {
        return `${this.root}/tag`
    },
    get tags() {
        return `${this.root}/tags`
    },
    get videoTag() {
        return `${this.root}/video-tag`
    },
    get videos() {
        return `${this.root}/videos`
    },
    get periods() {
        return `${this.root}/periods`
    },
    get messengers() {
        return `${this.root}/messengers`
    }

}

export default api