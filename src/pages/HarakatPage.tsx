import { useEffect, useMemo, useState } from 'react'
import { harakat } from '../data/harakat'
import { useProgress } from '../store/progress'
import AudioButton from '../components/AudioButton'
import McqQuiz, { type McqQuestion } from '../components/McqQuiz'
import { buildChoices, pickRandom } from '../lib/quiz'
import { usePageTitle } from '../lib/usePageTitle'
import { PenIcon, TrophyIcon } from '../components/icons'

const categoryLabels: Record<string, string> = {
  'short-vowel': 'Les 3 voyelles courtes',
  other: 'Soukoun et Chadda',
  tanwin: 'Le Tanwîn (nunation)',
  madd: 'Les voyelles longues (Madd)',
}

export default function HarakatPage() {
  usePageTitle('Voyelles (Harakat)')
  const [tab, setTab] = useState<'learn' | 'quiz'>('learn')
  const markHarakaSeen = useProgress((s) => s.markHarakaSeen)
  const learnedHarakat = useProgress((s) => s.learnedHarakat)
  const markHarakaWeak = useProgress((s) => s.markHarakaWeak)

  useEffect(() => {
    harakat.forEach((h) => markHarakaSeen(h.id))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const groups = useMemo(() => {
    const byCategory = new Map<string, typeof harakat>()
    harakat.forEach((h) => {
      const list = byCategory.get(h.category) ?? []
      list.push(h)
      byCategory.set(h.category, list)
    })
    return byCategory
  }, [])

  const [quizQuestions] = useState<McqQuestion[]>(() =>
    pickRandom(harakat, 8).map((h) => ({
      id: h.id,
      prompt: h.demoResult,
      promptIsArabic: true,
      choices: buildChoices(
        h.demoTransliteration,
        harakat.map((x) => x.demoTransliteration),
      ),
      correctChoice: h.demoTransliteration,
    })),
  )
  const [quizResult, setQuizResult] = useState<{ score: number; total: number } | null>(null)
  const [quizKey, setQuizKey] = useState(0)

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-bold text-brand-800 dark:text-slate-100">
            <PenIcon className="h-6 w-6 text-brand-600 dark:text-slate-300" /> Les voyelles (Harakat)
          </h1>
          <p className="text-sm text-brand-500 dark:text-slate-400">
            {learnedHarakat.length} / {harakat.length} signes vus — les harakat se placent sur ou sous les
            consonnes pour indiquer la voyelle à prononcer.
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

      {tab === 'learn' &&
        Array.from(groups.entries()).map(([category, items]) => (
          <section key={category} className="mb-8">
            <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-brand-500 dark:text-slate-400">
              {categoryLabels[category] ?? category}
            </h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((h) => (
                <div key={h.id} className="rounded-2xl border border-brand-100 dark:border-slate-700 bg-white dark:bg-slate-800 p-4 shadow-sm">
                  <div className="mb-2 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-brand-800 dark:text-slate-100">{h.name}</p>
                      <p className="text-xs text-brand-400 dark:text-slate-500">« {h.soundExample} »</p>
                    </div>
                    <AudioButton text={h.demoResult} size="sm" />
                  </div>
                  <div className="mb-2 flex items-center justify-center gap-4 rounded-lg bg-sand-50 dark:bg-slate-700/50 py-3">
                    <span className="font-arabic text-4xl text-brand-700 dark:text-slate-200">{h.demoResult}</span>
                    <span className="text-brand-300 dark:text-slate-600">→</span>
                    <span className="text-lg font-semibold text-brand-600 dark:text-slate-300">{h.demoTransliteration}</span>
                  </div>
                  <p className="text-sm text-brand-600 dark:text-slate-300">{h.description}</p>
                </div>
              ))}
            </div>
          </section>
        ))}

      {tab === 'quiz' && (
        <div className="mx-auto max-w-xl">
          {quizResult ? (
            <div className="rounded-2xl border border-brand-100 dark:border-slate-700 bg-white dark:bg-slate-800 p-8 text-center shadow-sm">
              <TrophyIcon className="mx-auto mb-3 h-10 w-10 text-sand-500 dark:text-amber-400" />
              <p className="mb-1 text-xl font-bold text-brand-800 dark:text-slate-100">
                Score : {quizResult.score} / {quizResult.total}
              </p>
              <button
                onClick={() => {
                  setQuizResult(null)
                  setQuizKey((k) => k + 1)
                }}
                className="mt-4 rounded-full bg-brand-600 px-5 py-2 text-sm font-semibold text-white hover:bg-brand-700"
              >
                Recommencer
              </button>
            </div>
          ) : (
            <McqQuiz
              key={quizKey}
              questions={quizQuestions}
              onFinish={(score, total) => setQuizResult({ score, total })}
              onWrongAnswer={(id) => markHarakaWeak(id)}
            />
          )}
        </div>
      )}
    </div>
  )
}
