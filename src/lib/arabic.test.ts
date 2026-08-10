import { describe, expect, it } from 'vitest'
import { arabicSimilarity, clusterArabicWord, normalizeArabic } from './arabic'

describe('clusterArabicWord', () => {
  it('garde une lettre et sa haraka ensemble', () => {
    expect(clusterArabicWord('بَ')).toEqual(['بَ'])
  })

  it('gère plusieurs diacritiques sur la même lettre (chadda + haraka)', () => {
    expect(clusterArabicWord('بَّ')).toEqual(['بَّ'])
  })

  it('segmente un mot simple lettre par lettre', () => {
    expect(clusterArabicWord('كتب')).toEqual(['ك', 'ت', 'ب'])
  })

  it('conserve les espaces comme clusters à part entière', () => {
    expect(clusterArabicWord('بِسْمِ اللَّهِ')).toContain(' ')
  })

  it('retourne un tableau vide pour une chaîne vide', () => {
    expect(clusterArabicWord('')).toEqual([])
  })
})

describe('normalizeArabic', () => {
  it('retire les harakat', () => {
    expect(normalizeArabic('بَيْتٌ')).toBe('بيت')
  })

  it('retire le tatweel', () => {
    expect(normalizeArabic('بـيت')).toBe('بيت')
  })

  it('uniformise les variantes de alif', () => {
    expect(normalizeArabic('أحمد')).toBe(normalizeArabic('احمد'))
    expect(normalizeArabic('آدم')).toBe(normalizeArabic('ادم'))
  })

  it('uniformise yā (ى) vers ي', () => {
    expect(normalizeArabic('على')).toBe(normalizeArabic('علي'))
  })

  it('uniformise tā marbūta (ة) vers ه', () => {
    expect(normalizeArabic('مكتبة')).toBe(normalizeArabic('مكتبه'))
  })

  it('réduit les espaces multiples et trim', () => {
    expect(normalizeArabic('  بيت   كبير  ')).toBe('بيت كبير')
  })
})

describe('arabicSimilarity', () => {
  it('vaut 1 pour deux textes identiques', () => {
    expect(arabicSimilarity('بيت', 'بيت')).toBe(1)
  })

  it('vaut 1 pour deux textes vides', () => {
    expect(arabicSimilarity('', '')).toBe(1)
  })

  it('ignore les différences de harakat', () => {
    expect(arabicSimilarity('بَيْتٌ', 'بيت')).toBe(1)
  })

  it('diminue avec la distance entre les mots', () => {
    const closeMatch = arabicSimilarity('كتاب', 'كتب')
    const farMatch = arabicSimilarity('كتاب', 'سيارة')
    expect(closeMatch).toBeGreaterThan(farMatch)
    expect(closeMatch).toBeLessThan(1)
  })

  it('reste dans les bornes [0, 1]', () => {
    const sim = arabicSimilarity('اقرأ', 'صلاة')
    expect(sim).toBeGreaterThanOrEqual(0)
    expect(sim).toBeLessThanOrEqual(1)
  })
})
