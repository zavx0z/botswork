import {applyPatch, types} from "mobx-state-tree"
import {sioAfterConnect} from "../shared/sio/sioMiddleware"
import channel from "../shared/chat/channels"
import dialogProton from "./dialogProton"
import messageProton from "./messageProton"
import userProton from "./userProton"

export const userProtons = types.model( {user: types.map(userProton)})
export const dialogProtons = types.model( {dialog: types.map(dialogProton)})
export const messageProtons = types.model( {message: types.maybeNull(types.map(messageProton))})


export const intraEntanglement = store => sioAfterConnect(store, sio => {
    sio.emitWithAck(channel.USERS, {})
        .then(data => applyPatch(store, {op: 'replace', value: data, path: '/proton/user'}))
    sio.emitWithAck(channel.DIALOG, {})
        .then(data => applyPatch(store, {op: 'replace', value: data, path: '/proton/dialog'}))
    sio.emitWithAck(channel.MESSAGE, {})
        .then(data => applyPatch(store, {op: 'replace', value: data, path: '/proton/message'}))
})