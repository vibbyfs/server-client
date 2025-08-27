/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      fontFamily: {
        primary: ['Playfair Display', 'serif'],
        secondary: ['Inter', 'sans-serif'],
      },
      colors: {
        // Christie's Luxury Color Palette
        primary: {
          black: '#000000',
          white: '#ffffff',
        },
        secondary: {
          gray: '#f8f8f8',
        },
        accent: {
          gold: '#d4af37',
          'gold-light': '#f4e87c',
        },
        text: {
          dark: '#1a1a1a',
          light: '#666666',
        },
        border: {
          DEFAULT: '#e5e5e5',
        },
      },
      animation: {
        'fadeInUp': 'fadeInUp 0.6s ease-out',
        'float': 'float 3s ease-in-out infinite',
        'gradient': 'gradient 4s ease infinite',
      },
      keyframes: {
        fadeInUp: {
          'from': {
            opacity: '0',
            transform: 'translateY(30px)',
          },
          'to': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        gradient: {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
      },
      screens: {
        'xs': '475px',
      },
      boxShadow: {
        'luxury-sm': '0 1px 2px rgba(0, 0, 0, 0.05)',
        'luxury-md': '0 4px 6px rgba(0, 0, 0, 0.07)',
        'luxury-lg': '0 10px 15px rgba(0, 0, 0, 0.1)',
        'luxury-xl': '0 20px 25px rgba(0, 0, 0, 0.15)',
      },
    },
  },
  plugins: [],
}
