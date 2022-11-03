<script lang="ts">
  import { textAreaScrollState } from "./CodeEditor.store";

  export let value: string;

  let lineNumbersElement: HTMLElement;
  let lineCount: Array<string> = [];

  $: lineCount = value.split("\n");

  $: {
    if (lineNumbersElement) {
      lineNumbersElement.scrollTop = $textAreaScrollState.top;
    }
  }
</script>

<div class="overflow-hidden w-13 min-w-13 -mt-01 h-line-numbers" bind:this={lineNumbersElement}>
  <div
    class="font-code-editor flex flex-col bg-line-numbers text-right rounded text-line-numbers px-2 py-01 mr-2 min-h-full"
  >
    {#each lineCount as _, index}
      <div>{index + 1}</div>
    {/each}
  </div>
</div>
