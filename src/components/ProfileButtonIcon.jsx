import {IconButton} from "@mui/material"
import {AccountBox, Login} from "@mui/icons-material"
import * as React from "react"

const ProfileButtonIcon = ({handleOpen, isAuthenticated, ...other}) =>
    <IconButton
        size={'small'}
        onClick={handleOpen}
        {...other}
    >
        {isAuthenticated ?
            <AccountBox
                fontSize={'medium'}
                alt="Profile"
                color={"secondary"}
                // src={logo}
            />
            :
            <Login color={"secondary"}/>
        }
    </IconButton>
export default ProfileButtonIcon