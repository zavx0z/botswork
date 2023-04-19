import {Route, Routes} from "react-router-dom"
import routes from "./routes"
import {Container, Skeleton} from "@mui/material"
import Box from "@mui/material/Box"
import {isMobile} from "react-device-detect"
import Typography from "@mui/material/Typography"

const Posts = () =>
    <Container sx={{display: "flex", flexDirection: "column"}}>
        <Box sx={{...styles, justifyContent: "center"}}>
            <Skeleton variant="rounded" sx={{width: "100%", paddingTop: "56.25%"}}/>
        </Box>
        <Box sx={{...styles}}>
            <Routes>
                <Route path={routes.post} element={<Description>
                    Платформа ботов
                </Description>}/>
                <Route path={routes.browser} element={<Description>
                    Наша платформа позволяет создавать и управлять ботами, которые работают в браузере.
                    Такие боты могут выполнять различные задачи, такие как автоматизация веб-форм, сбор данных и многое другое.
                </Description>}/>
                <Route path={routes.mobile} element={<Description>
                    Наша платформа позволяет создавать и управлять ботами для работы на мобильных устройствах.
                    Такие боты могут выполнять задачи, связанные с приложениями на мобильных устройствах, сбор данных и многое другое.
                    Мы поддерживаем широкий спектр мобильных устройств, таких как iOS и Android.
                </Description>}/>
                <Route path={routes.desktop} element={<Description>
                    Мы предоставляем возможность создания ботов для работы на рабочем столе.
                    Такие боты могут автоматизировать рутинные задачи, управлять файлами и папками, выполнять задачи связанные с приложениями, и многое другое.
                    Наши боты поддерживают операционные системы Windows, MacOS и Linux.
                </Description>}/>
                <Route path={routes.workspace} element={<Description>
                    Мы предоставляем возможность создания и управления виртуальными рабочими столами для ботов.
                    Это позволяет создавать изолированные рабочие среды для ботов и управлять ими из облачной платформы.
                    Такой подход позволяет максимально оптимизировать использование ресурсов и повышает безопасность.
                </Description>}/>
                <Route path={routes.api} element={<Description>
                    Мы предоставляем широкие возможности для интеграции ботов в различные системы и платформы.
                    Наши боты могут интегрироваться с CRM системами, электронными почтовыми сервисами, системами управления контентом и многими другими.
                    Кроме того, мы предоставляем API для интеграции с пользовательскими приложениями и системами.
                </Description>}/>
            </Routes>
        </Box>
    </Container>

const styles = {display: "flex", height: "50%", flexDirection: "column", mt: 2}
const Description = ({children}) => <Typography variant={isMobile ? 'body2' : 'body1'}>{children}</Typography>
export default Posts