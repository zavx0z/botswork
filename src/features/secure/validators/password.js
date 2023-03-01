import {warning} from "../utils/snackbar"

export const validatePassword = (password) => {
    if (!password) {
        warning('Введите пароль')
        return false
    } else
        return true
}
