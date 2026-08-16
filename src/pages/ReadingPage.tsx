import { useMemo, useState } from 'react'
import { alphabet } from '../data/alphabet'
import { readingWords } from '../data/reading'
import { useProgress } from '../store/progress'
import AudioButton from '../components/AudioButton'
import WordExerciseFlow from '../components/WordExerciseFlow'
import DictationExercise from '../components/DictationExercise'
import McqQuiz, { type McqQuestion } from '../components/McqQuiz'
import { buildChoices, pickRandom } from '../lib/quiz'
import { usePageTitle } from '../lib/usePageTitle'
import { BookOpenIcon, CheckIcon, EarIcon, TrophyIcon } from '../components/icons'

const shortHarakat = [
  { id: 'fatha', symbol: 'َ', translit: 'a' },
  { id: 'kasra', symbol: 'ِ', translit: 'i' },
  { id: 'damma', symbol: 'ُ', translit: 'u' },
  { id: 'sukun', symbol: 'ْ', translit: '' },
]

const connectingLetters = alphabet.filter((l) => l.char !== 'ا')
const EXERCISE_SET_SIZE = 6
const QUIZ_SET_SIZE = 10

type Tab = 'learn' | 'exercises' | 'dictation' | 'quiz'

export default function ReadingPage() {
  usePageTitle('Lecture')
  const [tab, setTab] = useState<Tab>('learn')
  const [letterId, setLetterId] = useState(connectingLetters[0].id)
  const [harakaId, setHarakaId] = useState(shortHarakat[0].id)
  const [difficultyFilter, setDifficultyFilter] = useState<1 | 2 | 3 | 'all'>('all')
  const [revealed, setRevealed] = useState<Record<string, boolean>>({})
  const [exerciseWords, setExerciseWords] = useState<typeof readingWords | null>(null)
  const [exerciseDone, setExerciseDone] = useState(false)
  const [dictationWords, setDictationWords] = useState<typeof readingWords | null>(null)
  const [dictationDone, setDictationDone] = useState(false)

  const wordsRead = useProgress((s) => s.wordsRead)
  const markWordRead = useProgress((s) => s.markWordRead)
  const masteredWords = useProgress((s) => s.masteredWords)
  const markWordMastered = useProgress((s) => s.markWordMastered)
  const markWordWeak = useProgress((s) => s.markWordWeak)

  const [quizQuestions, setQuizQuestions] = useState<McqQuestion[]>(() => buildQuizQuestions())
  const [quizResult, setQuizResult] = useState<{ score: number; total: number } | null>(null)
  const [quizKey, setQuizKey] = useState(0)

  function buildQuizQuestions(): McqQuestion[] {
    return pickRandom(readingWords, QUIZ_SET_SIZE).map((w) => ({
      id: w.id,
      prompt: w.word,
      promptIsArabic: true,
      choices: buildChoices(
        w.meaning,
        readingWords.map((x) => x.meaning),
      ),
      correctChoice: w.meaning,
    }))
  }

  const letter = connectingLetters.find((l) => l.id === letterId)!
  const haraka = shortHarakat.find((h) => h.id === harakaId)!
  const syllable = letter.char + haraka.symbol
  const syllableTranslit = letter.transliteration + haraka.translit

  const filteredWords = useMemo(
    () => (difficultyFilter === 'all' ? readingWords : readingWords.filter((w) => w.difficulty === difficultyFilter)),
    [difficultyFilter],
  )

  function startExercise() {
    setExerciseDone(false)
    setExerciseWords(pickRandom(filteredWords.length ? filteredWords : readingWords, EXERCISE_SET_SIZE))
  }

  function startDictation() {
    setDictationDone(false)
    setDictationWords(pickRandom(filteredWords.length ? filteredWords : readingWords, EXERCISE_SET_SIZE))
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="flex items-center gap-2 text-2xl font-bold text-brand-800 dark:text-slate-100">
          <BookOpenIcon className="h-6 w-6 text-brand-600 dark:text-slate-300" /> Lecture
        </h1>
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
            onClick={() => setTab('exercises')}
            className={`rounded-full px-4 py-1.5 text-sm font-semibold transition ${
              tab === 'exercises' ? 'bg-white dark:bg-slate-800 text-brand-700 dark:text-slate-200 shadow-sm' : 'text-brand-500 dark:text-slate-400'
            }`}
          >
            Exercices
          </button>
          <button
            onClick={() => setTab('dictation')}
            className={`rounded-full px-4 py-1.5 text-sm font-semibold transition ${
              tab === 'dictation' ? 'bg-white dark:bg-slate-800 text-brand-700 dark:text-slate-200 shadow-sm' : 'text-brand-500 dark:text-slate-400'
            }`}
          >
            Dictée
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
            Assemble une consonne et une voyelle pour former une syllabe, puis entraîne-toi à lire des mots complets.
          </p>

          <section className="mb-10 rounded-2xl border border-brand-100 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm">
            <h2 className="mb-4 text-sm font-bold uppercase tracking-wide text-brand-500 dark:text-slate-400">Constructeur de syllabes</h2>
            <div className="grid gap-6 sm:grid-cols-[1fr_1fr_auto]">
              <div>
                <p className="mb-2 text-xs font-medium text-brand-500 dark:text-slate-400">1. Choisis une consonne</p>
                <div className="scrollbar-thin grid max-h-40 grid-cols-6 gap-1.5 overflow-y-auto pr-1">
                  {connectingLetters.map((l) => (
                    <button
                      key={l.id}
                      onClick={() => setLetterId(l.id)}
                      className={`aspect-square rounded-lg border-2 font-arabic text-xl transition ${
                        l.id === letterId ? 'border-brand-600 bg-brand-50 dark:bg-slate-700/50' : 'border-brand-100 dark:border-slate-700 hover:border-brand-300'
                      }`}
                    >
                      {l.char}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="mb-2 text-xs font-medium text-brand-500 dark:text-slate-400">2. Choisis une voyelle</p>
                <div className="grid grid-cols-4 gap-1.5">
                  {shortHarakat.map((h) => (
                    <button
                      key={h.id}
                      onClick={() => setHarakaId(h.id)}
                      className={`rounded-lg border-2 py-3 font-arabic text-xl transition ${
                        h.id === harakaId ? 'border-brand-600 bg-brand-50 dark:bg-slate-700/50' : 'border-brand-100 dark:border-slate-700 hover:border-brand-300'
                      }`}
                    >
                      {letter.char}
                      {h.symbol}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex flex-col items-center justify-center rounded-xl bg-sand-50 dark:bg-slate-700/50 px-6 py-4">
                <p className="mb-1 text-xs font-medium text-brand-500 dark:text-slate-400">Résultat</p>
                <p className="font-arabic text-5xl text-brand-800 dark:text-slate-100">{syllable}</p>
                <p className="mb-2 text-sm text-brand-500 dark:text-slate-400">
                  {syllableTranslit || `${letter.transliteration} (sans voyelle)`}
                </p>
                <AudioButton text={syllable} size="sm" />
              </div>
            </div>
          </section>

          <section>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-sm font-bold uppercase tracking-wide text-brand-500 dark:text-slate-400">
                Mots à lire ({wordsRead.length}/{readingWords.length} lus)
              </h2>
              <div className="flex gap-1 rounded-full bg-brand-100 dark:bg-slate-700 p-1 text-xs font-semibold">
                {(['all', 1, 2, 3] as const).map((d) => (
                  <button
                    key={d}
                    onClick={() => setDifficultyFilter(d)}
                    className={`rounded-full px-3 py-1 transition ${
                      difficultyFilter === d ? 'bg-white dark:bg-slate-800 text-brand-700 dark:text-slate-200 shadow-sm' : 'text-brand-500 dark:text-slate-400'
                    }`}
                  >
                    {d === 'all' ? 'Tous' : `Niveau ${d}`}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {filteredWords.map((w) => {
                const isRevealed = revealed[w.id]
                const isRead = wordsRead.includes(w.id)
                return (
                  <div key={w.id} className="rounded-2xl border border-brand-100 dark:border-slate-700 bg-white dark:bg-slate-800 p-4 shadow-sm">
                    <div className="mb-3 flex items-center justify-between">
                      <span className="font-arabic text-3xl text-brand-800 dark:text-slate-100">{w.word}</span>
                      <AudioButton text={w.word} size="sm" rate={0.65} />
                    </div>
                    {isRevealed ? (
                      <p className="mb-3 text-sm text-brand-500 dark:text-slate-400">
                        {w.transliteration} — {w.meaning}
                      </p>
                    ) : (
                      <button
                        onClick={() => setRevealed((r) => ({ ...r, [w.id]: true }))}
                        className="mb-3 text-sm font-medium text-brand-400 dark:text-slate-500 underline decoration-dotted"
                      >
                        Essaie de lire, puis clique pour vérifier
                      </button>
                    )}
                    <button
                      onClick={() => markWordRead(w.id)}
                      disabled={isRead}
                      className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-brand-600 py-1.5 text-xs font-semibold text-white transition hover:bg-brand-700 disabled:bg-brand-100 disabled:text-brand-400 dark:disabled:bg-slate-700 dark:disabled:text-slate-500"
                    >
                      {isRead ? (
                        <>
                          <CheckIcon className="h-3.5 w-3.5" /> Lu
                        </>
                      ) : (
                        'Marquer comme lu'
                      )}
                    </button>
                  </div>
                )
              })}
            </div>
          </section>
        </>
      )}

      {tab === 'exercises' && (
        <div>
          <p className="mb-6 text-sm text-brand-500 dark:text-slate-400">
            Deux étapes par mot : d&apos;abord repérer chacune de ses lettres dans l&apos;ordre, puis s&apos;entraîner
            à le prononcer à voix haute.
          </p>

          {!exerciseWords && (
            <div className="mx-auto max-w-md rounded-2xl border border-brand-100 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 text-center shadow-sm">
              <p className="mb-4 text-sm font-medium text-brand-600 dark:text-slate-300">Choisis un niveau de difficulté, puis lance-toi :</p>
              <div className="mb-5 flex justify-center gap-1 rounded-full bg-brand-100 dark:bg-slate-700 p-1 text-xs font-semibold">
                {(['all', 1, 2, 3] as const).map((d) => (
                  <button
                    key={d}
                    onClick={() => setDifficultyFilter(d)}
                    className={`rounded-full px-3 py-1 transition ${
                      difficultyFilter === d ? 'bg-white dark:bg-slate-800 text-brand-700 dark:text-slate-200 shadow-sm' : 'text-brand-500 dark:text-slate-400'
                    }`}
                  >
                    {d === 'all' ? 'Tous' : `Niveau ${d}`}
                  </button>
                ))}
              </div>
              <button
                onClick={startExercise}
                className="rounded-full bg-brand-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-700"
              >
                Commencer ({Math.min(EXERCISE_SET_SIZE, filteredWords.length || readingWords.length)} mots)
              </button>
            </div>
          )}

          {exerciseWords && !exerciseDone && (
            <WordExerciseFlow words={exerciseWords} onFinish={() => setExerciseDone(true)} />
          )}

          {exerciseWords && exerciseDone && (
            <div className="mx-auto max-w-md rounded-2xl border border-brand-100 dark:border-slate-700 bg-white dark:bg-slate-800 p-8 text-center shadow-sm">
              <TrophyIcon className="mx-auto mb-3 h-10 w-10 text-sand-500 dark:text-amber-400" />
              <p className="mb-1 text-xl font-bold text-brand-800 dark:text-slate-100">
                {exerciseWords.length} mots pratiqués !
              </p>
              <p className="mb-5 text-sm text-brand-500 dark:text-slate-400">Lettres identifiées et prononciation entraînée pour chacun.</p>
              <button
                onClick={() => setExerciseWords(null)}
                className="rounded-full bg-brand-600 px-5 py-2 text-sm font-semibold text-white hover:bg-brand-700"
              >
                Recommencer
              </button>
            </div>
          )}
        </div>
      )}

      {tab === 'dictation' && (
        <div>
          <p className="mb-6 text-sm text-brand-500 dark:text-slate-400">
            Le mot n&apos;est pas affiché : écoute-le (synthèse vocale), puis reconstitue-le lettre par lettre. Il ne
            se révèle qu&apos;une fois correctement replacé.
          </p>

          {!dictationWords && (
            <div className="mx-auto max-w-md rounded-2xl border border-brand-100 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 text-center shadow-sm">
              <EarIcon className="mx-auto mb-3 h-8 w-8 text-brand-500 dark:text-slate-400" />
              <p className="mb-4 text-sm font-medium text-brand-600 dark:text-slate-300">Choisis un niveau de difficulté, puis lance-toi :</p>
              <div className="mb-5 flex justify-center gap-1 rounded-full bg-brand-100 dark:bg-slate-700 p-1 text-xs font-semibold">
                {(['all', 1, 2, 3] as const).map((d) => (
                  <button
                    key={d}
                    onClick={() => setDifficultyFilter(d)}
                    className={`rounded-full px-3 py-1 transition ${
                      difficultyFilter === d ? 'bg-white dark:bg-slate-800 text-brand-700 dark:text-slate-200 shadow-sm' : 'text-brand-500 dark:text-slate-400'
                    }`}
                  >
                    {d === 'all' ? 'Tous' : `Niveau ${d}`}
                  </button>
                ))}
              </div>
              <button
                onClick={startDictation}
                className="rounded-full bg-brand-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-700"
              >
                Commencer ({Math.min(EXERCISE_SET_SIZE, filteredWords.length || readingWords.length)} mots)
              </button>
            </div>
          )}

          {dictationWords && !dictationDone && (
            <DictationExercise words={dictationWords} onFinish={() => setDictationDone(true)} />
          )}

          {dictationWords && dictationDone && (
            <div className="mx-auto max-w-md rounded-2xl border border-brand-100 dark:border-slate-700 bg-white dark:bg-slate-800 p-8 text-center shadow-sm">
              <TrophyIcon className="mx-auto mb-3 h-10 w-10 text-sand-500 dark:text-amber-400" />
              <p className="mb-1 text-xl font-bold text-brand-800 dark:text-slate-100">
                {dictationWords.length} mots écrits à l&apos;oreille !
              </p>
              <p className="mb-5 text-sm text-brand-500 dark:text-slate-400">Bel exercice d&apos;écoute et de reconstitution.</p>
              <button
                onClick={() => setDictationWords(null)}
                className="rounded-full bg-brand-600 px-5 py-2 text-sm font-semibold text-white hover:bg-brand-700"
              >
                Recommencer
              </button>
            </div>
          )}
        </div>
      )}

      {tab === 'quiz' && (
        <div className="mx-auto max-w-xl">
          <p className="mb-6 text-sm text-brand-500 dark:text-slate-400">
            {masteredWords.length} / {readingWords.length} mots maîtrisés · retrouve le sens de chaque mot affiché. Tes
            erreurs atterrissent dans la <span className="font-semibold">Révision</span>.
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
                  setQuizQuestions(buildQuizQuestions())
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
              onCorrectAnswer={(id) => markWordMastered(id)}
              onWrongAnswer={(id) => markWordWeak(id)}
            />
          )}
        </div>
      )}
    </div>
  )
}
