import React from "react"
import {List, ListItemSecondaryAction, ListItemText} from "@mui/material"
import {inject, observer} from "mobx-react"
import Box from "@mui/material/Box"
import {Logout, Settings} from "@mui/icons-material"
import ListItemButton from "@mui/material/ListItemButton"
import Avatar from "@mui/material/Avatar"
import {useTranslation} from "react-i18next"
import {matchPath, useLocation, useNavigate} from "react-router-dom"
import Container from "@mui/material/Container"
import quantum from "../store"

const Item = ({title, to, icon}) => {
    const navigate = useNavigate()
    const {pathname} = useLocation()
    const handleClick = () => !matchPath(to, pathname) && navigate(to)
    return <ListItemButton
        disableGutters
        onClick={handleClick}
    >
        <ListItemSecondaryAction>
            <Box sx={theme => ({
                display: 'flex',
                width: theme.spacing(4),
                justifyContent: 'center',
            })}>
                {React.cloneElement(icon, {color: 'action'})}
            </Box>
        </ListItemSecondaryAction>
        <ListItemText primary={title}/>
    </ListItemButton>
}

const Profile = ({quantum}) => {
    const {t} = useTranslation('авторизация')
    const {t: tm} = useTranslation('меню')
    return <Container sx={{pt: 1, pr: 2.6}}>
        <List sx={{p: 0, width: '100%'}}>
            <Item title={quantum.neutron.sso.username} to={'/'} icon={<Avatar/>}/>
            <Item title={tm('настройки')} to={'settings'} icon={<Settings/>}/>
            <Item title={t('выход')} to={'/auth/logout'} icon={<Logout/>}/>
        </List>
    </Container>
}

export default inject('quantum')(observer(Profile))