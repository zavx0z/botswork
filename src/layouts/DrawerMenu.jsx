import Drawer from "@mui/material/Drawer"
import Toolbar from "@mui/material/Toolbar"
import Box from "@mui/material/Box"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import HomeIcon from "@mui/icons-material/Home"
import ListItemText from "@mui/material/ListItemText"
import Divider from "@mui/material/Divider"
import ContactsIcon from "@mui/icons-material/Contacts"
import * as React from "react"
import {useNavigate} from "react-router-dom"
import {useTranslation} from "react-i18next"

const drawerWidth = 240

const DrawerMenu = () => {
    const {t} = useTranslation('меню')
    const navigate = useNavigate()
    return <>
        <Drawer
            variant="permanent"
            sx={{
                display: {sm: 'none', md: 'flex'},
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: {width: drawerWidth, boxSizing: 'border-box'},
            }}
        >
            <Toolbar/>
            <Box sx={{overflow: 'auto'}}>
                <List>
                    <ListItem disablePadding>
                        <ListItemButton
                            onClick={() => navigate('/')}
                        >
                            <ListItemIcon>
                                <HomeIcon/>
                            </ListItemIcon>
                            <ListItemText primary={t("главная")}/>
                        </ListItemButton>
                    </ListItem>
                </List>
                <Divider/>
                <List>
                    <ListItem disablePadding>
                        <ListItemButton
                            onClick={() => navigate('contacts')}
                        >
                            <ListItemIcon>
                                <ContactsIcon/>
                            </ListItemIcon>
                            <ListItemText primary={t("контакты")}/>
                        </ListItemButton>
                    </ListItem>
                </List>
            </Box>
        </Drawer>
    </>
}
export default DrawerMenu