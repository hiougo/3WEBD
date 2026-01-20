/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Important pour pouvoir le switcher via un bouton
  theme: {
    extend: {
      colors: {
        // La couleur principale (Identité de la bibliothèque)
        primary: {
          DEFAULT: '#1e3a8a', // bleu nuit (mode clair)
          dark: '#172554',    // bleu encore plus sombre (mode sombre)
          light: '#3b82f6',   // bleu plus clair pour les liens/focus
        },
        // La couleur d'accentuation (Boutons d'action)
        secondary: {
          DEFAULT: '#eab308', // or / ambre
          hover: '#ca8a04',
        },
        // Les couleurs de fond de la page
        background: {
          light: '#f8fafc', // blanc cassé très léger (slate-50)
          dark: '#0f172a',  // gris très foncé (slate-900)
        },
        // Les couleurs des "cartes" ou conteneurs (header, formulaires)
        surface: {
          light: '#ffffff',
          dark: '#1e293b', // slate-800
        },
        // Les textes
        text: {
          main: '#0f172a',      // presque noir
          muted: '#64748b',     // gris moyen
          inverted: '#0f172a',  // presque blanc
        }
      },
    },
  },
  plugins: [],
}