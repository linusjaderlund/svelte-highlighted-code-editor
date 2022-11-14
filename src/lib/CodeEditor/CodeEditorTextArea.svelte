<script lang="ts">
  import {
    addCurrentTabDepthAfterNewLine,
    addTab,
    bindCaretMovementEvent,
    handleScrollEvent,
    removeTab,
    setCursorPosition,
  } from "./CodeEditor.helper";
  import { latestCaretMovement } from "./CodeEditor.store";

  export let value: string;
  const fireCaretMovementEventTime = 50;
  let caretMovementEventTimeout: NodeJS.Timeout;

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

  const handleEnterKeyEvent = (event: KeyboardEvent) => {
    event.preventDefault();

    const textAreaElement: HTMLTextAreaElement = event.target as HTMLTextAreaElement;
    const { editedCode, cursorPosition } = addCurrentTabDepthAfterNewLine(textAreaElement);

    updateTextAreaAndState(textAreaElement, editedCode);
    setCursorPosition(textAreaElement, cursorPosition);
  };

  const handleKeyDownEvent = (event: KeyboardEvent) => {
    switch (event.key) {
      case "Tab":
        handleTabKeyEvent(event);
        break;
      case "Enter":
        handleEnterKeyEvent(event);
        break;
    }
  };

  const handleCaretMovementEvent = (event: Event) => {
    clearTimeout(caretMovementEventTimeout);
    caretMovementEventTimeout = setTimeout(() => {
      const textAreaElement = event.target as HTMLTextAreaElement;
      const isTextAreaFocused = event.type !== "blur";
      const activeLineIndex = textAreaElement.value.slice(0, textAreaElement.selectionStart).split("\n").length - 1;
      latestCaretMovement.set({ isTextAreaFocused, activeLineIndex });
    }, fireCaretMovementEventTime);
  };
</script>

<textarea
  class="font-code-editor text-code-editor whitespace-pre border-0 overflow-auto text-transparent bg-transparent resize-none outline-none absolute top-0 left-0 h-full w-full caret-gray-800"
  spellcheck="false"
  use:bindCaretMovementEvent={handleCaretMovementEvent}
  on:scroll={handleScrollEvent}
  on:keydown={handleKeyDownEvent}
  bind:value
/>
