import { Link } from 'react-router-dom'
import { modules } from '../data/modules'
import { alphabet } from '../data/alphabet'
import { numbers } from '../data/numbers'
import { harakat } from '../data/harakat'
import { readingWords } from '../data/reading'
import { tajwidRules } from '../data/tajwid'
import { wuduSteps, tayammumSteps } from '../data/ablutions'
import { prayerSteps } from '../data/salat'
import { TOTAL_QURAN_VERSES } from '../lib/quranApi'
import { useProgress } from '../store/progress'
import ProgressBar from '../components/ProgressBar'
import { LightbulbIcon, RefreshIcon, moduleIcons } from '../components/icons'

export default function Home() {
  const masteredLetters = useProgress((s) => s.masteredLetters)
  const masteredNumbers = useProgress((s) => s.masteredNumbers)
  const learnedHarakat = useProgress((s) => s.learnedHarakat)
  const wordsRead = useProgress((s) => s.wordsRead)
  const tajwidRulesSeen = useProgress((s) => s.tajwidRulesSeen)
  const versesListened = useProgress((s) => s.quranVersesListened)
  const wuduStepsSeen = useProgress((s) => s.wuduStepsSeen)
  const tayammumStepsSeen = useProgress((s) => s.tayammumStepsSeen)
  const prayerStepsSeen = useProgress((s) => s.prayerStepsSeen)
  const weakLetters = useProgress((s) => s.weakLetters)
  const weakNumbers = useProgress((s) => s.weakNumbers)
  const weakHarakat = useProgress((s) => s.weakHarakat)
  const xp = useProgress((s) => s.xp)

  const totalWeak = weakLetters.length + weakNumbers.length + weakHarakat.length

  const progressByModule: Record<string, { value: number; max: number }> = {
    alphabet: { value: masteredLetters.length, max: alphabet.length },
    numbers: { value: masteredNumbers.length, max: numbers.length },
    harakat: { value: learnedHarakat.length, max: harakat.length },
    reading: { value: wordsRead.length, max: readingWords.length },
    ablutions: {
      value: wuduStepsSeen.length + tayammumStepsSeen.length,
      max: wuduSteps.length + tayammumSteps.length,
    },
    salat: { value: prayerStepsSeen.length, max: prayerSteps.length },
    tajwid: { value: tajwidRulesSeen.length, max: tajwidRules.length },
    quran: { value: versesListened.length, max: TOTAL_QURAN_VERSES },
  }

  return (
    <div>
      <section className="mb-8 rounded-3xl bg-gradient-to-br from-brand-600 to-brand-800 px-6 py-10 text-white shadow-lg">
        <p className="mb-2 text-sm font-medium uppercase tracking-wide text-brand-100">Bienvenue sur Iqra&apos;</p>
        <h1 className="mb-3 text-3xl font-extrabold sm:text-4xl">
          Apprends l&apos;arabe pas à pas <br className="hidden sm:block" />
          de l&apos;alphabet à la récitation coranique
        </h1>
        <p className="max-w-2xl text-brand-100">
          Un parcours progressif : les lettres, les voyelles, la lecture, les règles de tajwîd, puis la récitation du
          Coran avec de vrais récitateurs. Tu as déjà {xp} XP — continue comme ça !
        </p>
      </section>

      {totalWeak > 0 && (
        <Link
          to="/revision"
          className="mb-8 flex items-center justify-between gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-amber-900/50 dark:bg-amber-950/30"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-500 text-white">
              <RefreshIcon className="h-5 w-5" />
            </div>
            <div>
              <p className="font-bold text-amber-800 dark:text-amber-300">
                {totalWeak} point{totalWeak > 1 ? 's' : ''} à réviser
              </p>
              <p className="text-sm text-amber-700 dark:text-amber-400">
                Lettres, chiffres ou harakat sur lesquels tu t&apos;es trompé récemment
              </p>
            </div>
          </div>
        </Link>
      )}

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {modules.map((m) => {
          const p = progressByModule[m.id]
          const Icon = moduleIcons[m.icon]
          return (
            <Link
              key={m.id}
              to={m.path}
              className="group flex flex-col rounded-2xl border border-brand-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-700 dark:bg-slate-800"
            >
              <div className="mb-3 flex items-center gap-3">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${m.color} text-white shadow-sm`}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="font-bold text-brand-800 group-hover:text-brand-600 dark:text-slate-100 dark:group-hover:text-brand-400">
                    {m.title}
                  </h2>
                  <p className="font-arabic text-sm text-brand-400 dark:text-slate-500">{m.arabicTitle}</p>
                </div>
              </div>
              <p className="mb-4 flex-1 text-sm text-brand-600 dark:text-slate-400">{m.description}</p>
              <ProgressBar value={p.value} max={p.max} label={`${p.value}/${p.max}`} />
            </Link>
          )
        })}
      </div>

      <section className="mt-10 rounded-2xl border border-sand-200 bg-sand-100 p-5 text-sm text-sand-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
        <p className="mb-1 flex items-center gap-1.5 font-semibold text-sand-700 dark:text-amber-300">
          <LightbulbIcon className="h-4 w-4" /> Conseil
        </p>
        <p>
          Commence par le module <strong>Alphabet</strong> (et les <strong>Chiffres</strong>, dans la foulée), puis
          les <strong>Voyelles</strong>, avant de passer à la <strong>Lecture</strong>. Le <strong>Tajwîd</strong> et
          la <strong>récitation coranique</strong> viennent naturellement une fois la lecture fluide.
        </p>
      </section>
    </div>
  )
}
