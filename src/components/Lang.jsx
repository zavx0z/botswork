import React, {useState} from 'react'
import {useTranslation} from 'react-i18next'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import ModalBotLoader from "./BotLoader/ModalBotLoader"

const LanguageSelect = () => {
    const {i18n} = useTranslation()

    const [isLoading, setIsLoading] = useState(false)

    const handleLanguageChange = async (event) => {
        setIsLoading(true)
        await i18n.changeLanguage(event.target.value)
        setIsLoading(false)
    }
    return <>
        <ModalBotLoader isLoading={isLoading}/>
        <Select
            size={"small"}
            value={i18n.language}
            onChange={handleLanguageChange}
            variant={"outlined"}
            sx={{
                color: "inherit",
            }}
        >
            <MenuItem value="en">English</MenuItem>
            <MenuItem value="ru">Русский</MenuItem>
            <MenuItem value="de">German</MenuItem>
        </Select>
    </>
}

export default LanguageSelect