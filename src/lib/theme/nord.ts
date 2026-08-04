const tokens = {
  "bg-main": "nord0",
  "bg-outer": "nord1",
  "bg-inner": "nord2",
  "bg-button": "nord3",
  "text": "nord4",
  "text-hover": "nord3",
  "shadow": "nord1",
  "timer-track": "nord3",
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

const defaultAccent = "cyan";

export const nord = {
  defaultMode: "dark",
  modes: {
    dark: {
      defaultFlavor: "nord",
      flavors: {
        nord: {
          colors: {
            nord0: "#2e3440",
            nord1: "#3b4252",
            nord2: "#434c5e",
            nord3: "#4c566a",
            nord4: "#d8dee9",
            red: "#bf616a",
            orange: "#d08770",
            yellow: "#ebcb8b",
            green: "#a3be8c",
            cyan: "#88c0d0",
            blue: "#81a1c1",
            purple: "#b48ead",
          },
          tokens,
          accents,
          defaultAccent,
        },
      },
    },
  },
} as const;
