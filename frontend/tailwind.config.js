/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // ─── Rich Black ──────────────────────────────────
        richblack: {
          5:   "#F1F2FF",
          25:  "#DBDDEA",
          50:  "#C5C7D4",
          100: "#AFB2BF",
          200: "#999DAA",
          300: "#838894",
          400: "#6E727F",
          500: "#585D69",
          600: "#424854",
          700: "#2C333F",
          800: "#161D29",
          900: "#000814",
        },
        // ─── Rich Blue ───────────────────────────────────
        richblue: {
          5:   "#ECF5FF",
          25:  "#C6D6E1",
          50:  "#A0B7C3",
          100: "#7A98A6",
          200: "#537988",
          300: "#2D5A6A",
          400: "#073B4C",
          500: "#063544",
          600: "#052F3C",
          700: "#042934",
          800: "#03232C",
          900: "#021D24",
        },
        // ─── Blue ────────────────────────────────────────
        blue: {
          25:  "#F0F7FF",
          50:  "#E1F0FF",
          100: "#C3E0FF",
          200: "#A5D0FF",
          300: "#87C0FF",
          400: "#69B0FF",
          500: "#4BA0FF",
          600: "#2D90FF",
          700: "#0F80FF",
          800: "#0070F0",
          900: "#0060D0",
        },
        // ─── Yellow ──────────────────────────────────────
        yellow: {
          5:   "#FFF9E8",
          25:  "#FFE83D",
          50:  "#FFD60A",
        },
        // ─── Pink ────────────────────────────────────────
        pink: {
          25:  "#FFF4F4",
          50:  "#FFE0E0",
          100: "#FFB3B3",
          200: "#FF6B6B",
        },
        // ─── Pure Greys ──────────────────────────────────
        "pure-greys": {
          5:   "#F9F9F9",
          25:  "#E2E2E2",
          50:  "#CBCBCB",
          100: "#B4B4B4",
          200: "#9D9D9D",
          300: "#868686",
          400: "#6F6F6F",
          500: "#585858",
          600: "#414141",
          700: "#2A2A2A",
          800: "#131313",
          900: "#000000",
        },
      },
      // ─── Font Family ─────────────────────────────────
      fontFamily: {
        inter:     ["Inter", "sans-serif"],
        "edu-sa":  ["Edu SA Beginner", "cursive"],
        mono:      ["Roboto Mono", "monospace"],
      },
      // ─── Box Shadow ──────────────────────────────────
      boxShadow: {
        DEFAULT: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
      },
      // ─── Max Width ───────────────────────────────────
      maxWidth: {
        maxContent:       "1260px",
        maxContentTab:    "650px",
      },
      // ─── Background Image ─────────────────────────────
      backgroundImage: {
        "button-color-1": "linear-gradient(118.19deg, #1FA2FF -3.62%, #12D8FA 50.44%, #A6FFCB 104.51%)",
        "button-color-2": "linear-gradient(118.19deg, #FF512F -3.62%, #F09819 104.51%)",
        "button-color-3": "linear-gradient(118.19deg, #833AB4 -3.62%, #FD1D1D 50.44%, #FCB045 104.51%)",
      },
    },
  },
  plugins: [],
};