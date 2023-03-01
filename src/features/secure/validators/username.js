import {warning} from "../utils/snackbar"

export const validateUsername = (username) => {
    if (!username) {
        warning('Введите имя пользователя')
        return false
    } else
        return true
}