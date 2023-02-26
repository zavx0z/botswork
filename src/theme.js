import {createTheme} from "@mui/material/styles"

const theme = createTheme({
    palette: {
        primary: {
            light: '#5472d3',
            main: '#0c1f3c',
            dark: '#031f3c',
            contrastText: '#fff',
        },
        secondary: {
            main: "#03a9f4"
        }
    },
})

export default theme