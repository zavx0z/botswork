import { actor } from "./actor"
actor.subscribe((state) => console.log("⚒️", state.value, state.context))
export default actor
