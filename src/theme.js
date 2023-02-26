import {createTheme} from "@mui/material/styles"

const palette = {
    primary: {
        light: '#5472d3',
        main: '#0c1f3c',
        dark: '#031f3c',
        contrastText: '#fff',
    },
    secondary: {
        main: "#03a9f4"
    }
}

const theme = createTheme({
    palette: palette,
    components: {
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    // backgroundColor: "#0c1f3c",
                },
            },
        },
        MuiSelect: {
            styleOverrides: {
                icon: {
                    color: palette.primary.light,
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                icon: {
                    color: palette.primary.light,
                },
                root: {
                    "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: palette.primary.light,
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: palette.primary.light,
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: palette.primary.light,
                    },
                },
            },
        },
    },
})

export default theme