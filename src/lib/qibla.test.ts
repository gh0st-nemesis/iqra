import { describe, expect, it } from 'vitest'
import { bearingToCompassLabel, distanceToKaabaKm, qiblaBearing } from './qibla'

describe('qiblaBearing', () => {
  it('pointe vers l\'est-sud-est depuis Paris (~119°, valeur de référence usuelle)', () => {
    const bearing = qiblaBearing(48.8566, 2.3522)
    expect(bearing).toBeGreaterThan(117)
    expect(bearing).toBeLessThan(121)
  })

  it('pointe vers le nord-est depuis New York (~58°, valeur de référence usuelle)', () => {
    const bearing = qiblaBearing(40.7128, -74.006)
    expect(bearing).toBeGreaterThan(56)
    expect(bearing).toBeLessThan(60)
  })

  it('pointe vers l\'ouest-sud-ouest depuis Jakarta (~295°, valeur de référence usuelle)', () => {
    const bearing = qiblaBearing(-6.2, 106.8)
    expect(bearing).toBeGreaterThan(292)
    expect(bearing).toBeLessThan(298)
  })

  it('reste toujours dans [0, 360)', () => {
    for (const [lat, lon] of [
      [0, 0],
      [89, 179],
      [-89, -179],
      [21.4225, 39.8262],
    ]) {
      const bearing = qiblaBearing(lat, lon)
      expect(bearing).toBeGreaterThanOrEqual(0)
      expect(bearing).toBeLessThan(360)
    }
  })
})

describe('distanceToKaabaKm', () => {
  it('est proche de 0 à la Kaaba elle-même', () => {
    expect(distanceToKaabaKm(21.4225, 39.8262)).toBeLessThan(0.01)
  })

  it('vaut environ 4300-4500 km depuis Paris', () => {
    const km = distanceToKaabaKm(48.8566, 2.3522)
    expect(km).toBeGreaterThan(4200)
    expect(km).toBeLessThan(4600)
  })
})

describe('bearingToCompassLabel', () => {
  it('associe les caps cardinaux à leur label', () => {
    expect(bearingToCompassLabel(0)).toBe('N')
    expect(bearingToCompassLabel(90)).toBe('E')
    expect(bearingToCompassLabel(180)).toBe('S')
    expect(bearingToCompassLabel(270)).toBe('O')
    expect(bearingToCompassLabel(359)).toBe('N')
  })
})
