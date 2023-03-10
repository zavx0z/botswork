import Drawer from "@mui/material/Drawer"
import Toolbar from "@mui/material/Toolbar"
import Box from "@mui/material/Box"
import List from "@mui/material/List"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import HomeIcon from "@mui/icons-material/Home"
import ListItemText from "@mui/material/ListItemText"
import ContactsIcon from "@mui/icons-material/Contacts"
import * as React from "react"
import {useLocation, useNavigate} from "react-router-dom"
import {useTranslation} from "react-i18next"
import routes from "../routes/routes"
import {QuestionAnswer} from "@mui/icons-material"

const drawerWidth = 240

const items = [
    {
        text: "главная",
        route: routes.home,
        itemIcon: <HomeIcon/>
    },
    {
        text: "чат",
        route: routes.chat,
        itemIcon: <QuestionAnswer/>
    },
    {
        text: "контакты",
        route: routes.contacts,
        itemIcon: <ContactsIcon/>
    },

]

const DrawerMenu = () => {
    const {t} = useTranslation('меню')
    const navigate = useNavigate()
    const location = useLocation()
    return <Drawer
        variant="permanent"
        sx={{
            display: {xs: 'none', md: 'flex'},
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {width: drawerWidth, boxSizing: 'border-box'},
        }}
    >
        <Toolbar/>
        <Box sx={{overflow: 'auto'}}>
            <List>
                {items.map(({text, route, itemIcon}, idx) =>
                    <ListItemButton
                        key={idx}
                        divider
                        selected={location.pathname === route}
                        onClick={() => navigate(route)}
                    >
                        <ListItemIcon>
                            {itemIcon}
                        </ListItemIcon>
                        <ListItemText primary={t(text)}/>
                    </ListItemButton>
                )}
            </List>
        </Box>
    </Drawer>
}
export default DrawerMenu