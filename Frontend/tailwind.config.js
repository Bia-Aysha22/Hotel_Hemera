/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Greek Mythology - Hemera (Goddess of Light) Color Palette
        hemera: {
          // Blue tones representing the sky and divine light
          blue: {
            50: '#e6f4ff',
            100: '#bae0ff',
            200: '#91caff',
            300: '#69b1ff',
            400: '#4096ff',
            500: '#1677ff',
            600: '#0958d9',
            700: '#003eb3',
            800: '#002c8c',
            900: '#001d66',
          },
          // Gold tones representing divine light and luxury
          gold: {
            50: '#fffbe6',
            100: '#fff1b8',
            200: '#ffe58f',
            300: '#ffd666',
            400: '#ffc53d',
            500: '#faad14',
            600: '#d48806',
            700: '#ad6800',
            800: '#874d00',
            900: '#613400',
          },
          // Light yellow for ethereal glow
          light: {
            50: '#fffffe',
            100: '#feffe6',
            200: '#ffffb8',
            300: '#fffb8f',
            400: '#fff566',
            500: '#ffec3d',
            600: '#fadb14',
            700: '#d4b106',
            800: '#ad8b00',
            900: '#876800',
          },
          // Deep navy for elegance
          navy: {
            50: '#f0f5ff',
            100: '#d6e4ff',
            200: '#adc6ff',
            300: '#85a5ff',
            400: '#597ef7',
            500: '#3f5bf6',
            600: '#1d39c4',
            700: '#10239e',
            800: '#0c0d7b',
            900: '#030852',
          }
        },
        // Legacy colors for compatibility
        primary: {
          50: '#e6f4ff',
          100: '#bae0ff',
          200: '#91caff',
          300: '#69b1ff',
          400: '#4096ff',
          500: '#1677ff',
          600: '#0958d9',
          700: '#003eb3',
          800: '#002c8c',
          900: '#001d66',
        },
        secondary: {
          50: '#fffbe6',
          100: '#fff1b8',
          200: '#ffe58f',
          300: '#ffd666',
          400: '#ffc53d',
          500: '#faad14',
          600: '#d48806',
          700: '#ad6800',
          800: '#874d00',
          900: '#613400',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'bounce-gentle': 'bounceGentle 0.6s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounceGentle: {
          '0%, 20%, 53%, 80%, 100%': { transform: 'translate3d(0,0,0)' },
          '40%, 43%': { transform: 'translate3d(0, -5px, 0)' },
          '70%': { transform: 'translate3d(0, -3px, 0)' },
          '90%': { transform: 'translate3d(0, -1px, 0)' },
        }
      }
    },
  },
  plugins: [],
}
