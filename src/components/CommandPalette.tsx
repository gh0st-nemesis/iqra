import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { modules } from '../data/modules'
import { HomeIcon, InfoIcon, RefreshIcon, SearchIcon, SettingsIcon, moduleIcons, type IconProps } from './icons'

interface PaletteItem {
  id: string
  label: string
  description?: string
  path: string
  icon: (props: IconProps) => JSX.Element
}

const staticItems: PaletteItem[] = [
  { id: 'home', label: 'Accueil', path: '/', icon: HomeIcon },
  ...modules.map((m) => ({
    id: m.id,
    label: m.title,
    description: m.description,
    path: m.path,
    icon: moduleIcons[m.icon],
  })),
  { id: 'revision', label: 'Révision', description: 'Quiz ciblé sur tes points faibles', path: '/revision', icon: RefreshIcon },
  { id: 'profil', label: 'Profil', description: 'Progression, badges, réglages', path: '/profil', icon: SettingsIcon },
  { id: 'about', label: 'À propos', description: "Posture éditoriale, sources", path: '/a-propos', icon: InfoIcon },
]

interface CommandPaletteProps {
  open: boolean
  onClose: () => void
}

export default function CommandPalette({ open, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const navigate = useNavigate()
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return staticItems
    return staticItems.filter(
      (i) => i.label.toLowerCase().includes(q) || i.description?.toLowerCase().includes(q),
    )
  }, [query])

  useEffect(() => {
    if (!open) return
    setQuery('')
    setActiveIndex(0)
    const t = setTimeout(() => inputRef.current?.focus(), 0)
    return () => clearTimeout(t)
  }, [open])

  useEffect(() => {
    setActiveIndex(0)
  }, [query])

  useEffect(() => {
    const el = listRef.current?.children[activeIndex] as HTMLElement | undefined
    el?.scrollIntoView({ block: 'nearest' })
  }, [activeIndex])

  function select(item: PaletteItem) {
    navigate(item.path)
    onClose()
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Escape') {
      onClose()
      return
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIndex((i) => Math.min(i + 1, results.length - 1))
      return
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex((i) => Math.max(i - 1, 0))
      return
    }
    if (e.key === 'Enter') {
      e.preventDefault()
      const item = results[activeIndex]
      if (item) select(item)
    }
  }

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[60] flex items-start justify-center bg-slate-900/50 px-4 pt-[12vh]"
      onClick={onClose}
      aria-hidden
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Recherche rapide"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg overflow-hidden rounded-2xl border border-brand-100 bg-white shadow-xl dark:border-slate-700 dark:bg-slate-800"
      >
        <div className="flex items-center gap-2 border-b border-brand-100 px-4 py-3 dark:border-slate-700">
          <SearchIcon className="h-4 w-4 shrink-0 text-brand-400 dark:text-slate-500" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Aller à… (module, page)"
            className="w-full bg-transparent text-sm text-brand-800 outline-none placeholder:text-brand-400 dark:text-slate-100 dark:placeholder:text-slate-500"
          />
          <kbd className="hidden shrink-0 rounded border border-brand-200 px-1.5 py-0.5 text-[10px] font-semibold text-brand-400 dark:border-slate-600 dark:text-slate-500 sm:block">
            Échap
          </kbd>
        </div>

        <div ref={listRef} className="max-h-[50vh] overflow-y-auto p-2">
          {results.length === 0 ? (
            <p className="px-3 py-6 text-center text-sm text-brand-500 dark:text-slate-400">
              Aucun résultat pour « {query} ».
            </p>
          ) : (
            results.map((item, i) => {
              const Icon = item.icon
              const isActive = i === activeIndex
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => select(item)}
                  onMouseEnter={() => setActiveIndex(i)}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition ${
                    isActive
                      ? 'bg-brand-600 text-white'
                      : 'text-brand-700 hover:bg-brand-50 dark:text-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-medium">{item.label}</span>
                    {item.description && (
                      <span className={`block truncate text-xs ${isActive ? 'text-brand-100' : 'text-brand-400 dark:text-slate-500'}`}>
                        {item.description}
                      </span>
                    )}
                  </span>
                </button>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}
