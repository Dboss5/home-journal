import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        bg:            "var(--bg)",
        surface:       "var(--surface)",
        "surface-alt": "var(--surface-alt)",
        ink:           "var(--ink)",
        "ink-muted":   "var(--ink-muted)",
        red:           "var(--red)",
        "red-hover":   "var(--red-hover)",
        gold:          "var(--gold)",
        "gold-soft":   "var(--gold-soft)",
        border:        "var(--border)",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body:    ["var(--font-body)", "Georgia", "serif"],
        accent:  ["var(--font-accent)", "serif"],
        accessible: ["var(--font-accessible)", "sans-serif"],
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
      },
      boxShadow: {
        sm: "var(--shadow-sm)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
      },
      maxWidth: {
        measure: "var(--measure)",
      },
    },
  },
  plugins: [],
};

export default config;