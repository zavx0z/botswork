import React from 'react'
import Grid from "@material-ui/core/Grid"
import VisorDash from "../VisorDash"

export default ({visor}) => {
    return <>
        <Grid item container direction={'row'}
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
                    {visor}
                </Grid>
            </Grid>
            <Grid item>
                <VisorDash/>
            </Grid>
        </Grid>
    </>
}