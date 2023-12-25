/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')
module.exports = {
  content: [    
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  "./components/**/*.{js,ts,jsx,tsx,mdx}"
],
  theme: {
    extend: {
      colors:{
        'blue': '#525FE1',
        'orange': '#F86F03',
        'light-orange': '#FFA41B',
        'white': '#FFF6F4',
      },
      fontFamily:{
        body:['Noto Sans JP'],
      },
    },
  },
  plugins: [
    plugin(function({addVariant}){
      addVariant('data-hoge', '&[data-hoge="true"]')
      addVariant('group-data-hoge', ':merge(.group)[data-hoge="true"] &')
      addVariant('peer-data-hoge', ':merge(.peer)[data-hoge="true"] ~ &')
    })

  ],
}

