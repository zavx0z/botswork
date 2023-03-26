import Box from "@mui/material/Box"
import {items} from "../stores/projectModels"
import BrowserCard from "../components/BrowserCard"
import {Fab} from "@mui/material"
import {Add} from "@mui/icons-material"
import React from "react"

export const BrowserProject = () =>
    <Box
        sx={{
            display: 'flex',
            flexWrap: 'wrap',
            flexDirection: 'row',
            gap: 2,
            p: 2,
            justifyContent: "space-evenly"
        }}
    >
        {items.map(({title, description, img}, idx) =>
            <BrowserCard
                key={idx}
                title={title}
                description={description}
                img={img}
            />
        )}
        <Fab
            sx={{
                bottom: 55,
                right: 55,
                position: 'absolute',
            }}
            size="large"
            color="secondary"
            aria-label="add"
        >
            <Add/>
        </Fab>
    </Box>