import Typography from "@mui/material/Typography"
import {Container, Skeleton} from "@mui/material"

const Mobile = () => {
    return <>
        <Container>
            <Typography
                paragraph
                variant={'h5'}
                align={'center'}
            >
                Мобильный
            </Typography>
            <Skeleton
                variant="rounded"
                width={"100%"}
                height={160}
                sx={{mb: 3}}
            />
            <Typography align={'center'}>
                Наша платформа позволяет создавать и управлять ботами для работы на мобильных устройствах. Такие боты могут выполнять задачи, связанные с приложениями на мобильных устройствах, сбор данных и многое другое. Мы поддерживаем
                широкий спектр мобильных устройств, таких как iOS и Android.
            </Typography>
        </Container>
    </>
}
export default Mobile