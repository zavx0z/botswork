import React, {useState} from 'react'
import {BottomNavigation as MuiBottomNavigation, BottomNavigationAction} from '@mui/material'
import { Home as HomeIcon} from '@mui/icons-material'
import {Link, useLocation} from 'react-router-dom'
import {useTranslation} from "react-i18next"
import routes from "../routes/routes"

const BottomNavigation = () => {
    const location = useLocation()
    const [value, setValue] = useState(location.pathname)
    const {t} = useTranslation('меню')

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    return (
        <MuiBottomNavigation
            value={value}
            onChange={handleChange}
            sx={{
                borderTopColor: '#0c1f3c',
                borderTopStyle: 'solid',
                borderTopWidth: 'thin',
            }}
        >
            <BottomNavigationAction label={t("главная")} value={routes.home} icon={<HomeIcon/>} component={Link} to="/"/>
            {/*<BottomNavigationAction label={t("профиль")} value={routes.profile} icon={<PersonIcon/>} component={Link} to="/profile"/>*/}
        </MuiBottomNavigation>
    )
}

export default BottomNavigation
