<script lang="ts">
  import { PrismLanguage } from "./CodeEditor.models";
  import CodeEditorLineNumbers from "./CodeEditorLineNumbers.svelte";
  import CodeEditorRenderer from "./CodeEditorRenderer.svelte";
  import CodeEditorTextArea from "./CodeEditorTextArea.svelte";

  export let value: string;
  export let language: PrismLanguage = PrismLanguage.JS;
</script>

<div class={`bg-code-editor h-60 flex p-3`}>
  <CodeEditorLineNumbers bind:value />
  <div class="relative top-0 left-0 w-code-editor">
    <CodeEditorTextArea bind:value />
    <CodeEditorRenderer bind:value {language} />
  </div>
</div>
