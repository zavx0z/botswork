import {Box, Typography} from '@mui/material'
import Avatar from "@mui/material/Avatar"
import {BrowserView, isMobile} from "react-device-detect"

const Message = ({author, content, isSentByMe, sentTime}) => {
    const avatarLetter = author.charAt(0).toUpperCase()
    return <Box
        sx={{
            display: 'flex',
            alignItems: 'flex-end',
            mb: 2,
            ...(isMobile && isSentByMe && {
                flexDirection: 'row-reverse',
                textAlign: 'right',
            }),
        }}
    >
        <BrowserView>
            <Avatar sx={{width: 32, height: 32, mr: 2}}>{avatarLetter}</Avatar>
        </BrowserView>
        <Box
            sx={{
                bgcolor: isSentByMe ? 'grey.300' : 'grey.100',
                borderRadius: 1,
                py: 1.5,
                px: 2,
                maxWidth: '75%',
            }}
        >
                <Typography
                    variant="body2"
                    sx={{
                        color: 'text.primary',
                        fontWeight: 'bold',
                        mb: 0.5,
                    }}
                >
                    {author} • {sentTime}
                </Typography>
            <Typography
                variant="body1"
                sx={{
                    color: 'text.primary',
                    wordWrap: 'break-word',
                }}
            >
                {content}
            </Typography>
        </Box>
    </Box>
}

export default Message
