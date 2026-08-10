import { useEffect, useMemo, useState } from 'react'
import { adhkarCategories, adhkarItems } from '../data/adhkar'
import type { AdhkarCategory } from '../types'
import { useProgress } from '../store/progress'
import DuaCard from '../components/DuaCard'
import { usePageTitle } from '../lib/usePageTitle'
import { BookmarkIcon, SunMoonIcon } from '../components/icons'

export default function AdhkarPage() {
  usePageTitle('Adhkar')
  const [category, setCategory] = useState<AdhkarCategory>('matin')
  const adhkarSeen = useProgress((s) => s.adhkarSeen)
  const markAdhkarSeen = useProgress((s) => s.markAdhkarSeen)

  const items = useMemo(() => adhkarItems.filter((a) => a.category === category), [category])

  useEffect(() => {
    items.forEach((a) => markAdhkarSeen(a.id))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category])

  return (
    <div>
      <h1 className="mb-1 flex items-center gap-2 text-2xl font-bold text-brand-800 dark:text-slate-100">
        <SunMoonIcon className="h-6 w-6 text-brand-600 dark:text-slate-300" /> Adhkar — les invocations du quotidien
      </h1>
      <p className="mb-6 text-sm text-brand-500 dark:text-slate-400">
        {adhkarSeen.length} / {adhkarItems.length} invocations consultées — une sélection non-exhaustive pour
        commencer à mémoriser les adhkar du quotidien.
      </p>

      <div className="mb-6 flex flex-wrap gap-2 rounded-full bg-brand-100 dark:bg-slate-700 p-1 w-fit">
        {adhkarCategories.map((c) => (
          <button
            key={c.id}
            onClick={() => setCategory(c.id)}
            className={`rounded-full px-4 py-1.5 text-sm font-semibold transition ${
              category === c.id ? 'bg-white dark:bg-slate-800 text-brand-700 dark:text-slate-200 shadow-sm' : 'text-brand-500 dark:text-slate-400'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="rounded-2xl border border-brand-100 dark:border-slate-700 bg-white dark:bg-slate-800 p-5 shadow-sm">
            <div className="mb-3 flex items-center justify-between gap-2">
              <h3 className="font-bold text-brand-800 dark:text-slate-100">{item.title}</h3>
              {item.quranRef && (
                <span className="flex shrink-0 items-center gap-1 rounded-full bg-sand-100 dark:bg-slate-700 px-2 py-0.5 text-xs font-semibold text-sand-600 dark:text-amber-300">
                  <BookmarkIcon className="h-3 w-3" /> {item.quranRef.label}
                </span>
              )}
            </div>
            <DuaCard dua={item.dua} repeat={item.repeat} />
          </div>
        ))}
      </div>
    </div>
  )
}
