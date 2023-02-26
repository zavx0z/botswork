import authenticate from "../features/secure/routes"

const routes = {
    ...authenticate,
    home: "/",
    profile: "/profile",
    contacts: "/contacts",
}
export default routes