// Répétition espacée (SM-2 simplifié) pour la révision long terme du hifz (versets mémorisés) et
// du vocabulaire maîtrisé. Référence de l'algorithme : SuperMemo SM-2 (Piotr Woźniak, 1987),
// largement documenté et repris tel quel par de nombreuses apps de flashcards (Anki notamment).

export interface SrsCard {
  interval: number // en jours
  easeFactor: number
  reps: number // nombre de révisions réussies d'affilée (remis à 0 sur "Encore")
  due: string // date ISO (YYYY-MM-DD) de la prochaine révision
}

export type SrsQuality = 'again' | 'hard' | 'good' | 'easy'

// Correspondance avec la note 0-5 du SM-2 original : "again" est un échec (< 3), les autres sont
// des réussites de qualité croissante.
const QUALITY_GRADE: Record<SrsQuality, number> = { again: 1, hard: 3, good: 4, easy: 5 }

const MIN_EASE_FACTOR = 1.3
const DEFAULT_EASE_FACTOR = 2.5

export function createSrsCard(today: string): SrsCard {
  return { interval: 0, easeFactor: DEFAULT_EASE_FACTOR, reps: 0, due: today }
}

function addDays(dateISO: string, days: number): string {
  const d = new Date(`${dateISO}T00:00:00`)
  d.setDate(d.getDate() + days)
  return d.toISOString().slice(0, 10)
}

/** Calcule la carte mise à jour après une révision, selon la formule SM-2. */
export function scheduleNext(card: SrsCard, quality: SrsQuality, today: string): SrsCard {
  const grade = QUALITY_GRADE[quality]
  let { interval, reps } = card
  let { easeFactor } = card

  if (grade < 3) {
    // Échec : on repart de zéro, révision dès le lendemain.
    reps = 0
    interval = 1
  } else {
    if (reps === 0) interval = 1
    else if (reps === 1) interval = 6
    else interval = Math.round(interval * easeFactor)
    reps += 1
  }

  easeFactor = Math.max(MIN_EASE_FACTOR, easeFactor + (0.1 - (5 - grade) * (0.08 + (5 - grade) * 0.02)))

  return { interval, easeFactor, reps, due: addDays(today, interval) }
}

export function isDue(card: SrsCard, today: string): boolean {
  return card.due <= today
}
