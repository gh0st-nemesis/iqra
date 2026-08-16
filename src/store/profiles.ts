import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { useProgress } from './progress'

// Profils multiples ("espace famille") : chaque profil est un nom + un avatar + un instantané
// JSON de sa progression (le même format que l'export/import déjà existant dans store/progress.ts,
// réutilisé tel quel plutôt que dupliqué). Seul le profil actif a sa progression "en direct" dans
// le store `progress` (persistée sous 'iqra-progress') ; les autres restent figés dans leur
// instantané jusqu'à ce qu'on bascule dessus. C'est ce qui permet de garder une seule source de
// vérité pendant l'usage courant, sans réécrire toute l'app en multi-store.
export interface Profile {
  id: string
  name: string
  colorIndex: number
  createdAt: string
  snapshot: string
}

interface ProfilesState {
  profiles: Profile[]
  activeProfileId: string | null

  // Migration douce : si aucun profil n'existe encore (première visite après cette mise à jour),
  // enveloppe la progression actuelle — quelle qu'elle soit, y compris vide — dans un premier
  // profil "Profil 1", sans aucune perte de données. Appelé une fois au montage de l'app.
  ensureDefaultProfile: () => void
  addProfile: (name: string) => void
  renameProfile: (id: string, name: string) => void
  deleteProfile: (id: string) => void
  switchProfile: (id: string) => void
}

const AVATAR_COLOR_COUNT = 6

function makeProfileId(): string {
  return `p_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`
}

export const useProfiles = create<ProfilesState>()(
  persist(
    (set, get) => ({
      profiles: [],
      activeProfileId: null,

      ensureDefaultProfile: () => {
        if (get().profiles.length > 0) return
        const id = makeProfileId()
        const snapshot = useProgress.getState().exportProgress()
        set({
          profiles: [{ id, name: 'Profil 1', colorIndex: 0, createdAt: new Date().toISOString(), snapshot }],
          activeProfileId: id,
        })
      },

      addProfile: (name) => {
        const { profiles, activeProfileId } = get()
        // Archive la progression en cours dans le profil actif avant de le quitter.
        const archived = activeProfileId
          ? profiles.map((p) => (p.id === activeProfileId ? { ...p, snapshot: useProgress.getState().exportProgress() } : p))
          : profiles

        useProgress.getState().resetProgress()
        const id = makeProfileId()
        const snapshot = useProgress.getState().exportProgress()
        set({
          profiles: [
            ...archived,
            { id, name: name.trim() || `Profil ${archived.length + 1}`, colorIndex: archived.length % AVATAR_COLOR_COUNT, createdAt: new Date().toISOString(), snapshot },
          ],
          activeProfileId: id,
        })
      },

      renameProfile: (id, name) => {
        const trimmed = name.trim()
        if (!trimmed) return
        set({ profiles: get().profiles.map((p) => (p.id === id ? { ...p, name: trimmed } : p)) })
      },

      deleteProfile: (id) => {
        const { profiles, activeProfileId } = get()
        if (profiles.length <= 1) return // toujours garder au moins un profil
        const remaining = profiles.filter((p) => p.id !== id)
        if (activeProfileId === id) {
          const next = remaining[0]
          useProgress.getState().importProgress(next.snapshot)
          set({ profiles: remaining, activeProfileId: next.id })
        } else {
          set({ profiles: remaining })
        }
      },

      switchProfile: (id) => {
        const { activeProfileId, profiles } = get()
        if (id === activeProfileId) return
        const target = profiles.find((p) => p.id === id)
        if (!target) return
        const archived = activeProfileId
          ? profiles.map((p) => (p.id === activeProfileId ? { ...p, snapshot: useProgress.getState().exportProgress() } : p))
          : profiles
        useProgress.getState().importProgress(target.snapshot)
        set({ profiles: archived, activeProfileId: id })
      },
    }),
    { name: 'iqra-profiles' },
  ),
)
