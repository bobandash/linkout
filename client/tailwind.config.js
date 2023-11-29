import scrollbarPlugin from 'tailwind-scrollbar';
import gridTemplateAreas from '@savvywombat/tailwindcss-grid-areas';

/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        play: ['Play', 'Finger Paint', 'Sans Serif'],
      },
      colors: {
        primary: '#811331',
        // these colors go from darkest to lightest
        color_1: '#1e2124',
        color_2: '#282b30',
        color_3: '#36393e',
        color_4: '#424549',
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
        lg_site: '350px minmax(0,3fr)',
        two_xl_site: '350px minmax(0,3fr) 300px',
        sidebar_site: 'fit-content minmax(0, 1fr)',
        mobile_message: '60px minmax(0,1fr)',
        desktop_message: '80px minmax(0,1fr)',
        desktop_profile: '80px minmax(0,1fr)',
      },
      gridTemplateAreas: {
        mobile_site: ['main-header', 'main', 'footer'],
        md_site: ['sidebar-header main-header', 'sidebar main'],
        message: ['profile-picture', 'message-content'],
      },
    },
  },
  plugins: [gridTemplateAreas, scrollbarPlugin],
};
