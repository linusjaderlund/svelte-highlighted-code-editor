/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      width: {
        "code-editor": "calc(100% - 3.75rem)",
        "13": "3.25rem",
      },
      height: {
        "code-editor": "calc(100% - 1.5rem)",
        "line-numbers": "calc(100% + 0.2rem)",
      },
      minWidth: {
        11: "2.75rem",
      },
      backgroundColor: {
        "code-editor": "#f5f2f0",
        "line-numbers": "rgba(0, 0, 0, 0.06)",
      },
      textColor: {
        "line-numbers": "rgba(0, 0, 0, 0.4)",
      },
      spacing: {
        "01": "0.1rem",
      },
      fontSize: {
        "code-editor": ["1rem", "1.25rem"],
        "line-numbers": ["0.75rem", "1.25rem"],
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
