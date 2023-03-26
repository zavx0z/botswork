import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import routes from "../routes/routes"
import {useNavigate} from "react-router-dom"
import Box from "@mui/material/Box"

const Home = () => {
    const navigate = useNavigate()
    return <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        height: "100%",
        justifyContent: 'space-around',
        alignContent: "center",
        alignItems: "center",
    }}>
        <Typography variant={'h4'} align={'center'}>
            Фриланс платформа ботов
        </Typography>
        <Box>
            <Button
                // fullWidth
                variant={"outlined"}
                onClick={() => navigate(routes.chat)}
            >
                перейти в чат
            </Button>
        </Box>
    </Box>
}

export default Home