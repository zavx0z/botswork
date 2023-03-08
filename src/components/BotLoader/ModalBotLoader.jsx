import {Modal} from "@mui/material"
import Box from "@mui/material/Box"
import BotLoader from "./BotLoader"
import {useEffect, useState} from "react"


const ModalBotLoader = ({isLoading, setLoading, children, onClose}) => {
    const [open, setOpen] = useState(false)

    useEffect(() => {
        let timerId
        let intervalId
        if (isLoading)
            setOpen(true)
        const showLoader = () => {
            intervalId = setInterval(() => {
                if (!isLoading) {
                    clearInterval(intervalId)
                    timerId = setTimeout(() => {
                        if (typeof onClose !== "undefined" && open)
                            onClose()
                        setOpen(false)
                    }, 1000)
                }
            }, 200)
        }
        showLoader()
        return () => {
            clearTimeout(timerId)
            clearInterval(intervalId)
        }
    }, [isLoading, onClose, open])
    return (
        <Modal open={open}>
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: "rgba(255, 255, 255, 0.8)",
                    borderRadius: "8px",
                    p: 2,
                }}
            >
                <BotLoader/>
                {children}
            </Box>
        </Modal>
    )
}

export default ModalBotLoader