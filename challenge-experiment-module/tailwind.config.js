/*
Here in this file, we mentioned the files where tailwind needs to be integrated in content (All page types).
In the extend property, we mention the css properties which tailwind doesn't provide implicitly.
We can also use this to override any of the tailwind's utility classes.
For responsiveness, we should use prefixes like 'sm, md, lg, xl' with our tailwind utility classes (for max-width),
we should use prefixes like 'min-sm, min-md, min-lg, min-xl' for min-width mediaquery rules.
*/

/*NOTE: To use tailwind's native className prop, we need to have the following two import statements in the same order:

Same goes for using twin.macro's tw and css prop (instead of tailwind's className, tw prop can be used inside JSX 
and css prop is for writing conditional css inside JSX) -- We need to import the above 2 statement
*/
/* eslint-disable @typescript-eslint/no-var-requires */



/** @type {import('tailwindcss').Config} */
const environ = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    authenrion: {}
  },
}
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
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
  plugins: [],
};
















