/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        craft: { 
          50: '#faf9f7', 
          100: '#f0ece1', 
          800: '#3e3a35', 
          900: '#2c2926' 
        },
        accent: { 
          DEFAULT: '#d97745', 
          hover: '#c26231' 
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
