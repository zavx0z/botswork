// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import type { CodeRenderer } from "$lib"
declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      CodeRenderer: CodeRenderer
    }
    // interface PageData {}
    // interface Platform {}
  }
}

export {}
