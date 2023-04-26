import {Fade, Skeleton, Slide} from "@mui/material"
import Box from "@mui/material/Box"
import {isMobile} from "react-device-detect"
import Typography from "@mui/material/Typography"
import React, {useRef} from "react"
import useAspectRatio from "../shared/layout/hooks/useAspectRatio"
import Container from "@mui/material/Container"
import ListItemText from "@mui/material/ListItemText"
import List from "@mui/material/List"

export const MainInfo = () =>
    <Container sx={{overflow: 'auto', pt: 1}} maxWidth={'sm'}>
        <Typography variant={'h1'} align={'center'}>
            SuperApp
        </Typography>
        <Typography variant={'subtitle1'} align={'center'}>
            MetaBot-platform
        </Typography>
        <Typography variant={'subtitle1'} paragraph align={'center'}>
            пространство ботов и людей
        </Typography>
        <Typography align={'center'} variant={'subtitle2'}>
            <b>Разделяй, объединяй и властвуй!</b>
        </Typography>
        <Typography variant={'body1'}>
            Полный контроль над каждым этапом выполнения задач.
            У нас боты не болеют, не бухают, не страдают😉
        </Typography>
        <List>
            <ListItemText primary={'▪️️ реалтайм VNC просмотр'} primaryTypographyProps={{variant: 'body1'}}/>
            <ListItemText primary={'▪️️ логирование с записью истории'} primaryTypographyProps={{variant: 'body1'}}/>
            <ListItemText primary={'▪️️ возможность вмешаться в алгоритм'} primaryTypographyProps={{variant: 'body1'}}/>
            <ListItemText primary={'▪️️ запись видео действий в приложениях'} primaryTypographyProps={{variant: 'body1'}}/>
        </List>
        <Typography align={'center'} variant={'subtitle2'}>
            <b>Систематизация, оптимизация, делегация.</b>
        </Typography>
        <Typography variant={'body1'}>
            Точные вычисления, творческие задачи, сбор и проброс информации...
            быстрее, проще, качественнее, интересней💣️
        </Typography>
        <List>
            <ListItemText primary={'▪️️ конфигурирование отчётности'} primaryTypographyProps={{variant: 'body1'}}/>
            <ListItemText primary={'▪️️ результат в любом формате'} primaryTypographyProps={{variant: 'body1'}}/>
            <ListItemText primary={'▪️️ результат на любой ресурс'} primaryTypographyProps={{variant: 'body1'}}/>
            <ListItemText primary={'▪️️ API доступ к результатам'} primaryTypographyProps={{variant: 'body1'}}/>
        </List>
        <Typography align={'center'} variant={'subtitle2'} sx={{fontWeight: 555}}>
            <b>Цифровизация на трендовых технологиях.</b>
        </Typography>
        <Typography variant={'body1'}>
            Пока другие изобретают, мы разрабатываем рабочие решения которые объединяют в пространство &#9883;
        </Typography>
        <List>
            <ListItemText primary={'▪️️ людей'} primaryTypographyProps={{variant: 'body1'}}/>
            <ListItemText primary={'▪️️ приложения'} primaryTypographyProps={{variant: 'body1'}}/>
            <ListItemText primary={'▪️️ алгоритмы'} primaryTypographyProps={{variant: 'body1'}}/>
            <ListItemText primary={'▪️️ нейросети'} primaryTypographyProps={{variant: 'body1'}}/>
        </List>
    </Container>

const Info = ({children}) => {
    const ref = useRef(null)
    const [width, height] = useAspectRatio(ref)
    return <Container>
        <Box
            ref={ref}
            sx={{
                mt: 2,
                display: "flex",
                justifyContent: "center",
                noWrap: true
            }}
        >
            <Slide in={Boolean(width > 0 && height > 0)}>
                <Skeleton variant="rounded" width={width} height={height}/>
            </Slide>
        </Box>
        <Fade in={Boolean(width > 0 && height > 0)}>
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                height: "100%",
                mt: 2
            }}>
                <Typography variant={isMobile ? 'body1' : 'body1'}>
                    {children}
                </Typography>
            </Box>
        </Fade>
    </Container>
}
export default Info
