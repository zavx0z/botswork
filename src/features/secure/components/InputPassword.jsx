import React, {useEffect, useRef, useState} from 'react'
import IconButton from '@mui/material/IconButton'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import InputAdornment from '@mui/material/InputAdornment'
import FormControl from '@mui/material/FormControl'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'

const PasswordInput = (props) => {
    const [show, setShow] = useState(false)
    const handleClickShowPassword = () => {
        setShow(!show)
        console.log(show)
    }
    const handleMouseDownPassword = (event) => event.preventDefault()
    const inputRef = useRef(null)
    useEffect(() => {
        if (inputRef.current) {
            setTimeout(() => {
                inputRef.current.setSelectionRange(inputRef.current.value.length, inputRef.current.value.length)
            }, 0)
        }
    }, [show])
    return <FormControl variant="outlined" fullWidth={typeof (props.fullWidth) === "undefined" ? false : props.fullWidth}>
        <InputLabel sx={{width: 70}} htmlFor="outlined-adornment-password">
            {props.label}
        </InputLabel>
        <OutlinedInput
            inputRef={inputRef}
            autoComplete={"on"}
            required
            id="outlined-adornment-password"
            type={show ? 'text' : 'password'}
            name="password"
            {...props}
            endAdornment={
                <InputAdornment position="end">
                    <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                    >
                        {show ? <Visibility/> : <VisibilityOff/>}
                    </IconButton>
                </InputAdornment>
            }
        />
    </FormControl>
}
export default PasswordInput