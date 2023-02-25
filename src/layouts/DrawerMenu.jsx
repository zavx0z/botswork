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

const drawerWidth = 240

const DrawerMenu = () => {
    const navigate = useNavigate()
    return <>
        <Drawer
            variant="permanent"
            sx={{
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
                            <ListItemText primary="Главная"/>
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
                            <ListItemText primary="Контакты"/>
                        </ListItemButton>
                    </ListItem>
                </List>
            </Box>
        </Drawer>
    </>
}
export default DrawerMenu