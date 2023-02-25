import * as React from 'react'
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
import {Link as RouterLink} from 'react-router-dom'

const SignIn = () => {
    const handleSubmit = (event) => {
        event.preventDefault()
        const data = new FormData(event.currentTarget)
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        })
    }
    const {t} = useTranslation('авторизация')
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
            <Typography
                component="h1"
                variant="h5"
                // sx={{'&::first-letter': {textTransform: 'uppercase'}}}
            >
                {t("авторизация")}
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label={t("email")}
                    name="email"
                    autoComplete="email"
                    autoFocus
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label={t("пароль")}
                    type="password"
                    id="password"
                    autoComplete="current-password"
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
export default SignIn