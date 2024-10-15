/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/blocks/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "ad-blue": {
          DEFAULT: "#1C1DEC",
          50: "#C5C6FA",
          100: "#B3B3F9",
          200: "#8D8DF5",
          300: "#6768F2",
          400: "#4242EF",
          500: "#1C1DEC",
          600: "#1011C0",
          700: "#0C0C8C",
          800: "#070858",
          900: "#030325",
          950: "#01010B",
        },
        "ad-dark": {
          DEFAULT: "#1D1F21",
          50: "#D4D7D9",
          100: "#C9CCD0",
          200: "#B3B8BD",
          300: "#9EA4A9",
          400: "#888F96",
          500: "#737B83",
          600: "#60666D",
          700: "#4D5257",
          800: "#3A3E42",
          900: "#2b2d30",
          950: "#1D1F21",
        },
        "ad-mint": {
          DEFAULT: "#AAF8D9",
          50: "#FFFFFF",
          100: "#FFFFFF",
          200: "#FFFFFF",
          300: "#F5FEFB",
          400: "#D0FBEA",
          500: "#AAF8D9",
          600: "#76F4C2",
          700: "#42EFAB",
          800: "#13E793",
          900: "#0FB372",
          950: "#0D9961",
        },
        "ad-orange": {
          DEFAULT: "#FF970A",
          50: "#FFE5C2",
          100: "#FFDCAD",
          200: "#FFCB84",
          300: "#FFBA5C",
          400: "#FFA833",
          500: "#FF970A",
          600: "#D17800",
          700: "#995800",
          800: "#613800",
          900: "#291700",
          950: "#0D0700",
        },
        "ad-yellow": {
          DEFAULT: "#FEFF55",
          50: "#FFFFFF",
          100: "#FFFFF8",
          200: "#FFFFCF",
          300: "#FEFFA7",
          400: "#FEFF7E",
          500: "#FEFF55",
          600: "#FEFF1D",
          700: "#E2E400",
          800: "#ABAC00",
          900: "#737400",
          950: "#575800",
        },
        "ad-light": "#F3EED9",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
