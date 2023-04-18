import Typography from "@mui/material/Typography"
import {Container, Skeleton} from "@mui/material"

const Browser = () => {
    return <>
        <Container>
            <Typography
                paragraph
                variant={'h5'}
                align={'center'}
            >
                Браузер
            </Typography>
            <Skeleton
                variant="rounded"
                width={"100%"}
                height={160}
                sx={{mb: 3}}
            />
            <Typography align={'center'}>
                Наша платформа позволяет создавать и управлять ботами, которые работают в браузере.
                Такие боты могут выполнять различные задачи, такие как автоматизация веб-форм, сбор данных и многое другое.
            </Typography>
        </Container>
    </>
}
export default Browser