export interface CodeEditorState {
  editedCode: string;
  cursorPosition: number;
}

export enum PrismLanguage {
  JS = "javascript",
  MARKUP = "markup",
  CSS = "css",
  CLIKE = "clike",
  MD = "markdown",
}

export enum PrismTheme {
  DEFAULT = "",
  LIGHT = "light",
}

export interface PrismConfig {
  language?: PrismLanguage;
  theme?: PrismTheme;
}
