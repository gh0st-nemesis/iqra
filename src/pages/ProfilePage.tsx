import { useState } from 'react'
import { alphabet } from '../data/alphabet'
import { numbers } from '../data/numbers'
import { harakat } from '../data/harakat'
import { readingWords } from '../data/reading'
import { tajwidRules } from '../data/tajwid'
import { wuduSteps, tayammumSteps } from '../data/ablutions'
import { prayerSteps } from '../data/salat'
import { useProgress } from '../store/progress'
import { useTheme } from '../store/theme'
import {
  AlertTriangleIcon,
  FlameIcon,
  MoonIcon,
  SettingsIcon,
  StarIcon,
  SunIcon,
  TrophyIcon,
} from '../components/icons'
import ProgressBar from '../components/ProgressBar'

export default function ProfilePage() {
  const xp = useProgress((s) => s.xp)
  const streak = useProgress((s) => s.streak)
  const masteredLetters = useProgress((s) => s.masteredLetters)
  const masteredNumbers = useProgress((s) => s.masteredNumbers)
  const learnedHarakat = useProgress((s) => s.learnedHarakat)
  const wordsRead = useProgress((s) => s.wordsRead)
  const tajwidRulesSeen = useProgress((s) => s.tajwidRulesSeen)
  const versesListened = useProgress((s) => s.quranVersesListened)
  const memorizedVerses = useProgress((s) => s.memorizedVerses)
  const wuduStepsSeen = useProgress((s) => s.wuduStepsSeen)
  const tayammumStepsSeen = useProgress((s) => s.tayammumStepsSeen)
  const prayerStepsSeen = useProgress((s) => s.prayerStepsSeen)
  const resetProgress = useProgress((s) => s.resetProgress)

  const theme = useTheme((s) => s.theme)
  const setTheme = useTheme((s) => s.setTheme)

  const [confirmingReset, setConfirmingReset] = useState(false)

  const stats = [
    { label: 'Lettres maîtrisées', value: masteredLetters.length, max: alphabet.length },
    { label: 'Chiffres maîtrisés', value: masteredNumbers.length, max: numbers.length },
    { label: 'Harakat vues', value: learnedHarakat.length, max: harakat.length },
    { label: 'Mots pratiqués', value: wordsRead.length, max: readingWords.length },
    {
      label: 'Étapes des ablutions vues',
      value: wuduStepsSeen.length + tayammumStepsSeen.length,
      max: wuduSteps.length + tayammumSteps.length,
    },
    { label: 'Étapes de la salat vues', value: prayerStepsSeen.length, max: prayerSteps.length },
    { label: 'Règles de tajwîd vues', value: tajwidRulesSeen.length, max: tajwidRules.length },
    { label: 'Versets écoutés', value: versesListened.length, max: null },
    { label: 'Versets mémorisés', value: memorizedVerses.length, max: null },
  ]

  function handleResetClick() {
    if (!confirmingReset) {
      setConfirmingReset(true)
      return
    }
    resetProgress()
    setConfirmingReset(false)
  }

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-6 flex items-center gap-2 text-2xl font-bold text-brand-800 dark:text-slate-100">
        <SettingsIcon className="h-6 w-6 text-brand-600 dark:text-brand-400" /> Profil &amp; réglages
      </h1>

      <section className="mb-6 grid grid-cols-2 gap-4">
        <div className="rounded-2xl border border-brand-100 bg-white p-5 text-center shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <StarIcon className="mx-auto mb-1 h-6 w-6 text-brand-500 dark:text-brand-400" />
          <p className="text-2xl font-extrabold text-brand-800 dark:text-slate-100">{xp}</p>
          <p className="text-xs text-brand-500 dark:text-slate-400">XP au total</p>
        </div>
        <div className="rounded-2xl border border-brand-100 bg-white p-5 text-center shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <FlameIcon className="mx-auto mb-1 h-6 w-6 text-sand-500 dark:text-amber-400" />
          <p className="text-2xl font-extrabold text-brand-800 dark:text-slate-100">{streak}</p>
          <p className="text-xs text-brand-500 dark:text-slate-400">jours de suite</p>
        </div>
      </section>

      <section className="mb-6 rounded-2xl border border-brand-100 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800">
        <h2 className="mb-4 flex items-center gap-1.5 text-sm font-bold uppercase tracking-wide text-brand-500 dark:text-slate-400">
          <TrophyIcon className="h-4 w-4" /> Ma progression
        </h2>
        <div className="space-y-4">
          {stats.map((s) => (
            <div key={s.label}>
              {s.max === null ? (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-brand-600 dark:text-slate-300">{s.label}</span>
                  <span className="font-semibold text-brand-800 dark:text-slate-100">{s.value}</span>
                </div>
              ) : (
                <ProgressBar value={s.value} max={s.max} label={`${s.label} — ${s.value}/${s.max}`} />
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="mb-6 rounded-2xl border border-brand-100 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800">
        <h2 className="mb-4 text-sm font-bold uppercase tracking-wide text-brand-500 dark:text-slate-400">
          Apparence
        </h2>
        <div className="flex gap-2 rounded-full bg-brand-100 p-1 dark:bg-slate-700">
          <button
            onClick={() => setTheme('light')}
            className={`flex flex-1 items-center justify-center gap-1.5 rounded-full py-2 text-sm font-semibold transition ${
              theme === 'light' ? 'bg-white text-brand-700 shadow-sm' : 'text-brand-500 dark:text-slate-300'
            }`}
          >
            <SunIcon className="h-4 w-4" /> Clair
          </button>
          <button
            onClick={() => setTheme('dark')}
            className={`flex flex-1 items-center justify-center gap-1.5 rounded-full py-2 text-sm font-semibold transition ${
              theme === 'dark' ? 'bg-slate-800 text-slate-100 shadow-sm' : 'text-brand-500 dark:text-slate-300'
            }`}
          >
            <MoonIcon className="h-4 w-4" /> Sombre
          </button>
        </div>
      </section>

      <section className="rounded-2xl border border-red-200 bg-red-50 p-5 dark:border-red-900/50 dark:bg-red-950/30">
        <h2 className="mb-2 flex items-center gap-1.5 text-sm font-bold uppercase tracking-wide text-red-700 dark:text-red-400">
          <AlertTriangleIcon className="h-4 w-4" /> Zone dangereuse
        </h2>
        <p className="mb-4 text-sm text-red-600 dark:text-red-300">
          Repartir de zéro effacera tout ton XP, ta série de jours et toute ta progression dans chaque module. Cette
          action est irréversible.
        </p>
        {confirmingReset ? (
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-sm font-semibold text-red-700 dark:text-red-300">Confirmer la réinitialisation ?</p>
            <button
              onClick={handleResetClick}
              className="rounded-full bg-red-600 px-4 py-1.5 text-sm font-semibold text-white transition hover:bg-red-700"
            >
              Oui, tout effacer
            </button>
            <button
              onClick={() => setConfirmingReset(false)}
              className="rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-red-600 transition hover:bg-red-100 dark:bg-slate-800 dark:hover:bg-slate-700"
            >
              Annuler
            </button>
          </div>
        ) : (
          <button
            onClick={handleResetClick}
            className="rounded-full bg-red-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
          >
            Réinitialiser ma progression
          </button>
        )}
      </section>
    </div>
  )
}
