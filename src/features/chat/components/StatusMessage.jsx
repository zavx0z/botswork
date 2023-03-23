import {Done, DoneAll} from "@mui/icons-material"
import {Box} from "@mui/material"

export const StatusMessage = ({status}) => {
    const getStatus = (status) => {
        switch (status) {
            case 'SENDING':
                return <Done sx={{color: "grey.400"}} fontSize={'small'}/>
            case 'READING':
                return <DoneAll sx={{color: "primary.light"}} fontSize={'small'}/>
            case 'WAITING':
                return <Done sx={{color: "primary.light"}} fontSize={'small'}/>
            default:
                break
        }
    }
    return <Box sx={{
        position: 'absolute',
        right: 1,
        bottom: 0,
    }}>
        {getStatus(status)}
    </Box>
}