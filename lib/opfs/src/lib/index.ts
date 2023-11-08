import { actor as opfs } from "./actor"
opfs.subscribe((state) => console.log("💾", state.value, state.context))

const loadFileFromDevice = async () => {
  const [handle] = await window.showOpenFilePicker({ types: [{ accept: { "application/x-sqlite3": [".sqlite"] } }] })
  opfs.send({ type: "file.from.device", params: { handle } })
}

export { default as OPFSExplorer } from "./OpfsExplorer.svelte"
export { opfs, loadFileFromDevice }
