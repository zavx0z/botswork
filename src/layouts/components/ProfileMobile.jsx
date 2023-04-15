import {inject, observer} from "mobx-react"
import {useTranslation} from "react-i18next"
import {useNavigate} from "react-router-dom"
import * as React from "react"
import {useState} from "react"
import pwaStore from "../../features/pwa/pwaStore"
import ProfileButtonIcon from "../../components/ProfileButtonIcon"
import {IconButton, List, ListItemAvatar, ListItemText, Modal, Slide} from "@mui/material"
import Box from "@mui/material/Box"
import {Close as CloseIcon, Logout, Settings, Update} from "@mui/icons-material"
import Divider from "@mui/material/Divider"
import ListItemButton from "@mui/material/ListItemButton"
import routes from "../../routes/routes"
import Avatar from "@mui/material/Avatar"
import ListItemIcon from "@mui/material/ListItemIcon"
import Typography from "@mui/material/Typography"
import profileMenu from "../profileMenu"

export const MobileProfile = ({root: {logOut, username, isAuthenticated}}) => {
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
    const handleClose = () => setOpen(false)
    const handleUpdateVersion = () => {
        pwaStore.updateVersion()
        handleClose()
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
                            : profileMenu.map(({route, title, itemIcon}, key) =>
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
                        <ListItemButton
                            divider
                            onClick={handleUpdateVersion}
                        >
                            <ListItemIcon>
                                <Update/>
                            </ListItemIcon>
                            <ListItemText primary={t('Проверка обновлений')}/>
                            <Typography variant={'caption'}>v{process.env.REACT_APP_VERSION}</Typography>
                        </ListItemButton>
                    </List>
                </Box>
            </Slide>
        </Modal>
    </>
}

export default inject('root')(observer(MobileProfile))