<script lang="ts">
  import { addTab, removeTab, setCursorPosition } from "./CodeEditor.helper";
  import { textAreaScrollState } from "./CodeEditor.store";

  export let value: string;

  const updateTextAreaAndState = (textAreaElement: HTMLTextAreaElement, code: string) => {
    textAreaElement.value = code;
    value = code;
  };

  const handleTabKeyEvent = (event: KeyboardEvent) => {
    event.preventDefault();

    const textAreaElement: HTMLTextAreaElement = event.target as HTMLTextAreaElement;
    const { editedCode, cursorPosition } = event.shiftKey ? removeTab(textAreaElement) : addTab(textAreaElement);

    updateTextAreaAndState(textAreaElement, editedCode);
    setCursorPosition(textAreaElement, cursorPosition);
  };

  const handleKeyDownEvent = (event: KeyboardEvent) => {
    switch (event.key) {
      case "Tab":
        handleTabKeyEvent(event);
        break;
    }
  };

  const handleScrollEvent = (event: Event) => {
    const textAreaElement: HTMLTextAreaElement = event.target as HTMLTextAreaElement;
    textAreaScrollState.set({ top: textAreaElement.scrollTop, left: textAreaElement.scrollLeft });
  };
</script>

<textarea
  class="font-code-editor text-code-editor whitespace-pre border-0 overflow-auto text-transparent bg-transparent resize-none outline-none absolute top-0 left-0 h-full w-full caret-gray-800"
  spellcheck="false"
  on:scroll={handleScrollEvent}
  on:keydown={handleKeyDownEvent}
  bind:value
/>
