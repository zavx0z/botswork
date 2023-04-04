import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import routes from "../routes/routes"
import {useNavigate} from "react-router-dom"
import Box from "@mui/material/Box"
import {IconButton, ListItemText, styled, useTheme} from "@mui/material"
import List from "@mui/material/List"
import {ChevronLeft, ChevronRight, Laptop, Public} from "@mui/icons-material"
import Drawer from "@mui/material/Drawer"
import React, {useState} from "react"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"

const ListItemList = ({children, iconButton, open}) =>
    <ListItemButton
        sx={{
            minHeight: 48,
            justifyContent: open ? 'initial' : 'center',
            px: 2.5,
        }}
    >
        <ListItemIcon
            sx={{
                minWidth: 0,
                mr: open ? 3 : 'auto',
                justifyContent: 'center',
            }}
        >
            {iconButton}
        </ListItemIcon>
        <ListItemText primary={children} sx={{opacity: open ? 1 : 0}}/>
    </ListItemButton>


const listItems = [
    {
        title: 'интернет',
        iconButton: <Public/>
    },
    {
        title: 'десктоп приложения',
        iconButton: <Laptop/>
    }
]

const drawerWidth = 240

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
})

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
})

const LeftPanel = styled(Drawer, {shouldForwardProp: (prop) => prop !== 'open'})(
    ({theme, open}) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
)
const DrawerHeader = styled('div')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}))
const Home = () => {
    const [open, setOpen] = useState(false)
    const theme = useTheme()
    const handleDrawerOpen = () => setOpen(true)
    const handleDrawerClose = () => setOpen(false)
    const navigate = useNavigate()
    return <Box sx={{
        display: 'flex',
        height: "100%"
    }}
    >
        <Box
            sx={{
                display: 'flex',
            }}
        >
            <LeftPanel variant="permanent" open={open}>
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRight/> : <ChevronLeft/>}
                    </IconButton>
                </DrawerHeader>
                <List
                    disablePadding
                    dense
                    // subheader={
                    //     <ListSubheader
                    //         color={"primary"}
                    //     >
                    //         <Typography
                    //             variant={"subtitle2"}
                    //         >
                    //             Поддерживаемый список на текущий момент:
                    //         </Typography>
                    //     </ListSubheader>
                    // }
                >
                    {listItems.map(item =>
                        <ListItemList
                            open={open}
                            key={item.title}
                            iconButton={item.iconButton}
                        >
                            {item.title}
                        </ListItemList>
                    )}
                </List>
            </LeftPanel>
        </Box>
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            height: "100%",
            flexGrow: 1,
            justifyContent: 'space-around',
            alignContent: "center",
            alignItems: "center",
        }}>
            <Typography>
                с легкостью:
            </Typography>
            <Typography

            >
                создай свои правила!
            </Typography>
            <Box>
                <Button
                    // fullWidth
                    variant={"outlined"}
                    onClick={() => navigate(routes.chat)}
                >
                    перейти в чат
                </Button>
            </Box>
        </Box>
    </Box>
}

export default Home