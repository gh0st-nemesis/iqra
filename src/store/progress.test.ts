import { beforeEach, describe, expect, it } from 'vitest'
import { todayISO, useProgress } from './progress'

beforeEach(() => {
  useProgress.getState().resetProgress()
})

describe('addXp', () => {
  it('incrémente le total sans plafond', () => {
    useProgress.getState().addXp(10)
    useProgress.getState().addXp(5)
    expect(useProgress.getState().xp).toBe(15)
  })
})

describe('markLetterMastered', () => {
  it('ajoute la lettre aux maîtrisées et accorde 10 XP', () => {
    useProgress.getState().markLetterMastered('alif')
    expect(useProgress.getState().masteredLetters).toContain('alif')
    expect(useProgress.getState().xp).toBe(10)
  })

  it("n'accorde l'XP qu'une seule fois pour la même lettre", () => {
    useProgress.getState().markLetterMastered('alif')
    useProgress.getState().markLetterMastered('alif')
    expect(useProgress.getState().xp).toBe(10)
    expect(useProgress.getState().masteredLetters).toEqual(['alif'])
  })

  it('retire la lettre de la liste des points faibles', () => {
    useProgress.getState().markLetterWeak('alif')
    expect(useProgress.getState().weakLetters).toContain('alif')
    useProgress.getState().markLetterMastered('alif')
    expect(useProgress.getState().weakLetters).not.toContain('alif')
  })
})

describe('markNumberMastered', () => {
  it('accorde 5 XP une seule fois', () => {
    useProgress.getState().markNumberMastered('n3')
    useProgress.getState().markNumberMastered('n3')
    expect(useProgress.getState().xp).toBe(5)
  })
})

describe('markWordMastered', () => {
  it('accorde 3 XP une seule fois et retire le mot des points faibles', () => {
    useProgress.getState().markWordWeak('w-yad')
    useProgress.getState().markWordMastered('w-yad')
    useProgress.getState().markWordMastered('w-yad')

    expect(useProgress.getState().masteredWords).toEqual(['w-yad'])
    expect(useProgress.getState().weakWords).not.toContain('w-yad')
    expect(useProgress.getState().xp).toBe(3)
  })
})

describe('markVerseMemorized', () => {
  const verse = { key: '1:1', surahNumber: 1, surahName: 'Al-Fatiha', verseNumber: 1, text: '...', audioUrl: null }

  it('ajoute le verset et accorde 15 XP', () => {
    useProgress.getState().markVerseMemorized(verse)
    expect(useProgress.getState().memorizedVerses).toHaveLength(1)
    expect(useProgress.getState().xp).toBe(15)
  })

  it('ne duplique pas un verset déjà mémorisé (même clé)', () => {
    useProgress.getState().markVerseMemorized(verse)
    useProgress.getState().markVerseMemorized({ ...verse, text: 'texte différent' })
    expect(useProgress.getState().memorizedVerses).toHaveLength(1)
    expect(useProgress.getState().xp).toBe(15)
  })

  it('unmarkVerseMemorized retire le verset (sans reprendre l’XP)', () => {
    useProgress.getState().markVerseMemorized(verse)
    useProgress.getState().unmarkVerseMemorized('1:1')
    expect(useProgress.getState().memorizedVerses).toHaveLength(0)
    expect(useProgress.getState().xp).toBe(15)
  })
})

describe('touchStreak', () => {
  function isoDaysAgo(days: number) {
    return new Date(Date.now() - days * 86400000).toISOString().slice(0, 10)
  }

  it('démarre la série à 1 le premier jour', () => {
    useProgress.getState().touchStreak()
    expect(useProgress.getState().streak).toBe(1)
    expect(useProgress.getState().lastActiveDate).toBe(todayISO())
  })

  it("ne change rien si déjà pratiqué aujourd'hui", () => {
    useProgress.getState().touchStreak()
    useProgress.getState().touchStreak()
    expect(useProgress.getState().streak).toBe(1)
  })

  it('incrémente la série pour un jour consécutif', () => {
    useProgress.setState({ lastActiveDate: isoDaysAgo(1), streak: 5 })
    useProgress.getState().touchStreak()
    expect(useProgress.getState().streak).toBe(6)
  })

  it('réinitialise la série à 1 après un jour manqué', () => {
    useProgress.setState({ lastActiveDate: isoDaysAgo(3), streak: 5 })
    useProgress.getState().touchStreak()
    expect(useProgress.getState().streak).toBe(1)
  })
})

describe('resetProgress', () => {
  it('remet tout à zéro après des mutations', () => {
    useProgress.getState().addXp(50)
    useProgress.getState().markLetterMastered('alif')
    useProgress.getState().markNameMastered('n1')
    useProgress.getState().touchStreak()

    useProgress.getState().resetProgress()

    const state = useProgress.getState()
    expect(state.xp).toBe(0)
    expect(state.masteredLetters).toEqual([])
    expect(state.masteredNames).toEqual([])
    expect(state.streak).toBe(0)
    expect(state.lastActiveDate).toBeNull()
  })
})

describe('exportProgress / importProgress', () => {
  it('exporte puis réimporte fidèlement la progression', () => {
    useProgress.getState().markLetterMastered('alif')
    useProgress.getState().markNumberMastered('n3')
    useProgress.getState().addXp(7)
    const exported = useProgress.getState().exportProgress()

    useProgress.getState().resetProgress()
    expect(useProgress.getState().masteredLetters).toEqual([])

    const ok = useProgress.getState().importProgress(exported)
    expect(ok).toBe(true)
    expect(useProgress.getState().masteredLetters).toContain('alif')
    expect(useProgress.getState().masteredNumbers).toContain('n3')
    expect(useProgress.getState().xp).toBe(10 + 5 + 7)
  })

  it('refuse un JSON invalide sans modifier l’état', () => {
    useProgress.getState().addXp(3)
    const ok = useProgress.getState().importProgress('{ not valid json')
    expect(ok).toBe(false)
    expect(useProgress.getState().xp).toBe(3)
  })

  it("refuse un JSON valide mais sans aucune clé de progression reconnue", () => {
    const ok = useProgress.getState().importProgress(JSON.stringify({ foo: 'bar' }))
    expect(ok).toBe(false)
  })
})
