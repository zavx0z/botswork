import i18next from "i18next"
import {enqueueSnackbar} from "notistack"

const {t} = i18next

export const success = (msg) => enqueueSnackbar(t(msg, {'ns': 'авторизация'}), {variant: 'success'})
export const warning = (msg) => enqueueSnackbar(t(msg, {'ns': 'авторизация'}), {variant: 'warning'})
