import InputMessage from "../components/InputMessage"
import React from "react"
import Chat from "../components/Chat"
import {observer} from "mobx-react"


const DialogView = ({userId, dialog}) => {
    return dialog && userId && <>
        <Chat userId={userId} messages={dialog.messagesByDay} readMessage={dialog.readMessage}/>
        <InputMessage sendMessage={dialog.sendMessage} readMessage={dialog.readMessage}/>
    </>
}
export default observer(DialogView)