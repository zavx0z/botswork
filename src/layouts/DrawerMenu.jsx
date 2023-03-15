import Drawer from "@mui/material/Drawer"
import Toolbar from "@mui/material/Toolbar"
import Box from "@mui/material/Box"
import List from "@mui/material/List"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import * as React from "react"
import {useLocation, useNavigate} from "react-router-dom"
import {useTranslation} from "react-i18next"

const DrawerMenu = ({items, width}) => {
    const {t} = useTranslation('меню')
    const navigate = useNavigate()
    const location = useLocation()
    return <Drawer
        variant="permanent"
        sx={{
            display: {xs: 'none', md: 'flex'},
            width: width,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {width: width, boxSizing: 'border-box'},
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