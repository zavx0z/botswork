import React from 'react'
import {inject, observer} from "mobx-react"
import ButtonToolTipIcon from "../../components/ButtonToolTipIcon"
import Stop from "@mui/icons-material/Stop"
import Grid from "@mui/material/Grid"
import {Paper} from "@mui/material"
import {Fullscreen, FullscreenExit, LastPage, Pause, PlayArrow, TouchApp} from "@mui/icons-material"
import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"

const VisorDash = ({root: {task}, taskActions, direction}) => {
    const {status, taskSetRestart} = task
    const {taskRunLoading, taskSetRun} = task
    const {taskStopLoading, taskSetStop} = task
    const {taskPauseLoading, taskSetPause} = task

    const {visibility, taskChangeVisibility} = task
    const {interactive, taskSetInteractive} = task
    const {fullScreen, taskSetFullScreen} = task
    return <>
        <Grid container
              direction={direction}
              justify={"space-between"}
              component={Paper}
              sx={{
                  overflow: "hidden",
                  flexGrow: 1,
                  height: "100%",
                  backdropFilter: 'blur(10px)',
                  backgroundColor: "transparent"
              }}
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