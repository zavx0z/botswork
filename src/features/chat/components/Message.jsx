import {Avatar, Box, Typography} from '@mui/material'

const Message = ({author, content, isSentByMe, sentTime}) => {
    const avatarLetter = author.charAt(0).toUpperCase()

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'flex-end',
                mb: 2,
                ...(isSentByMe && {
                    flexDirection: 'row-reverse',
                    textAlign: 'right',
                }),
            }}
        >
            {/*{!isSentByMe && <Avatar sx={{width: 32, height: 32, mr: 2}}>{avatarLetter}</Avatar>}*/}
            <Box
                sx={{
                    bgcolor: isSentByMe ? 'grey.300' : 'grey.100',
                    borderRadius: 1,
                    py: 1.5,
                    px: 2,
                    maxWidth: '75%',
                    ...(isSentByMe && {
                        ml: 2,
                    }),
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
                        color:  'text.primary',
                        wordWrap: 'break-word',
                    }}
                >
                    {content}
                </Typography>
            </Box>
            {/*{isSentByMe && (*/}
            {/*    <Avatar*/}
            {/*        sx={{width: 32, height: 32, ml: 2}}*/}
            {/*    >*/}
            {/*        {avatarLetter}*/}
            {/*    </Avatar>*/}
            {/*)}*/}
        </Box>
    )
}

export default Message
