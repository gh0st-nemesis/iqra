import { describe, expect, it } from 'vitest'
import { buildChoices, pickRandom, shuffle } from './quiz'

describe('shuffle', () => {
  it('conserve tous les éléments (même multiset)', () => {
    const input = [1, 2, 3, 4, 5]
    const result = shuffle(input)
    expect(result).toHaveLength(input.length)
    expect([...result].sort()).toEqual([...input].sort())
  })

  it("ne modifie pas le tableau d'origine", () => {
    const input = [1, 2, 3]
    shuffle(input)
    expect(input).toEqual([1, 2, 3])
  })

  it('retourne un tableau vide pour une entrée vide', () => {
    expect(shuffle([])).toEqual([])
  })
})

describe('pickRandom', () => {
  it('retourne n éléments distincts pris dans le tableau', () => {
    const input = ['a', 'b', 'c', 'd', 'e']
    const result = pickRandom(input, 3)
    expect(result).toHaveLength(3)
    for (const item of result) expect(input).toContain(item)
    expect(new Set(result).size).toBe(3)
  })

  it('plafonne à la taille du tableau si n la dépasse', () => {
    const input = ['a', 'b']
    expect(pickRandom(input, 5)).toHaveLength(2)
  })
})

describe('buildChoices', () => {
  it('inclut toujours la bonne réponse', () => {
    const choices = buildChoices('b', ['a', 'b', 'c', 'd', 'e'])
    expect(choices).toContain('b')
  })

  it('retourne `count` choix uniques par défaut (4)', () => {
    const choices = buildChoices('b', ['a', 'b', 'c', 'd', 'e', 'f'])
    expect(choices).toHaveLength(4)
    expect(new Set(choices).size).toBe(4)
  })

  it('respecte un `count` personnalisé', () => {
    const choices = buildChoices('b', ['a', 'b', 'c', 'd', 'e', 'f'], 3)
    expect(choices).toHaveLength(3)
  })

  it("plafonne le nombre de leurres si le pool n'en a pas assez", () => {
    const choices = buildChoices('b', ['a', 'b'], 4)
    // seul 'a' est disponible comme leurre en plus de la bonne réponse
    expect(choices).toHaveLength(2)
    expect(choices).toContain('a')
    expect(choices).toContain('b')
  })

  it('ne duplique jamais la bonne réponse parmi les leurres', () => {
    const choices = buildChoices('b', ['b', 'b', 'b', 'a', 'c'], 4)
    expect(choices.filter((c) => c === 'b')).toHaveLength(1)
  })
})
