import {Route, Routes} from "react-router-dom"
import React, {useState} from "react"
import Browser from "./views/Browser"
import Mobile from "./views/Mobile"
import Workspace from "./views/Workspace"
import {Api as ApiIcon, Computer, Public, Smartphone, Workspaces} from "@mui/icons-material"
import Desktop from "./views/Desktop"
import routes from "./routes"
import DrawerMenu from "../../shared/layout/DrawerMenu"
import Api from "./views/Api"
import Box from "@mui/material/Box"
import Main from "./views/Main"

const items = [[
    {
        title: 'Браузер',
        route: routes.browser,
        Icon: Public,
    },
    {
        title: 'Десктоп',
        route: routes.desktop,
        Icon: Computer,
    },
    {
        title: 'Мобильный',
        route: routes.mobile,
        Icon: Smartphone,
    },
    {
        title: 'Окружение',
        route: routes.workspace,
        Icon: Workspaces,
    },
    {
        title: 'Интеграция',
        route: routes.api,
        Icon: ApiIcon,
    },
]]
const Posts = ({authRedirect}) => {
    const [open, setOpen] = useState(false)
    return <Box sx={{display: 'flex'}}>
        <DrawerMenu
            open={open}
            setOpen={setOpen}
            items={items}
            visibleCloseButton
        />
        <Box sx={{display: 'flex', flexGrow: 1, pt: 3}}>
            <Routes>
                <Route path={routes.post} element={<Main/>}/>
                <Route path={routes.browser} element={<Browser/>}/>
                <Route path={routes.mobile} element={<Mobile/>}/>
                <Route path={routes.desktop} element={<Desktop/>}/>
                <Route path={routes.workspace} element={<Workspace/>}/>
                <Route path={routes.api} element={<Api/>}/>
            </Routes>
        </Box>
    </Box>
}
export default Posts