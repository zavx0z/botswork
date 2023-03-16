import {Box, Typography} from '@mui/material'
import Avatar from "@mui/material/Avatar"
import {BrowserView, isMobile} from "react-device-detect"

const Message = ({author, content, isSentByMe, sentTime}) => {
    const avatarLetter = author.charAt(0).toUpperCase()
    const colorAvatar = (isSentByMe) => isSentByMe ? 'grey.600' : 'grey.400'
    const colorMessage = (isSentByMe) => isSentByMe ? 'grey.300' : 'grey.100'
    const position = (isSentByMe) => isMobile && isSentByMe && {flexDirection: 'row-reverse', textAlign: 'right',}
    return <Box
        sx={{
            display: 'flex',
            alignItems: 'flex-end',
            mb: 2,
            // overflow: "hidden",
            // touchAction: "none",
            ...position(isSentByMe),
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
                    wordWrap: 'break-word',
                }}
                variant="body1"
            >
                {content}
            </Typography>
        </Box>
    </Box>
}

export default Message
