import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { MemorizedVerse } from '../types'
import { createSrsCard, scheduleNext, type SrsCard, type SrsQuality } from '../lib/srs'

interface ProgressState {
  xp: number
  learnedLetters: string[]
  masteredLetters: string[]
  masteredNumbers: string[]
  learnedHarakat: string[]
  tajwidRulesSeen: string[]
  quranVersesListened: string[]
  memorizedVerses: MemorizedVerse[]
  wordsRead: string[]
  masteredWords: string[]
  weakWords: string[]
  readingLevelCompleted: number
  wuduStepsSeen: string[]
  tayammumStepsSeen: string[]
  prayerStepsSeen: string[]
  weakLetters: string[]
  weakNumbers: string[]
  weakHarakat: string[]
  masteredVocab: string[]
  weakVocab: string[]
  masteredNames: string[]
  weakNames: string[]
  prophetsRead: string[]
  adhkarSeen: string[]
  pillarsIslamSeen: string[]
  pillarsFaithSeen: string[]
  akhlaqSeen: string[]
  hijriMonthsSeen: string[]
  lastActiveDate: string | null
  streak: number
  // Cartes de répétition espacée (SM-2 léger, voir src/lib/srs.ts), clé "verse:<key>" ou
  // "vocab:<id>" -> planification. Créées automatiquement quand un verset est mémorisé ou un mot
  // de vocabulaire maîtrisé (voir markVerseMemorized / markVocabMastered).
  srsCards: Record<string, SrsCard>

  addXp: (amount: number) => void
  markLetterSeen: (id: string) => void
  markLetterMastered: (id: string) => void
  markNumberMastered: (id: string) => void
  markHarakaSeen: (id: string) => void
  markTajwidRuleSeen: (id: string) => void
  markVerseListened: (key: string) => void
  markVerseMemorized: (verse: MemorizedVerse) => void
  unmarkVerseMemorized: (key: string) => void
  markWordRead: (id: string) => void
  markWordMastered: (id: string) => void
  markWordWeak: (id: string) => void
  markWuduStepSeen: (id: string) => void
  markTayammumStepSeen: (id: string) => void
  markPrayerStepSeen: (id: string) => void
  markLetterWeak: (id: string) => void
  markNumberWeak: (id: string) => void
  markHarakaWeak: (id: string) => void
  clearHarakaWeak: (id: string) => void
  markVocabMastered: (id: string) => void
  markVocabWeak: (id: string) => void
  markNameMastered: (id: string) => void
  markNameWeak: (id: string) => void
  markProphetRead: (id: string) => void
  markAdhkarSeen: (id: string) => void
  markPillarIslamSeen: (id: string) => void
  markPillarFaithSeen: (id: string) => void
  markAkhlaqSeen: (id: string) => void
  markHijriMonthSeen: (id: string) => void
  setReadingLevelCompleted: (level: number) => void
  reviewSrsCard: (id: string, quality: SrsQuality) => void
  touchStreak: () => void
  resetProgress: () => void
  exportProgress: () => string
  importProgress: (json: string) => boolean
}

// Clés de données exportées/importées (tout sauf les fonctions d'action).
const DATA_KEYS = [
  'xp',
  'learnedLetters',
  'masteredLetters',
  'masteredNumbers',
  'learnedHarakat',
  'tajwidRulesSeen',
  'quranVersesListened',
  'memorizedVerses',
  'wordsRead',
  'masteredWords',
  'weakWords',
  'readingLevelCompleted',
  'wuduStepsSeen',
  'tayammumStepsSeen',
  'prayerStepsSeen',
  'weakLetters',
  'weakNumbers',
  'weakHarakat',
  'masteredVocab',
  'weakVocab',
  'masteredNames',
  'weakNames',
  'prophetsRead',
  'adhkarSeen',
  'pillarsIslamSeen',
  'pillarsFaithSeen',
  'akhlaqSeen',
  'hijriMonthsSeen',
  'lastActiveDate',
  'streak',
  'srsCards',
] as const satisfies readonly (keyof ProgressState)[]

export function todayISO() {
  return new Date().toISOString().slice(0, 10)
}

function addUnique<T>(list: T[], item: T) {
  return list.includes(item) ? list : [...list, item]
}

function removeItem<T>(list: T[], item: T) {
  return list.filter((x) => x !== item)
}

