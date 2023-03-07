import IconButton from "@mui/material/IconButton"
import AccountBox from "@mui/icons-material/AccountBox"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import Typography from "@mui/material/Typography"
import * as React from "react"
import {useNavigate} from "react-router-dom"
import {useTranslation} from "react-i18next"
import routes from "../routes/routes"
import {inject, observer} from "mobx-react"
import {useState} from "react"

const menuItems = [
    {
        title: "авторизация",
        route: routes.login
    },
    {
        title: "регистрация",
        route: routes.join
    }
]

const Profile = ({user: {logOut, isAuthenticated}}) => {
    const navigate = useNavigate()
    const [anchorElUser, setAnchorElUser] = useState(null)
    const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget)
    const handleCloseUserMenu = (path) => {
        setAnchorElUser(null)
        navigate(path)
    }
    const {t} = useTranslation('авторизация')
    return <>
        <IconButton
            size={'small'}
            onClick={handleOpenUserMenu}
            sx={{p: 0}}
        >
            <AccountBox
                fontSize={'medium'}
                alt="Profile"
                color={"secondary"}
                // src={logo}
            />
        </IconButton>
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
    </>
}
export default inject('user')(observer(Profile))