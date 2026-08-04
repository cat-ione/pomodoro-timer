import { catppuccin } from "./catppuccin";
import { gruvbox } from "./gruvbox";
import { everforest } from "./everforest";
import { nord } from "./nord";
import { tokyonight } from "./tokyonight";

export const themes = {
  catppuccin, gruvbox, everforest, nord, tokyonight
} as const;

export type ThemeName = keyof typeof themes;

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

const defaultTheme: ThemeName = "catppuccin";

export function applyTheme(
  theme?: ThemeName,
  mode?: string,
  flavor?: string,
  accent?: string
) {
  const resolvedTheme = theme && themes[theme] ? theme : defaultTheme;
  const themeEntry = themes[resolvedTheme] as Theme;

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

  return {
    theme: resolvedTheme,
    mode: resolvedMode,
    flavor: resolvedFlavor,
    accent: accentName,
  };
}

export function getModes(theme: ThemeName) {
  const themeEntry = themes[theme] as Theme;
  return themeEntry.modes;
}

export function getFlavors(theme: ThemeName, mode: string) {
  const themeEntry = themes[theme] as Theme;
  const resolvedMode = mode && themeEntry.modes[mode] ? mode : themeEntry.defaultMode;
  return themeEntry.modes[resolvedMode].flavors;
}

export function getAccents(theme: ThemeName, mode: string, flavor: string) {
  const themeEntry = themes[theme] as Theme;

  const resolvedMode = mode && themeEntry.modes[mode] ? mode : themeEntry.defaultMode;
  const modeEntry = themeEntry.modes[resolvedMode];

  const resolvedFlavor = flavor && modeEntry.flavors[flavor] ? flavor : modeEntry.defaultFlavor;
  return modeEntry.flavors[resolvedFlavor].accents
}
