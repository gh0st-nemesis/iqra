import { useState } from 'react'
import type { WordExercise } from '../types'
import { useProgress } from '../store/progress'
import AudioButton from './AudioButton'
import WordDecomposeExercise from './WordDecomposeExercise'
import PronunciationPractice from './PronunciationPractice'

interface WordExerciseFlowProps {
  words: WordExercise[]
  onFinish: () => void
}

type Step = 'decompose' | 'pronounce'

function stepFor(word: WordExercise): Step {
  // Les expressions à plusieurs mots (ex. bismillah) passent directement à la prononciation.
  return word.word.includes(' ') ? 'pronounce' : 'decompose'
}

export default function WordExerciseFlow({ words, onFinish }: WordExerciseFlowProps) {
  const [index, setIndex] = useState(0)
  const [step, setStep] = useState<Step>(stepFor(words[0]))
  const markWordRead = useProgress((s) => s.markWordRead)

  const word = words[index]
  const isLast = index === words.length - 1

  function handleNext() {
    markWordRead(word.id)
    if (isLast) {
      onFinish()
      return
    }
    const next = words[index + 1]
    setIndex((i) => i + 1)
    setStep(stepFor(next))
  }

  return (
    <div className="mx-auto max-w-xl rounded-2xl border border-brand-100 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between text-xs font-medium text-brand-500 dark:text-slate-400">
        <span>
          Mot {index + 1} / {words.length}
        </span>
        <span>{step === 'decompose' ? '1. Lettres' : '2. Prononciation'}</span>
      </div>

      <div className="mb-5 flex items-center justify-center gap-3">
        <span className="font-arabic text-5xl text-brand-800 dark:text-slate-100">{word.word}</span>
        <AudioButton text={word.word} size="md" rate={0.6} />
      </div>

      {step === 'decompose' ? (
        <WordDecomposeExercise key={word.id} word={word.word} onComplete={() => setStep('pronounce')} />
      ) : (
        <div className="space-y-4">
          <PronunciationPractice key={word.id} text={word.word} />
          <div className="rounded-xl bg-brand-50 dark:bg-slate-700/50 p-3 text-center text-sm text-brand-600 dark:text-slate-300">
            {word.transliteration} — {word.meaning}
          </div>
          <button
            onClick={handleNext}
            className="w-full rounded-xl bg-brand-600 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-700"
          >
            {isLast ? 'Terminer' : 'Mot suivant →'}
          </button>
        </div>
      )}
    </div>
  )
}
