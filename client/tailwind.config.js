import daisyui from 'daisyui';
import typography from '@tailwindcss/typography';
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    colors: {
      navGray: '#1f2937',
      'anti-white': '#EEEEEE',
    },
  },
  plugins: [typography, daisyui],
  daisyui: {
    themes: ['fantasy'],
  },
};
