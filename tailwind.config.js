/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx,html}'],
  theme: {
    extend: {},
    screens: {
      'mobile': {'max': '639px'},      
      'smTablet': {'min': '640px', 'max': '767px'},
      'tablet': {'min': '768px', 'max': '1023px'},   
      'desktop': {'min': '1024px', 'max': '1279px'}, 
      'lgDesktop': {'min': '1280px'},  
    },
  },
  plugins: [],
};
