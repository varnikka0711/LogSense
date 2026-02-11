/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: "#050609",
          muted: "#0b0d13",
          subtle: "#111320"
        },
        accent: {
          DEFAULT: "#f472b6",
          muted: "#e879f9",
          soft: "#f9a8d4"
        }
      },
      boxShadow: {
        soft: "0 18px 45px rgba(15,23,42,0.75)"
      },
      fontFamily: {
        sans: ["system-ui", "ui-sans-serif", "Segoe UI", "sans-serif"]
      }
    }
  },
  plugins: []
};

