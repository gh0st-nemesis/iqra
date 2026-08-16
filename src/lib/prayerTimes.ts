// Client léger pour l'API publique et gratuite api.aladhan.com (aucune clé requise), du même
// fournisseur (islamic.network) que alquran.cloud déjà utilisé par le module Coran.
// Doc : https://aladhan.com/prayer-times-api
// Méthode de calcul 3 = Muslim World League, un choix par défaut courant et largement reconnu.

const BASE_URL = 'https://api.aladhan.com/v1'
const DEFAULT_METHOD = 3

export interface PrayerTimings {
  Fajr: string
  Sunrise: string
  Dhuhr: string
  Asr: string
  Maghrib: string
  Isha: string
}

// L'API renvoie parfois un fuseau horaire entre parenthèses ("04:32 (CEST)") : on ne garde que
// l'heure, affichée telle quelle (déjà dans le fuseau local du point donné).
function cleanTime(raw: string): string {
  return raw.split(' ')[0]
}

export async function fetchPrayerTimes(lat: number, lon: number, date: Date = new Date()): Promise<PrayerTimings> {
  const timestamp = Math.floor(date.getTime() / 1000)
  const url = `${BASE_URL}/timings/${timestamp}?latitude=${lat}&longitude=${lon}&method=${DEFAULT_METHOD}`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Erreur API horaires de prière (${res.status})`)
  const json = await res.json()
  if (json.code !== 200) throw new Error(json.status ?? 'Erreur API horaires de prière')
  const t = json.data.timings as Record<string, string>
  return {
    Fajr: cleanTime(t.Fajr),
    Sunrise: cleanTime(t.Sunrise),
    Dhuhr: cleanTime(t.Dhuhr),
    Asr: cleanTime(t.Asr),
    Maghrib: cleanTime(t.Maghrib),
    Isha: cleanTime(t.Isha),
  }
}

export const PRAYER_LABELS: { key: keyof PrayerTimings; label: string; arabicLabel: string }[] = [
  { key: 'Fajr', label: 'Fajr', arabicLabel: 'الفجر' },
  { key: 'Sunrise', label: 'Lever du soleil', arabicLabel: 'الشروق' },
  { key: 'Dhuhr', label: 'Dhuhr', arabicLabel: 'الظهر' },
  { key: 'Asr', label: 'Asr', arabicLabel: 'العصر' },
  { key: 'Maghrib', label: 'Maghrib', arabicLabel: 'المغرب' },
  { key: 'Isha', label: 'Isha', arabicLabel: 'العشاء' },
]

// Les 5 prières obligatoires (sans le lever du soleil, qui n'en est pas une) : utile pour savoir
// laquelle est la "prochaine" à un instant donné.
export const OBLIGATORY_PRAYERS: (keyof PrayerTimings)[] = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha']

/**
 * Détermine la prochaine prière obligatoire à partir de l'heure actuelle et des horaires du jour
 * (chaînes "HH:mm"). Renvoie `null` si toutes les prières du jour sont déjà passées (Isha comprise).
 */
export function getNextPrayer(timings: PrayerTimings, now: Date = new Date()): { key: keyof PrayerTimings; label: string; minutesUntil: number } | null {
  const nowMinutes = now.getHours() * 60 + now.getMinutes()
  for (const key of OBLIGATORY_PRAYERS) {
    const [h, m] = timings[key].split(':').map(Number)
    const prayerMinutes = h * 60 + m
    if (prayerMinutes > nowMinutes) {
      const meta = PRAYER_LABELS.find((p) => p.key === key)!
      return { key, label: meta.label, minutesUntil: prayerMinutes - nowMinutes }
    }
  }
  return null
}
