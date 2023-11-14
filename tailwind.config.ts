/** @type {import('tailwindcss').Config} */

// import defaultTheme from "tailwindcss/defaultTheme";
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        gradientYWhiteBlack: 'linear-gradient(to bottom, white, black)'
      },
      screens: {
        xs: '455px',
        sm: '485px',
        md: '763px',
        lg: '970px',
        xl: '1447px'
        // ...defaultTheme.screens,
      },
      lineHeight: {
        logo: '0.8'
      },
      colors: {
        primary: {
          light: '#82ffb0',
          base: '#6CFFA2',
          dark: '#58e38b',
          highlight: '#70FF89'
        },
        secondary: {
          light: '#092eb7',
          base: '#092eb7',
          dark: '#092eb7',
          highlight: '#1E4EFF'
        },
        success: {
          light: '#6CFFA2',
          base: '#6CFFA2',
          dark: '#6CFFA2',
          highlight: '#70FF89'
        },
        warning: {
          light: '#FBBC04',
          base: '#FBBC04',
          dark: '#FBBC04',
          highlight: '#FFD976'
        },
        error: {
          light: '#FF3B12',
          base: '#FF3B12',
          dark: '#FF3B12',
          highlight: '#FF7A70'
        },
        info: {
          light: '#1E4EFF',
          base: '#1E4EFF',
          dark: '#1E4EFF',
          highlight: '#819CFF'
        },
        white: '#f5f5f5',
        black: '#161616',
        title: '#3D6386',
        pink: '#FF2247',
        bright: '#FFF',
        darkGray: '#696969',
        mGray: '#C8C8C8',
        lightGray: '#B8B8B8',
        green: '#5ABF85',
        yellow: '#FB9804'
      }
    },
    fontFamily: {
      sans: ['Lato', 'Inter', 'sans-serif']
    }
  }
}
