import * as React from 'react'
import {useState} from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import {useTranslation} from "react-i18next"
import {Link as RouterLink, useNavigate} from 'react-router-dom'
import {useSnackbar} from "notistack"
import PasswordInput from "../components/InputPassword"
import routes from "../routes"
import Present from "../components/Present"

const Join = ({submit, redirect}) => {
    const {t} = useTranslation('авторизация')
    const navigate = useNavigate()
    const {enqueueSnackbar} = useSnackbar()
    const [loading, setLoading] = useState(false)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const handleSubmit = () => {
        if (username && password) {
            setLoading(true)
            submit(username, password)
                .then(() => enqueueSnackbar(t('зарегистрирован'), {variant: "success"}))
                .then(() => navigate(redirect, {replace: true}))
                .finally(setLoading(false))
        }
    }
    const handleKeyPress = (e) => e.key === "Enter" && handleSubmit()
    return <Container
        maxWidth="xs"
        sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            alignContent: 'center',
            justifyContent: "space-evenly",
            flexGrow: 1,
        }}>
        <Present title={"регистрация"}/>
        <Box>
            <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label={t("login")}
                name="username"
                onChange={(e) => setUsername(e.target.value)}
                autoFocus
            />
            <PasswordInput
                fullWidth
                label={t("пароль")}
                onKeyDown={handleKeyPress}
                onChange={(e) => setPassword(e.target.value)}
            />
        </Box>
        <Box sx={{width: '100%'}}>
            <Button
                type="submit"
                fullWidth
                color={"primary"}
                variant="contained"
                sx={{mt: 3, mb: 2}}
                disabled={loading}
                onClick={handleSubmit}
            >
                {t('регистрация')}
            </Button>
            <Grid container justifyContent="flex-end">
                <Grid item>
                    <Link component={RouterLink} to={routes.login} variant="body2">
                        {t('войти_уже')}
                    </Link>
                </Grid>
            </Grid>
        </Box>
    </Container>
}
export default Join
