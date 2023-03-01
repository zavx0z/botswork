import {addMiddleware} from "mobx-state-tree"
import {enqueueSnackbar} from "notistack"
import i18next from "i18next"
import userStore from "../features/secure/userStore"

const {t} = i18next
export const middlewareNetworkError = (store) => {
    addMiddleware(userStore, (call, next) => {
            return next(call, result => {
                    if (Promise.resolve(result) === result)
                        return result.catch(error => {
                            console.log(error.code)
                            if (error.code === "ERR_NETWORK")
                                enqueueSnackbar(t(error.code, {'ns': 'network'}), {variant: 'error'})
                            else if (error.code === "ERR_BAD_REQUEST")
                                enqueueSnackbar(t(error.response.data.detail, {'ns': 'авторизация'}), {variant: 'error'})
                            return Promise.reject(error)
                        })
                    else
                        return result
                }
            )

        }
    )
}