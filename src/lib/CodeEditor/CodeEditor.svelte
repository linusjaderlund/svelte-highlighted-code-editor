<script lang="ts">
  import { PrismLanguage } from "./CodeEditor.models";
  import CodeEditorLineNumbers from "./CodeEditorLineNumbers.svelte";
  import CodeEditorRenderer from "./CodeEditorRenderer.svelte";
  import CodeEditorTextArea from "./CodeEditorTextArea.svelte";

  export let value: string;
  export let language: PrismLanguage = PrismLanguage.MD;
</script>

<div class={`p-3 m-3 bg-code-editor rounded-lg h-60 flex`}>
  <CodeEditorLineNumbers bind:value />
  <div class="relative top-0 left-0 w-code-editor">
    <CodeEditorTextArea bind:value />
    <CodeEditorRenderer bind:value {language} />
  </div>
</div>
