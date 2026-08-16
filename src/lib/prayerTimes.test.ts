import { describe, expect, it } from 'vitest'
import { getNextPrayer, type PrayerTimings } from './prayerTimes'

const timings: PrayerTimings = {
  Fajr: '05:30',
  Sunrise: '07:00',
  Dhuhr: '13:15',
  Asr: '16:45',
  Maghrib: '19:50',
  Isha: '21:15',
}

describe('getNextPrayer', () => {
  it('trouve la prochaine prière dans la journée', () => {
    const next = getNextPrayer(timings, new Date('2024-01-01T14:00:00'))
    expect(next?.key).toBe('Asr')
    expect(next?.minutesUntil).toBe(165)
  })

  it('ignore le lever du soleil (pas une prière obligatoire)', () => {
    const next = getNextPrayer(timings, new Date('2024-01-01T06:00:00'))
    expect(next?.key).toBe('Dhuhr')
  })

  it("renvoie null une fois Isha passée", () => {
    const next = getNextPrayer(timings, new Date('2024-01-01T22:00:00'))
    expect(next).toBeNull()
  })

  it('renvoie Fajr avant l\'aube', () => {
    const next = getNextPrayer(timings, new Date('2024-01-01T02:00:00'))
    expect(next?.key).toBe('Fajr')
  })
})
