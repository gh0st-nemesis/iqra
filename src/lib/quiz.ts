export function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

export function pickRandom<T>(arr: T[], n: number): T[] {
  return shuffle(arr).slice(0, n)
}

/** Construit des choix de QCM : la bonne réponse + (count-1) leurres uniques pris dans `pool`. */
export function buildChoices<T>(correct: T, pool: T[], count = 4): T[] {
  const distractors = shuffle(pool.filter((p) => p !== correct)).slice(0, count - 1)
  return shuffle([correct, ...distractors])
}
