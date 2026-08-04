const tokens = {
  "bg-main": "bg",
  "bg-outer": "bg-recede",
  "bg-inner": "bg-highlight",
  "bg-button": "bg-strong",
  "text": "fg",
  "text-hover": "bg-strong",
  "shadow": "bg-recede",
  "timer-track": "track",
} as const;

const accents = [
  "red",
  "orange",
  "yellow",
  "green",
  "cyan",
  "blue",
  "purple",
] as const;

const defaultAccent = "blue";

export const tokyonight = {
  defaultMode: "dark",
  modes: {
    dark: {
      defaultFlavor: "storm",
      flavors: {
        night: {
          colors: {
            bg: "#1a1b26",
            "bg-recede": "#16161e",
            "bg-highlight": "#292e42",
            "bg-strong": "#414868",
            track: "#545c7e",
            fg: "#c0caf5",
            red: "#f7768e",
            orange: "#ff9e64",
            yellow: "#e0af68",
            green: "#9ece6a",
            cyan: "#7dcfff",
            blue: "#7aa2f7",
            purple: "#bb9af7",
          },
          tokens,
          accents,
          defaultAccent,
        },
        storm: {
          colors: {
            bg: "#24283b",
            "bg-recede": "#1f2335",
            "bg-highlight": "#292e42",
            "bg-strong": "#414868",
            track: "#545c7e",
            fg: "#c0caf5",
            red: "#f7768e",
            orange: "#ff9e64",
            yellow: "#e0af68",
            green: "#9ece6a",
            cyan: "#7dcfff",
            blue: "#7aa2f7",
            purple: "#bb9af7",
          },
          tokens,
          accents,
          defaultAccent,
        },
        moon: {
          colors: {
            bg: "#222436",
            "bg-recede": "#1e2030",
            "bg-highlight": "#2f334d",
            "bg-strong": "#444a73",
            track: "#545c7e",
            fg: "#c8d3f5",
            red: "#ff757f",
            orange: "#ff966c",
            yellow: "#ffc777",
            green: "#c3e88d",
            cyan: "#86e1fc",
            blue: "#82aaff",
            purple: "#c099ff",
          },
          tokens,
          accents,
          defaultAccent,
        },
      },
    },
    light: {
      defaultFlavor: "day",
      flavors: {
        day: {
          colors: {
            bg: "#e1e2e7",
            "bg-recede": "#d0d5e3",
            "bg-highlight": "#c4c8da",
            "bg-strong": "#b7c1e3",
            track: "#a8aecb",
            fg: "#3760bf",
            red: "#ff4774",
            orange: "#b15c00",
            yellow: "#8c6c3e",
            green: "#5c8524",
            cyan: "#007ea8",
            blue: "#358aff",
            purple: "#a463ff",
          },
          tokens,
          accents,
          defaultAccent,
        },
      },
    },
  },
} as const;
