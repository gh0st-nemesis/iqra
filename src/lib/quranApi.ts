// Client léger pour l'API publique et gratuite alquran.cloud (aucune clé requise).
// Doc : https://alquran.cloud/api
// Texte : édition "quran-uthmani" (graphie coranique avec tashkîl complet)
// Phonétique : édition "en.transliteration" (translittération latine, une ayah = un texte)
// Audio : édition "ar.alafasy" (récitation de Mishary Alafasy, une ayah = un fichier mp3)

const BASE_URL = 'https://api.alquran.cloud/v1'

export interface SurahMeta {
  number: number
  name: string // nom en arabe
  englishName: string
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

// Fichier mp3 unique pour la sourate entière (récitation de Mishary Alafasy), servi par le même CDN
// que les fichiers audio par verset (cdn.islamic.network, derrière alquran.cloud). Seul le débit
// 128 kbps est disponible à ce niveau (par sourate) — pas de 64/32 kbps comme pour les versets
// individuels. Attention : ce fichier peut être volumineux pour les longues sourates (plusieurs
// dizaines de Mo, jusqu'à environ 120 Mo pour Al-Baqara). Le CDN ne renvoie pas d'en-tête CORS, donc
// ce lien ne peut pas être récupéré en `fetch()` pour forcer un téléchargement local : on ouvre un
// lien direct (voir SurahPage) que le navigateur télécharge ou ouvre selon ses réglages.
export function getSurahAudioDownloadUrl(surahNumber: number): string {
  return `https://cdn.islamic.network/quran/audio-surah/128/ar.alafasy/${surahNumber}.mp3`
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
