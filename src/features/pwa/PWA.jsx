import {closeSnackbar, enqueueSnackbar} from "notistack"
import Button from "@mui/material/Button"
import React, {useEffect} from "react"
import pwaStore from "./pwaStore"
import {inject, observer} from "mobx-react"

const action = snackbarId => <>
    <Button onClick={pwaStore.updateVersion}>
        Обновить
    </Button>
    <Button onClick={() => closeSnackbar(snackbarId)}>
        Отмена
    </Button>
</>

const PWA = ({pwa: {newVersionExist}}) => {
    useEffect(() => {
        if (newVersionExist)
            enqueueSnackbar('Обновите приложение', {action, variant: "info", persist: true})
    }, [newVersionExist])
    return <></>
}
export default inject('pwa')(observer(PWA))