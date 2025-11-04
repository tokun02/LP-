import type { Config } from 'tailwindcss';

const config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', 'Noto Sans JP', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 20px 45px -16px rgba(59,130,246,0.45)',
      },
    },
  },
  plugins: [],
} satisfies Config;

export default config;
