import React from 'react'
import Grid from "@material-ui/core/Grid"
import {
    Fullscreen,
    FullscreenExit,
    LastPage,
    Pause,
    PlayArrow,
    Stop,
    TouchApp,
    Visibility,
    VisibilityOff
} from "@material-ui/icons"
import {inject, observer} from "mobx-react"
import Paper from "@material-ui/core/Paper"
import ButtonToolTipIcon from "../../components/ButtonToolTipIcon"
import makeStyles from "@material-ui/core/styles/makeStyles"

const useStyles = makeStyles((theme) => ({
    noOver: {
        overflow: "hidden",
        flexGrow: 1,
        height: "100%",
        backdropFilter: 'blur(10px)',
        backgroundColor: "transparent"
    }
}))

const VisorDash = ({root: {task}, taskActions, direction}) => {
    const {status, taskSetRestart} = task
    const {taskRunLoading, taskSetRun} = task
    const {taskStopLoading, taskSetStop} = task
    const {taskPauseLoading, taskSetPause} = task

    const {visibility, taskChangeVisibility} = task
    const {interactive, taskSetInteractive} = task
    const {fullScreen, taskSetFullScreen} = task
    const classes = useStyles()
    return <>
        <Grid container
              direction={direction}
              justify={"space-between"}
              component={Paper}
              className={classes.noOver}
        >
            <Grid item>
                <Grid item container justify={"center"} direction={direction}>
                    {taskActions}
                </Grid>
            </Grid>
            <Grid item>
                <Grid item container justify={"center"} direction={direction}>
                    <Grid item>
                        <ButtonToolTipIcon
                            title={'остановить'}
                            // size={"small"}
                            loading={taskStopLoading}
                            active={status === 'stop'}
                            disabled={!(status === 'run' || status === 'pause')}
                            onClick={taskSetStop}
                        >
                            <Stop/>
                        </ButtonToolTipIcon>
                    </Grid>
                    <Grid item>
                        <ButtonToolTipIcon
                            title={"пауза"}
                            // size={"small"}
                            active={status === 'pause'}
                            loading={taskPauseLoading}
                            disabled={status !== 'run'}
                            onClick={taskSetPause}
                        >
                            <Pause/>
                        </ButtonToolTipIcon>
                    </Grid>
                    <Grid item>
                        <ButtonToolTipIcon
                            title={'продолжить'}
                            // size={"small"}
                            loading={taskRunLoading}
                            disabled={status !== 'pause'}
                            active={status === 'run'}
                            onClick={taskSetRun}
                        >
                            <PlayArrow/>
                        </ButtonToolTipIcon>
                    </Grid>
                    <Grid item>
                        <ButtonToolTipIcon
                            title={'продолжить'}
                            toggled
                            onClick={taskSetRestart}
                        >
                            <LastPage/>
                        </ButtonToolTipIcon>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item>
                <Grid item container justify={"center"} direction={direction}>
                    <Grid item>
                        <ButtonToolTipIcon
                            title={'удаленный просмотр'}
                            // size={"small"}
                            toggled
                            active={visibility}
                            onClick={() => taskChangeVisibility(!visibility)}
                        >
                            {visibility ? <Visibility/> : <VisibilityOff/>}
                        </ButtonToolTipIcon>
                    </Grid>
                    <Grid item>
                        <ButtonToolTipIcon
                            title={'управление браузером'}
                            // size={"small"}
                            toggled
                            active={interactive}
                            onClick={() => taskSetInteractive(!interactive)}
                        >
                            <TouchApp/>
                        </ButtonToolTipIcon>
                    </Grid>
                    <Grid item>
                        <ButtonToolTipIcon
                            title={'полноэкранный режим'}
                            toggled
                            active={fullScreen}
                            onClick={() => taskSetFullScreen(!fullScreen)}
                        >
                            {!fullScreen ? <Fullscreen/> : <FullscreenExit/>}
                        </ButtonToolTipIcon>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    </>
}
export default inject('root')(observer(VisorDash))