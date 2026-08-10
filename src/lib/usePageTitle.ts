import { useEffect } from 'react'

const BASE_TITLE = "Iqra' — Apprendre l'arabe et l'islam"

/** Met à jour l'onglet du navigateur avec le titre de la page courante, pour s'y retrouver
 * facilement quand plusieurs pages de l'app sont ouvertes dans des onglets différents. */
export function usePageTitle(title?: string) {
  useEffect(() => {
    document.title = title ? `${title} · Iqra'` : BASE_TITLE
    return () => {
      document.title = BASE_TITLE
    }
  }, [title])
}
