import { describe, expect, it } from 'vitest'
import { numbers, NUMBER_GROUPS } from './numbers'

describe('numbers', () => {
  it('couvre 0 à 100 : unités, 11-19, dizaines rondes et 100 (29 entrées)', () => {
    expect(numbers).toHaveLength(29)
    expect(numbers.map((n) => n.value)).toEqual(
      expect.arrayContaining([0, 1, 5, 10, 11, 15, 19, 20, 50, 90, 100]),
    )
  })

  it('a des ids et des valeurs uniques', () => {
    expect(new Set(numbers.map((n) => n.id)).size).toBe(numbers.length)
    expect(new Set(numbers.map((n) => n.value)).size).toBe(numbers.length)
  })

  it("n'utilise que des chiffres indo-arabes dans `digit`", () => {
    for (const n of numbers) {
      expect(n.digit).toMatch(/^[٠-٩]+$/)
    }
  })

  it('couvre chaque groupe défini par NUMBER_GROUPS sans trou ni chevauchement', () => {
    const covered = new Set<number>()
    for (const group of NUMBER_GROUPS) {
      const inGroup = numbers.filter((n) => n.value >= group.from && n.value <= group.to)
      expect(inGroup.length).toBeGreaterThan(0)
      for (const n of inGroup) covered.add(n.value)
    }
    expect(covered.size).toBe(numbers.length)
  })
})
