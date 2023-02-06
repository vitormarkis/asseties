/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        sh: "0 1px 2px rgba(0, 0, 0, 0.3), 0 0 0 1px #f7f7f7",
      },
    },
  },
  plugins: [],
}
