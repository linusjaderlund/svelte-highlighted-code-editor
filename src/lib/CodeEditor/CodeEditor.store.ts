import { writable } from "svelte/store";

interface ScrollState {
  top: number;
  left: number;
}

export const textAreaScrollState = writable<ScrollState>({ top: 0, left: 0 });
