import {useState} from "react"
import {List, Modal} from "@mui/material"
import {ArrowBack} from "@mui/icons-material"
import IconButton from "@mui/material/IconButton"
import Box from "@mui/material/Box"
import {useNavigate} from "react-router-dom"
import Lang from "../components/Lang"
import ListItem from "@mui/material/ListItem"

const Settings = () => {
    const [open, setOpen] = useState(true)
    const navigate = useNavigate()
    const handleClose = () => {
        setOpen(false)
        navigate(-1)
    }
    return <Modal
        open={open}
        onClose={handleClose}
        slotProps={{
            backdrop: {
                style: {
                    opacity: 1,
                    backgroundColor: '#fff',
                },
            },
        }}
    >
        <Box sx={{height: '100vh', width: '100%'}}>
            <IconButton
                aria-label="back"
                onClick={() => handleClose()}
            >
                <ArrowBack/>
            </IconButton>
            <List>
                <ListItem>
                    <Lang/>
                </ListItem>
            </List>
        </Box>
    </Modal>
}

export default Settings