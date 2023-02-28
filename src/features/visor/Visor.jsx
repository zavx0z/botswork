import React from 'react'
import VncScreen from "./VncScreen"
import {inject, observer} from "mobx-react"
import VisorDash from "./VisorDash"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import {CircularProgress} from "@mui/material"

// fixme при изменении размера окна, изменять размер визора
const Visor = ({root: {task}, title, subtitle, actions}) => {
    const {session, interactive, visibleVisor, visorUpdateStateTask, visibleVisorLoader, visibleVisorTitle} = task
    return <>
        <Grid
            item
            container
            direction={'column'}
            justify={"space-between"}
            sx={{
                height: "100%",
                width: "100%",
                backdropFilter: 'blur(10px)',
                backgroundColor: "transparent"
            }}
            wrap={"nowrap"}
        >
            <Grid item
                  sx={{
                      flexGrow: 1,
                      backgroundColor: "rgba(226,224,224,0.38)"
                  }}>
                <Grid item container direction={"column"}
                      justify={"space-around"}
                      alignContent={"center"}
                      alignItems={"center"}
                      sx={{
                          height: "100%",
                          width: "100%",
                          overflow: "hidden"
                      }}
                >
                    {visibleVisor &&
                        <Grid item sx={{
                            height: "100%",
                            width: "100%",
                            overflow: "hidden"
                        }}>
                            <VncScreen
                                width={"100%"}
                                height={"100%"}
                                origin={true}
                                session={session}
                                interactive={interactive}
                                onUpdateState={visorUpdateStateTask}
                            />
                        </Grid>}
                    {visibleVisorTitle && <VisorTitle title={title} subtitle={subtitle}/>}
                    {visibleVisorLoader && <VisorLoader/>}
                    {actions}
                </Grid>
            </Grid>
            <Grid item container>
                <VisorDash direction={"row"}/>
            </Grid>
        </Grid>
    </>
}
export default inject("root")(observer(Visor))
const VisorLoader = () => <Grid item><CircularProgress color={"secondary"}/></Grid>
const VisorTitle = ({title, subtitle}) => <>
    <Grid item>
        <Typography align={"center"} variant={"h4"}>
            {title}
        </Typography>
        <Typography align={"center"} variant={"subtitle1"}>
            {subtitle}
        </Typography>
    </Grid>
</>
