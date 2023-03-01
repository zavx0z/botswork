import {useNavigate} from "react-router-dom"
import {useEffect, useRef} from "react"
import {useTranslation} from "react-i18next"
import {useSnackbar} from "notistack"

const Logout = ({submit, redirect}) => {
    const navigate = useNavigate()
    const {t} = useTranslation('авторизация')
    const {enqueueSnackbar} = useSnackbar()
    const snackbarDisplayedRef = useRef(false)
    useEffect(() => {
        if (!snackbarDisplayedRef.current) {
            enqueueSnackbar(t('пока'), {variant: "success"})
            submit()
            snackbarDisplayedRef.current = true
        } else
            snackbarDisplayedRef.current = false
        navigate(redirect)
    }, [redirect, submit, navigate, t, enqueueSnackbar])
}
export default Logout