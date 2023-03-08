import React, {useState} from 'react'
import {useTranslation} from 'react-i18next'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import ModalBotLoader from "./BotLoader/ModalBotLoader"
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import {IconButton} from "@mui/material"
import {ArrowBack} from "@mui/icons-material"
import Box from "@mui/material/Box"

export const MobileLanguageSelect = ({closeModal}) => {
    const {i18n} = useTranslation()
    const [isLoading, setIsLoading] = useState(false)
    const {t} = useTranslation('меню')

    const handleChange = async (event) => {
        setIsLoading(true)
        await i18n.changeLanguage(event.target.value)
        setIsLoading(false)
    }
    return <Box sx={{height: '100vh', width: '100%'}}>
        <IconButton
            aria-label="close"
            onClick={closeModal}
        >
            <ArrowBack/>
        </IconButton>
        <Box sx={{p: 2}}>
            <FormControl fullWidth>
                <FormLabel id="language">{t('язык')}</FormLabel>
                <RadioGroup
                    aria-labelledby="language"
                    name="language"
                    value={i18n.language}
                    onChange={handleChange}
                >
                    <FormControlLabel value="en" control={<Radio/>} label="English"/>
                    <FormControlLabel value="ru" control={<Radio/>} label="Русский"/>
                    <FormControlLabel value="de" control={<Radio/>} label="German"/>
                </RadioGroup>
            </FormControl>
        </Box>
        <ModalBotLoader isLoading={isLoading} onClose={closeModal}/>
    </Box>
}

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