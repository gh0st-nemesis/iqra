export interface ArabicLetter {
  id: string
  char: string
  name: string
  transliteration: string
  soundDescription: string
  makhraj: string
  connectsToNext: boolean
  exampleWord: string
  exampleTransliteration: string
  exampleMeaning: string
}

export interface Haraka {
  id: string
  symbol: string
  name: string
  category: 'short-vowel' | 'other' | 'tanwin' | 'madd'
  description: string
  soundExample: string
  demoLetter: string
  demoResult: string
  demoTransliteration: string
}

export interface TajwidRule {
  id: string
  group: string
  name: string
  shortName: string
  arabicName: string
  description: string
  letters?: string
  examples: { text: string; transliteration: string; note: string }[]
}

export interface SyllableExercise {
  id: string
  letter: string
  haraka: string
  result: string
  transliteration: string
}

export interface WordExercise {
  id: string
  word: string
  transliteration: string
  meaning: string
  difficulty: 1 | 2 | 3
}

export interface ArabicNumber {
  id: string
  value: number
  digit: string // chiffre indo-arabe, ex. '٣'
  word: string // mot arabe (cardinal), ex. 'ثَلَاثَةٌ'
  transliteration: string
}

export interface RitualDua {
  arabic: string
  transliteration: string
  meaning: string
}

export interface RealPhoto {
  url: string
  credit: string
  creditUrl: string
  platform: 'Pexels' | 'Unsplash'
}

export interface MemorizedVerse {
  key: string
  surahNumber: number
  surahName: string
  verseNumber: number
  text: string
  // Optionnel : absent pour les versets mémorisés avant l'ajout de la translittération phonétique.
  transliteration?: string | null
  audioUrl: string | null
}

export interface DailyPrayer {
  id: string
  name: string
  arabicName: string
  rakahCount: number
  timing: string
}

export interface AblutionStep {
  id: string
  order: number
  title: string
  instruction: string
  repeat?: number
  dua?: RitualDua
}

export type PrayerPosture = 'qiyam' | 'ruku' | 'itidal' | 'sujud' | 'julus'

export interface PrayerStep {
  id: string
  order: number
  posture: PrayerPosture
  title: string
  arabicTitle: string
  instruction: string
  duas: RitualDua[]
  repeat?: number
  linkToFatiha?: boolean
  // Sourates courtes suggérées pour la 2e lecture (après Al-Fâtiha), avec lien vers /coran/:number.
  suggestedSurahs?: { number: number; name: string; englishName: string }[]
  image: RealPhoto
}

export type ModuleId =
  | 'alphabet'
  | 'numbers'
  | 'harakat'
  | 'reading'
  | 'tajwid'
  | 'quran'
  | 'ablutions'
  | 'salat'
  | 'vocabulary'
  | 'names'
  | 'prophets'
  | 'adhkar'
  | 'knowledge'

export type ModuleIconName =
  | 'letters'
  | 'hash'
  | 'pen'
  | 'book'
  | 'music'
  | 'landmark'
  | 'droplet'
  | 'prayer'
  | 'layers'
  | 'sparkle'
  | 'scroll'
  | 'sunmoon'
  | 'compass'

// --- Vocabulaire ---

export type VocabCategory =
  | 'salutations'
  | 'famille'
  | 'maison'
  | 'couleurs'
  | 'phrases'
  | 'racines'
  | 'corps'
  | 'nourriture'
  | 'temps'
  | 'ecole'

export interface VocabWord {
  id: string
  category: VocabCategory
  arabic: string
  transliteration: string
  meaning: string
  note?: string
}

// --- Noms d'Allah ---

export interface NameOfAllah {
  id: string
  number: number
  arabic: string
  transliteration: string
  meaning: string
}

// --- Prophètes ---

export interface ProphetVocabItem {
  arabic: string
  transliteration: string
  meaning: string
}

export interface Prophet {
  id: string
  order: number
  name: string
  arabicName: string
  summary: string
  lesson: string
  vocab: ProphetVocabItem[]
}

// --- Adhkar ---

export type AdhkarCategory = 'matin' | 'soir' | 'quotidien'

export interface AdhkarItem {
  id: string
  order: number
  category: AdhkarCategory
  title: string
  dua: RitualDua
  repeat?: number
  quranRef?: { surahNumber: number; label: string }
}

// --- Connaissances (piliers, akhlaq, calendrier) ---

export interface PillarItem {
  id: string
  order: number
  title: string
  arabicTitle?: string
  description: string
}

export interface AkhlaqLesson {
  id: string
  order: number
  title: string
  description: string
}

export interface HijriMonth {
  id: string
  order: number
  arabicName: string
  transliteration: string
  note: string
}

export type ModuleTrack = 'arabic' | 'islam'

export interface ModuleMeta {
  id: ModuleId
  title: string
  arabicTitle: string
  description: string
  icon: ModuleIconName
  color: string
  path: string
  track: ModuleTrack
}
