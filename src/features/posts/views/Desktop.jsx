import Typography from "@mui/material/Typography"
import {Container, Skeleton} from "@mui/material"

const Desktop = () => {
    return <>
        <Container>
            <Typography
                paragraph
                variant={'h5'}
                align={'center'}
            >
                Десктоп
            </Typography>
            <Skeleton
                variant="rounded"
                width={"100%"}
                height={160}
                sx={{mb: 3}}
            />
            <Typography align={'center'}>
                Мы предоставляем возможность создания ботов для работы на рабочем столе. Такие боты могут автоматизировать рутинные задачи, управлять файлами и папками, выполнять задачи связанные с приложениями, и многое другое. Наши боты
                поддерживают операционные системы Windows, MacOS и Linux.
            </Typography>
        </Container>
    </>
}
export default Desktop