import * as React from "react";

export interface IThemes {
  light: ITheme;
  dark: ITheme;
}

export interface ITheme {
  foreground: string;
  background: string;
}

export const themes: IThemes = {
  light: {
    foreground: "#000000",
    background: "#eeeeee"
  },
  dark: {
    foreground: "#ffffff",
    background: "#222222"
  }
};

export const ThemeContext = React.createContext(
  themes.dark // 默认值
);
