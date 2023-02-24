import * as React from 'react'
import Link from '@mui/material/Link'
import {Link as RouterLink, Route, Routes, useNavigate} from "react-router-dom"
import Profile from "./views/Profile"
import Contacts from "./views/Contacts"
import SignUp from "./views/Signup"
import Drawer from '@mui/material/Drawer'
import CssBaseline from '@mui/material/CssBaseline'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ContactsIcon from '@mui/icons-material/Contacts'
import HomeIcon from '@mui/icons-material/Home'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import AdbIcon from '@mui/icons-material/Adb'
import AppBar from "@mui/material/AppBar"
// import logo from './images/logo.png'
import logo from './images/logo_square.png'
import Container from "@mui/material/Container"
// import logo from './images/logo_sphere.png'

const drawerWidth = 240
const pages = ['Products', 'Pricing', 'Blog']
const settings = ['Profile', 'Account', 'Dashboard', 'Logout']
const App = () => {
    const navigate = useNavigate()
    const [anchorElNav, setAnchorElNav] = React.useState(null)
    const [anchorElUser, setAnchorElUser] = React.useState(null)

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget)
    }
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget)
    }

    const handleCloseNavMenu = () => {
        setAnchorElNav(null)
    }

    const handleCloseUserMenu = () => {
        setAnchorElUser(null)
    }
    return <>

        <Box sx={{display: 'flex'}}>
            <CssBaseline/>
            <AppBar
                position="fixed"
                sx={{zIndex: (theme) => theme.zIndex.drawer + 1}}
                // color={'transparent'}
            >
                <Box sx={{"xs": 'flex'}}>
                    <Toolbar>
                        <Box
                            component="img"
                            sx={{
                                // height: 233,
                                // width: 350,
                                maxHeight: 55,
                                // maxWidth: {xs: 350, md: 250},
                                md: 'flex'
                            }}
                            alt="logo"
                            src={process.env.PUBLIC_URL + '/img/apple-icon-180.png'}
                        />
                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                // ml: 1,
                                mr: 2,
                                // mb: -1,
                                display: {xs: 'flex'},
                                // fontFamily: 'monospace',
                                fontWeight: 700,
                                // letterSpacing: '.14rem',
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
                                {settings.map((setting) => (
                                    <MenuItem key={setting}
                                        // onClick={handleCloseUserMenu}
                                    >
                                        <Typography textAlign="center">{setting}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                    </Toolbar>
                </Box>
            </AppBar>
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
            <Box component="main" sx={{flexGrow: 1, p: 3}}>
                <Toolbar/>
                <Routes>
                    <Route path={'/signup'} element={<SignUp/>}/>
                    <Route path={'/profile'} element={<Profile/>}/>
                    <Route path={'/contacts'} element={<Contacts/>}/>
                </Routes>
                <nav>
                    <ul>
                        <li>
                            <Link
                                component={RouterLink}
                                to={`/`}>
                                Главная
                            </Link>
                        </li>

                        <li>
                            <Link
                                component={RouterLink}
                                to={`/signup`}>
                                Зарегистрироваться
                            </Link>
                        </li>
                        <li>
                            <Link
                                component={RouterLink}
                                to={`/profile`}>
                                Личный кабинет
                            </Link>
                        </li>
                    </ul>
                </nav>
            </Box>
        </Box>
    </>

}


export default App