import * as React from 'react'
import {useState} from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import {useTranslation} from "react-i18next"
import {Link as RouterLink, useNavigate} from 'react-router-dom'
import {useSnackbar} from "notistack"
import {inject, observer} from "mobx-react"
import PasswordInput from "../components/InputPassword"

const Join = ({user: {join, loading}, redirect}) => {
    const {t} = useTranslation('авторизация')
    const navigate = useNavigate()
    const {enqueueSnackbar} = useSnackbar()

    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const handleSubmit = () => {
        login && password && join(login, password)
            .then(() => enqueueSnackbar(t('зарегистрирован'), {variant: "success"}))
            .then(() => navigate(redirect, {replace: true}))
            .catch(e => enqueueSnackbar(e, {variant: "error"})) // todo на сервере завести ошибки и в i18n
    }
    const handleKeyPress = (e) => e.key === "Enter" && handleSubmit()
    return <Container component="main" maxWidth="xs">
        <CssBaseline/>
        <Box sx={{marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                <LockOutlinedIcon/>
            </Avatar>
            <Typography component="h1" variant="h5">
                {t("регистрация")}
            </Typography>
            <Box sx={{mt: 3}}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            id="login"
                            label={t("login")}
                            name="login"
                            onChange={(e) => setLogin(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <PasswordInput
                            required
                            fullWidth
                            name="password"
                            label={t("пароль")}
                            type="password"
                            id="password"
                            autoComplete="new-password"
                            onKeyDown={handleKeyPress}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Grid>
                </Grid>
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
                        <Link component={RouterLink} to={"/login"} variant="body2">
                            {t('войти_уже')}
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    </Container>
}
export default inject('user')(observer(Join))