export const useProgress = create<ProgressState>()(
  persist(
    (set, get) => ({
      xp: 0,
      learnedLetters: [],
      masteredLetters: [],
      masteredNumbers: [],
      learnedHarakat: [],
      tajwidRulesSeen: [],
      quranVersesListened: [],
      memorizedVerses: [],
      wordsRead: [],
      masteredWords: [],
      weakWords: [],
      readingLevelCompleted: 0,
      wuduStepsSeen: [],
      tayammumStepsSeen: [],
      prayerStepsSeen: [],
      weakLetters: [],
      weakNumbers: [],
      weakHarakat: [],
      masteredVocab: [],
      weakVocab: [],
      masteredNames: [],
      weakNames: [],
      prophetsRead: [],
      adhkarSeen: [],
      pillarsIslamSeen: [],
      pillarsFaithSeen: [],
      akhlaqSeen: [],
      hijriMonthsSeen: [],
      lastActiveDate: null,
      streak: 0,
      srsCards: {},

      addXp: (amount) => set({ xp: get().xp + amount }),

      markLetterSeen: (id) => set({ learnedLetters: addUnique(get().learnedLetters, id) }),

      markLetterMastered: (id) => {
        const wasNew = !get().masteredLetters.includes(id)
        set({ masteredLetters: addUnique(get().masteredLetters, id), weakLetters: removeItem(get().weakLetters, id) })
        if (wasNew) get().addXp(10)
      },

      markNumberMastered: (id) => {
        const wasNew = !get().masteredNumbers.includes(id)
        set({ masteredNumbers: addUnique(get().masteredNumbers, id), weakNumbers: removeItem(get().weakNumbers, id) })
        if (wasNew) get().addXp(5)
      },

      markHarakaSeen: (id) => set({ learnedHarakat: addUnique(get().learnedHarakat, id) }),

      markTajwidRuleSeen: (id) => set({ tajwidRulesSeen: addUnique(get().tajwidRulesSeen, id) }),

      markVerseListened: (key) => {
        const wasNew = !get().quranVersesListened.includes(key)
        set({ quranVersesListened: addUnique(get().quranVersesListened, key) })
        if (wasNew) get().addXp(2)
      },

      markVerseMemorized: (verse) => {
        const exists = get().memorizedVerses.some((v) => v.key === verse.key)
        if (exists) return
        const srsId = `verse:${verse.key}`
        set({
          memorizedVerses: [...get().memorizedVerses, verse],
          srsCards: { ...get().srsCards, [srsId]: createSrsCard(todayISO()) },
        })
        get().addXp(15)
      },

      unmarkVerseMemorized: (key) => {
        const srsId = `verse:${key}`
        const restSrs = { ...get().srsCards }
        delete restSrs[srsId]
        set({ memorizedVerses: get().memorizedVerses.filter((v) => v.key !== key), srsCards: restSrs })
      },

      markWordRead: (id) => {
        const wasNew = !get().wordsRead.includes(id)
        set({ wordsRead: addUnique(get().wordsRead, id) })
        if (wasNew) get().addXp(3)
      },

      markWordMastered: (id) => {
        const wasNew = !get().masteredWords.includes(id)
        set({ masteredWords: addUnique(get().masteredWords, id), weakWords: removeItem(get().weakWords, id) })
        if (wasNew) get().addXp(3)
      },
      markWordWeak: (id) => set({ weakWords: addUnique(get().weakWords, id) }),

      markWuduStepSeen: (id) => {
        const wasNew = !get().wuduStepsSeen.includes(id)
        set({ wuduStepsSeen: addUnique(get().wuduStepsSeen, id) })
        if (wasNew) get().addXp(2)
      },

      markTayammumStepSeen: (id) => {
        const wasNew = !get().tayammumStepsSeen.includes(id)
        set({ tayammumStepsSeen: addUnique(get().tayammumStepsSeen, id) })
        if (wasNew) get().addXp(2)
      },

      markPrayerStepSeen: (id) => {
        const wasNew = !get().prayerStepsSeen.includes(id)
        set({ prayerStepsSeen: addUnique(get().prayerStepsSeen, id) })
        if (wasNew) get().addXp(2)
      },

      markLetterWeak: (id) => set({ weakLetters: addUnique(get().weakLetters, id) }),
      markNumberWeak: (id) => set({ weakNumbers: addUnique(get().weakNumbers, id) }),
      markHarakaWeak: (id) => set({ weakHarakat: addUnique(get().weakHarakat, id) }),
      clearHarakaWeak: (id) => set({ weakHarakat: removeItem(get().weakHarakat, id) }),

      markVocabMastered: (id) => {
        const wasNew = !get().masteredVocab.includes(id)
        const srsId = `vocab:${id}`
        const srsCards = get().srsCards[srsId] ? get().srsCards : { ...get().srsCards, [srsId]: createSrsCard(todayISO()) }
        set({ masteredVocab: addUnique(get().masteredVocab, id), weakVocab: removeItem(get().weakVocab, id), srsCards })
        if (wasNew) get().addXp(3)
      },
      markVocabWeak: (id) => set({ weakVocab: addUnique(get().weakVocab, id) }),

      markNameMastered: (id) => {
        const wasNew = !get().masteredNames.includes(id)
        set({ masteredNames: addUnique(get().masteredNames, id), weakNames: removeItem(get().weakNames, id) })
        if (wasNew) get().addXp(2)
      },
      markNameWeak: (id) => set({ weakNames: addUnique(get().weakNames, id) }),

      markProphetRead: (id) => {
        const wasNew = !get().prophetsRead.includes(id)
        set({ prophetsRead: addUnique(get().prophetsRead, id) })
        if (wasNew) get().addXp(5)
      },

      markAdhkarSeen: (id) => {
        const wasNew = !get().adhkarSeen.includes(id)
        set({ adhkarSeen: addUnique(get().adhkarSeen, id) })
        if (wasNew) get().addXp(2)
      },

      markPillarIslamSeen: (id) => {
        const wasNew = !get().pillarsIslamSeen.includes(id)
        set({ pillarsIslamSeen: addUnique(get().pillarsIslamSeen, id) })
        if (wasNew) get().addXp(3)
      },

      markPillarFaithSeen: (id) => {
        const wasNew = !get().pillarsFaithSeen.includes(id)
        set({ pillarsFaithSeen: addUnique(get().pillarsFaithSeen, id) })
        if (wasNew) get().addXp(3)
      },

      markAkhlaqSeen: (id) => {
        const wasNew = !get().akhlaqSeen.includes(id)
        set({ akhlaqSeen: addUnique(get().akhlaqSeen, id) })
        if (wasNew) get().addXp(3)
      },

      markHijriMonthSeen: (id) => {
        const wasNew = !get().hijriMonthsSeen.includes(id)
        set({ hijriMonthsSeen: addUnique(get().hijriMonthsSeen, id) })
        if (wasNew) get().addXp(2)
      },

      setReadingLevelCompleted: (level) =>
        set({ readingLevelCompleted: Math.max(level, get().readingLevelCompleted) }),

      reviewSrsCard: (id, quality) => {
        const card = get().srsCards[id]
        if (!card) return
        set({ srsCards: { ...get().srsCards, [id]: scheduleNext(card, quality, todayISO()) } })
      },

      touchStreak: () => {
        const today = todayISO()
        const last = get().lastActiveDate
        if (last === today) return
        const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10)
        const newStreak = last === yesterday ? get().streak + 1 : 1
        set({ lastActiveDate: today, streak: newStreak })
      },

      resetProgress: () =>
        set({
          xp: 0,
          learnedLetters: [],
          masteredLetters: [],
          masteredNumbers: [],
          learnedHarakat: [],
          tajwidRulesSeen: [],
          quranVersesListened: [],
          memorizedVerses: [],
          wordsRead: [],
          masteredWords: [],
          weakWords: [],
          readingLevelCompleted: 0,
          wuduStepsSeen: [],
          tayammumStepsSeen: [],
          prayerStepsSeen: [],
          weakLetters: [],
          weakNumbers: [],
          weakHarakat: [],
          masteredVocab: [],
          weakVocab: [],
          masteredNames: [],
          weakNames: [],
          prophetsRead: [],
          adhkarSeen: [],
          pillarsIslamSeen: [],
          pillarsFaithSeen: [],
          akhlaqSeen: [],
          hijriMonthsSeen: [],
          lastActiveDate: null,
          streak: 0,
          srsCards: {},
        }),

      exportProgress: () => {
        const state = get()
        const data = Object.fromEntries(DATA_KEYS.map((key) => [key, state[key]]))
        return JSON.stringify({ app: 'iqra', version: 1, exportedAt: new Date().toISOString(), data }, null, 2)
      },

      importProgress: (json) => {
        try {
          const parsed = JSON.parse(json)
          const data = parsed && typeof parsed === 'object' && 'data' in parsed ? parsed.data : parsed
          if (!data || typeof data !== 'object') return false
          const patch: Partial<ProgressState> = {}
          let foundAny = false
          for (const key of DATA_KEYS) {
            if (key in data) {
              patch[key] = data[key]
              foundAny = true
            }
          }
          if (!foundAny) return false
          set(patch)
          return true
        } catch {
          return false
        }
      },
    }),
    { name: 'iqra-progress' },
  ),
)
