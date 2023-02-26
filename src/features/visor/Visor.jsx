import React from 'react'
import VncScreen from "./VncScreen"
import Grid from "@material-ui/core/Grid"
import CircularProgress from "@material-ui/core/CircularProgress"
import {inject, observer} from "mobx-react"
import VisorDash from "./VisorDash"
import Typography from "@material-ui/core/Typography"
import makeStyles from "@material-ui/core/styles/makeStyles"
import Tags from "../../views/classification/containers/Tags"
import TagsToolBar from "../../views/classification/controllers/TagsToolBar"

const useStyles = makeStyles((theme) => ({
    root: {
        height: "100%",
        width: "100%",
        backdropFilter: 'blur(10px)',
        backgroundColor: "transparent"
    },
    visorContainer: {
        flexGrow: 1,
        backgroundColor: "rgba(226,224,224,0.38)"
    },
    transparent:{
        backdropFilter: 'blur(10px)',
        backgroundColor: "rgba(226,224,224,0.38)"
    },
    visor: {
        height: "100%",
        width: "100%",
        overflow: "hidden"
    }
}))
// fixme при изменении размера окна, изменять размер визора
const Visor = ({root: {task}, title, subtitle, actions}) => {
    const {session, interactive, visibleVisor, visorUpdateStateTask, visibleVisorLoader, visibleVisorTitle} = task
    const classes = useStyles()
    return <>
        <Grid item container direction={'column'}
              justify={"space-between"}
              className={classes.root}
              wrap={"nowrap"}
        >
            <Grid item className={classes.visorContainer}>
                <Grid item container direction={"column"}
                      justify={"space-around"}
                      alignContent={"center"}
                      alignItems={"center"}
                      className={classes.visor}
                >
                    {visibleVisor &&
                    <Grid item className={classes.visor}>
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
            <Grid item container className={classes.transparent}>
                <Tags/>
                <VisorDash direction={"row"} taskActions={<TagsToolBar/>}/>
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
