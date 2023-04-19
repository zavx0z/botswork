import {Route, Routes} from "react-router-dom"
import Browser from "./views/Browser"
import Mobile from "./views/Mobile"
import Workspace from "./views/Workspace"
import Desktop from "./views/Desktop"
import routes from "./routes"
import Api from "./views/Api"
import Main from "./views/Main"
import Box from "@mui/material/Box"

const Posts = () =>
    <Box p={2} sx={{
            display: 'flex',
            width: '100%',
            justifyItems: 'center',
    }}>
            <Routes>
                    <Route path={routes.post} element={<Main/>}/>
                    <Route path={routes.browser} element={<Browser/>}/>
                    <Route path={routes.mobile} element={<Mobile/>}/>
                    <Route path={routes.desktop} element={<Desktop/>}/>
                    <Route path={routes.workspace} element={<Workspace/>}/>
                    <Route path={routes.api} element={<Api/>}/>
            </Routes>
    </Box>
export default Posts