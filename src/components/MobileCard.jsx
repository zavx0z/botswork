import * as React from 'react'
import {useTheme} from '@mui/material/styles'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'

function MobileCard({title, description, img}) {
    const theme = useTheme()

    return <Card
        sx={{
            display: 'flex',
            minHeight: 160,
        }}>
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                flexGrow: 1,
            }}>
            <CardContent sx={{
                flex: '1 0 auto'
            }}>
                <Typography component="div" variant="h6">
                    {title}
                </Typography>
                <Typography variant="subtitle2" color="text.secondary" component="div">
                    {description}
                </Typography>
            </CardContent>
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
            }}>
            </Box>
        </Box>
        <CardMedia
            component="img"
            sx={{
                flexGrow: 0,
                width: 140
            }}
            image={img}
            alt={title}
        />
    </Card>
}

export default MobileCard