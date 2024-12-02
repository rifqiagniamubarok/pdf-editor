import { p } from 'framer-motion/client';
import type { Config } from 'tailwindcss';
const { nextui } = require('@nextui-org/react');

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: '#697565',
        secondary: '#ECDFCC',
        'dark-black': '#181C14',
        'dark-gray': '#3C3D37',
      },
    },
  },
  darkMode: 'class',
  plugins: [nextui()],
};
export default config;
