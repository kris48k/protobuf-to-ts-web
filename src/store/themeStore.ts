import { Store } from "@tanstack/react-store";

export const THEMES = ["dark", "light", "system"] as const;
export type TTheme = (typeof THEMES)[number];

export interface IThemeStoreState {
  theme: TTheme;
}

export const DEFALUT_THEME = "system";
export const STORAGE_KEY = "vite-ui-theme";

export const themeStore = new Store<IThemeStoreState>(
  {
    theme: (localStorage?.getItem(STORAGE_KEY) as TTheme) || DEFALUT_THEME,
  },
  {
    updateFn: (prevValue: IThemeStoreState) => (updateValue) => {
      const newValue = updateValue(prevValue);
      localStorage?.setItem(STORAGE_KEY, newValue.theme);
      return newValue;
    },
  }
);
