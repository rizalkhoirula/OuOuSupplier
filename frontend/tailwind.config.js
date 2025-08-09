/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary': '#1a2a4c',
        'secondary': '#2c3e50',
        'accent': '#3498db',
        'light': '#ecf0f1',
        'dark-accent': '#2980b9',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'interactive': '0 10px 15px -3px rgba(52, 152, 219, 0.3), 0 4px 6px -2px rgba(52, 152, 219, 0.15)',
      },
      transitionProperty: {
        'height': 'height',
      }
    },
  },
  plugins: [],
}
