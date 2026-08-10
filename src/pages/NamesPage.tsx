import { useMemo, useState } from 'react'
import { namesOfAllah } from '../data/namesOfAllah'
import { useProgress } from '../store/progress'
import AudioButton from '../components/AudioButton'
import McqQuiz, { type McqQuestion } from '../components/McqQuiz'
import { buildChoices, pickRandom } from '../lib/quiz'
import { usePageTitle } from '../lib/usePageTitle'
import { InfoIcon, SearchIcon, SparkleIcon, StarIcon, TrophyIcon } from '../components/icons'

type Tab = 'learn' | 'quiz'

export default function NamesPage() {
  usePageTitle("Noms d'Allah")
  const [tab, setTab] = useState<Tab>('learn')
  const [query, setQuery] = useState('')
  const masteredNames = useProgress((s) => s.masteredNames)
  const markNameMastered = useProgress((s) => s.markNameMastered)
  const markNameWeak = useProgress((s) => s.markNameWeak)

  const masteredCount = useMemo(
    () => namesOfAllah.filter((n) => masteredNames.includes(n.id)).length,
    [masteredNames],
  )

  const visibleNames = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return namesOfAllah
    return namesOfAllah.filter(
      (n) => n.transliteration.toLowerCase().includes(q) || n.meaning.toLowerCase().includes(q) || n.arabic.includes(q),
    )
  }, [query])

  const [quizQuestions] = useState<McqQuestion[]>(() =>
    pickRandom(namesOfAllah, 10).map((n) => ({
      id: n.id,
      prompt: n.arabic,
      promptIsArabic: true,
      choices: buildChoices(
        n.meaning,
        namesOfAllah.map((x) => x.meaning),
      ),
      correctChoice: n.meaning,
    })),
  )
  const [quizResult, setQuizResult] = useState<{ score: number; total: number } | null>(null)
  const [quizKey, setQuizKey] = useState(0)

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-bold text-brand-800 dark:text-slate-100">
            <SparkleIcon className="h-6 w-6 text-brand-600 dark:text-slate-300" /> Les 99 Noms d&apos;Allah
          </h1>
          <p className="text-sm text-brand-500 dark:text-slate-400">
            {masteredCount} / {namesOfAllah.length} noms maîtrisés
          </p>
        </div>
        <div className="flex gap-2 rounded-full bg-brand-100 dark:bg-slate-700 p-1">
          <button
            onClick={() => setTab('learn')}
            className={`rounded-full px-4 py-1.5 text-sm font-semibold transition ${
              tab === 'learn' ? 'bg-white dark:bg-slate-800 text-brand-700 dark:text-slate-200 shadow-sm' : 'text-brand-500 dark:text-slate-400'
            }`}
          >
            Apprendre
          </button>
          <button
            onClick={() => setTab('quiz')}
            className={`rounded-full px-4 py-1.5 text-sm font-semibold transition ${
              tab === 'quiz' ? 'bg-white dark:bg-slate-800 text-brand-700 dark:text-slate-200 shadow-sm' : 'text-brand-500 dark:text-slate-400'
            }`}
          >
            Quiz
          </button>
        </div>
      </div>

      {tab === 'learn' && (
        <>
          <div className="mb-6 flex items-start gap-2 rounded-2xl border border-amber-100 dark:border-amber-900/50 bg-amber-50 dark:bg-amber-950/30 p-4 text-sm text-amber-700 dark:text-amber-300">
            <InfoIcon className="h-4 w-4 shrink-0 translate-y-0.5" />
            <span>
              L&apos;énumération de ces 99 noms provient d&apos;une transmission distincte de leur dénombrement dans
              le Coran et la Sunna ; on trouve d&apos;un ouvrage à l&apos;autre de légères variantes d&apos;ordre ou
              de graphie. L&apos;ordre suivi ici est le plus répandu, à des fins pédagogiques.
            </span>
          </div>

          <div className="relative mb-4">
            <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-400 dark:text-slate-500" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Rechercher un nom (translittération ou sens)…"
              className="w-full rounded-xl border border-brand-100 bg-white py-2 pl-9 pr-3 text-sm text-brand-800 outline-none transition focus:border-brand-400 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            />
          </div>

          {visibleNames.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-brand-200 bg-white p-6 text-center text-sm text-brand-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400">
              Aucun nom ne correspond à « {query} ».
            </p>
          ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {visibleNames.map((n) => {
              const isMastered = masteredNames.includes(n.id)
              return (
                <div
                  key={n.id}
                  className="flex flex-col rounded-2xl border border-brand-100 dark:border-slate-700 bg-white dark:bg-slate-800 p-4 shadow-sm"
                >
                  <div className="mb-2 flex items-start justify-between gap-2">
                    <div className="flex items-start gap-2">
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-100 dark:bg-slate-700 text-[11px] font-bold text-brand-700 dark:text-slate-200">
                        {n.number}
                      </span>
                      <div>
                        <p className="font-arabic text-2xl text-brand-800 dark:text-slate-100">{n.arabic}</p>
                        <p className="text-sm text-brand-500 dark:text-slate-400">{n.transliteration}</p>
                      </div>
                    </div>
                    <AudioButton text={n.arabic} size="sm" />
                  </div>
                  <p className="mb-2 flex-1 text-sm text-brand-700 dark:text-slate-300">{n.meaning}</p>
                  <button
                    onClick={() => markNameMastered(n.id)}
                    disabled={isMastered}
                    className="mt-2 flex items-center justify-center gap-1.5 rounded-xl bg-brand-50 py-1.5 text-xs font-semibold text-brand-600 transition hover:bg-brand-100 disabled:bg-brand-50 disabled:text-brand-400 dark:bg-slate-700/50 dark:text-slate-300 dark:hover:bg-slate-700 dark:disabled:text-slate-500"
                  >
                    <StarIcon className={`h-3.5 w-3.5 ${isMastered ? 'text-sand-500 dark:text-amber-400' : ''}`} />
                    {isMastered ? 'Maîtrisé' : 'Marquer comme maîtrisé'}
                  </button>
                </div>
              )
            })}
          </div>
          )}
        </>
      )}

      {tab === 'quiz' && (
        <div className="mx-auto max-w-xl">
          {quizResult ? (
            <div className="rounded-2xl border border-brand-100 dark:border-slate-700 bg-white dark:bg-slate-800 p-8 text-center shadow-sm">
              <TrophyIcon className="mx-auto mb-3 h-10 w-10 text-sand-500 dark:text-amber-400" />
              <p className="mb-1 text-xl font-bold text-brand-800 dark:text-slate-100">
                Score : {quizResult.score} / {quizResult.total}
              </p>
              <p className="mb-5 text-sm text-brand-500 dark:text-slate-400">Continue à réviser pour tout maîtriser !</p>
              <button
                onClick={() => {
                  setQuizResult(null)
                  setQuizKey((k) => k + 1)
                }}
                className="rounded-full bg-brand-600 px-5 py-2 text-sm font-semibold text-white hover:bg-brand-700"
              >
                Recommencer
              </button>
            </div>
          ) : (
            <McqQuiz
              key={quizKey}
              questions={quizQuestions}
              onFinish={(score, total) => setQuizResult({ score, total })}
              onCorrectAnswer={(id) => markNameMastered(id)}
              onWrongAnswer={(id) => markNameWeak(id)}
            />
          )}
        </div>
      )}
    </div>
  )
}
