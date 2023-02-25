import IconButton from "@mui/material/IconButton"
import Avatar from "@mui/material/Avatar"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import Typography from "@mui/material/Typography"
import * as React from "react"
import {useNavigate} from "react-router-dom"
import {useTranslation} from "react-i18next"

const Profile = () => {
    const navigate = useNavigate()
    const [anchorElUser, setAnchorElUser] = React.useState(null)
    const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget)
    const handleCloseUserMenu = (path) => {
        setAnchorElUser(null)
        navigate(path)
    }
    const {t} = useTranslation('авторизация')
    return <>
        <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
            <Avatar alt="Remy Sharp"
                // src={logo}
            />
        </IconButton>
        <Menu
            sx={{mt: '45px'}}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
        >
            <MenuItem onClick={() => handleCloseUserMenu('signin')}>
                <Typography textAlign="center">{t('авторизация')}</Typography>
            </MenuItem>
            <MenuItem onClick={() => handleCloseUserMenu('signup')}>
                <Typography textAlign="center">{t('регистрация')}</Typography>
            </MenuItem>
        </Menu>
    </>
}
export default Profile