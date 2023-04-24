import React from "react"
import {IconButton, List, ListItemAvatar, ListItemText, Modal, Typography} from "@mui/material"
import {inject, observer} from "mobx-react"
import Box from "@mui/material/Box"
import {Close as CloseIcon, Logout, Settings, Update} from "@mui/icons-material"
import Divider from "@mui/material/Divider"
import ListItemButton from "@mui/material/ListItemButton"
import routes from "../routes/routes"
import Avatar from "@mui/material/Avatar"
import ListItemIcon from "@mui/material/ListItemIcon"
import {useTranslation} from "react-i18next"
import {useNavigate} from "react-router-dom"

const modalProps = {
    backdrop: {
        style: {
            opacity: 1,
            backgroundColor: '#fff'
        },
    },
}
const ListItemUser = inject('root')(observer(({root: {username}, onClick}) =>
    <ListItemButton
        disableGutters
        divider
        onClick={onClick}
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
))


const ProfilePage = ({root: {username}, pwa: {updateVersion}}) => {
    const {t} = useTranslation('авторизация')
    const {t: tm} = useTranslation('меню')
    const handleClose = () => navigate(-1)
    const navigate = useNavigate()
    const handleUpdateVersion = () => {
        updateVersion()
        handleClose()
    }
    return <Modal
        open={true}
        onClose={handleClose}
        slotProps={modalProps}
    >
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
                <ListItemUser/>
                <ListItemButton
                    divider
                    onClick={() => navigate(routes.settings)}
                >
                    <ListItemIcon>
                        <Settings/>
                    </ListItemIcon>
                    <ListItemText primary={tm('настройки')}/>
                </ListItemButton>
                <ListItemButton
                    divider
                    onClick={() => navigate(routes.logout)}
                >
                    <ListItemIcon>
                        <Logout/>
                    </ListItemIcon>
                    <ListItemText primary={t('выход')}/>
                </ListItemButton>
                <ListItemButton
                    divider
                    onClick={handleUpdateVersion}
                >
                    <ListItemIcon>
                        <Update/>
                    </ListItemIcon>
                    <ListItemText primary={t('Проверка обновлений')}/>
                    <Typography variant={'caption'}>V{process.env.REACT_APP_VERSION}</Typography>
                </ListItemButton>
            </List>
        </Box>
    </Modal>
}

export default ProfilePage