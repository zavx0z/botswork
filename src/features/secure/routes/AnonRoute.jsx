import {Navigate} from "react-router-dom"
import {inject, observer} from "mobx-react"

const AnonRoute = ({children, user: {isAuthenticated}, redirectRoute}) => {
    return !isAuthenticated ? children : <Navigate to={redirectRoute}/>
}

export default inject("user")(observer(AnonRoute))