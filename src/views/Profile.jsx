import React from "react"
import {Typography} from "@mui/material"
import {inject, observer} from "mobx-react"
import BotLoader from "../components/BotLoader/BotLoader"
import Box from "@mui/material/Box"

const ProfilePage = ({user: {username}}) => <>
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
export default inject("user")(observer(ProfilePage))