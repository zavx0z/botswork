import authenticate from "../shared/secure/routes"

const routes = {
    ...authenticate,
    home: "/",
    profile: "/profile",
    contacts: "/contacts",
    settings: "/settings",
    viewer: "/viewer",
    chat: "/chat",
    projects: "/projects",
}
export default routes