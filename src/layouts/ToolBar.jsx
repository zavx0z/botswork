import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import Tooltip from "@mui/material/Tooltip"
import IconButton from "@mui/material/IconButton"
import Avatar from "@mui/material/Avatar"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import * as React from "react"
import {useNavigate} from "react-router-dom"

const ToolBar = () => {
    const [anchorElNav, setAnchorElNav] = React.useState(null)
    const [anchorElUser, setAnchorElUser] = React.useState(null)
    const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget)
    const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget)
    const handleCloseNavMenu = () => setAnchorElNav(null)
    const navigate = useNavigate()
    const handleCloseUserMenu = (path) => {
        setAnchorElUser(null)
        navigate(path)
    }
    return <Box sx={{"xs": 'flex'}}>
        <Toolbar>
            <Box component="img" alt="logo"
                 sx={{maxHeight: 44, md: 'flex'}}
                 src={process.env.PUBLIC_URL + '/img/apple-icon-180.png'}
            />
            <Typography
                variant="h5"
                noWrap
                component="a"
                href="/"
                sx={{
                    mr: 2,
                    display: {xs: 'flex'},
                    fontWeight: 700,
                    color: 'inherit',
                    textDecoration: 'none',
                }}
            >
                BotsWork
            </Typography>
            <Box sx={{flexGrow: 1, display: {xs: 'flex'}}}>
            </Box>
            <Box sx={{flexGrow: 0}}>
                <Tooltip title="подсказка">
                    <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                        <Avatar alt="Remy Sharp"
                            // src={logo}
                        />
                    </IconButton>
                </Tooltip>
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
                        <Typography textAlign="center">Вход</Typography>
                    </MenuItem>
                    <MenuItem onClick={() => handleCloseUserMenu('signup')}>
                        <Typography textAlign="center">Регистрация</Typography>
                    </MenuItem>
                </Menu>
            </Box>
        </Toolbar>
    </Box>
}
export default ToolBar