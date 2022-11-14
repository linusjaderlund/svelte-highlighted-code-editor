import { getPrismConfig, tab, tabSize } from "./CodeEditor.config";
import type { CodeEditorState, PrismConfig } from "./CodeEditor.models";
import { textAreaScrollState } from "./CodeEditor.store";

export const setCursorPosition = (textArea: HTMLTextAreaElement, cursorPosition: number) => {
  textArea.selectionStart = cursorPosition;
  textArea.selectionEnd = cursorPosition;
};

const splitCodeAtCaret = (
  textArea: HTMLTextAreaElement
): { codeBeforeTab: string; codeAfterTab: string; cursorPosition: number } => {
  const code = textArea.value;
  const codeBeforeTab = code.slice(0, textArea.selectionStart);
  const codeAfterTab = code.slice(textArea.selectionEnd, code.length);
  const cursorPosition = textArea.selectionStart;

  return { codeBeforeTab, codeAfterTab, cursorPosition };
};

export const addTab = (textArea: HTMLTextAreaElement): CodeEditorState => {
  const { codeBeforeTab, codeAfterTab, cursorPosition } = splitCodeAtCaret(textArea);
  const modifiedCursorPosition = cursorPosition + tab.length;

  return {
    editedCode: `${codeBeforeTab}${tab}${codeAfterTab}`,
    cursorPosition: modifiedCursorPosition,
  };
};

const countSpacesAfterCursorPosition = (codeBeforeTab: string): number => {
  const startIndex = codeBeforeTab.length - 1;
  const maxSpacesToCount = tabSize;
  let countedSpaces = 0;

  for (let i = startIndex; i >= 0; i--) {
    if (codeBeforeTab.charAt(i) !== " ") {
      break;
    }

    countedSpaces++;

    if (countedSpaces === maxSpacesToCount) {
      break;
    }
  }

  return countedSpaces;
};

export const removeTab = (textArea: HTMLTextAreaElement): CodeEditorState => {
  const { codeBeforeTab, codeAfterTab, cursorPosition } = splitCodeAtCaret(textArea);
  const spacesAfterCursorPosition = countSpacesAfterCursorPosition(codeBeforeTab);

  const modifiedCursorPosition = cursorPosition - spacesAfterCursorPosition;
  const editedCode = `${codeBeforeTab.substring(0, codeBeforeTab.length - spacesAfterCursorPosition)}${codeAfterTab}`;

  return {
    editedCode,
    cursorPosition: modifiedCursorPosition,
  };
};

const countLeadingSpaces = (str: string): number => {
  let spaces = 0;

  for (let i = 0; i < str.length; i++) {
    if (str.charAt(i) !== " ") {
      break;
    }

    spaces++;
  }

  return spaces;
};

export const addCurrentTabDepthAfterNewLine = (textArea: HTMLTextAreaElement): CodeEditorState => {
  const { codeBeforeTab, codeAfterTab, cursorPosition } = splitCodeAtCaret(textArea);
  const codeLinesBeforeCaret = codeBeforeTab.split(/\n/);
  const lastLineBeforeCaret = codeLinesBeforeCaret[codeLinesBeforeCaret.length - 1];
  const leadingSpaces = countLeadingSpaces(lastLineBeforeCaret);
  const modifiedCursorPosition = cursorPosition + leadingSpaces + 1;
  const editedCode = `${codeBeforeTab}\n${" ".repeat(leadingSpaces)}${codeAfterTab}`;

  return {
    editedCode,
    cursorPosition: modifiedCursorPosition,
  };
};

const loadElement = (element: HTMLElement): Promise<void> =>
  new Promise((resolve) => {
    document.body.appendChild(element);
    element.onload = () => resolve();
  });

const createAndLoadScript = async (src: string): Promise<void> => {
  const script = document.createElement("script");
  script.src = src;
  await loadElement(script);
};

const createAndLoadStyle = async (href: string): Promise<void> => {
  const style = document.createElement("link");
  style.rel = "stylesheet";
  style.href = href;
  await loadElement(style);
};

export const loadPrism = async (config: PrismConfig): Promise<any> => {
  const { prismScriptUrl, prismThemeScriptUrl, prismLanguageScriptUrl } = getPrismConfig(config);

  await createAndLoadScript(prismScriptUrl);
  await createAndLoadStyle(prismThemeScriptUrl);

  if (prismLanguageScriptUrl) {
    await createAndLoadScript(prismLanguageScriptUrl);
  }

  return window.Prism;
};

export const handleScrollEvent = (event: Event) => {
  const textAreaElement: HTMLTextAreaElement = event.target as HTMLTextAreaElement;
  textAreaScrollState.set({ top: textAreaElement.scrollTop, left: textAreaElement.scrollLeft });
};

export const bindCaretMovementEvent = (node: HTMLElement, callback: (event: Event) => void) => {
  const events = [
    "keydown",
    "mousedown",
    "touchstart",
    "input",
    "paste",
    "cut",
    "select",
    "selectstart",
    "focus",
    "blur",
  ];

  events.forEach((event) => node.addEventListener(event, callback));

  return {
    destroy() {
      events.forEach((event) => node.removeEventListener(event, callback));
    },
  };
};
