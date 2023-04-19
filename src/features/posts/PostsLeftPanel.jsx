import {isMobile} from "react-device-detect"
import LeftMenu from "../../shared/layout/containers/LeftMenu"
import React from "react"
import routes from "../../routes/routes"
import {Api as ApiIcon, Computer, Public, Smartphone, Workspaces} from "@mui/icons-material"

const PostsLeftPanel = () => {
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
    return <LeftMenu opened={!isMobile} items={items} visibleCloseButton={!isMobile}/>
}
export default PostsLeftPanel