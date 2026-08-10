import { useEffect, useMemo, useState } from 'react'
import { akhlaqLessons, hijriMonths, pillarsOfFaith, pillarsOfIslam } from '../data/knowledge'
import { useProgress } from '../store/progress'
import AudioButton from '../components/AudioButton'
import McqQuiz, { type McqQuestion } from '../components/McqQuiz'
import { buildChoices, pickRandom, shuffle } from '../lib/quiz'
import { usePageTitle } from '../lib/usePageTitle'
import { CompassIcon, TrophyIcon } from '../components/icons'

type Tab = 'learn' | 'quiz'
type SubTab = 'islam' | 'faith' | 'akhlaq' | 'hijri'

const subTabs: { id: SubTab; label: string }[] = [
  { id: 'islam', label: "Piliers de l'islam" },
  { id: 'faith', label: 'Piliers de la foi' },
  { id: 'akhlaq', label: 'Akhlâq' },
  { id: 'hijri', label: 'Calendrier hijri' },
]

export default function KnowledgePage() {
  usePageTitle('Connaissances')
  const [tab, setTab] = useState<Tab>('learn')
  const [subTab, setSubTab] = useState<SubTab>('islam')

  const pillarsIslamSeen = useProgress((s) => s.pillarsIslamSeen)
  const pillarsFaithSeen = useProgress((s) => s.pillarsFaithSeen)
  const akhlaqSeen = useProgress((s) => s.akhlaqSeen)
  const hijriMonthsSeen = useProgress((s) => s.hijriMonthsSeen)
  const markPillarIslamSeen = useProgress((s) => s.markPillarIslamSeen)
  const markPillarFaithSeen = useProgress((s) => s.markPillarFaithSeen)
  const markAkhlaqSeen = useProgress((s) => s.markAkhlaqSeen)
  const markHijriMonthSeen = useProgress((s) => s.markHijriMonthSeen)

  useEffect(() => {
    if (tab !== 'learn') return
    if (subTab === 'islam') pillarsOfIslam.forEach((p) => markPillarIslamSeen(p.id))
    else if (subTab === 'faith') pillarsOfFaith.forEach((p) => markPillarFaithSeen(p.id))
    else if (subTab === 'akhlaq') akhlaqLessons.forEach((a) => markAkhlaqSeen(a.id))
    else if (subTab === 'hijri') hijriMonths.forEach((m) => markHijriMonthSeen(m.id))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab, subTab])

  const totalSeen = pillarsIslamSeen.length + pillarsFaithSeen.length + akhlaqSeen.length + hijriMonthsSeen.length
  const totalItems = pillarsOfIslam.length + pillarsOfFaith.length + akhlaqLessons.length + hijriMonths.length

  const seenCountForTab = useMemo(() => {
    switch (subTab) {
      case 'islam':
        return { value: pillarsIslamSeen.length, max: pillarsOfIslam.length }
      case 'faith':
        return { value: pillarsFaithSeen.length, max: pillarsOfFaith.length }
      case 'akhlaq':
        return { value: akhlaqSeen.length, max: akhlaqLessons.length }
      case 'hijri':
        return { value: hijriMonthsSeen.length, max: hijriMonths.length }
    }
  }, [subTab, pillarsIslamSeen, pillarsFaithSeen, akhlaqSeen, hijriMonthsSeen])

  const [quizQuestions] = useState<McqQuestion[]>(() => {
    const pillarPool = [...pillarsOfIslam, ...pillarsOfFaith]
    const pillarQuestions: McqQuestion[] = pickRandom(pillarPool, Math.min(6, pillarPool.length)).map((p) => ({
      id: `pillar:${p.id}`,
      prompt: p.arabicTitle ?? p.title,
      promptIsArabic: true,
      choices: buildChoices(
        p.title,
        pillarPool.map((x) => x.title),
      ),
      correctChoice: p.title,
    }))
    const hijriQuestions: McqQuestion[] = pickRandom(hijriMonths, Math.min(6, hijriMonths.length)).map((m) => ({
      id: `hijri:${m.id}`,
      prompt: m.arabicName,
      promptIsArabic: true,
      choices: buildChoices(
        m.transliteration,
        hijriMonths.map((x) => x.transliteration),
      ),
      correctChoice: m.transliteration,
    }))
    return shuffle([...pillarQuestions, ...hijriQuestions])
  })
  const [quizResult, setQuizResult] = useState<{ score: number; total: number } | null>(null)
  const [quizKey, setQuizKey] = useState(0)

  return (
    <div>
      <div className="mb-1 flex flex-wrap items-center justify-between gap-3">
        <h1 className="flex items-center gap-2 text-2xl font-bold text-brand-800 dark:text-slate-100">
          <CompassIcon className="h-6 w-6 text-brand-600 dark:text-slate-300" /> Connaissances islamiques
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

      {tab === 'learn' && (
        <>
          <p className="mb-6 text-sm text-brand-500 dark:text-slate-400">
            {totalSeen} / {totalItems} points consultés au total — {seenCountForTab?.value} / {seenCountForTab?.max}{' '}
            dans cette section
          </p>

          <div className="mb-6 flex flex-wrap gap-2 rounded-full bg-brand-100 dark:bg-slate-700 p-1 w-fit">
            {subTabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setSubTab(t.id)}
                className={`rounded-full px-4 py-1.5 text-sm font-semibold transition ${
                  subTab === t.id ? 'bg-white dark:bg-slate-800 text-brand-700 dark:text-slate-200 shadow-sm' : 'text-brand-500 dark:text-slate-400'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {(subTab === 'islam' || subTab === 'faith') && (
            <div className="grid gap-3 sm:grid-cols-2">
              {(subTab === 'islam' ? pillarsOfIslam : pillarsOfFaith).map((p) => (
                <div key={p.id} className="rounded-2xl border border-brand-100 dark:border-slate-700 bg-white dark:bg-slate-800 p-4 shadow-sm">
                  <div className="mb-2 flex items-center gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-100 dark:bg-slate-700 text-sm font-bold text-brand-700 dark:text-slate-200">
                      {p.order}
                    </span>
                    <div>
                      <p className="font-bold text-brand-800 dark:text-slate-100">{p.title}</p>
                      {p.arabicTitle && <p className="font-arabic text-sm text-brand-400 dark:text-slate-500">{p.arabicTitle}</p>}
                    </div>
                  </div>
                  <p className="text-sm text-brand-600 dark:text-slate-300">{p.description}</p>
                </div>
              ))}
            </div>
          )}

          {subTab === 'akhlaq' && (
            <div className="grid gap-3 sm:grid-cols-2">
              {akhlaqLessons.map((a) => (
                <div key={a.id} className="rounded-2xl border border-brand-100 dark:border-slate-700 bg-white dark:bg-slate-800 p-4 shadow-sm">
                  <div className="mb-2 flex items-center gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-100 dark:bg-slate-700 text-sm font-bold text-brand-700 dark:text-slate-200">
                      {a.order}
                    </span>
                    <p className="font-bold text-brand-800 dark:text-slate-100">{a.title}</p>
                  </div>
                  <p className="text-sm text-brand-600 dark:text-slate-300">{a.description}</p>
                </div>
              ))}
            </div>
          )}

          {subTab === 'hijri' && (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {hijriMonths.map((m) => (
                <div key={m.id} className="rounded-2xl border border-brand-100 dark:border-slate-700 bg-white dark:bg-slate-800 p-4 shadow-sm">
                  <div className="mb-2 flex items-start justify-between gap-2">
                    <div className="flex items-start gap-2">
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-100 dark:bg-slate-700 text-[11px] font-bold text-brand-700 dark:text-slate-200">
                        {m.order}
                      </span>
                      <div>
                        <p className="font-arabic text-xl text-brand-800 dark:text-slate-100">{m.arabicName}</p>
                        <p className="text-sm text-brand-500 dark:text-slate-400">{m.transliteration}</p>
                      </div>
                    </div>
                    <AudioButton text={m.arabicName} size="sm" />
                  </div>
                  <p className="text-sm text-brand-600 dark:text-slate-300">{m.note}</p>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {tab === 'quiz' && (
        <div className="mx-auto max-w-xl">
          <p className="mb-6 text-center text-sm text-brand-500 dark:text-slate-400">
            Les piliers de l&apos;islam, de la foi, et le calendrier hijri — en arabe, retrouve le bon sens.
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
