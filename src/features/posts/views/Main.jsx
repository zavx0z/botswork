import {Container} from "@mui/material"
import Typography from "@mui/material/Typography"

const Main = () => {
    return <>
        <Container>
            <Typography
                paragraph
                variant={'h5'}
                align={'center'}
            >
                BotsWork
            </Typography>
            <Typography
                paragraph
                variant={'subtitle1'}
                align={'center'}
            >
                Платформа ботов
            </Typography>
        </Container>
    </>
}
export default Main