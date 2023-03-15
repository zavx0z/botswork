import * as React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import {CardActionArea} from '@mui/material'

const BrowserCard = ({title, description, img}) =>
    <Card sx={{maxWidth: 345}}>
        <CardActionArea>
            <CardMedia
                component="img"
                // height="140"
                image={img}
                alt="green iguana"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {description}
                </Typography>
            </CardContent>
        </CardActionArea>
        {/*<CardActions>*/}
        {/*    <Button size="small" color="primary">*/}
        {/*        Share*/}
        {/*    </Button>*/}
        {/*</CardActions>*/}
    </Card>
export default BrowserCard