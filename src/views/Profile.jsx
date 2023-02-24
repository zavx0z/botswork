import React from "react"
import {Button, Typography} from "@mui/material"
import {inject, observer} from "mobx-react"

const Profile = ({root: {value, incrementValue, decrementValue}}) => <>
    <Typography>
        Личный кабинет {value}
    </Typography>
    <Button
        onClick={incrementValue}
    >
        Увеличить
    </Button>
    <Button
        onClick={decrementValue}
    >
        Уменьшить
    </Button>
</>
export default inject("root")(observer(Profile))