import React from 'react'
import {useTranslation} from 'react-i18next'
import {Container, Typography, TextField, Button} from '@mui/material'

const ResetPassword = () => {
    const {t} = useTranslation('авторизация')

    return <>
        <Container sx={{marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center'}} component="main" maxWidth="xs">
                <Typography sx={{mb: 2}} component="h1" variant="h5">
                    {t('сброс_пароля')}
                </Typography>
                <form noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label={t('email')}
                        name="email"
                        autoComplete="email"
                        autoFocus
                        sx={{mb: 2}}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{mb: 2}}
                    >
                        {t('отправить')}
                    </Button>
                </form>
        </Container>
    </>
}

export default ResetPassword
