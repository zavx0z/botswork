import { actor } from "./actor"
actor.subscribe((state) => console.log("💾", state.value, state.context))

export const loadFileFromDevice = async () => {
  const [handle] = await window.showOpenFilePicker({ types: [{ accept: { "application/x-sqlite3": [".sqlite"] } }] })
  actor.send({ type: "file.from.device", params: { handle } })
}

export default actor
export { default as OPFSExplorer } from "./OpfsExplorer.svelte"
