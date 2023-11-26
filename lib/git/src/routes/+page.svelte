<script lang="ts">
  import GitWorker from "$lib/worker?worker"

  let repo: HTMLInputElement
  let value = $state("https://github.com/zavx0z/code-viewer.git")

  let button: HTMLButtonElement
  let log: HTMLElement

  $effect(() => {
    // repo.value = "https://github.com/zavx0z/code-viewer.git"
    const worker = new GitWorker()

    function clone() {
      log.textContent = "CLONE:\n"
      worker.postMessage({
        type: "clone",
        param: {
          // corsProxy: "https://cors.isomorphic-git.org",
          corsProxy: "http://localhost:3000",
          url: repo.value,
          dir: "/",
        },
      })
    }

    worker.addEventListener("message", ({ data: { value, context } }) => {
      console.log("[@lib/git]", "💫", JSON.stringify(value), { ...context })
      switch (value) {
        case "idle":
          log.textContent += "ready\n"
          repo.addEventListener("keydown", (e) => e.key === "Enter" && clone())
          button.addEventListener("click", clone)
          break
        case "cloned":
          break
        default:
          break
      }
    })
    return () => {
      button.removeEventListener("click", clone)
    }
  })
  // worker.postMessage({ type: "init", param: { url: "https://github.com/zavx0z/code-viewer.git" } })

  //   async print(message) {
  //     let text = $("log").textContent
  //     if (message.endsWith("\r")) {
  //       // overwrite last line
  //       text = text.trim().replace(/.+$/, "")
  //     }
  //     text += message + "\n"
  //     $("log").textContent = text
  //   },
  //   async progress(evt) {
  //     $("progress-txt").textContent = evt.phase
  //     $("progress").value = evt.total ? evt.loaded / evt.total : 0.5
  //     return
  //   },
  //   async fill(url) {
  //     let username = window.prompt("Username:")
  //     let password = window.prompt("Password:")
  //     return { username, password }
  //   },
  //   async rejected({ url, auth }) {
  //     window.alert("Authentication rejected")
  //     return
  //   },

  // async function doCloneAndStuff() {

  //   await workerThread.clone({
  //     corsProxy: "https://cors.isomorphic-git.org",
  //     url: $("repository").value,
  //   })

  //   let branches = await workerThread.listBranches({ remote: "origin" })
  //   $("log").textContent += "BRANCHES:\n" + branches.map((b) => `  ${b}`).join("\n") + "\n"

  //   let files = await workerThread.listFiles({})
  //   $("log").textContent += "FILES:\n" + files.map((b) => `  ${b}`).join("\n") + "\n"

  //   let commits = await workerThread.log({})
  //   $("log").textContent +=
  //     "LOG:\n" + commits.map((c) => `  ${c.oid.slice(0, 7)}: ${c.commit.message}`).join("\n") + "\n"
  // }
</script>

<dev-tools mobile></dev-tools>
<div>
  <input bind:this={repo} bind:value type="text" class="w-1/2 bg-surface-700" title="Tip: enter a private repo URL to see the credentialManager plugin prompt for a password." />
  <button bind:this={button} type="button" id="cloneButton">Clone</button>
</div>
<div>
  <progress class="w-1/2" value="0"></progress>
  <span id="progress-txt" style="font-family: monospace"></span>
</div>
<output bind:this={log} style="white-space: pre; font-family: monospace"></output>
