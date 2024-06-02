/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Enable class-based dark mode
  content: [
    './public/index.html',
    './src/**/*.{svelte,js,ts}',
  ],
  theme: {
    extend: {},
    colors: {
      primary: '#0055B8',
      secondary: '#FE6500',
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
};

