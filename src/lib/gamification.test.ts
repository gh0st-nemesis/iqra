import { describe, expect, it } from 'vitest'
import { badgeDefinitions, getLevelInfo, type BadgeProgressInput, type BadgeTotals } from './gamification'

describe('getLevelInfo', () => {
  it('démarre au niveau 1 ("Graine") à 0 XP', () => {
    const level = getLevelInfo(0)
    expect(level.level).toBe(1)
    expect(level.title).toBe('Graine')
    expect(level.xpInLevel).toBe(0)
    expect(level.xpForNextLevel).toBe(30)
    expect(level.progress).toBe(0)
  })

  it("reste au niveau 1 juste avant le seuil du niveau 2", () => {
    const level = getLevelInfo(29)
    expect(level.level).toBe(1)
    expect(level.xpInLevel).toBe(29)
    expect(level.progress).toBeCloseTo(29 / 30)
  })

  it('passe au niveau 2 ("Pousse") exactement au seuil', () => {
    const level = getLevelInfo(30)
    expect(level.level).toBe(2)
    expect(level.title).toBe('Pousse')
    expect(level.xpInLevel).toBe(0)
  })

  it('atteint le niveau maximum et plafonne la progression à 1', () => {
    const level = getLevelInfo(2600)
    expect(level.level).toBe(10)
    expect(level.title).toBe('Lumière du Coran')
    expect(level.xpForNextLevel).toBeNull()
    expect(level.progress).toBe(1)
  })

  it('reste au niveau maximum même bien au-delà du dernier seuil', () => {
    const level = getLevelInfo(50000)
    expect(level.level).toBe(10)
    expect(level.xpForNextLevel).toBeNull()
  })
})

function emptyProgress(overrides: Partial<BadgeProgressInput> = {}): BadgeProgressInput {
  return {
    masteredLetters: [],
    masteredNumbers: [],
    learnedHarakat: [],
    wordsRead: [],
    tajwidRulesSeen: [],
    wuduStepsSeen: [],
    tayammumStepsSeen: [],
    prayerStepsSeen: [],
    memorizedVerses: [],
    masteredVocab: [],
    masteredNames: [],
    prophetsRead: [],
    adhkarSeen: [],
    pillarsIslamSeen: [],
    pillarsFaithSeen: [],
    akhlaqSeen: [],
    hijriMonthsSeen: [],
    streak: 0,
    ...overrides,
  }
}

const totals: BadgeTotals = {
  alphabet: 28,
  numbers: 11,
  harakat: 10,
  words: 45,
  tajwid: 8,
  ablutionSteps: 12,
  prayerSteps: 20,
  vocab: 80,
  names: 99,
  prophets: 26,
  adhkar: 13,
  knowledge: 31,
}

function badge(id: string) {
  const b = badgeDefinitions.find((d) => d.id === id)
  if (!b) throw new Error(`Badge inconnu : ${id}`)
  return b
}

describe('badgeDefinitions', () => {
  it('"first-steps" se débloque dès la première lettre maîtrisée', () => {
    expect(badge('first-steps').unlocked(emptyProgress(), totals)).toBe(false)
    expect(badge('first-steps').unlocked(emptyProgress({ masteredLetters: ['alif'] }), totals)).toBe(true)
  })

  it('"alphabet-master" nécessite les 28 lettres, pas moins', () => {
    const almost = emptyProgress({ masteredLetters: Array.from({ length: 27 }, (_, i) => `l${i}`) })
    expect(badge('alphabet-master').unlocked(almost, totals)).toBe(false)
    const all = emptyProgress({ masteredLetters: Array.from({ length: 28 }, (_, i) => `l${i}`) })
    expect(badge('alphabet-master').unlocked(all, totals)).toBe(true)
  })

  it('"names-master" nécessite les 99 noms', () => {
    const almost = emptyProgress({ masteredNames: Array.from({ length: 98 }, (_, i) => `n${i}`) })
    expect(badge('names-master').unlocked(almost, totals)).toBe(false)
    const all = emptyProgress({ masteredNames: Array.from({ length: 99 }, (_, i) => `n${i}`) })
    expect(badge('names-master').unlocked(all, totals)).toBe(true)
  })

  it('"purification" combine wudû et tayammum', () => {
    const half = emptyProgress({ wuduStepsSeen: Array.from({ length: 6 }, (_, i) => `w${i}`) })
    expect(badge('purification').unlocked(half, totals)).toBe(false)
    const full = emptyProgress({
      wuduStepsSeen: Array.from({ length: 6 }, (_, i) => `w${i}`),
      tayammumStepsSeen: Array.from({ length: 6 }, (_, i) => `t${i}`),
    })
    expect(badge('purification').unlocked(full, totals)).toBe(true)
  })

  it('"knowledge-master" combine les 4 sous-catégories de Connaissances', () => {
    const partial = emptyProgress({
      pillarsIslamSeen: ['p1', 'p2', 'p3', 'p4', 'p5'],
      pillarsFaithSeen: ['f1', 'f2', 'f3', 'f4', 'f5', 'f6'],
      akhlaqSeen: Array.from({ length: 8 }, (_, i) => `a${i}`),
      hijriMonthsSeen: Array.from({ length: 11 }, (_, i) => `h${i}`), // 30 sur 31 requis
    })
    expect(badge('knowledge-master').unlocked(partial, totals)).toBe(false)
    const full = emptyProgress({
      pillarsIslamSeen: ['p1', 'p2', 'p3', 'p4', 'p5'],
      pillarsFaithSeen: ['f1', 'f2', 'f3', 'f4', 'f5', 'f6'],
      akhlaqSeen: Array.from({ length: 8 }, (_, i) => `a${i}`),
      hijriMonthsSeen: Array.from({ length: 12 }, (_, i) => `h${i}`),
    })
    expect(badge('knowledge-master').unlocked(full, totals)).toBe(true)
  })

  it('"streak-7" et "streak-30" se basent sur la série de jours', () => {
    expect(badge('streak-7').unlocked(emptyProgress({ streak: 6 }), totals)).toBe(false)
    expect(badge('streak-7').unlocked(emptyProgress({ streak: 7 }), totals)).toBe(true)
    expect(badge('streak-30').unlocked(emptyProgress({ streak: 29 }), totals)).toBe(false)
    expect(badge('streak-30').unlocked(emptyProgress({ streak: 30 }), totals)).toBe(true)
  })

  it('"hafiz-en-herbe" nécessite 10 versets mémorisés', () => {
    const nine = emptyProgress({ memorizedVerses: Array.from({ length: 9 }, (_, i) => ({ key: `v${i}` })) })
    expect(badge('hafiz-en-herbe').unlocked(nine, totals)).toBe(false)
    const ten = emptyProgress({ memorizedVerses: Array.from({ length: 10 }, (_, i) => ({ key: `v${i}` })) })
    expect(badge('hafiz-en-herbe').unlocked(ten, totals)).toBe(true)
  })

  it("chaque badge a un id unique", () => {
    const ids = badgeDefinitions.map((b) => b.id)
    expect(new Set(ids).size).toBe(ids.length)
  })
})
