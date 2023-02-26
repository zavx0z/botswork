import {useNavigate} from "react-router-dom"
import {inject} from "mobx-react"
import {useEffect, useRef} from "react"
import {useTranslation} from "react-i18next"
import {useSnackbar} from "notistack"

const Logout = ({user: {logOut, isAuthenticated}, redirect}) => {
    const navigate = useNavigate()
    const {t} = useTranslation('авторизация')
    const {enqueueSnackbar} = useSnackbar()
    const snackbarDisplayedRef = useRef(false)
    useEffect(() => {
        if (isAuthenticated && !snackbarDisplayedRef.current) {
            enqueueSnackbar(t('пока'), {variant: "success"})
            logOut()
            snackbarDisplayedRef.current = true
        } else {
            snackbarDisplayedRef.current = false
        }
        navigate(redirect)
    }, [redirect, logOut, navigate, t, enqueueSnackbar])
}
export default inject('user')(Logout)