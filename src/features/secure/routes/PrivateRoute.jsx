import {Navigate} from "react-router-dom"
import {inject, observer} from "mobx-react"
import {useSnackbar} from "notistack"
import {useEffect, useRef} from "react"
import {useTranslation} from "react-i18next"
import routes from "../../../routes/routes"

const PrivateRoute = ({children, user: {isAuthenticated}}) => {
    const {enqueueSnackbar} = useSnackbar()
    const snackbarDisplayedRef = useRef(false)
    const {t} = useTranslation('авторизация')
    useEffect(() => {
        if (!isAuthenticated && !snackbarDisplayedRef.current) {
            enqueueSnackbar(t("не_авторизован"), {variant: 'warning'})
            snackbarDisplayedRef.current = true
        } else {
            snackbarDisplayedRef.current = false
        }
    }, [isAuthenticated, enqueueSnackbar, t])
    return isAuthenticated ? children : <Navigate to={routes.login}/>
}

export default inject("user")(observer(PrivateRoute))