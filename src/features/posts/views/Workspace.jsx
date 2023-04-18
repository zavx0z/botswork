import Typography from "@mui/material/Typography"
import {Container, Skeleton} from "@mui/material"

const Workspace = () => {
    return <>
        <Container>
            <Typography
                paragraph
                variant={'h5'}
                align={'center'}
            >
                Окружение
            </Typography>
            <Skeleton
                variant="rounded"
                width={"100%"}
                height={160}
                sx={{mb: 3}}
            />
            <Typography align={'center'}>
                Мы предоставляем возможность создания и управления виртуальными рабочими столами для ботов. Это позволяет создавать изолированные рабочие среды для ботов и управлять ими из облачной платформы. Такой подход позволяет
                максимально оптимизировать использование ресурсов и повышает безопасность.
            </Typography>
        </Container>

    </>
}
export default Workspace