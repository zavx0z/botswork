// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import type { Window } from "happy-dom"
declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      happyDOM: { Prism?: typeof import("prismjs") } & Window
    }
    // interface PageData {}
    // interface Platform {}
  }
}

export {}
