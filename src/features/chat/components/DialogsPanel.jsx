import React, {useEffect} from "react"
import {Chip, List, ListItemAvatar, ListItemText, TextField} from "@mui/material"
import ListItemButton from "@mui/material/ListItemButton"
import Avatar from "@mui/material/Avatar"
import {useNavigate, useParams} from "react-router-dom"
import routes from "../../../routes/routes"

const DialogsPanel = ({dialogs, dialogJoin, dialogLeave}) => {
    const navigate = useNavigate()
    const {dialogId} = useParams()
    useEffect(() => {
        dialogId && dialogJoin(dialogId)
        return () => dialogLeave(dialogId)
    }, [dialogId, dialogLeave])
    return <>
        <TextField
            fullWidth
            size={'small'}
            variant={'outlined'}
            placeholder={'поиск'}
        />
        <List sx={{pt: 0}}>
            {dialogs.map((dialog) =>
                <ListItemButton
                    key={dialog.id}
                    divider
                    dense
                    selected={parseInt(dialogId) === dialog.id}
                    onClick={() => navigate(routes.chat + '/' + dialog.id)}
                >
                    <ListItemAvatar>
                        <Avatar>
                            {dialog.username[0]}
                            </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={dialog.username}
                        secondary={dialog.lastMessage}
                    >
                    </ListItemText>
                    {!!dialog.unreadMessages && <Chip
                        size={'small'}
                        label={dialog.unreadMessages}
                    />}
                </ListItemButton>)}
        </List>
    </>
}
export default DialogsPanel