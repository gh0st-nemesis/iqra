import { describe, expect, it } from 'vitest'
import { createSrsCard, isDue, scheduleNext } from './srs'

const TODAY = '2024-06-01'

describe('createSrsCard', () => {
  it('crée une carte due immédiatement', () => {
    const card = createSrsCard(TODAY)
    expect(card.due).toBe(TODAY)
    expect(card.reps).toBe(0)
    expect(card.interval).toBe(0)
  })
})

describe('scheduleNext', () => {
  it('planifie à 1 jour puis 6 jours pour les deux premières réussites', () => {
    let card = createSrsCard(TODAY)
    card = scheduleNext(card, 'good', TODAY)
    expect(card.interval).toBe(1)
    expect(card.reps).toBe(1)

    card = scheduleNext(card, 'good', '2024-06-02')
    expect(card.interval).toBe(6)
    expect(card.reps).toBe(2)
  })

  it('multiplie par le coefficient de facilité à partir de la 3e réussite', () => {
    let card = createSrsCard(TODAY)
    card = scheduleNext(card, 'good', TODAY)
    card = scheduleNext(card, 'good', '2024-06-02')
    const easeBefore = card.easeFactor
    card = scheduleNext(card, 'good', '2024-06-08')
    expect(card.interval).toBe(Math.round(6 * easeBefore))
    expect(card.reps).toBe(3)
  })

  it('remet à zéro l\'intervalle et les répétitions sur un échec ("encore")', () => {
    let card = createSrsCard(TODAY)
    card = scheduleNext(card, 'good', TODAY)
    card = scheduleNext(card, 'good', '2024-06-02')
    card = scheduleNext(card, 'again', '2024-06-08')
    expect(card.interval).toBe(1)
    expect(card.reps).toBe(0)
  })

  it('ne laisse jamais le coefficient de facilité descendre sous 1.3', () => {
    let card = createSrsCard(TODAY)
    for (let i = 0; i < 20; i++) {
      card = scheduleNext(card, 'again', TODAY)
    }
    expect(card.easeFactor).toBeGreaterThanOrEqual(1.3)
  })

  it('augmente le coefficient de facilité avec des réponses "facile"', () => {
    const base = createSrsCard(TODAY)
    const afterEasy = scheduleNext(base, 'easy', TODAY)
    expect(afterEasy.easeFactor).toBeGreaterThan(base.easeFactor)
  })
})

describe('isDue', () => {
  it('est due quand la date d\'échéance est aujourd\'hui ou passée', () => {
    expect(isDue({ interval: 1, easeFactor: 2.5, reps: 1, due: '2024-06-01' }, '2024-06-01')).toBe(true)
    expect(isDue({ interval: 1, easeFactor: 2.5, reps: 1, due: '2024-05-30' }, '2024-06-01')).toBe(true)
  })

  it("n'est pas due si l'échéance est dans le futur", () => {
    expect(isDue({ interval: 1, easeFactor: 2.5, reps: 1, due: '2024-06-05' }, '2024-06-01')).toBe(false)
  })
})
