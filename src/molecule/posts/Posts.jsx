import {Fade, Skeleton, Slide} from "@mui/material"
import Box from "@mui/material/Box"
import {isMobile} from "react-device-detect"
import Typography from "@mui/material/Typography"
import React, {useRef} from "react"
import useAspectRatio from "../../shared/layout/hooks/useAspectRatio"


export const Post = ({children}) => {
    const ref = useRef(null)
    const [width, height] = useAspectRatio(ref)
    return <>
        <Box
            ref={ref}
            sx={{
                mt: 2,
                display: "flex",
                justifyContent: "center",
                noWrap: true
            }}
        >
            <Slide in={Boolean(width > 0 && height > 0)}>
                <Skeleton variant="rounded" width={width} height={height}/>
            </Slide>
        </Box>
        <Fade in={Boolean(width > 0 && height > 0)}>
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                height: "100%",
                mt: 2
            }}>
                <Typography variant={isMobile ? 'body2' : 'body1'}>
                    {children}
                </Typography>
            </Box>
        </Fade>
    </>
}
