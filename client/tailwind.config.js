/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        fingerPaint: ['Finger Paint', 'Play', 'Sans Serif'],
        play: ['Play', 'Finger Paint', 'Sans Serif'],
      },
      colors: {
        primary: '#E51636',
        secondary: '#F24F4F',
        gray: '#D9D9D9',
        error: '#EE4B2B',
        success: '#00FF00',
        required: '#E51636',
        lightGreen: '#00FF00',
      },
      boxShadow: {
        custom:
          'rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px',
      },
      gridTemplateColumns: {
        mobile_site: '1fr',
        md_site: '1fr 2fr',
        xl_site: '1fr 3fr',
      },
      gridTemplateRows: {
        mobile_site: 'min-content auto min-content',
        md_site: 'min-content auto',
      },
      gridTemplateAreas: {
        mobile_site: ['main-header', 'main', 'footer'],
        md_site: ['sidebar-header main-header', 'sidebar main'],
      },
    },
  },
  plugins: [import('@savvywombat/tailwindcss-grid-areas')],
};
