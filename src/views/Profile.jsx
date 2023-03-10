import React from "react"
import {Button, Typography} from "@mui/material"
import {inject, observer} from "mobx-react"
import BotLoader from "../components/BotLoader/BotLoader"
import Box from "@mui/material/Box"
import {useNavigate} from "react-router-dom"
import routes from "../routes/routes"

const ProfilePage = ({user: {username}}) => {
    const navigate = useNavigate()

    return <>
        <Typography>
            Пользователь: {username}
        </Typography>
        <Button onClick={() => navigate(routes.viewer)}>
            Браузер в браузере
        </Button>
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