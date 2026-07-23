/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'gold': '#C9A227',
        'gold-light': '#F0D27A',
        'maroon': '#6B1E3C',
        'maroon-deep': '#4A1329',
        'cream': '#FFF8E7',
        'emerald': '#0F5C4B',
        'blush': '#E8918C',
        'ink': '#3A2416',
      },
      fontFamily: {
        rozha: ['"Rozha One"', 'serif'],
        poppins: ['Poppins', 'sans-serif'],
        mukta: ['Mukta', 'sans-serif'],
      },
      animation: {
        pulse: 'pulse 2s ease-in-out infinite',
        fall: 'fall linear infinite',
        flicker: 'flicker 1.6s ease-in-out infinite',
        flickerFast: 'flicker 1.3s ease-in-out infinite',
        sway: 'sway 2.4s ease-in-out infinite',
        smokeRise: 'smokeRise 1.6s ease-out forwards',
      },
      keyframes: {
        pulse: {
          '0%, 100%': { opacity: '.4' },
          '50%': { opacity: '.9' },
        },
        fall: {
          'to': { transform: 'translateY(115vh) rotate(360deg)' },
        },
        flicker: {
          '0%, 100%': { transform: 'translateX(-50%) scale(1) rotate(-1deg)' },
          '30%': { transform: 'translateX(-50%) scale(1.06,0.96) rotate(2deg)' },
          '60%': { transform: 'translateX(-50%) scale(0.95,1.05) rotate(-2deg)' },
        },
        sway: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(6px) rotate(6deg)' },
        },
        smokeRise: {
          '0%': { opacity: '.6', boxShadow: '0 0 0 2px rgba(230,230,230,.5)' },
          '100%': { opacity: '0', transform: 'translate(-50%,-40px) scaleX(3)', boxShadow: '0 0 0 10px rgba(230,230,230,0)' },
        }
      }
    },
  },
  plugins: [],
}
