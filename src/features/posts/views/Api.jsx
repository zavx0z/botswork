import Typography from "@mui/material/Typography"
import {Container, Skeleton} from "@mui/material"

const Api = () => {
    return <>
        <Container>
            <Typography
                paragraph
                variant={'h5'}
                align={'center'}
            >
                Интеграция
            </Typography>
            <Skeleton
                variant="rounded"
                width={"100%"}
                height={160}
                sx={{mb: 3}}
            />
            <Typography align={'center'}>
                Мы предоставляем широкие возможности для интеграции ботов в различные системы и платформы. Наши боты могут интегрироваться с CRM системами, электронными почтовыми сервисами, системами управления контентом и многими
                другими. Кроме того, мы предоставляем API для интеграции с пользовательскими приложениями и системами.
            </Typography>
        </Container>
    </>
}
export default Api