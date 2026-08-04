import { catppuccin } from "./catppuccin";
import { everforest } from "./everforest";

const themeData = {
  catppuccin, everforest
} as const;

type Flavor = {
  colors: Record<string, string>;
  tokens: Record<string, string>;
  accents: readonly string[];
  defaultAccent: string;
};
type Mode = {
  defaultFlavor: string;
  flavors: Record<string, Flavor>;
};
type Theme = {
  defaultMode: string;
  modes: Record<string, Mode>;
};
type ThemeName = keyof typeof themeData;

const defaultTheme: ThemeName = "catppuccin";

export function applyTheme(theme?: ThemeName, mode?: string, flavor?: string, accent?: string) {
  const resolvedTheme = theme && themeData[theme] ? theme : defaultTheme;
  const themeEntry = themeData[resolvedTheme] as Theme;

  const resolvedMode = mode && themeEntry.modes[mode] ? mode : themeEntry.defaultMode;
  const modeEntry = themeEntry.modes[resolvedMode];

  const resolvedFlavor = flavor && modeEntry.flavors[flavor] ? flavor : modeEntry.defaultFlavor;
  const data = modeEntry.flavors[resolvedFlavor];

  const style = document.documentElement.style;
  for (const [key, colorName] of Object.entries(data.tokens)) {
    style.setProperty(`--color-${key}`, data.colors[colorName]);
  }

  const accentName = accent && data.accents.includes(accent) ? accent : data.defaultAccent;
  style.setProperty("--color-accent", data.colors[accentName]);
}
