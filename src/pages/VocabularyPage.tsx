import { useMemo, useState } from 'react'
import { vocabCategories, vocabWords } from '../data/vocabulary'
import type { VocabCategory } from '../types'
import { useProgress } from '../store/progress'
import AudioButton from '../components/AudioButton'
import McqQuiz, { type McqQuestion } from '../components/McqQuiz'
import { buildChoices, pickRandom } from '../lib/quiz'
import { usePageTitle } from '../lib/usePageTitle'
import { LayersIcon, StarIcon, TrophyIcon } from '../components/icons'

type Tab = 'learn' | 'quiz'
type CategoryFilter = 'all' | VocabCategory

export default function VocabularyPage() {
  usePageTitle('Vocabulaire')
  const [tab, setTab] = useState<Tab>('learn')
  const [filter, setFilter] = useState<CategoryFilter>('all')
  const masteredVocab = useProgress((s) => s.masteredVocab)
  const markVocabMastered = useProgress((s) => s.markVocabMastered)
  const markVocabWeak = useProgress((s) => s.markVocabWeak)

  const visibleWords = useMemo(
    () => (filter === 'all' ? vocabWords : vocabWords.filter((w) => w.category === filter)),
    [filter],
  )

  const masteredCount = useMemo(
    () => vocabWords.filter((w) => masteredVocab.includes(w.id)).length,
    [masteredVocab],
  )

  const [quizQuestions] = useState<McqQuestion[]>(() =>
    pickRandom(vocabWords, 10).map((w) => ({
      id: w.id,
      prompt: w.arabic,
      promptIsArabic: true,
      choices: buildChoices(
        w.meaning,
        vocabWords.map((x) => x.meaning),
      ),
      correctChoice: w.meaning,
    })),
  )
  const [quizResult, setQuizResult] = useState<{ score: number; total: number } | null>(null)
  const [quizKey, setQuizKey] = useState(0)

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-bold text-brand-800 dark:text-slate-100">
            <LayersIcon className="h-6 w-6 text-brand-600 dark:text-slate-300" /> Vocabulaire
          </h1>
          <p className="text-sm text-brand-500 dark:text-slate-400">
            {masteredCount} / {vocabWords.length} mots maîtrisés
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
          <div className="mb-6 flex flex-wrap gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${
                filter === 'all'
                  ? 'bg-brand-600 text-white'
                  : 'bg-brand-100 text-brand-700 hover:bg-brand-200 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600'
              }`}
            >
              Tout
            </button>
            {vocabCategories.map((c) => (
              <button
                key={c.id}
                onClick={() => setFilter(c.id)}
                className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${
                  filter === c.id
                    ? 'bg-brand-600 text-white'
                    : 'bg-brand-100 text-brand-700 hover:bg-brand-200 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {visibleWords.map((w) => {
              const isMastered = masteredVocab.includes(w.id)
              return (
                <div
                  key={w.id}
                  className="flex flex-col rounded-2xl border border-brand-100 dark:border-slate-700 bg-white dark:bg-slate-800 p-4 shadow-sm"
                >
                  <div className="mb-2 flex items-start justify-between gap-2">
                    <div>
                      <p className="font-arabic text-2xl text-brand-800 dark:text-slate-100">{w.arabic}</p>
                      <p className="text-sm text-brand-500 dark:text-slate-400">{w.transliteration}</p>
                    </div>
                    <AudioButton text={w.arabic} size="sm" />
                  </div>
                  <p className="mb-1 flex-1 text-sm text-brand-700 dark:text-slate-300">{w.meaning}</p>
                  {w.note && <p className="mb-2 text-xs text-brand-400 dark:text-slate-500">{w.note}</p>}
                  <button
                    onClick={() => markVocabMastered(w.id)}
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
              onCorrectAnswer={(id) => markVocabMastered(id)}
              onWrongAnswer={(id) => markVocabWeak(id)}
            />
          )}
        </div>
      )}
    </div>
  )
}
