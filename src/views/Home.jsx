import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import routes from "../routes/routes"
import {useNavigate} from "react-router-dom"
import Box from "@mui/material/Box"
import {ListItem, ListItemText, Step, StepContent, StepLabel, Stepper} from "@mui/material"
import {KeyboardArrowRight} from "@mui/icons-material"
import React from "react"
import ListItemIcon from "@mui/material/ListItemIcon"
import List from "@mui/material/List"


const advantage = [
    'Симбиоз IT навыков и накопленных многолетних экспертных знаний',
    'Уникальность платформы, не имеющей аналогов во всем Мире',
    'Онлайн поддержка на каждом этапе реализации проекта',
    'Безопасность платформы и обмена данными',
]
const Home = () => {
    // const theme = useTheme()
    const navigate = useNavigate()
    return <Box sx={{
        display: 'flex',
        height: "100%"
    }}
    >

        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            height: "100%",
            flexGrow: 1,
            overflowY: 'auto',
            justifyContent: 'flex-start',
            alignContent: "center",
            alignItems: "center",
        }}>
            <Typography
                variant={'h6'}
                variantMapping={{h6: 'h1'}}
                align="center"
            >
                Предвосхищая потребность клиента
            </Typography>
            <Typography
                variant={'subtitle1'}
                align={'center'}
                paragraph
            >
                BotsWork - платформа, созданная для решения...
            </Typography>
            <Typography
                variant={'h6'}
                align={'center'}
            >
                Наши преимущества
            </Typography>
            <List>
                {advantage.map((item, idx) =>
                    <ListItem
                        key={idx}
                    >
                        <ListItemIcon><KeyboardArrowRight/></ListItemIcon>
                        <ListItemText
                            primary={item}
                        />
                    </ListItem>
                )}
            </List>
            <Typography
                variant={'h6'}
                align={'center'}
            >
                Наши процессы
            </Typography>
            <Stepper
                sx={{ml: 1}}
                orientation={'vertical'}
            >
                <Step
                    active={true}
                >
                    <StepLabel>
                        <Typography>
                            Запрос
                        </Typography>
                    </StepLabel>
                    <StepContent>
                        <Typography>
                            Вы направляете требования по вашему проекту: тех. требования, сроки, бюджет.
                        </Typography>
                    </StepContent>
                </Step>
                <Step
                    active={true}
                >
                    <StepLabel>
                        <Typography>
                            24 часа
                        </Typography>
                    </StepLabel>
                    <StepContent>
                        <Typography>
                            Мы предоставляем варианты решения
                        </Typography>
                        <List disablePadding>
                            <ListItem disablePadding><ListItemText primary={"- Готовый ресурс"}/></ListItem>
                            <ListItem disablePadding><ListItemText primary={"- Разработка индивидуального проекта"}/></ListItem>
                        </List>
                    </StepContent>
                </Step>
                <Step
                    active={true}
                >
                    <StepLabel>
                        <Typography>
                            Согласование
                        </Typography>
                    </StepLabel>
                    <StepContent>
                        <Typography>
                            Согласовываем выбранный вариант и вы направляете аванс
                        </Typography>
                    </StepContent>
                </Step>
                <Step
                    active={true}
                >
                    <StepLabel>
                        <Typography>
                            Результат
                        </Typography>
                    </StepLabel>
                    <StepContent>
                        <Typography>
                            Предоставляем результат. Вы оплачиваете 100% стоимости.
                        </Typography>
                    </StepContent>
                </Step>
            </Stepper>
            <Box
                sx={{
                    p: 2
                }}
            >
                <Button
                    // fullWidth
                    variant={"contained"}

                    onClick={() => navigate(routes.chat)}
                >
                    связаться
                </Button>
            </Box>
        </Box>
    </Box>
}

export default Home