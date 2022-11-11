<script lang="ts">
  import { latestCaretMovement, textAreaScrollState } from "./CodeEditor.store";

  export let value: string;

  let lineNumbersElement: HTMLElement;
  let lineCount: Array<string> = [];
  let activeLineNumber = 0;

  $: lineCount = value.split("\n");

  $: {
    if (lineNumbersElement) {
      lineNumbersElement.scrollTop = $textAreaScrollState.top;
    }
  }
</script>

<div class="overflow-hidden w-line-numbers h-full" bind:this={lineNumbersElement}>
  <div class="font-code-editor flex flex-col text-right text-line-numbers pr-6 min-h-full">
    {#each lineCount as _, index}
      <div
        class={$latestCaretMovement.isTextAreaFocused && index === $latestCaretMovement.activeLineIndex
          ? "text-line-numbers-active"
          : ""}
      >
        {index + 1}
      </div>
    {/each}
  </div>
</div>
