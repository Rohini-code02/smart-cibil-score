/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sage: {
          50: '#f2f8f4',
          100: '#e1efe4',
          500: '#4A7C59',
          600: '#3A6347',
        },
        serene: {
          50: '#f0f9f8',
          100: '#def0ef',
          500: '#2B7A78',
          600: '#226260',
        },
        cream: '#F4F7F6',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
