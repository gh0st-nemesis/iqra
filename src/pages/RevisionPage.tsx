import { useState } from 'react'
import { Link } from 'react-router-dom'
import { alphabet } from '../data/alphabet'
import { numbers } from '../data/numbers'
import { harakat } from '../data/harakat'
import { readingWords } from '../data/reading'
import { vocabWords } from '../data/vocabulary'
import { namesOfAllah } from '../data/namesOfAllah'
import { useProgress, todayISO } from '../store/progress'
import type { MemorizedVerse } from '../types'
import { isDue, type SrsCard, type SrsQuality } from '../lib/srs'
import McqQuiz, { type McqQuestion } from '../components/McqQuiz'
import { buildChoices, shuffle } from '../lib/quiz'
import { usePageTitle } from '../lib/usePageTitle'
import { CheckCircleIcon, RefreshIcon, RepeatIcon, TrophyIcon } from '../components/icons'

const MAX_QUESTIONS = 15

type RevisionTab = 'quiz' | 'srs'

interface SrsQueueItem {
  srsId: string
  front: string
  back: string
  meta: string
}

// Construit la file des cartes dues aujourd'hui (versets mémorisés + vocabulaire maîtrisé),
// à partir des cartes SM-2 stockées et des données correspondantes.
function buildSrsQueue(srsCards: Record<string, SrsCard>, memorizedVerses: MemorizedVerse[], today: string): SrsQueueItem[] {
  const verseByKey = new Map(memorizedVerses.map((v) => [v.key, v]))
  const items: SrsQueueItem[] = []

  for (const [srsId, card] of Object.entries(srsCards)) {
    if (!isDue(card, today)) continue

    if (srsId.startsWith('verse:')) {
      const verse = verseByKey.get(srsId.slice('verse:'.length))
      if (!verse) continue
      items.push({
        srsId,
        front: verse.text,
        back: verse.transliteration ?? '(pas de translittération enregistrée)',
        meta: `${verse.surahName} · verset ${verse.verseNumber}`,
      })
    } else if (srsId.startsWith('vocab:')) {
      const word = vocabWords.find((w) => w.id === srsId.slice('vocab:'.length))
      if (!word) continue
      items.push({ srsId, front: word.arabic, back: word.meaning, meta: word.transliteration })
    }
  }

  return items
}

function buildQuestions(
  weakLetters: string[],
  weakNumbers: string[],
  weakHarakat: string[],
  weakVocab: string[],
  weakNames: string[],
  weakWords: string[],
): McqQuestion[] {
  const letterQuestions: McqQuestion[] = weakLetters
    .map((id) => alphabet.find((l) => l.id === id))
    .filter((l): l is NonNullable<typeof l> => !!l)
    .map((letter) => ({
      id: `letter:${letter.id}`,
      prompt: letter.char,
      promptIsArabic: true,
      choices: buildChoices(
        letter.transliteration,
        alphabet.map((l) => l.transliteration),
      ),
      correctChoice: letter.transliteration,
    }))

  const numberQuestions: McqQuestion[] = weakNumbers
    .map((id) => numbers.find((n) => n.id === id))
    .filter((n): n is NonNullable<typeof n> => !!n)
    .map((n) => ({
      id: `number:${n.id}`,
      prompt: n.digit,
      promptIsArabic: true,
      choices: buildChoices(
        String(n.value),
        numbers.map((x) => String(x.value)),
      ),
      correctChoice: String(n.value),
    }))

  const harakaQuestions: McqQuestion[] = weakHarakat
    .map((id) => harakat.find((h) => h.id === id))
    .filter((h): h is NonNullable<typeof h> => !!h)
    .map((h) => ({
      id: `haraka:${h.id}`,
      prompt: h.demoResult,
      promptIsArabic: true,
      choices: buildChoices(
        h.demoTransliteration,
        harakat.map((x) => x.demoTransliteration),
      ),
      correctChoice: h.demoTransliteration,
    }))

  const vocabQuestions: McqQuestion[] = weakVocab
    .map((id) => vocabWords.find((w) => w.id === id))
    .filter((w): w is NonNullable<typeof w> => !!w)
    .map((w) => ({
      id: `vocab:${w.id}`,
      prompt: w.arabic,
      promptIsArabic: true,
      choices: buildChoices(
        w.meaning,
        vocabWords.map((x) => x.meaning),
      ),
      correctChoice: w.meaning,
    }))

  const nameQuestions: McqQuestion[] = weakNames
    .map((id) => namesOfAllah.find((n) => n.id === id))
    .filter((n): n is NonNullable<typeof n> => !!n)
    .map((n) => ({
      id: `name:${n.id}`,
      prompt: n.arabic,
      promptIsArabic: true,
      choices: buildChoices(
        n.meaning,
        namesOfAllah.map((x) => x.meaning),
      ),
      correctChoice: n.meaning,
    }))

  const wordQuestions: McqQuestion[] = weakWords
    .map((id) => readingWords.find((w) => w.id === id))
    .filter((w): w is NonNullable<typeof w> => !!w)
    .map((w) => ({
      id: `word:${w.id}`,
      prompt: w.word,
      promptIsArabic: true,
      choices: buildChoices(
        w.meaning,
        readingWords.map((x) => x.meaning),
      ),
      correctChoice: w.meaning,
    }))

  return shuffle([
    ...letterQuestions,
    ...numberQuestions,
    ...harakaQuestions,
    ...vocabQuestions,
    ...nameQuestions,
    ...wordQuestions,
  ]).slice(0, MAX_QUESTIONS)
}

