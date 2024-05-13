/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/*.{js,ts,jsx,tsx}",
    "./src/components/*.{js,ts,jsx,tsx}",
    "./src/components/chat/*.{js,ts,jsx,tsx}",
    "./src/components/detail/*.{js,ts,jsx,tsx}",
    "./src/components/list/*.{js,ts,jsx,tsx}",
    "./src/components/login/*.{js,ts,jsx,tsx}",
    "./src/components/notification/*.{js,ts,jsx,tsx}",
    "./src/components/addUser/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    screens: {
      'xsm' : '300px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    }
  },
  plugins: [],
}

