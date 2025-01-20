// astro.config.mjs
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [react(), tailwind()],
  output: 'server' // Nécessaire pour l'API Supabase
});

// tailwind.config.cjs
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {},
  },
  plugins: [],
};

// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  import.meta.env.PUBLIC_SUPABASE_URL,
  import.meta.env.PUBLIC_SUPABASE_ANON_KEY
);

// .env (à créer)
PUBLIC_SUPABASE_URL='https://shyvxqhnllogkqbhbmih.supabase.co'
PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNoeXZ4cWhubGxvZ2txYmhibWloIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzczODQ0MzIsImV4cCI6MjA1Mjk2MDQzMn0.s1Q5OSMjjaSFWOVwaPGx9nAudb-UJNUOAsAgjR-aG98