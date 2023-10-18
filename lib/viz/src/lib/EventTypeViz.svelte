<script lang="ts">
  export const toDelayString = (delay: string | number): string => (typeof delay === "number" || !isNaN(+delay) ? `${delay}ms` : delay)
  export const formatInvocationId = (id: string): string => {
    if (isUnnamed(id)) {
      const match = id.match(/:invocation\[(\d+)\]$/)
      if (!match) return id
      const [, index] = match
      return `anonymous [${index}]`
    }
    return id
  }
  const isUnnamed = (id: string): boolean => /:invocation\[/.test(id)
  export let eventType: string
  //   console.log("event", eventType)
</script>

{#if eventType.startsWith("done.state.")}
  <div data-viz-keyword="done">
    <em>onDone</em>
  </div>
{:else if eventType.startsWith("xstate.done.actor.")}
  {@const match = eventType.match(/^xstate\.done\.actor\.(.+)$/)}
  <div class="flex items-center justify-start gap-1 overflow-hidden whitespace-nowrap before:block before:h-2 before:w-2 before:rounded-md before:bg-success-500">
    <em>done:</em>{" "}
    <div>
      {match ? formatInvocationId(match[1]) : "??"}
    </div>
  </div>
{:else if eventType.startsWith("xstate.error.actor.")}
  {@const match = eventType.match(/^xstate\.error\.actor\.(.+)$/)}
  <div class="flex items-center justify-start gap-1 overflow-hidden whitespace-nowrap before:block before:h-2 before:w-2 before:rounded-md before:bg-error-500">
    <em>error:</em>{" "}
    <div>{match ? match[1] : "??"}</div>
  </div>
{:else if eventType.startsWith("xstate.after")}
  {@const match = eventType.match(/^xstate\.after\((.*)\)#.*$/)}
  {#if !match}
    <div>{eventType}</div>
  {:else}
    {@const delay = match[1]}
    <div data-viz-keyword="after">
      <em>after</em>{" "}
      <div>{toDelayString(delay)}</div>
    </div>
  {/if}
{:else if eventType === ""}
  <div data-viz-keyword="always">
    <em>always</em>
  </div>
{:else}
  <div data-viz="eventType">
    <div>{eventType}</div>
  </div>
{/if}
