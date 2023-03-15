import React from "react"
import {Typography} from "@mui/material"
import {inject, observer} from "mobx-react"
import BotLoader from "../components/BotLoader/BotLoader"
import Box from "@mui/material/Box"
import {useNavigate} from "react-router-dom"

const ProfilePage = ({user: {username}}) => {
    const navigate = useNavigate()

    return <>
        <Typography>
            Пользователь: {username}
        </Typography>
        <Box sx={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
            // height: 500
        }}>
            <BotLoader/>
        </Box>
    </>

}

export default inject("user")(observer(ProfilePage))