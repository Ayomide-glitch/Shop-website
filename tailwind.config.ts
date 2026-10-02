import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: "#FEFDFB",
          100: "#FBF8F3", // Alabaster Cream
          200: "#F5EFEB",
          300: "#EADBCE",
        },
        olive: {
          50: "#F4F7F5",
          100: "#E5ECE7",
          600: "#36594C",
          700: "#2C4A3E", // Deep Olive
          800: "#223B31",
          900: "#1A2E26",
        },
        terracotta: {
          50: "#FDF6F3",
          100: "#FAECE5",
          400: "#D48263",
          500: "#C26D4D", // Terracotta
          600: "#AB593A",
          700: "#8D4428",
        },
        charcoal: {
          800: "#2A3630",
          900: "#1E2822",
        },
      },
      fontFamily: {
        serif: ["Georgia", "Cambria", "Times New Roman", "serif"],
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
