import { PrismTheme, type PrismConfig } from "./CodeEditor.models";

// PRISM
const CDN = "https://cdnjs.cloudflare.com/ajax/libs/prism/9000.0.1";
export const getPrismConfig = (config: PrismConfig) => {
  const { language, theme = PrismTheme.DEFAULT } = config;

  return {
    prismScriptUrl: `${CDN}/prism.min.js`,
    prismLanguageScriptUrl: language ? `${CDN}/components/prism-${language}.min.js` : null,
    prismThemeScriptUrl: `${CDN}/themes/prism${theme === PrismTheme.DEFAULT ? "" : `-${theme}`}.min.css`,
  };
};

// EDITOR
export const tabSize = 2;
export const tab = " ".repeat(tabSize);
