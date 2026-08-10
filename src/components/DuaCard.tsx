import type { RitualDua } from '../types'
import AudioButton from './AudioButton'

interface DuaCardProps {
  dua: RitualDua
  repeat?: number
}

export default function DuaCard({ dua, repeat }: DuaCardProps) {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-sand-50 dark:bg-slate-700/50 p-3">
      <AudioButton text={dua.arabic} size="sm" rate={0.65} />
      <div className="flex-1">
        <p className="arabic-xl text-xl text-brand-800 dark:text-slate-100">{dua.arabic}</p>
        <p className="text-xs text-brand-500 dark:text-slate-400">
          {dua.transliteration}
          {repeat && repeat > 1 ? ` — × ${repeat}` : ''}
        </p>
        <p className="text-xs italic text-brand-400 dark:text-slate-500">{dua.meaning}</p>
      </div>
    </div>
  )
}
