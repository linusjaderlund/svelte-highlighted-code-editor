<script lang="ts">
  import { onMount } from "svelte";
  import { loadPrism } from "./CodeEditor.helper";
  import type { PrismLanguage } from "./CodeEditor.models";
  import { textAreaScrollState } from "./CodeEditor.store";

  export let value: string;
  export let language: PrismLanguage;

  let renderElement: HTMLElement;
  let prism: any;

  const whitespace = (code: string): string =>
    `${code.charAt(0) === "\n" ? " " : ""}${code}${code.charAt(code.length - 1) === "\n" ? " " : ""}`;

  onMount(async () => {
    if (!prism) {
      prism = await loadPrism({ language });
    }
  });

  $: {
    if (renderElement) {
      renderElement.scrollTop = $textAreaScrollState.top;
      renderElement.scrollLeft = $textAreaScrollState.left;
    }
  }
</script>

{#if prism}
  <pre
    bind:this={renderElement}
    class={`font-code-editor text-code-editor whitespace-pre border-0 overflow-auto w-full h-full`}
    aria-hidden="true"><code class="font-code-editor text-code-editor whitespace-pre"
      >{@html prism.highlight(whitespace(value), prism.languages[language], language)}</code
    ></pre>
{/if}
