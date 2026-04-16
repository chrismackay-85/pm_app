import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        accentYellow: "#ecad0a",
        bluePrimary: "#209dd7",
        purpleSecondary: "#753991",
        darkNavy: "#032147",
        grayText: "#888888"
      }
    }
  },
  plugins: []
};

export default config;

