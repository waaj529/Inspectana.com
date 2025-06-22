/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1B2E4F',
          50: '#F0F4F8',
          100: '#D9E2EC',
          200: '#B2C5D9',
          300: '#8BA8C6',
          400: '#648BB3',
          500: '#3D6EA0',
          600: '#2B5080',
          700: '#1B2E4F',
          800: '#162640',
          900: '#101E31'
        },
        accent: {
          DEFAULT: '#EC7846',
          50: '#FDF4F0',
          100: '#FAE4D6',
          200: '#F5CAAD',
          300: '#F0B084',
          400: '#EB965B',
          500: '#EC7846',
          600: '#E85D23',
          700: '#C94A1C',
          800: '#A53D17',
          900: '#823012'
        },
        neutral: {
          DEFAULT: '#F5F7FA',
          50: '#FFFFFF',
          100: '#F5F7FA',
          200: '#E5E9F0',
          300: '#D5DBE6',
          400: '#C5CDDC',
          500: '#B5BFD2',
          600: '#A0AAB8',
          700: '#8B949E',
          800: '#767E84',
          900: '#61686A'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'bounce-gentle': 'bounceGentle 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
      }
    },
  },
  plugins: [],
};