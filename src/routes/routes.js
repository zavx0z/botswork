import authenticate from "../shared/secure/routes"
import post from "../features/posts/routes"

const routes = {
    ...authenticate,
    ...post,
    home: "/",
    profile: "/profile",
    contacts: "/contacts",
    settings: "/settings",
    viewer: "/viewer",
    chat: "/chat",
    projects: "/projects",
}
export default routes