import type { ModuleMeta } from '../types'

export interface ModuleProgress {
  value: number
  max: number
}

export type TrackReason = 'arabic' | 'islam'

export interface DailyPathResult {
  module: ModuleMeta
  reason: TrackReason
}

// Ordre pédagogique conseillé pour chaque parcours (langue arabe / connaissances islamiques),
// distinct — même s'il coïncide aujourd'hui — de l'ordre d'affichage dans data/modules.ts, pour ne
// pas dépendre silencieusement d'un ordre défini ailleurs pour un autre usage. "Horaires & Qibla"
// est volontairement absent : c'est un outil, pas un module avec une notion de progression/fin.
const ARABIC_ORDER = ['alphabet', 'numbers', 'harakat', 'reading', 'vocabulary', 'tajwid']
const ISLAM_ORDER = ['ablutions', 'salat', 'quran', 'names', 'prophets', 'adhkar', 'knowledge']

function firstUnfinished(
  order: string[],
  modules: ModuleMeta[],
  progressByModule: Record<string, ModuleProgress>,
): ModuleMeta | null {
  for (const id of order) {
    const mod = modules.find((m) => m.id === id)
    if (!mod) continue
    const p = progressByModule[id]
    if (!p || p.value < p.max) return mod
  }
  return null
}

/**
 * Recommande une prochaine activité pour la "Leçon du jour" : alterne chaque jour entre les deux
 * parcours (arabe / islam) pour encourager une progression équilibrée, tant qu'il reste du contenu
 * non terminé dans l'un ou l'autre. Si un parcours est entièrement terminé, l'autre prend le relais
 * systématiquement. Renvoie `null` si les deux parcours sont entièrement terminés.
 */
export function getDailyRecommendation(
  modules: ModuleMeta[],
  progressByModule: Record<string, ModuleProgress>,
  dayIndex: number,
): DailyPathResult | null {
  const nextArabic = firstUnfinished(ARABIC_ORDER, modules, progressByModule)
  const nextIslam = firstUnfinished(ISLAM_ORDER, modules, progressByModule)

  if (!nextArabic && !nextIslam) return null
  if (!nextArabic) return { module: nextIslam!, reason: 'islam' }
  if (!nextIslam) return { module: nextArabic!, reason: 'arabic' }

  return dayIndex % 2 === 0 ? { module: nextArabic, reason: 'arabic' } : { module: nextIslam, reason: 'islam' }
}

/** Quantième du jour dans l'année (1 = 1er janvier), utilisé pour piloter l'alternance ci-dessus. */
export function dayOfYear(date: Date = new Date()): number {
  const start = new Date(date.getFullYear(), 0, 0)
  const diff = date.getTime() - start.getTime()
  return Math.floor(diff / 86400000)
}
