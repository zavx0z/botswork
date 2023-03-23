import {Chip, ListItem, ListSubheader} from "@mui/material"
import Message from "./Message"

const MessageList = ({messages, userId}) => Object.keys(messages)
    .map((date, idx) => (
        <li key={`section-${idx}`}
            style={{
                width: "100%",
            }}
        >
            <ul style={{
                listStyleType: 'none',
                margin: 0,
                padding: 0,
                width: "100%",
            }}>
                <ListSubheader disableGutters sx={{
                    bgcolor: "transparent",
                    display: "flex",
                    justifyContent: "center",
                }}>
                    <Chip label={date} variant="outlined" size={'small'}/>
                </ListSubheader>
                {messages[date].map(({id, text, date, senderName, senderId, status}) => (
                    <ListItem
                        disablePadding
                        disableGutters
                        dense
                        key={`item-${id}`}
                    >
                        <Message
                            key={id}
                            author={senderName}
                            content={text}
                            isSentByMe={senderId === userId}
                            sentTime={date}
                            status={status}
                        />
                    </ListItem>
                ))}
            </ul>
        </li>
    ))
export default MessageList