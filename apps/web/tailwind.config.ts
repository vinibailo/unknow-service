import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        background: colors.zinc[50],
        surface: colors.white,
        border: colors.zinc[200],
        text: {
          primary: colors.zinc[900],
          secondary: colors.zinc[600]
        },
        primary: colors.blue[600]
      }
    }
  },
  plugins: []
};
export default config;
