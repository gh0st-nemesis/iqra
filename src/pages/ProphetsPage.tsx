import { useEffect, useState } from 'react'
import { prophets } from '../data/prophets'
import { useProgress } from '../store/progress'
import AudioButton from '../components/AudioButton'
import McqQuiz, { type McqQuestion } from '../components/McqQuiz'
import { buildChoices, pickRandom } from '../lib/quiz'
import { CheckIcon, ChevronDownIcon, ChevronUpIcon, InfoIcon, ScrollIcon, TrophyIcon } from '../components/icons'

type Tab = 'learn' | 'quiz'

export default function ProphetsPage() {
  const [tab, setTab] = useState<Tab>('learn')
  const prophetsRead = useProgress((s) => s.prophetsRead)
  const markProphetRead = useProgress((s) => s.markProphetRead)
  const [openId, setOpenId] = useState<string | null>(prophets[0].id)

  useEffect(() => {
    if (openId) markProphetRead(openId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openId])

  const [quizQuestions] = useState<McqQuestion[]>(() =>
    pickRandom(prophets, Math.min(8, prophets.length)).map((p) => ({
      id: p.id,
      prompt: p.arabicName,
      promptIsArabic: true,
      choices: buildChoices(
        p.name,
        prophets.map((x) => x.name),
      ),
      correctChoice: p.name,
    })),
  )
  const [quizResult, setQuizResult] = useState<{ score: number; total: number } | null>(null)
  const [quizKey, setQuizKey] = useState(0)

  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-3">
        <h1 className="flex items-center gap-2 text-2xl font-bold text-brand-800 dark:text-slate-100">
          <ScrollIcon className="h-6 w-6 text-brand-600 dark:text-slate-300" /> Les prophètes
        </h1>
        <div className="flex shrink-0 gap-2 rounded-full bg-brand-100 dark:bg-slate-700 p-1">
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
      <p className="mb-6 text-sm text-brand-500 dark:text-slate-400">
        {prophetsRead.length} / {prophets.length} récits consultés
      </p>

      {tab === 'learn' && (
        <>
          <div className="mb-6 flex items-start gap-2 rounded-2xl border border-orange-100 dark:border-orange-900/50 bg-orange-50 dark:bg-orange-950/30 p-4 text-sm text-orange-700 dark:text-orange-300">
            <InfoIcon className="h-4 w-4 shrink-0 translate-y-0.5" />
            <span>
              Récits courts et non-exhaustifs des grandes lignes coraniques. Par respect de la tradition islamique,
              aucun prophète n&apos;est représenté visuellement dans cette application.
            </span>
          </div>

          <div className="space-y-3">
            {prophets.map((p) => {
              const isOpen = openId === p.id
              const isRead = prophetsRead.includes(p.id)
              return (
                <div key={p.id} className="overflow-hidden rounded-2xl border border-brand-100 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm">
                  <button
                    onClick={() => setOpenId(isOpen ? null : p.id)}
                    className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-100 dark:bg-slate-700 text-sm font-bold text-brand-700 dark:text-slate-200">
                        {p.order}
                      </span>
                      <div>
                        <p className="flex items-center gap-1.5 font-bold text-brand-800 dark:text-slate-100">
                          {isRead && <CheckIcon className="h-4 w-4 text-green-600" />}
                          {p.name}
                        </p>
                        <p className="font-arabic text-sm text-brand-400 dark:text-slate-500">{p.arabicName}</p>
                      </div>
                    </div>
                    {isOpen ? (
                      <ChevronUpIcon className="h-4 w-4 shrink-0 text-brand-400 dark:text-slate-500" />
                    ) : (
                      <ChevronDownIcon className="h-4 w-4 shrink-0 text-brand-400 dark:text-slate-500" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="border-t border-brand-50 dark:border-slate-700 px-5 py-4">
                      <div className="mb-3 flex items-center gap-2">
                        <AudioButton text={p.arabicName} size="sm" />
                        <p className="text-sm text-brand-600 dark:text-slate-300">{p.summary}</p>
                      </div>
                      <div className="mb-4 rounded-xl bg-sand-50 dark:bg-slate-700/50 p-3 text-sm text-brand-700 dark:text-slate-300">
                        <span className="font-semibold text-brand-800 dark:text-slate-100">À retenir : </span>
                        {p.lesson}
                      </div>
                      {p.vocab.length > 0 && (
                        <div className="space-y-2">
                          <p className="text-xs font-bold uppercase tracking-wide text-brand-500 dark:text-slate-400">
                            Vocabulaire lié
                          </p>
                          {p.vocab.map((v, i) => (
                            <div key={i} className="flex items-center gap-3 rounded-lg bg-brand-50 dark:bg-slate-700/50 p-3">
                              <AudioButton text={v.arabic} size="sm" />
                              <div>
                                <p className="font-arabic text-xl text-brand-800 dark:text-slate-100">{v.arabic}</p>
                                <p className="text-xs text-brand-500 dark:text-slate-400">
                                  {v.transliteration} — {v.meaning}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </>
      )}

      {tab === 'quiz' && (
        <div className="mx-auto max-w-xl">
          <p className="mb-6 text-center text-sm text-brand-500 dark:text-slate-400">
            Retrouve le nom de chaque prophète à partir de son nom en arabe.
          </p>
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
            <McqQuiz key={quizKey} questions={quizQuestions} onFinish={(score, total) => setQuizResult({ score, total })} />
          )}
        </div>
      )}
    </div>
  )
}
