import * as React from "react"
import {useState} from "react"
import {List, ListItemText, Modal} from "@mui/material"
import {ArrowBack, Language} from "@mui/icons-material"
import IconButton from "@mui/material/IconButton"
import Box from "@mui/material/Box"
import {useNavigate} from "react-router-dom"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemButton from "@mui/material/ListItemButton"
import {useTranslation} from "react-i18next"
import Divider from "@mui/material/Divider"
import {MobileLanguageSelect} from "../components/Lang"

const Settings = () => {
    const {t} = useTranslation('меню')
    const [open, setOpen] = useState(true)
    const [langOpen, setLangOpen] = useState(false)
    const navigate = useNavigate()
    const handleClose = () => {
        setOpen(false)
        navigate(-1)
    }
    const handleOpenLang = () => {
        setLangOpen(true)
    }

    return <>
        <Modal
            open={open}
            onClose={handleClose}
            slotProps={{backdrop: {style: {opacity: 1, backgroundColor: '#fff'}}}}
        >
            <Box sx={{height: '100vh', width: '100%'}}>
                <IconButton
                    aria-label="back"
                    onClick={() => handleClose()}
                >
                    <ArrowBack/>
                </IconButton>
                <List>
                    <Divider/>
                    <ListItemButton divider onClick={handleOpenLang}>
                        <ListItemIcon>
                            <Language/>
                        </ListItemIcon>
                        <ListItemText primary={t('язык')}/>
                    </ListItemButton>
                </List>
            </Box>
        </Modal>
        <Modal
            open={langOpen}
            onClose={() => setLangOpen(false)}
            slotProps={{backdrop: {style: {opacity: 1, backgroundColor: '#fff'}}}}
        >
            <Box>
                <MobileLanguageSelect closeModal={() => setLangOpen(false)}/>
            </Box>
        </Modal>
    </>
}

export default Settings