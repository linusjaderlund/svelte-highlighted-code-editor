import { writable } from "svelte/store";

interface ScrollState {
  top: number;
  left: number;
}

interface CaretStatus {
  isTextAreaFocused: boolean;
  activeLineIndex: number;
}

export const textAreaScrollState = writable<ScrollState>({ top: 0, left: 0 });

export const latestCaretMovement = writable<CaretStatus>({
  isTextAreaFocused: false,
  activeLineIndex: 0,
});
