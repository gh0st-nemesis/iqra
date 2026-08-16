import { describe, expect, it } from 'vitest'
import { dayOfYear, getDailyRecommendation, type ModuleProgress } from './dailyPath'
import type { ModuleMeta } from '../types'

function fakeModule(id: string, track: 'arabic' | 'islam'): ModuleMeta {
  return {
    id: id as ModuleMeta['id'],
    title: id,
    arabicTitle: id,
    description: id,
    icon: 'letters',
    color: '',
    path: `/${id}`,
    track,
  }
}

const modules: ModuleMeta[] = [
  fakeModule('alphabet', 'arabic'),
  fakeModule('numbers', 'arabic'),
  fakeModule('ablutions', 'islam'),
  fakeModule('salat', 'islam'),
]

function progress(overrides: Record<string, ModuleProgress>): Record<string, ModuleProgress> {
  return {
    alphabet: { value: 0, max: 10 },
    numbers: { value: 0, max: 10 },
    ablutions: { value: 0, max: 5 },
    salat: { value: 0, max: 5 },
    ...overrides,
  }
}

describe('getDailyRecommendation', () => {
  it('alterne entre les deux parcours selon la parité du jour', () => {
    const p = progress({})
    expect(getDailyRecommendation(modules, p, 0)?.reason).toBe('arabic')
    expect(getDailyRecommendation(modules, p, 1)?.reason).toBe('islam')
  })

  it('recommande le premier module non terminé de son parcours', () => {
    const p = progress({ alphabet: { value: 10, max: 10 } })
    const rec = getDailyRecommendation(modules, p, 0)
    expect(rec?.module.id).toBe('numbers')
  })

  it("bascule sur l'autre parcours si le sien est entièrement terminé", () => {
    const p = progress({ alphabet: { value: 10, max: 10 }, numbers: { value: 10, max: 10 } })
    expect(getDailyRecommendation(modules, p, 0)?.reason).toBe('islam')
  })

  it('renvoie null si les deux parcours sont entièrement terminés', () => {
    const p = progress({
      alphabet: { value: 10, max: 10 },
      numbers: { value: 10, max: 10 },
      ablutions: { value: 5, max: 5 },
      salat: { value: 5, max: 5 },
    })
    expect(getDailyRecommendation(modules, p, 0)).toBeNull()
  })
})

describe('dayOfYear', () => {
  it('vaut 1 le 1er janvier', () => {
    expect(dayOfYear(new Date(2024, 0, 1))).toBe(1)
  })

  it('vaut 32 le 1er février (année non bissextile)', () => {
    expect(dayOfYear(new Date(2023, 1, 1))).toBe(32)
  })
})
