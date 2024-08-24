const { nextui } = require('@nextui-org/theme')
/**
 * @format
 * @type {import('tailwindcss').Config}
 */

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/components/(button|input|modal|navbar|progress|select|spinner|ripple|listbox|divider|popover|scroll-shadow).js',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      keyframes: {
        gradient: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '100% 50%' },
        },
      },
      animation: {
        gradient: 'gradient 6s linear infinite',
      },
    },
  },
  plugins: [nextui()],
}
