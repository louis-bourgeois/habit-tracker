import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontSize: {
      "3xs": "0.375rem",
      "2xs": "0.5rem",
      "1.5xs": "0.675rem",
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      m: "1.25rem",
      lg: "1.5rem",
      xl: "1.75rem",
      "2xl": "2rem",
      "2.5xl": "2.5rem",
      "3xl": "3rem",
      "3.5xl": "3.5rem",
      "4xl": "4rem",
      "5xl": "5rem",
    },
    extend: {
      boxShadow: {
        shadow_card: "rgba(0, 0, 0, 0.2) 0px 6px 12px, rgba(0, 0, 0, 0.25) 0px 19px 15px",
      },
      colors: {
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        bg: "var(--color-background)",
        text: "var(--color-text)",
        // Ajoutez d'autres variables CSS si nécessaire
      },
    },
  },
  plugins: [
    function ({ addUtilities, theme }) {
      const newUtilities = {
        ".text-trim": {
          lineHeight: theme("lineHeight.5"),
          display: "inline-block",
        },
      };
      addUtilities(newUtilities);
    },
  ],
};

export default config;
