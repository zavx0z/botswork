<script lang="ts">
  import { browser } from "$app/environment"
  //@ts-ignore
  import proc from "process/browser"
  import { Buffer } from "buffer"
  if (browser) {
    ;(window as any).process = proc
    ;(window as any).Buffer = Buffer
  }

  import git from "isomorphic-git"
  import type * as fsa from "memfs/lib/fsa/types"
  import { FsaNodeFs, FsaNodeSyncAdapterWorker } from "memfs/lib/fsa-to-node"
  import { onMount } from "svelte"

  onMount(async () => {
    console.log("!!!!!!!!!!!!")
    const dir = navigator.storage.getDirectory() as unknown as Promise<fsa.IFileSystemDirectoryHandle>
    const fs = ((<any>window).fs = new FsaNodeFs(dir))
    try {
      const url = new URL("../lib/worker.ts", import.meta.url)
      console.log(url)
      const adapter = await FsaNodeSyncAdapterWorker.start(url, dir)
      fs.syncAdapter = adapter
      console.log('Create "/repo" folder')
      await fs.promises.mkdir("/repo")
      console.log("Init git repo")
      await git.init({ fs, dir: "repo" })
      console.log("Create README file")
      await fs.promises.writeFile("/repo/README.md", "Hello World\n")
      console.log("Stage README file")
      await git.add({ fs, dir: "/repo", filepath: "README.md" })
      console.log("Commit README file")
      await git.commit({
        fs,
        dir: "/repo",
        author: { name: "zavx0z", email: "metaversebdfl@gmail.com" },
        message: "fea: initial commit",
      })
    } catch (error) {
      console.log(error)
      console.log((<any>error).name)
    }
  })
</script>

<ul>
  <li>isomorphic-git</li>
  <li></li>
</ul>
