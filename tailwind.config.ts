import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#1C1815",
        "ink-soft": "#5B554D",
        parchment: "#F7F4EE",
        stone: "#EDE7DE",
        "stone-2": "#E3DBCE",
        poppy: "#B3392A",
        "poppy-soft": "#C97267",
        clay: "#B08D7A",
        mist: "#8C8579",
        line: "rgba(28,24,21,0.13)",
      },
      fontFamily: {
        serif: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-body)", "-apple-system", "sans-serif"],
      },
      maxWidth: {
        wrap: "1240px",
      },
      letterSpacing: {
        widest2: "0.18em",
      },
      keyframes: {
        "marquee-left": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-right": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
      },
      animation: {
        "marquee-left": "marquee-left 34s linear infinite",
        "marquee-right": "marquee-right 34s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
