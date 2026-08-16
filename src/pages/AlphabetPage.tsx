import { useMemo, useState } from 'react'
import { alphabet, getLetterAudioText, getLetterForms } from '../data/alphabet'
import { useProgress } from '../store/progress'
import AudioButton from '../components/AudioButton'
import LetterTracing from '../components/LetterTracing'
import McqQuiz, { type McqQuestion } from '../components/McqQuiz'
import { buildChoices, pickRandom } from '../lib/quiz'
import { usePageTitle } from '../lib/usePageTitle'
import { InfoIcon, LettersIcon, PenIcon, StarIcon, TagIcon, TrophyIcon } from '../components/icons'

type Tab = 'learn' | 'tracing' | 'quiz'

export default function AlphabetPage() {
  usePageTitle('Alphabet')
  const [tab, setTab] = useState<Tab>('learn')
  const [selectedId, setSelectedId] = useState(alphabet[0].id)
  const masteredLetters = useProgress((s) => s.masteredLetters)
  const markLetterSeen = useProgress((s) => s.markLetterSeen)
  const markLetterMastered = useProgress((s) => s.markLetterMastered)
  const markLetterWeak = useProgress((s) => s.markLetterWeak)

  const selected = alphabet.find((l) => l.id === selectedId)!
  const forms = getLetterForms(selected)

  function selectLetter(id: string) {
    setSelectedId(id)
    markLetterSeen(id)
  }

  const [quizQuestions] = useState<McqQuestion[]>(() => {
    const chosen = pickRandom(alphabet, 12)
    return chosen.map((letter) => ({
      id: letter.id,
      prompt: letter.char,
      promptIsArabic: true,
      choices: buildChoices(
        letter.transliteration,
        alphabet.map((l) => l.transliteration),
      ),
      correctChoice: letter.transliteration,
    }))
  })
  const [quizResult, setQuizResult] = useState<{ score: number; total: number } | null>(null)
  const [quizKey, setQuizKey] = useState(0)

  const masteredCount = useMemo(
    () => alphabet.filter((l) => masteredLetters.includes(l.id)).length,
    [masteredLetters],
  )

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-bold text-brand-800 dark:text-slate-100">
            <LettersIcon className="h-6 w-6 text-brand-600 dark:text-slate-300" /> Alphabet arabe
          </h1>
          <p className="text-sm text-brand-500 dark:text-slate-400">
            {masteredCount} / {alphabet.length} lettres maîtrisées
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
            onClick={() => setTab('tracing')}
            className={`rounded-full px-4 py-1.5 text-sm font-semibold transition ${
              tab === 'tracing' ? 'bg-white dark:bg-slate-800 text-brand-700 dark:text-slate-200 shadow-sm' : 'text-brand-500 dark:text-slate-400'
            }`}
          >
            Écriture
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
        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          <div className="grid grid-cols-3 gap-2 xs:grid-cols-4 sm:grid-cols-6 md:grid-cols-7">
            {alphabet.map((letter) => {
              const isMastered = masteredLetters.includes(letter.id)
              const isSelected = letter.id === selectedId
              return (
                <button
                  key={letter.id}
                  onClick={() => selectLetter(letter.id)}
                  className={`relative flex aspect-square flex-col items-center justify-center rounded-xl border-2 font-arabic text-2xl transition sm:text-3xl ${
                    isSelected
                      ? 'border-brand-600 bg-brand-50 dark:bg-slate-700/50 text-brand-800 dark:text-slate-100'
                      : 'border-brand-100 dark:border-slate-700 bg-white dark:bg-slate-800 text-brand-700 dark:text-slate-200 hover:border-brand-300'
                  }`}
                >
                  {letter.char}
                  {isMastered && <StarIcon className="absolute right-1 top-1 h-3 w-3 text-sand-500 dark:text-amber-400" />}
                </button>
              )
            })}
          </div>

          <div className="rounded-2xl border border-brand-100 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm">
            <div className="mb-4 flex items-start justify-between">
              <div>
                <p className="text-3xl font-arabic text-brand-800 dark:text-slate-100">{selected.name}</p>
                <p className="text-sm text-brand-500 dark:text-slate-400">Translittération : « {selected.transliteration} »</p>
              </div>
              <AudioButton text={getLetterAudioText(selected)} label={selected.name} size="lg" />
            </div>

            <div className="mb-4 grid grid-cols-4 gap-2 text-center">
              {(
                [
                  ['Isolée', forms.isolated],
                  ['Initiale', forms.initial],
                  ['Médiane', forms.medial],
                  ['Finale', forms.final],
                ] as const
              ).map(([label, value]) => (
                <div key={label} className="rounded-lg bg-sand-50 dark:bg-slate-700/50 py-2">
                  <div className="font-arabic text-2xl text-brand-700 dark:text-slate-200">{value ?? '—'}</div>
                  <div className="text-[10px] text-brand-400 dark:text-slate-500">{label}</div>
                </div>
              ))}
            </div>
            {!selected.connectsToNext && (
              <p className="mb-4 flex items-start gap-1.5 text-xs text-brand-400 dark:text-slate-500">
                <InfoIcon className="h-3.5 w-3.5 shrink-0 translate-y-0.5" />
                Cette lettre ne se lie jamais à la lettre suivante : elle n&apos;a que 2 formes visuelles.
              </p>
            )}

            <div className="mb-4 space-y-1 text-sm">
              <p className="text-brand-600 dark:text-slate-300">
                <span className="font-semibold text-brand-800 dark:text-slate-100">Son : </span>
                {selected.soundDescription}
              </p>
              <p className="text-brand-600 dark:text-slate-300">
                <span className="font-semibold text-brand-800 dark:text-slate-100">Point d&apos;articulation : </span>
                {selected.makhraj}
              </p>
            </div>

            <div className="mb-5 flex items-center gap-3 rounded-xl bg-brand-50 dark:bg-slate-700/50 p-3">
              <TagIcon className="h-5 w-5 shrink-0 text-brand-400 dark:text-slate-500" />
              <div className="flex-1">
                <p className="font-arabic text-xl text-brand-800 dark:text-slate-100">{selected.exampleWord}</p>
                <p className="text-xs text-brand-500 dark:text-slate-400">
                  {selected.exampleTransliteration} — {selected.exampleMeaning}
                </p>
              </div>
              <AudioButton text={selected.exampleWord} label={selected.exampleTransliteration} size="sm" />
            </div>

            <button
              onClick={() => markLetterMastered(selected.id)}
              disabled={masteredLetters.includes(selected.id)}
              className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-brand-600 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-700 disabled:bg-brand-100 disabled:text-brand-400 dark:disabled:bg-slate-700 dark:disabled:text-slate-500"
            >
              {masteredLetters.includes(selected.id) ? (
                <>
                  <StarIcon className="h-4 w-4" /> Lettre maîtrisée
                </>
              ) : (
                'Marquer comme maîtrisée'
              )}
            </button>
          </div>
        </div>
      )}

      {tab === 'tracing' && (
        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          <div className="grid grid-cols-3 gap-2 xs:grid-cols-4 sm:grid-cols-6 md:grid-cols-7">
            {alphabet.map((letter) => {
              const isSelected = letter.id === selectedId
              return (
                <button
                  key={letter.id}
                  onClick={() => selectLetter(letter.id)}
                  className={`flex aspect-square flex-col items-center justify-center rounded-xl border-2 font-arabic text-2xl transition sm:text-3xl ${
                    isSelected
                      ? 'border-brand-600 bg-brand-50 dark:bg-slate-700/50 text-brand-800 dark:text-slate-100'
                      : 'border-brand-100 dark:border-slate-700 bg-white dark:bg-slate-800 text-brand-700 dark:text-slate-200 hover:border-brand-300'
                  }`}
                >
                  {letter.char}
                </button>
              )
            })}
          </div>

          <div className="flex flex-col items-center rounded-2xl border border-brand-100 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
            <p className="mb-4 flex items-center gap-1.5 self-start text-sm font-semibold text-brand-700 dark:text-slate-200">
              <PenIcon className="h-4 w-4" /> {selected.name} — {selected.transliteration}
            </p>
            <LetterTracing key={selected.id} char={selected.char} />
          </div>
        </div>
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
              onCorrectAnswer={(id) => markLetterMastered(id)}
              onWrongAnswer={(id) => markLetterWeak(id)}
            />
          )}
        </div>
      )}
    </div>
  )
}
