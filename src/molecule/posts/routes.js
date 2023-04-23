import {Post} from "./Posts"
import {Api as ApiIcon, Computer, Public, Smartphone, Workspaces} from "@mui/icons-material"
import LeftMenu from "../../shared/layout/containers/LeftMenu"
import {isMobile} from "react-device-detect"
import React from "react"
import {Body, CenterBar, Content, LeftBar, RightBar, Root, TopBar} from "../../shared/layout/AppLayout"
import {ButtonLogo} from "../../shared/layout/components/ButtonLogo"
import Wordmark from "../../shared/layout/components/ButtonWordMark"
import Container from "@mui/material/Container"
import {Outlet} from "react-router-dom"
import ProfileButton from "../../shared/layout/components/ProfileButton"
import Box from "@mui/material/Box"

const loader = ({request}) => {
    console.log(request)
    // console.log(Location(request.url))
    return [[{
        title: 'Браузер',
        route: 'browser',
        Icon: Public,
    }, {
        title: 'Десктоп',
        route: 'desktop',
        Icon: Computer,
    }, {
        title: 'Мобильный',
        route: 'mobile',
        Icon: Smartphone,
    }, {
        title: 'Окружение',
        route: 'workspace',
        Icon: Workspaces,
    }, {
        title: 'Интеграция',
        route: 'api',
        Icon: ApiIcon,
    }]]
}

const postRoutes = {
    path: "/post",
    loader: loader,
    element: <>
        <TopBar>
            <LeftBar>
                <ButtonLogo/>
            </LeftBar>
            <CenterBar>
                <Wordmark to={'/'}/>
            </CenterBar>
            <RightBar>
                <ProfileButton/>
            </RightBar>
        </TopBar>
        <Body>
            <LeftMenu opened={!isMobile} visibleCloseButton={!isMobile}/>
            <Content>
                <Container sx={{display: "flex", flexDirection: "column"}}>
                    <Outlet/>
                </Container>
            </Content>
        </Body>
    </>,
    children: [{
        path: 'browser',
        element: <Post>
            Наша платформа позволяет создавать и управлять ботами, которые работают в браузере.
            Такие боты могут выполнять различные задачи, такие как
            автоматизация веб-форм, сбор данных и многое другое.
        </Post>,
    }, {
        path: 'mobile',
        element: <Post>
            Наша платформа позволяет создавать и управлять ботами для работы на мобильных устройствах.
            Такие боты могут выполнять задачи, связанные с приложениями на мобильных устройствах, сбор данных и многое другое.
            Мы поддерживаем широкий спектр мобильных устройств, таких как iOS и Android.
        </Post>,
    }, {
        path: 'desktop',
        element: <Post>
            Мы предоставляем возможность создания ботов для работы на рабочем столе.
            Такие боты могут автоматизировать рутинные задачи, управлять файлами и папками, выполнять задачи связанные с приложениями, и многое другое.
            Наши боты поддерживают операционные системы Windows, MacOS и Linux.
        </Post>,
    }, {
        path: 'workspace',
        element: <Post>
            Мы предоставляем возможность создания и управления виртуальными рабочими столами для ботов.
            Это позволяет создавать изолированные рабочие среды для ботов и управлять ими из облачной платформы.
            Такой подход позволяет максимально оптимизировать использование ресурсов и повышает безопасность.
        </Post>,
    }, {
        path: 'api',
        element: <Post>
            Мы предоставляем широкие возможности для интеграции ботов в различные системы и платформы.
            Наши боты могут интегрироваться с CRM системами, электронными почтовыми сервисами, системами управления контентом и многими другими.
            Кроме того, мы предоставляем API для интеграции с пользовательскими приложениями и системами.
        </Post>,
    },
    ]
}
export default postRoutes