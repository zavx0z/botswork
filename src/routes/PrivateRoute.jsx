import {Navigate} from "react-router-dom"
import {inject} from "mobx-react"
import {useSnackbar} from "notistack"
import {useEffect, useRef} from "react"
import {useTranslation} from "react-i18next"

const PrivateRoute = ({children, user: {isAuthenticated}}) => {
    const {enqueueSnackbar} = useSnackbar()
    const snackbarDisplayedRef = useRef(false)
    const {t} = useTranslation('авторизация')
    useEffect(() => {
        if (!isAuthenticated && !snackbarDisplayedRef.current) {
            enqueueSnackbar(t("не_авторизован"), {variant: 'warning', key: 'auth-snackbar'})
            snackbarDisplayedRef.current = true
        } else {
            snackbarDisplayedRef.current = false
        }
    }, [isAuthenticated, enqueueSnackbar, t])
    return isAuthenticated ? children : <Navigate to="/login"/>
}

export default inject("user")(PrivateRoute)