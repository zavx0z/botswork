import Box from "@mui/material/Box"
import {items} from "../stores/projectModels"
import MobileCard from "../components/MobileCard"
import {Fab} from "@mui/material"
import {Add} from "@mui/icons-material"
import React from "react"

export const MobileProject = () =>
    <Box
        sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            p: 2,
        }}
    >
        {items.map(({title, description, img}, idx) =>
            <MobileCard
                key={idx}
                title={title}
                description={description}
                img={img}
            />
        )}
        <Fab
            sx={{
                bottom: 70,
                right: 10,
                position: 'absolute',
            }}
            size="small"
            color="secondary"
            aria-label="add"
        >
            <Add/>
        </Fab>
    </Box>