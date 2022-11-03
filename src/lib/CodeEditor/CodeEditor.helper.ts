import { getPrismConfig, tab, tabSize } from "./CodeEditor.config";
import type { CodeEditorState, PrismConfig } from "./CodeEditor.models";

export const setCursorPosition = (textArea: HTMLTextAreaElement, cursorPosition: number) => {
  textArea.selectionStart = cursorPosition;
  textArea.selectionEnd = cursorPosition;
};

const splitCodeAtCursor = (
  textArea: HTMLTextAreaElement
): { codeBeforeTab: string; codeAfterTab: string; cursorPosition: number } => {
  const code = textArea.value;
  const codeBeforeTab = code.slice(0, textArea.selectionStart);
  const codeAfterTab = code.slice(textArea.selectionEnd, code.length);
  const cursorPosition = textArea.selectionStart;

  return { codeBeforeTab, codeAfterTab, cursorPosition };
};

export const addTab = (textArea: HTMLTextAreaElement): CodeEditorState => {
  const { codeBeforeTab, codeAfterTab, cursorPosition } = splitCodeAtCursor(textArea);
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
  const { codeBeforeTab, codeAfterTab, cursorPosition } = splitCodeAtCursor(textArea);
  const spacesAfterCursorPosition = countSpacesAfterCursorPosition(codeBeforeTab);
  console.log("spacesAfterCursorPosition", spacesAfterCursorPosition);

  const modifiedCursorPosition = cursorPosition - spacesAfterCursorPosition;
  const editedCode = `${codeBeforeTab.substring(0, codeBeforeTab.length - spacesAfterCursorPosition)}${codeAfterTab}`;

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
