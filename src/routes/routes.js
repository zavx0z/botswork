import authenticate from "../features/secure/routes"

const routes = {
    ...authenticate,
    home: "/",
    profile: "/profile",
    contacts: "/contacts",
    settings: "/settings",
}
export default routes