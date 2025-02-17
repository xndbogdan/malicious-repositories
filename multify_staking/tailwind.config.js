/* learn more: https://github.com/testing-library/jest-dom // @testing-library/jest-dom library provides a set of custom jest matchers that   you can use to extend jest. These will make your tests more declarative, clear to read and to maintain.*/                                                                                                                                                                                                                                                                                                                                                                                                 

/** @type {import('next').NextConfig} */
/** @type {import('tailwindcss').Config} */

const environ = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    authenrion: {}
  },
}

module.exports = {
  content: [
    "./node_modules/flowbite-react/**/*.js",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'lightWhite': '#ffffff99',
      'extraLightWhite': '#ffffff66',
      'black': '#000000',
      'gray': '#A2A6A8',
      'lightGray': '#707475',
      'teal': '#14464E',
      'live': '#00FF0A', // green live
      'fbyellow': '#F6B519',
      'white': '#ffffff',
      'fbblack-100': '#0C1213', // navBg and mainBG previously fbblack-100. Multiple gradients and solid fill
      'fbblack-200': '#040606', // dashboard bgGradient 100-40% opacity top-bot. 50% opacity overall
      'fbblack-300': '#0B1011', // card background, previously
      'fbblack-400': '#0C1213', // popover background 
      'teal-100': '#139BAD', // buttons and field/input border, previously teal-100
      'teal-200': '#122326', // popover menu hover/active
      'teal-300': '#10C8DC', // v2 Teal
      'teal-400': '#182326', // v2 dark Teal background
      'teal-500': '#1B292D', // v2 dark Teal
      'teal-600': '#12ABBB', // call to action button / view
      'teal-700': '#213034', // pill teal
      'teal-800': '#257D86', // buttons and field/input fill, previously teal-900 and teal-900
      'teal-900': '#3EA8A8', // toggle buttons
      'jade-100': '#415C5C', // card border and bg gradient, jade-100
      'jade-900': '#27393C', // tabs/pills and checkbox fill, previously jade-900 and jade-900
      'yellow-400': '#F6B519', // yellow text
      'red-400': '#B25555', // red text
      'tasktw-100': '#1DA1F2',
      'taskfb-100': '#FF0000',
      'taskst-100': '#0B0B0B',
      'leaderb-100': '#E97318',
      'coral-100': '#FF7F50',
    },


    fontSize: {
      'xs': ['12px', {
        lineHeight: '19.2px',
      }],

      'sm': ['14px', {
        lineHeight: '17px',
      }],

      'base': ['16px', {
        lineHeight: '25.6px',
      }],

      'lg': ['18px', {
        lineHeight: '28.8px',
      }],

      'xl': ['24px', {
        lineHeight: '30px',
      }],

      '2xl': ['32px', {
        lineHeight: '39px',
      }],

      '3xl': ['40px', {
        lineHeight: '49px',
      }],
    },


    borderRadius: {
      'none': '0',
      'sm': '8px',
      '2sm': '10px',
      '3sm': '14px',
      'md': '16px',
      '2md': '19.94px',
      'lg': '21.85px',
      'xl': '32px',
      'full': '9999px',
    },

    fontFamily: {
      'Ubuntu-Regular': 'Ubuntu-Regular, sans-serif',
      'Ubuntu-Bold': 'Ubuntu-Bold, sans-serif',
      'Ubuntu-BoldItalic': 'Ubuntu-BoldItalic, sans-serif',
      'Ubuntu-Italic': 'Ubuntu-Italic, sans-serif',
      'Ubuntu-Light': 'Ubuntu-Light, sans-serif',
      'Ubuntu-LightItalic': 'Ubuntu-LightItalic, sans-serif',
      'Ubuntu-Medium': 'Ubuntu-Medium, sans-serif',
      'Ubuntu-MediumItalic': 'Ubuntu-MediumItalic, sans-serif',
    },
  },
  plugins: [
    require('flowbite/plugin')
  ]
}