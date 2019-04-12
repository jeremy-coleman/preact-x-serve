
import { Language, StyleObj, PrismTheme, PrismThemeEntry } from "../types";

export type ThemeDict = {
  root: any,
  plain: any,
  [type: string]: any
};

export const themeToDict = (theme: PrismTheme, language: Language): ThemeDict => {
  let backgroundColor
  const { plain } = theme;
  const base: ThemeDict = Object.create(null);

  const themeDict = theme.styles.reduce((acc, themeEntry) => {
    const { types, languages, style } = themeEntry
    if (languages && !languages.includes(language)) {
      return acc;
    }

    themeEntry.types.forEach(type => {
      const accStyle = { ...acc[type], ...style };

      acc[type] = accStyle
    });

    return acc;
  }, base);

  themeDict["root"] = plain
  themeDict.plain = { ...plain, backgroundColor}

  return themeDict;
};

export default themeToDict;