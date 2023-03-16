import * as React from 'react'
import {useState} from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
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


const Login = ({submit, redirect}) => {
    const {t} = useTranslation('авторизация')
    const navigate = useNavigate()
    const {enqueueSnackbar} = useSnackbar()
    const [loading, setLoading] = useState(false)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [remember, setRemember] = useState(true)
    const handleKeyPress = (e) => e.key === "Enter" && handleSubmit()
    const handleSubmit = () => {
        if (username && password) {
            submit(username, password, remember)
                .then(() => enqueueSnackbar(t('привет'), {variant: "success"}))
                .then(() => navigate(redirect, {replace: true}))
                .finally(setLoading(false))
        }
    }
    return <Container
        maxWidth="xs"
        sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            alignContent: 'center',
            justifyContent: "space-evenly",
            flexGrow: 1,
        }}
    >
        <Present title={"авторизация"}/>
        <Box>
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
                control={
                    <Checkbox
                        value="remember"
                        color="primary"
                        checked={remember}
                        onChange={(e) => setRemember(!remember)}
                    />}
                label={t("запомнить")}
            />
        </Box>
        <Box sx={{width: '100%'}}>
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
                    <Link component={RouterLink} to={routes.reset} variant="body2">
                        {t("забыл_пароль")}
                    </Link>
                </Grid>
                <Grid item>
                    <Link component={RouterLink} to={routes.join} variant="body2">
                        {t("нет_аккаунта")}
                    </Link>
                </Grid>
            </Grid>
        </Box>
    </Container>
}
export default Login