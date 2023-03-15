import React from 'react'
import BrowserCard from "../components/BrowserCard"
import Box from "@mui/material/Box"
import {BrowserView, MobileView} from "react-device-detect"
import img from '../images/gpt.png'
import MobileCard from "../components/MobileCard"

const items = [
    {
        title: "Тестовый1",
        description: "Для тестирования отображения",
        img: img,
    },
    {
        title: "Тестовый2",
        description: "Тоже для тестирования",
        img: img,
    },
]
const MobileProject = () =>
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
    </Box>
const BrowserProject = () =>
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
    </Box>
const Projects = () => {
    return <>
        <BrowserView>
            <BrowserProject/>
        </BrowserView>
        <MobileView>
            <MobileProject/>
        </MobileView>
    </>
}

export default Projects