import routes from "../routes/routes"
import {AppRegistration, Login} from "@mui/icons-material"

const profileMenu = [
    {
        title: "войти_уже",
        route: routes.login,
        itemIcon: <Login/>
    },
    {
        title: "нет_аккаунта",
        route: routes.join,
        itemIcon: <AppRegistration/>
    }
]
export default profileMenu