import { useState } from 'react'
import { Link } from 'react-router-dom'
import { alphabet } from '../data/alphabet'
import { numbers } from '../data/numbers'
import { harakat } from '../data/harakat'
import { vocabWords } from '../data/vocabulary'
import { namesOfAllah } from '../data/namesOfAllah'
import { useProgress } from '../store/progress'
import McqQuiz, { type McqQuestion } from '../components/McqQuiz'
import { buildChoices, shuffle } from '../lib/quiz'
import { usePageTitle } from '../lib/usePageTitle'
import { CheckCircleIcon, RefreshIcon, TrophyIcon } from '../components/icons'

const MAX_QUESTIONS = 15

function buildQuestions(
  weakLetters: string[],
  weakNumbers: string[],
  weakHarakat: string[],
  weakVocab: string[],
  weakNames: string[],
): McqQuestion[] {
  const letterQuestions: McqQuestion[] = weakLetters
    .map((id) => alphabet.find((l) => l.id === id))
    .filter((l): l is NonNullable<typeof l> => !!l)
    .map((letter) => ({
      id: `letter:${letter.id}`,
      prompt: letter.char,
      promptIsArabic: true,
      choices: buildChoices(
        letter.transliteration,
        alphabet.map((l) => l.transliteration),
      ),
      correctChoice: letter.transliteration,
    }))

  const numberQuestions: McqQuestion[] = weakNumbers
    .map((id) => numbers.find((n) => n.id === id))
    .filter((n): n is NonNullable<typeof n> => !!n)
    .map((n) => ({
      id: `number:${n.id}`,
      prompt: n.digit,
      promptIsArabic: true,
      choices: buildChoices(
        String(n.value),
        numbers.map((x) => String(x.value)),
      ),
      correctChoice: String(n.value),
    }))

  const harakaQuestions: McqQuestion[] = weakHarakat
    .map((id) => harakat.find((h) => h.id === id))
    .filter((h): h is NonNullable<typeof h> => !!h)
    .map((h) => ({
      id: `haraka:${h.id}`,
      prompt: h.demoResult,
      promptIsArabic: true,
      choices: buildChoices(
        h.demoTransliteration,
        harakat.map((x) => x.demoTransliteration),
      ),
      correctChoice: h.demoTransliteration,
    }))

  const vocabQuestions: McqQuestion[] = weakVocab
    .map((id) => vocabWords.find((w) => w.id === id))
    .filter((w): w is NonNullable<typeof w> => !!w)
    .map((w) => ({
      id: `vocab:${w.id}`,
      prompt: w.arabic,
      promptIsArabic: true,
      choices: buildChoices(
        w.meaning,
        vocabWords.map((x) => x.meaning),
      ),
      correctChoice: w.meaning,
    }))

  const nameQuestions: McqQuestion[] = weakNames
    .map((id) => namesOfAllah.find((n) => n.id === id))
    .filter((n): n is NonNullable<typeof n> => !!n)
    .map((n) => ({
      id: `name:${n.id}`,
      prompt: n.arabic,
      promptIsArabic: true,
      choices: buildChoices(
        n.meaning,
        namesOfAllah.map((x) => x.meaning),
      ),
      correctChoice: n.meaning,
    }))

  return shuffle([...letterQuestions, ...numberQuestions, ...harakaQuestions, ...vocabQuestions, ...nameQuestions]).slice(
    0,
    MAX_QUESTIONS,
  )
}

export default function RevisionPage() {
  usePageTitle('Révision')
  const weakLetters = useProgress((s) => s.weakLetters)
  const weakNumbers = useProgress((s) => s.weakNumbers)
  const weakHarakat = useProgress((s) => s.weakHarakat)
  const weakVocab = useProgress((s) => s.weakVocab)
  const weakNames = useProgress((s) => s.weakNames)
  const markLetterMastered = useProgress((s) => s.markLetterMastered)
  const markNumberMastered = useProgress((s) => s.markNumberMastered)
  const clearHarakaWeak = useProgress((s) => s.clearHarakaWeak)
  const markVocabMastered = useProgress((s) => s.markVocabMastered)
  const markNameMastered = useProgress((s) => s.markNameMastered)

  const [questions] = useState<McqQuestion[]>(() =>
    buildQuestions(weakLetters, weakNumbers, weakHarakat, weakVocab, weakNames),
  )
  const [result, setResult] = useState<{ score: number; total: number } | null>(null)

  function handleCorrect(taggedId: string) {
    const [category, id] = taggedId.split(':')
    if (category === 'letter') markLetterMastered(id)
    else if (category === 'number') markNumberMastered(id)
    else if (category === 'haraka') clearHarakaWeak(id)
    else if (category === 'vocab') markVocabMastered(id)
    else if (category === 'name') markNameMastered(id)
  }

  const totalWeak = weakLetters.length + weakNumbers.length + weakHarakat.length + weakVocab.length + weakNames.length

  return (
    <div className="mx-auto max-w-xl">
      <h1 className="mb-1 flex items-center gap-2 text-2xl font-bold text-brand-800 dark:text-slate-100">
        <RefreshIcon className="h-6 w-6 text-brand-600 dark:text-brand-400" /> Révision
      </h1>
      <p className="mb-6 text-sm text-brand-500 dark:text-slate-400">
        Un quiz ciblé, mélangeant lettres, chiffres, harakat, vocabulaire et noms d&apos;Allah où tu t&apos;es trompé
        récemment.
      </p>

      {questions.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-brand-200 bg-white p-8 text-center dark:border-slate-700 dark:bg-slate-800">
          <CheckCircleIcon className="mx-auto mb-3 h-10 w-10 text-green-500" />
          <p className="mb-1 font-semibold text-brand-800 dark:text-slate-100">Rien à réviser pour le moment !</p>
          <p className="text-sm text-brand-500 dark:text-slate-400">
            Continue les quiz de l&apos;Alphabet, des Chiffres, des Harakat, du Vocabulaire et des Noms d&apos;Allah :
            tes erreurs atterriront automatiquement ici.
          </p>
        </div>
      ) : result ? (
        <div className="rounded-2xl border border-brand-100 bg-white p-8 text-center shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <TrophyIcon className="mx-auto mb-3 h-10 w-10 text-sand-500 dark:text-amber-400" />
          <p className="mb-1 text-xl font-bold text-brand-800 dark:text-slate-100">
            Score : {result.score} / {result.total}
          </p>
          <p className="mb-5 text-sm text-brand-500 dark:text-slate-400">
            {totalWeak - result.score > 0
              ? `Il reste ${totalWeak - result.score} point${totalWeak - result.score > 1 ? 's' : ''} à retravailler.`
              : 'Tout est repassé au vert, bravo !'}
          </p>
          <Link
            to="/"
            className="inline-block rounded-full bg-brand-600 px-5 py-2 text-sm font-semibold text-white hover:bg-brand-700"
          >
            Retour à l&apos;accueil
          </Link>
        </div>
      ) : (
        <McqQuiz questions={questions} onFinish={(score, total) => setResult({ score, total })} onCorrectAnswer={handleCorrect} />
      )}
    </div>
  )
}
