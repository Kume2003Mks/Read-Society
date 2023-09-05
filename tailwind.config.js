/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        '3xl': '5px 4px 5px 0px rgba(0, 0, 0, 0.10), -5px 4px 4px 0px rgba(0, 0, 0, 0.10)',
      }
    },
  },
  plugins: [],
}