export default function RevisionPage() {
  usePageTitle('Révision')
  const [tab, setTab] = useState<RevisionTab>('quiz')

  const weakLetters = useProgress((s) => s.weakLetters)
  const weakNumbers = useProgress((s) => s.weakNumbers)
  const weakHarakat = useProgress((s) => s.weakHarakat)
  const weakVocab = useProgress((s) => s.weakVocab)
  const weakNames = useProgress((s) => s.weakNames)
  const weakWords = useProgress((s) => s.weakWords)
  const markLetterMastered = useProgress((s) => s.markLetterMastered)
  const markNumberMastered = useProgress((s) => s.markNumberMastered)
  const clearHarakaWeak = useProgress((s) => s.clearHarakaWeak)
  const markVocabMastered = useProgress((s) => s.markVocabMastered)
  const markNameMastered = useProgress((s) => s.markNameMastered)
  const markWordMastered = useProgress((s) => s.markWordMastered)

  const srsCards = useProgress((s) => s.srsCards)
  const memorizedVerses = useProgress((s) => s.memorizedVerses)
  const reviewSrsCard = useProgress((s) => s.reviewSrsCard)

  const [questions] = useState<McqQuestion[]>(() =>
    buildQuestions(weakLetters, weakNumbers, weakHarakat, weakVocab, weakNames, weakWords),
  )
  const [result, setResult] = useState<{ score: number; total: number } | null>(null)

  const [srsQueue] = useState<SrsQueueItem[]>(() => buildSrsQueue(srsCards, memorizedVerses, todayISO()))
  const [srsIndex, setSrsIndex] = useState(0)
  const [srsRevealed, setSrsRevealed] = useState(false)
  const currentSrsItem = srsQueue[srsIndex]

  function handleSrsReview(quality: SrsQuality) {
    if (!currentSrsItem) return
    reviewSrsCard(currentSrsItem.srsId, quality)
    setSrsRevealed(false)
    setSrsIndex((i) => i + 1)
  }

  function handleCorrect(taggedId: string) {
    const [category, id] = taggedId.split(':')
    if (category === 'letter') markLetterMastered(id)
    else if (category === 'number') markNumberMastered(id)
    else if (category === 'haraka') clearHarakaWeak(id)
    else if (category === 'vocab') markVocabMastered(id)
    else if (category === 'name') markNameMastered(id)
    else if (category === 'word') markWordMastered(id)
  }

  const totalWeak =
    weakLetters.length + weakNumbers.length + weakHarakat.length + weakVocab.length + weakNames.length + weakWords.length

  return (
    <div className="mx-auto max-w-xl">
      <h1 className="mb-1 flex items-center gap-2 text-2xl font-bold text-brand-800 dark:text-slate-100">
        <RefreshIcon className="h-6 w-6 text-brand-600 dark:text-brand-400" /> Révision
      </h1>
      <p className="mb-6 text-sm text-brand-500 dark:text-slate-400">
        Un quiz ciblé sur tes erreurs récentes, et une file de répétition espacée pour ancrer durablement le hifz et
        le vocabulaire déjà maîtrisés.
      </p>

      <div className="mb-6 flex gap-2 rounded-full bg-brand-100 p-1 dark:bg-slate-800">
        <button
          onClick={() => setTab('quiz')}
          className={`flex-1 rounded-full px-4 py-1.5 text-sm font-semibold transition ${
            tab === 'quiz' ? 'bg-white text-brand-700 shadow-sm dark:bg-slate-700 dark:text-slate-100' : 'text-brand-500 dark:text-slate-400'
          }`}
        >
          Quiz ciblé
        </button>
        <button
          onClick={() => setTab('srs')}
          className={`flex-1 rounded-full px-4 py-1.5 text-sm font-semibold transition ${
            tab === 'srs' ? 'bg-white text-brand-700 shadow-sm dark:bg-slate-700 dark:text-slate-100' : 'text-brand-500 dark:text-slate-400'
          }`}
        >
          Répétition espacée ({srsQueue.length})
        </button>
      </div>

      {tab === 'srs' && (
        <div>
          {srsQueue.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-brand-200 bg-white p-8 text-center dark:border-slate-700 dark:bg-slate-800">
              <CheckCircleIcon className="mx-auto mb-3 h-10 w-10 text-green-500" />
              <p className="mb-1 font-semibold text-brand-800 dark:text-slate-100">Rien à réviser aujourd&apos;hui !</p>
              <p className="text-sm text-brand-500 dark:text-slate-400">
                Les versets marqués mémorisés (module Coran) et le vocabulaire maîtrisé entrent automatiquement dans
                une file de révision espacée : reviens ici quand une carte arrivera à échéance.
              </p>
            </div>
          ) : srsIndex >= srsQueue.length ? (
            <div className="rounded-2xl border border-brand-100 bg-white p-8 text-center shadow-sm dark:border-slate-700 dark:bg-slate-800">
              <TrophyIcon className="mx-auto mb-3 h-10 w-10 text-sand-500 dark:text-amber-400" />
              <p className="mb-1 text-xl font-bold text-brand-800 dark:text-slate-100">
                {srsQueue.length} carte{srsQueue.length > 1 ? 's' : ''} révisée{srsQueue.length > 1 ? 's' : ''} !
              </p>
              <p className="mb-5 text-sm text-brand-500 dark:text-slate-400">
                La prochaine échéance de chacune a été recalculée automatiquement.
              </p>
              <Link
                to="/"
                className="inline-block rounded-full bg-brand-600 px-5 py-2 text-sm font-semibold text-white hover:bg-brand-700"
              >
                Retour à l&apos;accueil
              </Link>
            </div>
          ) : (
            <div className="rounded-2xl border border-brand-100 bg-white p-8 text-center shadow-sm dark:border-slate-700 dark:bg-slate-800">
              <p className="mb-3 flex items-center justify-center gap-1.5 text-xs font-medium text-brand-400 dark:text-slate-500">
                <RepeatIcon className="h-3.5 w-3.5" /> {currentSrsItem.meta}
              </p>
              <p className="arabic-xl mb-6 text-right text-2xl leading-relaxed text-brand-800 dark:text-slate-100">
                {currentSrsItem.front}
              </p>

              {srsRevealed ? (
                <>
                  <p className="mb-6 text-sm italic text-brand-600 dark:text-slate-300">{currentSrsItem.back}</p>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                    <button
                      onClick={() => handleSrsReview('again')}
                      className="rounded-full bg-red-100 px-3 py-2 text-xs font-semibold text-red-700 hover:bg-red-200 dark:bg-red-950/40 dark:text-red-300"
                    >
                      Encore
                    </button>
                    <button
                      onClick={() => handleSrsReview('hard')}
                      className="rounded-full bg-amber-100 px-3 py-2 text-xs font-semibold text-amber-700 hover:bg-amber-200 dark:bg-amber-950/40 dark:text-amber-300"
                    >
                      Difficile
                    </button>
                    <button
                      onClick={() => handleSrsReview('good')}
                      className="rounded-full bg-emerald-100 px-3 py-2 text-xs font-semibold text-emerald-700 hover:bg-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300"
                    >
                      Bien
                    </button>
                    <button
                      onClick={() => handleSrsReview('easy')}
                      className="rounded-full bg-brand-100 px-3 py-2 text-xs font-semibold text-brand-700 hover:bg-brand-200 dark:bg-slate-700 dark:text-slate-200"
                    >
                      Facile
                    </button>
                  </div>
                </>
              ) : (
                <button
                  onClick={() => setSrsRevealed(true)}
                  className="rounded-full bg-brand-600 px-5 py-2 text-sm font-semibold text-white hover:bg-brand-700"
                >
                  Afficher la réponse
                </button>
              )}

              <p className="mt-6 text-xs text-brand-400 dark:text-slate-500">
                Carte {srsIndex + 1} / {srsQueue.length}
              </p>
            </div>
          )}
        </div>
      )}

      {tab === 'quiz' && (questions.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-brand-200 bg-white p-8 text-center dark:border-slate-700 dark:bg-slate-800">
          <CheckCircleIcon className="mx-auto mb-3 h-10 w-10 text-green-500" />
          <p className="mb-1 font-semibold text-brand-800 dark:text-slate-100">Rien à réviser pour le moment !</p>
          <p className="text-sm text-brand-500 dark:text-slate-400">
            Continue les quiz de l&apos;Alphabet, des Chiffres, des Harakat, de la Lecture, du Vocabulaire et des Noms
            d&apos;Allah : tes erreurs atterriront automatiquement ici.
          </p>
        </div>
      ) : result ? (
        <div className="rounded-2xl border border-brand-100 bg-white p-8 text-center shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <TrophyIcon className="mx-auto mb-3 h-10 w-10 text-sand-500 dark:text-amber-400" />
          <p className="mb-1 text-xl font-bold text-brand-800 dark:text-slate-100">
            Score : {result.score} / {result.total}
          </p>
          <p className="mb-5 text-sm text-brand-500 dark:text-slate-400">
            {totalWeak - result.score > 0
              ? `Il reste ${totalWeak - result.score} point${totalWeak - result.score > 1 ? 's' : ''} à retravailler.`
              : 'Tout est repassé au vert, bravo !'}
          </p>
          <Link
            to="/"
            className="inline-block rounded-full bg-brand-600 px-5 py-2 text-sm font-semibold text-white hover:bg-brand-700"
          >
            Retour à l&apos;accueil
          </Link>
        </div>
      ) : (
        <McqQuiz questions={questions} onFinish={(score, total) => setResult({ score, total })} onCorrectAnswer={handleCorrect} />
      ))}
    </div>
  )
}
