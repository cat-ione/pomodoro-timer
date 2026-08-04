const tokens = {
  "bg-main": "bg",
  "bg-outer": "black",
  "bg-inner": "line",
  "bg-button": "selection",
  "text": "foreground",
  "text-hover": "selection",
  "shadow": "black",
  "timer-track": "comment",
} as const;

const accents = [
  "red",
  "orange",
  "yellow",
  "green",
  "cyan",
  "purple",
  "pink",
] as const;

const defaultAccent = "purple";

export const dracula = {
  defaultMode: "dark",
  modes: {
    dark: {
      defaultFlavor: "dracula",
      flavors: {
        dracula: {
          colors: {
            black: "#191a21",
            bg: "#282a36",
            line: "#343746",
            selection: "#44475a",
            comment: "#6272a4",
            foreground: "#f8f8f2",
            cyan: "#8be9fd",
            green: "#50fa7b",
            orange: "#ffb86c",
            pink: "#ff79c6",
            purple: "#bd93f9",
            red: "#ff5555",
            yellow: "#f1fa8c",
          },
          tokens,
          accents,
          defaultAccent,
        },
      },
    },
  },
} as const;
