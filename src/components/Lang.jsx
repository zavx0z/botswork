import React from 'react'
import {useTranslation} from 'react-i18next'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

const LanguageSelect = () => {
    const {i18n} = useTranslation()

    const handleLanguageChange = event => {
        i18n.changeLanguage(event.target.value)
    }

    return <>
        <Select
            size={"small"}
            value={i18n.language}
            onChange={handleLanguageChange}
            variant={"outlined"}
            sx={{
                // color: "inherit"
            }}
        >
            <MenuItem value="en">English</MenuItem>
            <MenuItem value="ru">Русский</MenuItem>
            <MenuItem value="de">German</MenuItem>
        </Select>
    </>
}

export default LanguageSelect