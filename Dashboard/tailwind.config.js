import typography from '@tailwindcss/typography';
import forms from '@tailwindcss/forms';
import animate from 'tailwindcss-animate';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Core System Colors
        background: 'var(--color-background)', // gray-50
        foreground: 'var(--color-foreground)', // gray-800
        border: 'var(--color-border)', // slate-300 with opacity
        input: 'var(--color-input)', // white
        ring: 'var(--color-ring)', // sage-green

        // Card & Surface Colors
        card: {
          DEFAULT: 'var(--color-card)', // gray-100
          foreground: 'var(--color-card-foreground)' // gray-800
        },
        popover: {
          DEFAULT: 'var(--color-popover)', // white
          foreground: 'var(--color-popover-foreground)' // gray-800
        },

        // Muted Colors
        muted: {
          DEFAULT: 'var(--color-muted)', // gray-100
          foreground: 'var(--color-muted-foreground)' // gray-500
        },

        // Primary Brand Colors
        primary: {
          DEFAULT: 'var(--color-primary)', // sage-green
          foreground: 'var(--color-primary-foreground)' // white
        },

        // Secondary Colors
        secondary: {
          DEFAULT: 'var(--color-secondary)', // periwinkle
          foreground: 'var(--color-secondary-foreground)' // gray-800
        },

        // Accent Colors
        accent: {
          DEFAULT: 'var(--color-accent)', // warm-peach
          foreground: 'var(--color-accent-foreground)' // gray-800
        },

        // Status Colors
        success: {
          DEFAULT: 'var(--color-success)', // green-300
          foreground: 'var(--color-success-foreground)' // gray-900
        },
        warning: {
          DEFAULT: 'var(--color-warning)', // orange-300
          foreground: 'var(--color-warning-foreground)' // gray-900
        },
        error: {
          DEFAULT: 'var(--color-error)', // red-300
          foreground: 'var(--color-error-foreground)' // gray-900
        },
        destructive: {
          DEFAULT: 'var(--color-destructive)', // red-300
          foreground: 'var(--color-destructive-foreground)' // white
        }
      },
      fontFamily: {
        'sans': ['Nunito', 'sans-serif'], // body text
        'heading': ['Inter', 'sans-serif'], // headings
        'caption': ['Poppins', 'sans-serif'], // captions
        'mono': ['JetBrains Mono', 'monospace'] // data/code
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }]
      },
      fontWeight: {
        'normal': '400',
        'medium': '500',
        'semibold': '600'
      },
      borderRadius: {
        'none': '0',
        'sm': '0.125rem',
        'DEFAULT': '0.5rem', // 8px standard
        'md': '0.375rem',
        'lg': '0.75rem', // 12px for cards
        'xl': '1rem',
        '2xl': '1.5rem',
        'full': '9999px'
      },
      boxShadow: {
        'subtle': 'var(--shadow-subtle)',
        'moderate': 'var(--shadow-moderate)',
        'prominent': 'var(--shadow-prominent)',
        'sm': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        'DEFAULT': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -1px rgb(0 0 0 / 0.06)',
        'md': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -1px rgb(0 0 0 / 0.06)',
        'lg': '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -2px rgb(0 0 0 / 0.05)',
        'xl': '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 10px 10px -5px rgb(0 0 0 / 0.04)',
        'inner': 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
        'none': 'none'
      },
      animation: {
        'gentle-pulse': 'organic-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'growth': 'growth 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'float': 'float 20s ease-in-out infinite',
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out'
      },
      keyframes: {
        'organic-pulse': {
          '0%, 100%': {
            opacity: '1',
            transform: 'scale(1)'
          },
          '50%': {
            opacity: '0.8',
            transform: 'scale(1.05)'
          }
        },
        'growth': {
          '0%': {
            opacity: '0',
            transform: 'translateY(10px) scale(0.95)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0) scale(1)'
          }
        },
        'float': {
          '0%, 100%': {
            transform: 'translate(0, 0) rotate(0deg)'
          },
          '33%': {
            transform: 'translate(30px, -30px) rotate(120deg)'
          },
          '66%': {
            transform: 'translate(-20px, 20px) rotate(240deg)'
          }
        },
        'fadeIn': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        'slideUp': {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        'slideDown': {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        }
      },
      transitionDuration: {
        'fast': '200ms',
        'normal': '300ms'
      },
      transitionTimingFunction: {
        'therapeutic': 'cubic-bezier(0.4, 0, 0.2, 1)'
      },
      backdropBlur: {
        'therapeutic': '8px'
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem'
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100'
      }
    },
  },
  plugins: [
    typography,
    forms,
    animate
  ],
}