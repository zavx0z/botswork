import React, {useLayoutEffect, useState} from 'react'
import {BottomNavigation as MuiBottomNavigation, BottomNavigationAction, Chip} from '@mui/material'
import {Link, useLocation} from 'react-router-dom'
import {useTranslation} from "react-i18next"
import {isIOS} from "react-device-detect"
import Box from "@mui/material/Box"
import {inject, observer} from "mobx-react"

const Chat = inject("root')(observer(({root: {unreadMessages}, icon}) => {
        return <Box sx={{position: 'relative'}}>
            {icon}
            {unreadMessages > 0 &&
                <Chip sx={{
                    position: 'absolute',
                    top: -5,
                    right: -5,
                    width: 16,
                    height: 16,
                    fontSize: '0.6rem',
                    '& .MuiChip-label': {p: 0}
                }}
                      label={unreadMessages}
                      color={'primary'}
                />}
        </Box>
    }))

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
                // borderTopColor: '#0c1f3c',
                // borderTopStyle: 'solid',
                // borderTopWidth: 'thin',
                pb: isIOS ? .5 : 0,
                overflow: 'hidden',
            }}
        >
            {items.map(({title, route, icon}) =>
                <BottomNavigationAction
                    key={route}
                    label={t(title)}
                    value={route}
                    icon={title === 'чат' ? <Chat icon={icon}/> : icon}
                    component={Link}
                    to={route}
                />
            )}
        </MuiBottomNavigation>
    )
}

export default BottomNavigation
