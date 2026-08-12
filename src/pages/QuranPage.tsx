import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchSurahList, JUZ_AMMA_RANGE, type SurahMeta } from '../lib/quranApi'
import { useProgress } from '../store/progress'
import { usePageTitle } from '../lib/usePageTitle'
import {
  AlertTriangleIcon,
  BookmarkIcon,
  LandmarkIcon,
  PlayIcon,
  SproutIcon,
  Volume2Icon,
} from '../components/icons'

type Tab = 'surahs' | 'memorization'

export default function QuranPage() {
  usePageTitle('Récitation coranique')
  const [tab, setTab] = useState<Tab>('surahs')
  const [surahs, setSurahs] = useState<SurahMeta[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [showAll, setShowAll] = useState(false)

  const memorizedVerses = useProgress((s) => s.memorizedVerses)
  const unmarkVerseMemorized = useProgress((s) => s.unmarkVerseMemorized)
  const [playingKey, setPlayingKey] = useState<string | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    fetchSurahList()
      .then(setSurahs)
      .catch((e) => setError(e.message ?? 'Impossible de charger la liste des sourates.'))
  }, [])

  const visible = surahs?.filter((s) => showAll || (s.number >= JUZ_AMMA_RANGE.from && s.number <= JUZ_AMMA_RANGE.to))

  const memorizedBySurah = useMemo(() => {
    const map = new Map<number, { surahName: string; verses: typeof memorizedVerses }>()
    for (const v of memorizedVerses) {
      const entry = map.get(v.surahNumber)
      if (entry) entry.verses.push(v)
      else map.set(v.surahNumber, { surahName: v.surahName, verses: [v] })
    }
    for (const entry of map.values()) entry.verses.sort((a, b) => a.verseNumber - b.verseNumber)
    return Array.from(map.entries()).sort((a, b) => a[0] - b[0])
  }, [memorizedVerses])

  function playMemorized(key: string, audioUrl: string | null) {
    if (!audioUrl || !audioRef.current) return
    setPlayingKey(key)
    audioRef.current.src = audioUrl
    audioRef.current.play().catch(() => {})
  }

  return (
    <div>
      <div className="mb-1 flex flex-wrap items-center justify-between gap-3">
        <h1 className="flex items-center gap-2 text-2xl font-bold text-brand-800 dark:text-slate-100">
          <LandmarkIcon className="h-6 w-6 text-brand-600 dark:text-brand-400" /> Récitation coranique
        </h1>
        <div className="flex gap-2 rounded-full bg-brand-100 p-1 dark:bg-slate-800">
          <button
            onClick={() => setTab('surahs')}
            className={`rounded-full px-4 py-1.5 text-sm font-semibold transition ${
              tab === 'surahs' ? 'bg-white text-brand-700 shadow-sm dark:bg-slate-700 dark:text-slate-100' : 'text-brand-500 dark:text-slate-400'
            }`}
          >
            Sourates
          </button>
          <button
            onClick={() => setTab('memorization')}
            className={`rounded-full px-4 py-1.5 text-sm font-semibold transition ${
              tab === 'memorization' ? 'bg-white text-brand-700 shadow-sm dark:bg-slate-700 dark:text-slate-100' : 'text-brand-500 dark:text-slate-400'
            }`}
          >
            Mémorisation ({memorizedVerses.length})
          </button>
        </div>
      </div>

      {tab === 'surahs' && (
        <>
          <p className="mb-6 text-sm text-brand-500 dark:text-slate-400">
            Texte et audio fournis en direct par l&apos;API publique alquran.cloud (récitation de Mishary Alafasy).
            Une connexion Internet est nécessaire pour écouter.
          </p>

          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-start gap-2 rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm text-emerald-700 dark:border-emerald-900/50 dark:bg-emerald-950/30 dark:text-emerald-300">
              <SproutIcon className="h-4 w-4 shrink-0 translate-y-0.5" />
              <span>
                On te conseille de commencer par le <strong>Juz Amma</strong> (30e partie, sourates 78 à 114) : ce
                sont les sourates les plus courtes, idéales pour débuter.
              </span>
            </div>
            <button
              onClick={() => setShowAll((v) => !v)}
              className="shrink-0 rounded-full bg-brand-100 px-4 py-2 text-sm font-semibold text-brand-700 hover:bg-brand-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
            >
              {showAll ? 'Afficher Juz Amma' : 'Afficher les 114 sourates'}
            </button>
          </div>

          {error && (
            <div className="flex items-start gap-2 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-600 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-300">
              <AlertTriangleIcon className="h-4 w-4 shrink-0 translate-y-0.5" />
              <span>{error} Vérifie ta connexion Internet puis réessaie.</span>
            </div>
          )}

          {!error && !surahs && (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="h-24 animate-pulse rounded-2xl bg-brand-100 dark:bg-slate-800" />
              ))}
            </div>
          )}

          {visible && (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {visible.map((s) => (
                <Link
                  key={s.number}
                  to={`/coran/${s.number}`}
                  className="flex items-center justify-between gap-3 rounded-2xl border border-brand-100 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-700 dark:bg-slate-800"
                >
                  <div>
                    <p className="text-xs font-medium text-brand-400 dark:text-slate-500">
                      {s.number}. {s.revelationType === 'Meccan' ? 'Mecquoise' : 'Médinoise'} · {s.numberOfAyahs} versets
                    </p>
                    <p className="font-bold text-brand-800 dark:text-slate-100">{s.englishName}</p>
                    <p className="text-xs italic text-brand-400 dark:text-slate-500">{s.englishNameTranslation}</p>
                  </div>
                  <p className="font-arabic text-2xl text-brand-700 dark:text-slate-300">{s.name}</p>
                </Link>
              ))}
            </div>
          )}
        </>
      )}

      {tab === 'memorization' && (
        <div>
          <p className="mb-6 text-sm text-brand-500 dark:text-slate-400">
            Les versets que tu marques comme mémorisés (bouton <BookmarkIcon className="inline h-3.5 w-3.5" /> dans
            une sourate) apparaissent ici, groupés par sourate, pour réviser facilement.
          </p>

          <audio ref={audioRef} onEnded={() => setPlayingKey(null)} className="hidden" />

          {memorizedVerses.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-brand-200 bg-white p-8 text-center text-sm text-brand-400 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-500">
              Aucun verset mémorisé pour le moment. Ouvre une sourate et marque tes premiers versets !
            </div>
          ) : (
            <div className="space-y-6">
              {memorizedBySurah.map(([surahNumber, { surahName, verses }]) => (
                <section key={surahNumber}>
                  <div className="mb-2 flex items-center gap-2">
                    <Link
                      to={`/coran/${surahNumber}`}
                      className="text-sm font-bold text-brand-700 hover:underline dark:text-slate-200"
                    >
                      Sourate {surahNumber}
                    </Link>
                    <span className="font-arabic text-lg text-brand-500 dark:text-slate-400">{surahName}</span>
                  </div>
                  <div className="space-y-2">
                    {verses.map((v) => (
                      <div
                        key={v.key}
                        className="flex items-center gap-3 rounded-xl border border-brand-100 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800"
                      >
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sand-100 text-xs font-bold text-sand-600 dark:bg-amber-500/10 dark:text-amber-400">
                          {v.verseNumber}
                        </span>
                        <div className="flex-1">
                          <p className="arabic-xl text-right text-xl leading-relaxed text-brand-800 dark:text-slate-100">
                            {v.text}
                          </p>
                          {v.transliteration && (
                            <p className="mt-1 text-right text-xs italic text-brand-400 dark:text-slate-500">
                              {v.transliteration}
                            </p>
                          )}
                        </div>
                        <button
                          onClick={() => playMemorized(v.key, v.audioUrl)}
                          disabled={!v.audioUrl}
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white transition hover:bg-emerald-700 disabled:bg-brand-200 dark:disabled:bg-slate-700"
                          title="Écouter ce verset"
                        >
                          {playingKey === v.key ? <Volume2Icon className="h-4 w-4" /> : <PlayIcon className="h-4 w-4" />}
                        </button>
                        <button
                          onClick={() => unmarkVerseMemorized(v.key)}
                          className="shrink-0 text-xs font-medium text-brand-400 underline decoration-dotted hover:text-red-500 dark:text-slate-500"
                        >
                          Retirer
                        </button>
                      </div>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
