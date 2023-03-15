import authenticate from "../features/secure/routes"

const routes = {
    ...authenticate,
    home: "/",
    profile: "/profile",
    contacts: "/contacts",
    settings: "/settings",
    viewer: "/viewer",
    chat: "/chat",
    bots: "/projects"
}
export default routes