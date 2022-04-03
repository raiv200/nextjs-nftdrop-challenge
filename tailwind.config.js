const { url } = require("inspector");

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      scale:{
        '110':'1.00001',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        
      },
      animation: {
        wiggle: 'wiggle 1s ease-in-out infinite',
      },
      
    },
  },
  plugins: [],
}
