import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { modules } from '../data/modules'
import { vocabWords } from '../data/vocabulary'
import { namesOfAllah } from '../data/namesOfAllah'
import { prophets } from '../data/prophets'
import { surahIndex } from '../data/surahIndex'
import { HomeIcon, InfoIcon, LandmarkIcon, LayersIcon, RefreshIcon, ScrollIcon, SearchIcon, SettingsIcon, SparkleIcon, type IconProps } from './icons'
import { moduleIcons } from './moduleIcons'

interface PaletteItem {
  id: string
  label: string
  description?: string
  path: string
  icon: (props: IconProps) => JSX.Element
}

// Items affichés quand la palette s'ouvre sans recherche : pages et modules, en nombre raisonnable.
const browseItems: PaletteItem[] = [
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

// Items indexés pour la recherche plein texte mais absents de la liste de navigation par défaut
// (des centaines d'entrées : mots de vocabulaire, Noms d'Allah, prophètes, sourates) — on ne les
// filtre dans `results` que si l'utilisateur a tapé une requête, pour ne jamais les afficher tous
// d'un coup à l'ouverture de la palette.
const searchOnlyItems: PaletteItem[] = [
  ...vocabWords.map((w) => ({
    id: `vocab:${w.id}`,
    label: w.arabic,
    description: `Vocabulaire — ${w.meaning}`,
    path: '/vocabulaire',
    icon: LayersIcon,
  })),
  ...namesOfAllah.map((n) => ({
    id: `name:${n.id}`,
    label: `${n.transliteration} — ${n.arabic}`,
    description: `Nom d'Allah — ${n.meaning}`,
    path: '/noms-d-allah',
    icon: SparkleIcon,
  })),
  ...prophets.map((p) => ({
    id: `prophet:${p.id}`,
    label: `${p.name} — ${p.arabicName}`,
    description: 'Prophète',
    path: '/prophetes',
    icon: ScrollIcon,
  })),
  ...surahIndex.map((s) => ({
    id: `surah:${s.number}`,
    label: `${s.number}. ${s.englishName} — ${s.name}`,
    description: `Sourate — ${s.englishNameTranslation} · ${s.numberOfAyahs} versets`,
    path: `/coran/${s.number}`,
    icon: LandmarkIcon,
  })),
]

const MAX_RESULTS = 50

// Normalisation "phonétique" approximative pour retrouver une sourate/un nom malgré les variantes
// courantes de translittération : tirets/apostrophes différents, voyelles doublées ou non
// (Faatiha/Fatiha), "h" final de la tâ marbûta parfois omis (Baqara/Baqarah, Waaqia/Waqiah).
// N'affecte pas la recherche en écriture arabe (les lettres arabes ne matchent pas [a-z0-9] et sont
// donc simplement ignorées ici) ni la recherche exacte habituelle, utilisée comme premier filtre.
function normalizeLatinPhonetic(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ') // tirets, apostrophes, lettres arabes, accents... -> espace
    .replace(/(.)\1+/g, '$1') // voyelles/consonnes doublées -> une seule (aa -> a, qq -> q...)
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word.replace(/([aeiou])h$/, '$1')) // "h" final après voyelle -> supprimé
    .join(' ')
    .trim()
}

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
    if (!q) return browseItems
    const pool = [...browseItems, ...searchOnlyItems]
    // Repli phonétique : seulement si la requête normalisée reste assez longue, pour éviter qu'une
    // requête sans résultat (ex. répétition d'une seule lettre) ne finisse par tout matcher.
    const normQ = normalizeLatinPhonetic(q)
    const useFallback = normQ.length >= 3
    return pool
      .filter((i) => {
        const hay = `${i.label} ${i.description ?? ''}`.toLowerCase()
        if (hay.includes(q)) return true
        return useFallback && normalizeLatinPhonetic(hay).includes(normQ)
      })
      .slice(0, MAX_RESULTS)
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
