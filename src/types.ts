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
  image: RealPhoto
}

export type ModuleId = 'alphabet' | 'numbers' | 'harakat' | 'reading' | 'tajwid' | 'quran' | 'ablutions' | 'salat'

export type ModuleIconName = 'letters' | 'hash' | 'pen' | 'book' | 'music' | 'landmark' | 'droplet' | 'prayer'

export interface ModuleMeta {
  id: ModuleId
  title: string
  arabicTitle: string
  description: string
  icon: ModuleIconName
  color: string
  path: string
}
