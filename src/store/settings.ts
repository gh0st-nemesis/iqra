import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Réglages transverses d'accessibilité/confort, séparés de `progress.ts` (données
// d'apprentissage) et `theme.ts` (clair/sombre) pour rester faciles à étendre.

export type TextScale = 'normal' | 'large' | 'xlarge'

export const TEXT_SCALE_PERCENT: Record<TextScale, string> = {
  normal: '100%',
  large: '112.5%',
  xlarge: '125%',
}

export const TEXT_SCALE_LABELS: Record<TextScale, string> = {
  normal: 'Normale',
  large: 'Grande',
  xlarge: 'Très grande',
}

function applyTextScale(scale: TextScale) {
  if (typeof document === 'undefined') return
  document.documentElement.style.fontSize = TEXT_SCALE_PERCENT[scale]
}

interface SettingsState {
  textScale: TextScale
  notificationsEnabled: boolean
  setTextScale: (scale: TextScale) => void
  setNotificationsEnabled: (enabled: boolean) => void
}

export const useSettings = create<SettingsState>()(
  persist(
    (set) => ({
      textScale: 'normal',
      notificationsEnabled: false,
      setTextScale: (scale) => {
        applyTextScale(scale)
        set({ textScale: scale })
      },
      setNotificationsEnabled: (enabled) => set({ notificationsEnabled: enabled }),
    }),
    {
      name: 'iqra-settings',
      onRehydrateStorage: () => (state) => {
        if (state) applyTextScale(state.textScale)
      },
    },
  ),
)
