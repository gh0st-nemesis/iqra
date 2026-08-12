// Client léger pour l'API publique et gratuite alquran.cloud (aucune clé requise).
// Doc : https://alquran.cloud/api
// Texte : édition "quran-uthmani" (graphie coranique avec tashkîl complet)
// Phonétique : édition "en.transliteration" (translittération latine, une ayah = un texte)
// Audio : édition "ar.alafasy" (récitation de Mishary Alafasy, une ayah = un fichier mp3)

const BASE_URL = 'https://api.alquran.cloud/v1'

export interface SurahMeta {
  number: number
  name: string // nom en arabe
  // Noms hérités tels quels du schéma de l'API alquran.cloud (d'où le préfixe "english", trompeur :
  // aucun des deux n'est une traduction en français). À afficher en priorité dans l'UI, car c'est la
  // forme la plus reconnaissable pour qui ne lit pas l'arabe : translittération phonétique latine du
  // nom (ex. "Al-Faatiha", "Al-Haaqqa").
  englishName: string
  // Traduction du *sens* du nom, en anglais (ex. "The Opening", "The Reality") — à n'afficher qu'en
  // complément, jamais à la place de `englishName`.
  englishNameTranslation: string
  numberOfAyahs: number
  revelationType: 'Meccan' | 'Medinan'
}

export interface Verse {
  numberInSurah: number
  text: string
  transliteration: string | null
  audioUrl: string | null
}

export interface SurahDetail extends SurahMeta {
  verses: Verse[]
}

// Juz Amma (30e et dernier juz') : idéal pour débuter, sourates courtes.
export const JUZ_AMMA_RANGE = { from: 78, to: 114 }

// Nombre total de versets du Coran (décompte standard, riwayah Hafs).
export const TOTAL_QURAN_VERSES = 6236

// Téléchargement du mp3 complet d'une sourate (récitation de Mishary Alafasy). On passe par notre
// propre route /api/surah-audio (voir api/surah-audio.js) plutôt que par un lien direct vers le CDN
// cdn.islamic.network : ce CDN ne renvoie ni en-tête CORS ni Content-Disposition, donc un lien direct
// ne peut pas être forcé en téléchargement par le navigateur (il s'ouvrirait/jouerait au lieu de se
// sauvegarder). Notre route relaie le fichier depuis notre propre domaine avec les bons en-têtes.
// Attention : ce fichier peut être volumineux pour les longues sourates (jusqu'à environ 120 Mo pour
// Al-Baqara) — seul le débit 128 kbps est disponible à ce niveau (pas de 64/32 kbps comme pour les
// versets individuels).
export function getSurahAudioDownloadUrl(surahNumber: number): string {
  return `/api/surah-audio?number=${surahNumber}`
}

async function getJson<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`)
  if (!res.ok) throw new Error(`Erreur API Coran (${res.status})`)
  const json = await res.json()
  if (json.code !== 200) throw new Error(json.status ?? 'Erreur API Coran')
  return json.data as T
}

export async function fetchSurahList(): Promise<SurahMeta[]> {
  return getJson<SurahMeta[]>('/surah')
}

export async function fetchSurahDetail(number: number): Promise<SurahDetail> {
  const data = await getJson<
    [
      { number: number; name: string; englishName: string; englishNameTranslation: string; revelationType: 'Meccan' | 'Medinan'; ayahs: { numberInSurah: number; text: string }[] },
      { ayahs: { numberInSurah: number; text: string }[] },
      { ayahs: { numberInSurah: number; audio: string }[] },
    ]
  >(`/surah/${number}/editions/quran-uthmani,en.transliteration,ar.alafasy`)

  const [textEdition, transliterationEdition, audioEdition] = data
  const audioByNumber = new Map(audioEdition.ayahs.map((a) => [a.numberInSurah, a.audio]))
  const transliterationByNumber = new Map(transliterationEdition.ayahs.map((a) => [a.numberInSurah, a.text]))

  return {
    number: textEdition.number,
    name: textEdition.name,
    englishName: textEdition.englishName,
    englishNameTranslation: textEdition.englishNameTranslation,
    numberOfAyahs: textEdition.ayahs.length,
    revelationType: textEdition.revelationType,
    verses: textEdition.ayahs.map((a) => ({
      numberInSurah: a.numberInSurah,
      text: a.text,
      transliteration: transliterationByNumber.get(a.numberInSurah) ?? null,
      audioUrl: audioByNumber.get(a.numberInSurah) ?? null,
    })),
  }
}
