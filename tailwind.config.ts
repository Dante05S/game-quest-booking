import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './layouts/**/*.{js,ts,jsx,tsx}',
    './views/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#5852D6',
          dark: 'rgb(62 58 153 / <alpha-value>)',
          font: '#ffffff'
        },
        secondary: {
          DEFAULT: '#1B1B1B',
          font: '#ffffff'
        },
        tertiary: {
          DEFAULT: '#16171B',
          font: 'rgb(255 255 255 / <alpha-value>)'
        },
        pane: 'rgba(46, 44, 54, 0.2)',
        error: {
          DEFAULT: 'rgb(211, 47, 47)',
          dark: '#ab2626'
        },
        background: '#000000',
        success: '#64AE65'
      },
      screens: {
        'xxs': '369px',
        'xs': '500px',
        '2md': '900px',
        '3xl': '1600px'
      },
      maxWidth: {
        'screen-3xl': '1600px'
      }
    }
  },
  plugins: []
};
export default config;
