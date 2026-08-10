import { useMemo, useState } from 'react'
import { clusterArabicWord } from '../lib/arabic'
import { shuffle } from '../lib/quiz'

interface WordDecomposeExerciseProps {
  word: string
  onComplete: () => void
}

interface Chip {
  id: number
  text: string
}

export default function WordDecomposeExercise({ word, onComplete }: WordDecomposeExerciseProps) {
  const targetClusters = useMemo(() => clusterArabicWord(word), [word])
  const [chips] = useState<Chip[]>(() => shuffle(targetClusters.map((text, id) => ({ id, text }))))
  const [pickedIds, setPickedIds] = useState<number[]>([])
  const [errorChipId, setErrorChipId] = useState<number | null>(null)

  const nextIndex = pickedIds.length
  const usedIds = new Set(pickedIds)

  function handlePick(chip: Chip) {
    if (usedIds.has(chip.id) || nextIndex >= targetClusters.length) return
    if (chip.text === targetClusters[nextIndex]) {
      const next = [...pickedIds, chip.id]
      setPickedIds(next)
      if (next.length === targetClusters.length) {
        setTimeout(onComplete, 500)
      }
    } else {
      setErrorChipId(chip.id)
      setTimeout(() => setErrorChipId(null), 350)
    }
  }

  return (
    <div>
      <p className="mb-3 text-center text-xs font-medium text-brand-500 dark:text-slate-400">
        Touche les lettres dans l&apos;ordre pour reconstituer le mot :
      </p>
      <div className="mb-4 flex flex-wrap justify-center gap-2 rounded-xl bg-sand-50 dark:bg-slate-700/50 p-4" dir="rtl">
        {targetClusters.map((_, i) => {
          const chipId = pickedIds[i]
          const chip = chipId !== undefined ? chips.find((c) => c.id === chipId) : undefined
          return (
            <span
              key={i}
              className={`flex h-12 w-12 items-center justify-center rounded-lg border-2 font-arabic text-2xl ${
                chip ? 'border-brand-300 bg-white dark:bg-slate-800 text-brand-800 dark:text-slate-100' : 'border-dashed border-brand-200 dark:border-slate-600'
              }`}
            >
              {chip?.text ?? ''}
            </span>
          )
        })}
      </div>
      <div className="flex flex-wrap justify-center gap-2" dir="rtl">
        {chips.map((chip) => {
          const used = usedIds.has(chip.id)
          return (
            <button
              key={chip.id}
              onClick={() => handlePick(chip)}
              disabled={used}
              className={`flex h-12 w-12 items-center justify-center rounded-lg border-2 font-arabic text-2xl transition ${
                used
                  ? 'invisible'
                  : errorChipId === chip.id
                    ? 'border-red-400 bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-300'
                    : 'border-brand-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-brand-700 dark:text-slate-200 hover:border-brand-400'
              }`}
            >
              {chip.text}
            </button>
          )
        })}
      </div>
    </div>
  )
}
