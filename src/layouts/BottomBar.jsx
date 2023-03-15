import React, {useLayoutEffect, useState} from 'react'
import {BottomNavigation as MuiBottomNavigation, BottomNavigationAction} from '@mui/material'
import {Link, useLocation} from 'react-router-dom'
import {useTranslation} from "react-i18next"
import {isIOS} from "react-device-detect"


const BottomNavigation = ({items}) => {
    const location = useLocation()
    const [value, setValue] = useState(location.pathname)
    const {t} = useTranslation('меню')

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    useLayoutEffect(() => {
        setValue(location.pathname)
    }, [location])

    return (
        <MuiBottomNavigation
            showLabels
            value={value}
            onChange={handleChange}
            sx={{
                borderTopColor: '#0c1f3c',
                borderTopStyle: 'solid',
                borderTopWidth: 'thin',
                pb: isIOS ? .5 : 0,
                overflow: 'hidden',
            }}
        >
            {items.map(({title, route, icon}) =>
                <BottomNavigationAction
                    key={route}
                    label={t(title)}
                    value={route}
                    icon={icon}
                    component={Link}
                    to={route}
                />
            )}
        </MuiBottomNavigation>
    )
}

export default BottomNavigation
