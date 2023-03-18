import {Box, Typography, useTheme} from '@mui/material'
import Avatar from "@mui/material/Avatar"
import {BrowserView, isMobile} from "react-device-detect"
import {Done, DoneAll} from "@mui/icons-material"

const Message = ({author, content, isSentByMe, sentTime, isRead}) => {
    const avatarLetter = author.charAt(0).toUpperCase()
    const colorAvatar = (isSentByMe) => isSentByMe ? 'grey.600' : 'grey.400'
    const colorMessage = (isSentByMe) => isSentByMe ? 'grey.300' : 'grey.100'
    const position = (isSentByMe) => isMobile && isSentByMe && {flexDirection: 'row-reverse', textAlign: 'right',}
    return <Box
        sx={{
            display: 'flex',
            alignItems: 'flex-end',
            mb: 2,
            ...position(isSentByMe),
            position: 'relative'
        }}
    >
        <BrowserView>
            <Avatar
                sx={{
                    width: 32,
                    height: 32,
                    mr: 2,
                    ml: 2,
                    bgcolor: colorAvatar(isSentByMe),
                }}>
                {avatarLetter}
            </Avatar>
        </BrowserView>
        <Box
            sx={{
                bgcolor: colorMessage(isSentByMe),
                borderRadius: 1,
                py: 1.5,
                px: 2,
                maxWidth: '75%',
                position: 'relative',
            }}
        >
            <Typography
                sx={{
                    color: 'text.primary',
                    fontWeight: 'bold',
                    mb: 0.5,
                }}
                variant="body2"
            >
                {author} • {sentTime}
            </Typography>
            <Typography
                sx={{
                    color: 'text.primary',
                    whiteSpace: 'break-spaces',
                    wordWrap: "break-word"
                }}
                variant="body1"
            >
                {content}
            </Typography>
            <Box
                sx={{
                    position: 'absolute',
                    right: 1,
                    bottom: 0
                }}

            >
                {isSentByMe &&
                    <>
                        {isRead ?
                            <DoneAll sx={{color: "primary.light"}} fontSize={'small'}/>
                            :
                            <Done sx={{color: "primary.light"}} fontSize={'small'}/>}
                    </>
                }
            </Box>
        </Box>
    </Box>
}

export default Message
