import { useEffect, useMemo, useState } from 'react'
import { tajwidGroups, tajwidRules } from '../data/tajwid'
import { useProgress } from '../store/progress'
import AudioButton from '../components/AudioButton'
import McqQuiz, { type McqQuestion } from '../components/McqQuiz'
import { buildChoices, pickRandom } from '../lib/quiz'
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  InfoIcon,
  LightbulbIcon,
  MusicNoteIcon,
  TrophyIcon,
} from '../components/icons'

type Tab = 'learn' | 'quiz'

export default function TajwidPage() {
  const [tab, setTab] = useState<Tab>('learn')
  const tajwidRulesSeen = useProgress((s) => s.tajwidRulesSeen)
  const markTajwidRuleSeen = useProgress((s) => s.markTajwidRuleSeen)
  const [openId, setOpenId] = useState<string | null>(tajwidRules[0].id)

  useEffect(() => {
    if (openId) markTajwidRuleSeen(openId)
  }, [openId, markTajwidRuleSeen])

  const byGroup = useMemo(() => {
    const map = new Map<string, typeof tajwidRules>()
    tajwidGroups.forEach((g) => map.set(g, tajwidRules.filter((r) => r.group === g)))
    return map
  }, [])

  const [quizQuestions] = useState<McqQuestion[]>(() =>
    pickRandom(tajwidRules, 8).map((rule) => ({
      id: rule.id,
      prompt: rule.examples[0].text,
      promptIsArabic: true,
      choices: buildChoices(
        rule.shortName,
        tajwidRules.map((r) => r.shortName),
      ),
      correctChoice: rule.shortName,
    })),
  )
  const [quizResult, setQuizResult] = useState<{ score: number; total: number } | null>(null)
  const [quizKey, setQuizKey] = useState(0)

  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-3">
        <h1 className="flex items-center gap-2 text-2xl font-bold text-brand-800 dark:text-slate-100">
          <MusicNoteIcon className="h-6 w-6 text-brand-600 dark:text-slate-300" /> Tajwîd — les règles de belle récitation
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
        {tajwidRulesSeen.length} / {tajwidRules.length} règles consultées — indispensable pour réciter le Coran
        correctement une fois la lecture fluide.
      </p>

      {tab === 'learn' && (
        <>
          <div className="mb-4 flex items-start gap-2 rounded-2xl border border-purple-100 dark:border-purple-900/50 bg-purple-50 dark:bg-purple-950/30 p-4 text-sm text-purple-700 dark:text-purple-300">
            <LightbulbIcon className="h-4 w-4 shrink-0 translate-y-0.5" />
            <span>
              Prérequis conseillé : maîtriser l&apos;<strong>Alphabet</strong> et les <strong>Voyelles</strong> avant
              de te plonger dans le tajwîd — ces règles s&apos;appliquent en lecture fluide du Coran.
            </span>
          </div>

          <div className="mb-6 flex items-start gap-2 rounded-2xl border border-amber-100 dark:border-amber-900/50 bg-amber-50 dark:bg-amber-950/30 p-4 text-sm text-amber-700 dark:text-amber-300">
            <InfoIcon className="h-4 w-4 shrink-0 translate-y-0.5" />
            <span>
              Les exemples ci-dessous sont lus par une synthèse vocale : pratique pour repérer le son, mais
              approximative sur les nuances fines du tajwîd (durées de madd, qualité des lettres emphatiques...). Pour
              une prononciation authentique, écoute les mêmes règles appliquées par un vrai récitateur dans le module{' '}
              <strong>Récitation coranique</strong>.
            </span>
          </div>

          <div className="space-y-8">
            {tajwidGroups.map((group) => (
              <section key={group}>
                <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-brand-500 dark:text-slate-400">{group}</h2>
                <div className="space-y-3">
                  {byGroup.get(group)!.map((rule) => {
                    const isOpen = openId === rule.id
                    const isSeen = tajwidRulesSeen.includes(rule.id)
                    return (
                      <div key={rule.id} className="overflow-hidden rounded-2xl border border-brand-100 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm">
                        <button
                          onClick={() => setOpenId(isOpen ? null : rule.id)}
                          className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
                        >
                          <div>
                            <p className="flex items-center gap-1.5 font-bold text-brand-800 dark:text-slate-100">
                              {isSeen && <CheckIcon className="h-4 w-4 text-green-600" />}
                              {rule.name}
                            </p>
                            <p className="font-arabic text-sm text-brand-400 dark:text-slate-500">{rule.arabicName}</p>
                          </div>
                          {isOpen ? (
                            <ChevronUpIcon className="h-4 w-4 text-brand-400 dark:text-slate-500" />
                          ) : (
                            <ChevronDownIcon className="h-4 w-4 text-brand-400 dark:text-slate-500" />
                          )}
                        </button>
                        {isOpen && (
                          <div className="border-t border-brand-50 px-5 py-4">
                            <p className="mb-3 text-sm text-brand-600 dark:text-slate-300">{rule.description}</p>
                            {rule.letters && (
                              <p className="mb-3 font-arabic text-xl text-purple-700 dark:text-purple-300">
                                <span className="mr-2 font-sans text-xs text-brand-400 dark:text-slate-500">Lettres concernées :</span>
                                {rule.letters}
                              </p>
                            )}
                            <div className="space-y-2">
                              {rule.examples.map((ex, i) => (
                                <div key={i} className="flex items-center gap-3 rounded-lg bg-sand-50 dark:bg-slate-700/50 p-3">
                                  <AudioButton text={ex.text} size="sm" rate={0.6} />
                                  <div>
                                    <p className="font-arabic text-2xl text-brand-800 dark:text-slate-100">{ex.text}</p>
                                    <p className="text-xs text-brand-500 dark:text-slate-400">
                                      {ex.transliteration} — {ex.note}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </section>
            ))}
          </div>
        </>
      )}

      {tab === 'quiz' && (
        <div className="mx-auto max-w-xl">
          <p className="mb-6 text-center text-sm text-brand-500 dark:text-slate-400">
            Pour chaque exemple, identifie quelle règle de tajwîd s&apos;y applique.
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
