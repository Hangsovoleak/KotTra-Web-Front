/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx,html}'],
  theme: {
    extend: {},
    screens: {
      'mobile': {'max': '639px'},       // <640px
      'smTablet': {'min': '640px', 'max': '767px'}, // 640‑767
      'tablet': {'min': '768px', 'max': '1023px'},   // 768‑1023
      'desktop': {'min': '1024px', 'max': '1279px'}, // 1024‑1279
      'lgDesktop': {'min': '1280px'},   // >=1280
    },
  },
  plugins: [],
};
