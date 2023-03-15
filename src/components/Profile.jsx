import {AccountBox, AppRegistration, Close as CloseIcon, Login, Logout, Settings} from "@mui/icons-material"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import Typography from "@mui/material/Typography"
import * as React from "react"
import {useState} from "react"
import {useNavigate} from "react-router-dom"
import {useTranslation} from "react-i18next"
import routes from "../routes/routes"
import {inject, observer} from "mobx-react"
import {IconButton, List, ListItemAvatar, ListItemText, Modal, Slide} from '@mui/material'
import Divider from "@mui/material/Divider"
import Avatar from "@mui/material/Avatar"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import Box from "@mui/material/Box"
import ProfileButtonIcon from "./ProfileButtonIcon"

const menuItems = [
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

export const MobileProfile = inject('user')(observer(({user: {logOut, username, isAuthenticated}}) => {
    const {t} = useTranslation('авторизация')
    const {t: tm} = useTranslation('меню')
    const navigate = useNavigate()
    const [open, setOpen] = useState(false)

    const handleOpen = () => {
        setOpen(true)
    }
    const handleNavigate = (rout) => {
        setOpen(false)
        navigate(rout)
    }
    const handleClose = () => {
        setOpen(false)
    }

    return <>
        <ProfileButtonIcon handleOpen={handleOpen} isAuthenticated={isAuthenticated}/>
        <Modal
            open={open}
            onClose={handleClose}
            closeAfterTransition
            slotProps={{
                backdrop: {
                    style: {
                        opacity: 1,
                        backgroundColor: '#fff'
                    },
                },
            }}
        >
            <Slide direction="up" in={open} mountOnEnter unmountOnExit>
                <Box sx={{height: '100vh', width: '100%', p: 1}}>
                    <IconButton
                        size={'large'}
                        aria-label="close"
                        onClick={handleClose}
                    >
                        <CloseIcon/>
                    </IconButton>
                    <List>
                        <Divider/>
                        {isAuthenticated ?
                            <>
                                <ListItemButton
                                    disableGutters
                                    divider
                                    onClick={() => handleNavigate(routes.profile)}
                                >
                                    <ListItemAvatar
                                        sx={{ml: 1}}
                                    >
                                        <Avatar alt={username} /* src={logo} *//>
                                    </ListItemAvatar>
                                    <ListItemText
                                        sx={{ml: 1}}
                                        primary={username}
                                    />
                                </ListItemButton>
                                <ListItemButton
                                    divider
                                    onClick={() => handleNavigate(routes.settings)}
                                >
                                    <ListItemIcon>
                                        <Settings/>
                                    </ListItemIcon>
                                    <ListItemText primary={tm('настройки')}/>
                                </ListItemButton>
                                <ListItemButton
                                    divider
                                    onClick={() => handleNavigate(routes.logout)}
                                >
                                    <ListItemIcon>
                                        <Logout/>
                                    </ListItemIcon>
                                    <ListItemText primary={t('выход')}/>
                                </ListItemButton>
                            </>
                            : menuItems.map(({route, title, itemIcon}, key) =>
                                <ListItemButton
                                    divider
                                    key={key}
                                    onClick={() => handleNavigate(route)}
                                >
                                    <ListItemIcon>
                                        {itemIcon}
                                    </ListItemIcon>
                                    <ListItemText primary={t(title)}/>
                                </ListItemButton>
                            )
                        }
                    </List>
                </Box>
            </Slide>
        </Modal>
    </>
}))


const Profile = ({user: {logOut, isAuthenticated, username}}) => {
    const navigate = useNavigate()
    const [anchorElUser, setAnchorElUser] = useState(null)
    const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget)
    const handleCloseUserMenu = (path) => {
        setAnchorElUser(null)
        navigate(path)
    }
    const {t} = useTranslation('авторизация')
    return <Box sx={{
        display: 'flex'
    }}>
        <Typography variant={"body1"}>
            {username}
        </Typography>
        <ProfileButtonIcon
            handleOpen={handleOpenUserMenu}
            isAuthenticated={isAuthenticated}
            sx={{
                p: 0,
                ml: 1
            }}
        />
        <Menu
            sx={{mt: '45px'}}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
                vertical: 'top', horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
                vertical: 'top', horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
        >
            {isAuthenticated ?
                <MenuItem onClick={() => handleCloseUserMenu(routes.logout)}>
                    <Typography textAlign="center">{t('выход')}</Typography>
                </MenuItem>
                : menuItems.map((item, idx) =>
                    <MenuItem key={idx} onClick={() => handleCloseUserMenu(item.route)}>
                        <Typography textAlign="center">{t(item.title)}</Typography>
                    </MenuItem>
                )
            }
        </Menu>
    </Box>
}
export default inject('user')(observer(Profile))