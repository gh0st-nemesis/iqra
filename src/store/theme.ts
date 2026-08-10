import { create } from 'zustand'

type Theme = 'light' | 'dark'

const STORAGE_KEY = 'iqra-theme'

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'light'
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored === 'light' || stored === 'dark') return stored
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function applyTheme(theme: Theme) {
  if (typeof document === 'undefined') return
  document.documentElement.classList.toggle('dark', theme === 'dark')
}

interface ThemeState {
  theme: Theme
  toggleTheme: () => void
  setTheme: (theme: Theme) => void
}

// Applique le thème dès le chargement du module (avant le premier rendu React).
// Un petit script inline dans index.html fait déjà ce travail en tout premier pour
// éviter le flash de mauvais thème ; ceci garde le store cohérent avec le DOM.
const initialTheme = getInitialTheme()
applyTheme(initialTheme)

export const useTheme = create<ThemeState>((set, get) => ({
  theme: initialTheme,
  toggleTheme: () => {
    const next: Theme = get().theme === 'dark' ? 'light' : 'dark'
    localStorage.setItem(STORAGE_KEY, next)
    applyTheme(next)
    set({ theme: next })
  },
  setTheme: (theme) => {
    localStorage.setItem(STORAGE_KEY, theme)
    applyTheme(theme)
    set({ theme })
  },
}))
