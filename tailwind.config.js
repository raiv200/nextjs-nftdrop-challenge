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
        bounce:{
          '0%, 100% ':{
            transform: 'translateY(-5%)',
            animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)',
          },
          '50%':{
            transform: 'translateY(0)',
            animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
           
          },
        },
        
      },
      animation: {
        wiggle: 'wiggle 1s ease-in-out infinite',
        bounce :'bounce 1s infinite',
      },
      
    },
  },
  plugins: [],
}
