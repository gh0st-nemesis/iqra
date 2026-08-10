import { Link } from 'react-router-dom'
import { modules } from '../data/modules'
import type { ModuleMeta } from '../types'
import { alphabet } from '../data/alphabet'
import { numbers } from '../data/numbers'
import { harakat } from '../data/harakat'
import { readingWords } from '../data/reading'
import { tajwidRules } from '../data/tajwid'
import { wuduSteps, tayammumSteps } from '../data/ablutions'
import { prayerSteps } from '../data/salat'
import { vocabWords } from '../data/vocabulary'
import { namesOfAllah } from '../data/namesOfAllah'
import { prophets } from '../data/prophets'
import { adhkarItems } from '../data/adhkar'
import { akhlaqLessons, hijriMonths, pillarsOfFaith, pillarsOfIslam } from '../data/knowledge'
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
  const masteredVocab = useProgress((s) => s.masteredVocab)
  const masteredNames = useProgress((s) => s.masteredNames)
  const prophetsRead = useProgress((s) => s.prophetsRead)
  const adhkarSeen = useProgress((s) => s.adhkarSeen)
  const pillarsIslamSeen = useProgress((s) => s.pillarsIslamSeen)
  const pillarsFaithSeen = useProgress((s) => s.pillarsFaithSeen)
  const akhlaqSeen = useProgress((s) => s.akhlaqSeen)
  const hijriMonthsSeen = useProgress((s) => s.hijriMonthsSeen)
  const xp = useProgress((s) => s.xp)

  const totalWeak = weakLetters.length + weakNumbers.length + weakHarakat.length

  const progressByModule: Record<string, { value: number; max: number }> = {
    alphabet: { value: masteredLetters.length, max: alphabet.length },
    numbers: { value: masteredNumbers.length, max: numbers.length },
    harakat: { value: learnedHarakat.length, max: harakat.length },
    reading: { value: wordsRead.length, max: readingWords.length },
    vocabulary: { value: masteredVocab.length, max: vocabWords.length },
    tajwid: { value: tajwidRulesSeen.length, max: tajwidRules.length },
    ablutions: {
      value: wuduStepsSeen.length + tayammumStepsSeen.length,
      max: wuduSteps.length + tayammumSteps.length,
    },
    salat: { value: prayerStepsSeen.length, max: prayerSteps.length },
    quran: { value: versesListened.length, max: TOTAL_QURAN_VERSES },
    names: { value: masteredNames.length, max: namesOfAllah.length },
    prophets: { value: prophetsRead.length, max: prophets.length },
    adhkar: { value: adhkarSeen.length, max: adhkarItems.length },
    knowledge: {
      value: pillarsIslamSeen.length + pillarsFaithSeen.length + akhlaqSeen.length + hijriMonthsSeen.length,
      max: pillarsOfIslam.length + pillarsOfFaith.length + akhlaqLessons.length + hijriMonths.length,
    },
  }

  const arabicModules = modules.filter((m) => m.track === 'arabic')
  const islamModules = modules.filter((m) => m.track === 'islam')

  return (
    <div>
      <section className="mb-8 rounded-3xl bg-gradient-to-br from-brand-600 to-brand-800 px-6 py-10 text-white shadow-lg">
        <p className="mb-2 text-sm font-medium uppercase tracking-wide text-brand-100">Bienvenue sur Iqra&apos;</p>
        <h1 className="mb-3 text-3xl font-extrabold sm:text-4xl">
          Apprends l&apos;arabe et l&apos;islam <br className="hidden sm:block" />
          pas à pas, à ton rythme
        </h1>
        <p className="max-w-2xl text-brand-100">
          Deux parcours complémentaires : la langue arabe (lettres, voyelles, lecture, vocabulaire, tajwîd) et les
          connaissances islamiques (culte, Coran, noms d&apos;Allah, prophètes, adhkar…). Tu as déjà {xp} XP —
          continue comme ça !
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

      <ModuleSection title="Langue arabe" arabicTitle="اللُّغَةُ الْعَرَبِيَّةُ" modules={arabicModules} progressByModule={progressByModule} />
      <ModuleSection title="Connaissances islamiques" arabicTitle="مَعْلُومَاتٌ إِسْلَامِيَّةٌ" modules={islamModules} progressByModule={progressByModule} />

      <section className="mt-10 rounded-2xl border border-sand-200 bg-sand-100 p-5 text-sm text-sand-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
        <p className="mb-1 flex items-center gap-1.5 font-semibold text-sand-700 dark:text-amber-300">
          <LightbulbIcon className="h-4 w-4" /> Conseil
        </p>
        <p>
          Côté langue : commence par l&apos;<strong>Alphabet</strong> (et les <strong>Chiffres</strong>), puis les{' '}
          <strong>Voyelles</strong> avant de passer à la <strong>Lecture</strong> ; le <strong>Tajwîd</strong> vient
          une fois la lecture fluide. Côté islam : les <strong>Ablutions</strong> et la <strong>Salat</strong> sont
          un bon point de départ, à ton rythme, en parallèle de la langue.
        </p>
      </section>
    </div>
  )
}

function ModuleSection({
  title,
  arabicTitle,
  modules: sectionModules,
  progressByModule,
}: {
  title: string
  arabicTitle: string
  modules: ModuleMeta[]
  progressByModule: Record<string, { value: number; max: number }>
}) {
  return (
    <section className="mb-8">
      <div className="mb-4 flex items-baseline gap-2">
        <h2 className="text-lg font-bold text-brand-800 dark:text-slate-100">{title}</h2>
        <span className="font-arabic text-sm text-brand-400 dark:text-slate-500">{arabicTitle}</span>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {sectionModules.map((m) => {
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
                  <h3 className="font-bold text-brand-800 group-hover:text-brand-600 dark:text-slate-100 dark:group-hover:text-brand-400">
                    {m.title}
                  </h3>
                  <p className="font-arabic text-sm text-brand-400 dark:text-slate-500">{m.arabicTitle}</p>
                </div>
              </div>
              <p className="mb-4 flex-1 text-sm text-brand-600 dark:text-slate-400">{m.description}</p>
              <ProgressBar value={p.value} max={p.max} label={`${p.value}/${p.max}`} />
            </Link>
          )
        })}
      </div>
    </section>
  )
}
