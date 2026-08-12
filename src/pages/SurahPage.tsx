import { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { fetchSurahDetail, getSurahAudioDownloadUrl, type SurahDetail } from '../lib/quranApi'
import { useProgress } from '../store/progress'
import { usePageTitle } from '../lib/usePageTitle'
import {
  AlertTriangleIcon,
  ArrowLeftIcon,
  BookmarkIcon,
  CheckIcon,
  DownloadIcon,
  PlayIcon,
  Volume2Icon,
} from '../components/icons'

// Au-delà de ce nombre de versets, on prévient que le mp3 complet peut être volumineux (seul le
// débit 128 kbps est disponible pour le téléchargement par sourate, voir lib/quranApi.ts).
const LARGE_SURAH_AYAH_THRESHOLD = 40

export default function SurahPage() {
  const { number } = useParams<{ number: string }>()
  const surahNumber = Number(number)

  const [surah, setSurah] = useState<SurahDetail | null>(null)
  usePageTitle(surah ? `Sourate ${surah.englishName}` : 'Récitation coranique')
  const [error, setError] = useState<string | null>(null)
  const [playingVerse, setPlayingVerse] = useState<number | null>(null)
  const [autoPlay, setAutoPlay] = useState(false)
  const [showPhonetic, setShowPhonetic] = useState(true)

  const audioRef = useRef<HTMLAudioElement | null>(null)
  const markVerseListened = useProgress((s) => s.markVerseListened)
  const versesListened = useProgress((s) => s.quranVersesListened)
  const memorizedVerses = useProgress((s) => s.memorizedVerses)
  const markVerseMemorized = useProgress((s) => s.markVerseMemorized)
  const unmarkVerseMemorized = useProgress((s) => s.unmarkVerseMemorized)

  useEffect(() => {
    setSurah(null)
    setError(null)
    fetchSurahDetail(surahNumber)
      .then(setSurah)
      .catch((e) => setError(e.message ?? 'Impossible de charger cette sourate.'))
  }, [surahNumber])

  function playVerse(verseNumber: number, chainNext: boolean) {
    const verse = surah?.verses.find((v) => v.numberInSurah === verseNumber)
    if (!verse?.audioUrl) return
    setAutoPlay(chainNext)
    setPlayingVerse(verseNumber)
    markVerseListened(`${surahNumber}:${verseNumber}`)
    if (audioRef.current) {
      audioRef.current.src = verse.audioUrl
      audioRef.current.play().catch(() => {})
    }
  }

  function handleAudioEnded() {
    if (!autoPlay || !surah || playingVerse === null) {
      setPlayingVerse(null)
      return
    }
    const next = surah.verses.find((v) => v.numberInSurah === playingVerse + 1)
    if (next) {
      playVerse(next.numberInSurah, true)
    } else {
      setPlayingVerse(null)
      setAutoPlay(false)
    }
  }

  function toggleMemorized(verseNumber: number, text: string, transliteration: string | null, audioUrl: string | null) {
    if (!surah) return
    const key = `${surahNumber}:${verseNumber}`
    if (memorizedVerses.some((v) => v.key === key)) {
      unmarkVerseMemorized(key)
    } else {
      markVerseMemorized({ key, surahNumber, surahName: surah.name, verseNumber, text, transliteration, audioUrl })
    }
  }

  return (
    <div>
      <Link
        to="/coran"
        className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-brand-500 hover:text-brand-700 dark:text-slate-400 dark:hover:text-slate-200"
      >
        <ArrowLeftIcon className="h-4 w-4" /> Retour aux sourates
      </Link>

      {error && (
        <div className="flex items-center gap-2 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-600 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-300">
          <AlertTriangleIcon className="h-4 w-4 shrink-0" /> {error}
        </div>
      )}

      {!error && !surah && <div className="h-40 animate-pulse rounded-2xl bg-brand-100 dark:bg-slate-800" />}

      {surah && (
        <>
          <div className="mb-6 rounded-3xl bg-gradient-to-br from-emerald-600 to-emerald-800 px-6 py-8 text-white shadow-lg">
            <p className="mb-1 text-sm text-emerald-100">
              Sourate {surah.number} · {surah.revelationType === 'Meccan' ? 'Mecquoise' : 'Médinoise'} ·{' '}
              {surah.numberOfAyahs} versets
            </p>
            <h1 className="mb-1 font-arabic text-4xl">{surah.name}</h1>
            <p className="font-semibold text-emerald-50">{surah.englishName}</p>
            <p className="text-sm italic text-emerald-200">{surah.englishNameTranslation}</p>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <button
                onClick={() => playVerse(1, true)}
                className="flex items-center gap-1.5 rounded-full bg-white/15 px-5 py-2 text-sm font-semibold backdrop-blur transition hover:bg-white/25"
              >
                <PlayIcon className="h-4 w-4" /> Écouter toute la sourate
              </button>
              <button
                onClick={() => setShowPhonetic((v) => !v)}
                className="flex items-center gap-1.5 rounded-full bg-white/15 px-5 py-2 text-sm font-semibold backdrop-blur transition hover:bg-white/25"
              >
                {showPhonetic ? 'Masquer la phonétique' : 'Afficher la phonétique'}
              </button>
              <a
                href={getSurahAudioDownloadUrl(surahNumber)}
                download={`sourate-${surah.number}-${surah.englishName}.mp3`}
                className="flex items-center gap-1.5 rounded-full bg-white/15 px-5 py-2 text-sm font-semibold backdrop-blur transition hover:bg-white/25"
              >
                <DownloadIcon className="h-4 w-4" /> Télécharger le mp3
              </a>
            </div>
            {surah.numberOfAyahs > LARGE_SURAH_AYAH_THRESHOLD && (
              <p className="mt-2 text-xs text-emerald-100/80">
                Sourate longue : le fichier peut peser plusieurs dizaines de Mo.
              </p>
            )}
          </div>

          <audio ref={audioRef} onEnded={handleAudioEnded} className="hidden" />

          <div className="space-y-3">
            {surah.verses.map((verse) => {
              const key = `${surahNumber}:${verse.numberInSurah}`
              const isPlaying = playingVerse === verse.numberInSurah
              const isListened = versesListened.includes(key)
              const isMemorized = memorizedVerses.some((v) => v.key === key)
              return (
                <div
                  key={verse.numberInSurah}
                  className={`rounded-2xl border p-5 shadow-sm transition ${
                    isPlaying
                      ? 'border-emerald-400 bg-emerald-50 dark:border-emerald-600 dark:bg-emerald-950/30'
                      : 'border-brand-100 bg-white dark:border-slate-700 dark:bg-slate-800'
                  }`}
                >
                  <div className="mb-3 flex items-center justify-between">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-100 text-xs font-bold text-brand-700 dark:bg-slate-700 dark:text-slate-200">
                      {verse.numberInSurah}
                    </span>
                    <div className="flex items-center gap-2">
                      {isListened && (
                        <span className="flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400">
                          <CheckIcon className="h-3.5 w-3.5" /> écouté
                        </span>
                      )}
                      <button
                        onClick={() =>
                          toggleMemorized(verse.numberInSurah, verse.text, verse.transliteration, verse.audioUrl)
                        }
                        className={`flex h-9 w-9 items-center justify-center rounded-full border-2 transition ${
                          isMemorized
                            ? 'border-sand-400 bg-sand-100 text-sand-600 dark:border-amber-500 dark:bg-amber-500/10 dark:text-amber-400'
                            : 'border-brand-100 text-brand-400 hover:border-sand-300 hover:text-sand-500 dark:border-slate-700 dark:text-slate-500 dark:hover:border-amber-600 dark:hover:text-amber-500'
                        }`}
                        title={isMemorized ? 'Retirer de la mémorisation' : 'Marquer comme mémorisé'}
                      >
                        <BookmarkIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => playVerse(verse.numberInSurah, false)}
                        disabled={!verse.audioUrl}
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-600 text-white transition hover:bg-emerald-700 disabled:bg-brand-200 dark:disabled:bg-slate-700"
                        title="Écouter ce verset"
                      >
                        {isPlaying ? <Volume2Icon className="h-4 w-4" /> : <PlayIcon className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  <p className="arabic-xl text-right text-3xl leading-loose text-brand-800 dark:text-slate-100">
                    {verse.text}
                  </p>
                  {showPhonetic && verse.transliteration && (
                    <p className="mt-2 text-sm italic text-brand-500 dark:text-slate-400">{verse.transliteration}</p>
                  )}
                </div>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}
