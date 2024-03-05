/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontSize: {
      xs: ['12px', '16px'],
      sm: ['14px', '20px'],
      base: ['16px', '19.5px'],
      lg: ['18px', '21.94px'],
      xl: ['20px', '24.38px'],
      '2xl': ['24px', '29.26px'],
      '3xl': ['34px', '46px'],
      '4xl': ['48px', '58px'],
      '5xl':['50px','60px'],
      '6xl': ['70px', '80px']
    },
    extend: {
      fontFamily: {
        lato:['Lato', 'sans-serif'],
        outfit: ['Outfit', 'sans-serif'],
        nunito: ['Nunito', 'sans-serif'],
        rouge:['Rouge Script', 'cursive']
      },
      colors: {
        'primary': "#00FFaa",
        'secondary':"#0f1a53 ",
        'tertiary':'#050d44 ',
      },
      boxShadow: {
        '3xl': '0 10px 40px rgba(0, 0, 0, 0.1)'
      },
      backgroundImage: {
        'hero': "url('assets/images/herobg.png')",
        "footerbg":"url('assets/images/footerbg.png')"
      },
      screens: {
        "wide": "1536px",
        "xsmall": "480px",
        "2xsmall": "380px"
      }
    },
  },
  plugins: [],
}