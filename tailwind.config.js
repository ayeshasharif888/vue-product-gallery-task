/** @type {import('tailwindcss').Config} */
export default{
  content: ['./public/**/*.html','./src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Lato', 'sans-serif'], // Lato font for sans-serif
        redhat: ['Red Hat Display', 'sans-serif'], // Red Hat Display font
      },
      colors: {
        // hColor: '#8A5C28',
      },
    },
  },
  plugins: [],
}

