import React, {useMemo} from "react"
import IconButton from "@mui/material/IconButton"
import {CircularProgress, Tooltip} from "@mui/material"


const ButtonToolTipIcon = ({children, title, onClick, toggled, disabled, size, loading, active, ...other}) => {
    const disable = useMemo(() => disabled || loading, [disabled, loading])
    const color = useMemo(() => {
        if (disable && !active)
            return "inherit"
        else if (disabled && active)
            return "primary"
        else if (!disable && !active && toggled)
            return "secondary"
        else if (!disabled && active)
            return "primary"
    }, [active, disable, disabled, toggled])
    return <>
        <Tooltip
            title={title}
            aria-label={title}
            enterDelay={1000}
            placement={"top-end"}
            {...other}
        >
            <div>
                <IconButton
                    size={size ? size : 'medium'}
                    onClick={onClick}
                    disabled={disable}
                    sx={{position: "relative"}}
                >
                    {loading && <CircularProgress color={"primary"} size={24} sx={{position: "absolute"}}/>}
                    {React.cloneElement(children, {color: color})}
                </IconButton>
            </div>
        </Tooltip>
    </>
}
export default ButtonToolTipIcon