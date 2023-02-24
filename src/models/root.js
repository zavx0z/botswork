import {types} from "mobx-state-tree"


export default types
    .model({
        value: 4,
    })
    .volatile(self => ({
        prevLevel: 0,
        currentLevel: 1,
    }))
    .actions(self => ({
        incrementValue() {
            self.value += 1
        },
        decrementValue() {
            self.value -= 1
        },
    }))
    .views(self => ({
        get valueString() {
            return self['value']
        }
    }))
