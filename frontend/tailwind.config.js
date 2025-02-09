/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily:{
        sans: ['Poppins', 'sans-serif']
      },
      gridTemplateColumns:{
        '70/30': '70% 28%',
      },
      colors: {
        'primary': '#429818',
        'secondary': {
          100: '#3b8517',
          200: '#306e13',
        },
        'black':{

        }

      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

