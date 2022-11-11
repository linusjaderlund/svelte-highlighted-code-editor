/** @type {import('tailwindcss').Config} */

const codeEditorFontSize = "1rem";
const codeEditorLineHeight = "1.25rem";
const lineNumbersWidth = "4rem";
const lineNumbersFontSize = codeEditorFontSize;

module.exports = {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      width: {
        "code-editor": `calc(100% - ${lineNumbersWidth})`,
        "line-numbers": lineNumbersWidth,
      },
      backgroundColor: {
        "code-editor": "#f5f2f0",
      },
      textColor: {
        "line-numbers": "rgba(0, 0, 0, 0.2)",
        "line-numbers-active": "rgba(0, 0, 0, 0.7)",
      },
      fontSize: {
        "code-editor": [codeEditorFontSize, codeEditorLineHeight],
        "line-numbers": [lineNumbersFontSize, codeEditorLineHeight],
      },
      fontFamily: {
        "code-editor": [
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          "Liberation Mono",
          "Courier New",
          "monospace",
        ],
      },
    },
  },
  plugins: [],
};
