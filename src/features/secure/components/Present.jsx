import Box from "@mui/material/Box"
import {Collapse} from "@mui/material"
import Avatar from "@mui/material/Avatar"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import Typography from "@mui/material/Typography"
import * as React from "react"
import useViewportHeight from "../../../layouts/hooks/useViewportHeight"
import {useTranslation} from "react-i18next"

const Present = ({title}) => {
    const {t} = useTranslation('авторизация')
    const {isKeyboardOpen} = useViewportHeight()
    return <Box>
        <Collapse in={!isKeyboardOpen} easing={'exit'} timeout={1}>
            <Box sx={{display: "flex", justifyContent: 'center'}}>
                <Avatar sx={{mb: 5, bgcolor: 'secondary.main'}}>
                    <LockOutlinedIcon/>
                </Avatar>
            </Box>
        </Collapse>
        <Typography component="h1" variant="h5">
            {t(title)}
        </Typography>
    </Box>
}
export default Present