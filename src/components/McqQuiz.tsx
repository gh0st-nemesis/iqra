import { useMemo, useState } from 'react'
import { ArrowLeftIcon, CheckCircleIcon, XCircleIcon } from './icons'

export interface McqQuestion {
  id: string
  prompt: string // texte affiché (peut être arabe)
  promptIsArabic?: boolean
  choices: string[]
  correctChoice: string
}

interface McqQuizProps {
  questions: McqQuestion[]
  onFinish: (score: number, total: number) => void
  onCorrectAnswer?: (id: string) => void
  onWrongAnswer?: (id: string) => void
}

export default function McqQuiz({ questions, onFinish, onCorrectAnswer, onWrongAnswer }: McqQuizProps) {
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState<string | null>(null)
  const [score, setScore] = useState(0)

  const question = questions[index]
  const isLast = index === questions.length - 1

  const feedback = useMemo(() => {
    if (selected === null) return null
    return selected === question.correctChoice ? 'correct' : 'incorrect'
  }, [selected, question])

  function handleChoice(choice: string) {
    if (selected !== null) return
    setSelected(choice)
    if (choice === question.correctChoice) {
      setScore((s) => s + 1)
      onCorrectAnswer?.(question.id)
    } else {
      onWrongAnswer?.(question.id)
    }
  }

  function handleNext() {
    if (isLast) {
      onFinish(score, questions.length)
      return
    }
    setIndex((i) => i + 1)
    setSelected(null)
  }

  return (
    <div className="rounded-2xl border border-brand-100 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
      <div className="mb-4 flex items-center justify-between text-xs font-medium text-brand-500 dark:text-slate-400">
        <span>
          Question {index + 1} / {questions.length}
        </span>
        <span>Score : {score}</span>
      </div>

      <div
        className={`mb-6 text-center ${
          question.promptIsArabic
            ? 'arabic-xl text-5xl text-brand-800 dark:text-slate-100'
            : 'text-xl font-semibold text-brand-800 dark:text-slate-100'
        }`}
      >
        {question.prompt}
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {question.choices.map((choice) => {
          const isCorrectChoice = choice === question.correctChoice
          const isSelected = choice === selected
          let stateClasses =
            'border-brand-100 hover:border-brand-300 hover:bg-brand-50 dark:border-slate-600 dark:hover:border-slate-500 dark:hover:bg-slate-700'
          if (selected !== null) {
            if (isCorrectChoice)
              stateClasses = 'border-green-500 bg-green-50 text-green-700 dark:bg-green-500/10 dark:text-green-400'
            else if (isSelected)
              stateClasses = 'border-red-400 bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400'
            else stateClasses = 'border-brand-100 opacity-60 dark:border-slate-700'
          }
          return (
            <button
              key={choice}
              type="button"
              onClick={() => handleChoice(choice)}
              className={`rounded-xl border-2 px-3 py-3 text-lg font-semibold text-brand-800 transition dark:text-slate-100 ${stateClasses}`}
            >
              {choice}
            </button>
          )
        })}
      </div>

      {feedback && (
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <p
            className={`flex items-center gap-1.5 text-sm font-medium ${
              feedback === 'correct' ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400'
            }`}
          >
            {feedback === 'correct' ? (
              <>
                <CheckCircleIcon className="h-4 w-4" /> Bonne réponse !
              </>
            ) : (
              <>
                <XCircleIcon className="h-4 w-4" /> La bonne réponse était : {question.correctChoice}
              </>
            )}
          </p>
          <button
            type="button"
            onClick={handleNext}
            className="flex items-center gap-1.5 rounded-full bg-brand-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-brand-700"
          >
            {isLast ? 'Terminer' : 'Suivant'}
            {!isLast && <ArrowLeftIcon className="h-4 w-4 rotate-180" />}
          </button>
        </div>
      )}
    </div>
  )
}
