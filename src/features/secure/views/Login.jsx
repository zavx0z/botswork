import * as React from 'react'
import {useState} from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
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

const Login = ({user: {loading, login, username: us}, redirect}) => {
    const {t} = useTranslation('авторизация')
    const navigate = useNavigate()
    const {enqueueSnackbar} = useSnackbar()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const handleSubmit = () => {
        username && password &&
        login(username, password)
            .then(() => enqueueSnackbar(t('привет'), {variant: "success"}))
            .then(() => console.log(us))
            .then(() => navigate(redirect, {replace: true}))
            .catch(() => enqueueSnackbar(t('не_верный_логин_пароль'), {variant: "error"}))
        // .catch(e => enqueueSnackbar(e, {variant: "error"})) // todo на сервере завести ошибки и в i18n
    }
    const handleKeyPress = (e) => e.key === "Enter" && handleSubmit()
    return <Container component="main" maxWidth="xs">
        <CssBaseline/>
        <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                <LockOutlinedIcon/>
            </Avatar>
            <Typography component="h1" variant="h5">
                {t("авторизация")}
            </Typography>
            <Box sx={{mt: 1}}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label={t("login")}
                    onChange={(e) => setUsername(e.target.value)}
                    name="username"
                    autoFocus
                />
                <PasswordInput
                    fullWidth
                    label={t("пароль")}
                    onKeyDown={handleKeyPress}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <FormControlLabel
                    control={<Checkbox value="remember" color="primary"/>}
                    label={t("запомнить")}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{mt: 3, mb: 2}}
                    disabled={loading}
                    onClick={handleSubmit}
                >
                    {t("вход")}
                </Button>
                <Grid container>
                    <Grid item xs>
                        <Link
                            component={RouterLink}
                            to={"/reset"}
                            variant="body2"
                        >
                            {t("забыл_пароль")}
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link
                            component={RouterLink}
                            to={"/signup"}
                            variant="body2"
                        >
                            {t("нет_аккаунта")}
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    </Container>
}
export default inject('user')(observer(Login))