/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        slidedown: {
          '0%': { transform: 'translate(0, -0.75rem)', opacity: 0 },
          '100%': { transform: 'translate(0)', opacity: 100 }
        }
      },
      animation: {
        slidedown: 'slidedown 0.4s ease-out'
      }
    },
  },
  plugins: [],
}

