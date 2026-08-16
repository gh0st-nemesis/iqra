import { useEffect, useState } from 'react'
import type { WordExercise } from '../types'
import { useProgress } from '../store/progress'
import { speakArabic } from '../lib/tts'
import AudioButton from './AudioButton'
import WordDecomposeExercise from './WordDecomposeExercise'
import { CheckCircleIcon } from './icons'

interface DictationExerciseProps {
  words: WordExercise[]
  onFinish: () => void
}

// Mode "dictée" : contrairement à WordExerciseFlow (mot affiché en grand pendant la décomposition),
// ici le mot n'est révélé qu'une fois reconstitué — seule l'audio (TTS) guide l'utilisateur.
// Réutilise WordDecomposeExercise tel quel : ce composant ne montre jamais le mot cible lui-même,
// seulement des lettres mélangées à replacer dans l'ordre.
export default function DictationExercise({ words, onFinish }: DictationExerciseProps) {
  const [index, setIndex] = useState(0)
  const [solved, setSolved] = useState(false)
  const markWordRead = useProgress((s) => s.markWordRead)

  const word = words[index]
  const isLast = index === words.length - 1

  // Joue le mot dès qu'il apparaît, pour démarrer l'exercice sans clic supplémentaire (rejouable
  // ensuite via AudioButton).
  useEffect(() => {
    setSolved(false)
    const t = setTimeout(() => speakArabic(word.word, 0.6), 300)
    return () => clearTimeout(t)
  }, [word])

  function handleNext() {
    markWordRead(word.id)
    if (isLast) {
      onFinish()
      return
    }
    setIndex((i) => i + 1)
  }

  return (
    <div className="mx-auto max-w-xl rounded-2xl border border-brand-100 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
      <div className="mb-4 flex items-center justify-between text-xs font-medium text-brand-500 dark:text-slate-400">
        <span>
          Mot {index + 1} / {words.length}
        </span>
        <span>Dictée</span>
      </div>

      <div className="mb-5 flex flex-col items-center gap-2">
        <p className="text-sm text-brand-500 dark:text-slate-400">Écoute puis reconstitue le mot :</p>
        <AudioButton text={word.word} size="lg" rate={0.6} label="le mot à écrire" />
      </div>

      {solved ? (
        <div className="space-y-4 text-center">
          <CheckCircleIcon className="mx-auto h-8 w-8 text-green-500" />
          <p className="font-arabic text-4xl text-brand-800 dark:text-slate-100">{word.word}</p>
          <p className="text-sm text-brand-500 dark:text-slate-400">
            {word.transliteration} — {word.meaning}
          </p>
          <button
            onClick={handleNext}
            className="w-full rounded-xl bg-brand-600 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-700"
          >
            {isLast ? 'Terminer' : 'Mot suivant →'}
          </button>
        </div>
      ) : (
        <WordDecomposeExercise key={word.id} word={word.word} onComplete={() => setSolved(true)} />
      )}
    </div>
  )
}
