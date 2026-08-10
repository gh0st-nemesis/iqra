import { useMemo, useState } from 'react'
import { numbers } from '../data/numbers'
import { useProgress } from '../store/progress'
import AudioButton from '../components/AudioButton'
import McqQuiz, { type McqQuestion } from '../components/McqQuiz'
import { buildChoices, pickRandom } from '../lib/quiz'
import { HashIcon, InfoIcon, StarIcon, TrophyIcon } from '../components/icons'

type Tab = 'learn' | 'quiz'

export default function NumbersPage() {
  const [tab, setTab] = useState<Tab>('learn')
  const [selectedId, setSelectedId] = useState(numbers[0].id)
  const masteredNumbers = useProgress((s) => s.masteredNumbers)
  const markNumberMastered = useProgress((s) => s.markNumberMastered)
  const markNumberWeak = useProgress((s) => s.markNumberWeak)

  const selected = numbers.find((n) => n.id === selectedId)!

  const [quizQuestions] = useState<McqQuestion[]>(() =>
    pickRandom(numbers, 8).map((n) => ({
      id: n.id,
      prompt: n.digit,
      promptIsArabic: true,
      choices: buildChoices(
        String(n.value),
        numbers.map((x) => String(x.value)),
      ),
      correctChoice: String(n.value),
    })),
  )
  const [quizResult, setQuizResult] = useState<{ score: number; total: number } | null>(null)
  const [quizKey, setQuizKey] = useState(0)

  const masteredCount = useMemo(
    () => numbers.filter((n) => masteredNumbers.includes(n.id)).length,
    [masteredNumbers],
  )

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-bold text-brand-800 dark:text-slate-100">
            <HashIcon className="h-6 w-6 text-brand-600 dark:text-slate-300" /> Les chiffres arabes
          </h1>
          <p className="text-sm text-brand-500 dark:text-slate-400">
            {masteredCount} / {numbers.length} chiffres maîtrisés
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
          <div className="mb-6 flex items-start gap-2 rounded-2xl border border-rose-100 bg-rose-50 p-4 text-sm text-rose-700">
            <InfoIcon className="h-4 w-4 shrink-0 translate-y-0.5" />
            <span>
              Contrairement aux lettres, les chiffres arabes s&apos;écrivent et se lisent{' '}
              <strong>de gauche à droite</strong>, même au sein d&apos;un texte en arabe.
            </span>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
            <div className="grid grid-cols-4 gap-2 sm:grid-cols-6">
              {numbers.map((n) => {
                const isMastered = masteredNumbers.includes(n.id)
                const isSelected = n.id === selectedId
                return (
                  <button
                    key={n.id}
                    onClick={() => setSelectedId(n.id)}
                    className={`relative flex aspect-square flex-col items-center justify-center rounded-xl border-2 font-arabic text-3xl transition ${
                      isSelected
                        ? 'border-brand-600 bg-brand-50 dark:bg-slate-700/50 text-brand-800 dark:text-slate-100'
                        : 'border-brand-100 dark:border-slate-700 bg-white dark:bg-slate-800 text-brand-700 dark:text-slate-200 hover:border-brand-300'
                    }`}
                  >
                    {n.digit}
                    {isMastered && <StarIcon className="absolute right-1 top-1 h-3 w-3 text-sand-500 dark:text-amber-400" />}
                  </button>
                )
              })}
            </div>

            <div className="rounded-2xl border border-brand-100 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm">
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <p className="font-arabic text-5xl text-brand-800 dark:text-slate-100">{selected.digit}</p>
                  <p className="text-sm text-brand-500 dark:text-slate-400">Valeur : {selected.value}</p>
                </div>
                <AudioButton text={selected.word} size="lg" />
              </div>

              <div className="mb-5 rounded-xl bg-sand-50 dark:bg-slate-700/50 p-4 text-center">
                <p className="font-arabic text-3xl text-brand-800 dark:text-slate-100">{selected.word}</p>
                <p className="text-sm text-brand-500 dark:text-slate-400">{selected.transliteration}</p>
              </div>

              <button
                onClick={() => markNumberMastered(selected.id)}
                disabled={masteredNumbers.includes(selected.id)}
                className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-brand-600 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-700 disabled:bg-brand-100 disabled:text-brand-400 dark:disabled:bg-slate-700 dark:disabled:text-slate-500"
              >
                {masteredNumbers.includes(selected.id) ? (
                  <>
                    <StarIcon className="h-4 w-4" /> Chiffre maîtrisé
                  </>
                ) : (
                  'Marquer comme maîtrisé'
                )}
              </button>
            </div>
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
              onCorrectAnswer={(id) => markNumberMastered(id)}
              onWrongAnswer={(id) => markNumberWeak(id)}
            />
          )}
        </div>
      )}
    </div>
  )
}
