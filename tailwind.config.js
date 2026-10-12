/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        // Updated to the official project font
        sans: ['Poppins', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      colors: {
        tabler: {
          primary: '#206bc4',
          success: '#34A853', // Official accent color
          warning: '#f59f00',
          danger: '#d63939',
          body: '#182433',
          card: '#1f2d3d',
          border: '#2f3e4e',
          muted: '#8091a5',
          light: '#F3F4F6', // Official secondary background color
        }
      }
    },
  },
  plugins: [],
}