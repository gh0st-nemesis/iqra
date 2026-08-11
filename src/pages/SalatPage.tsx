import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { dailyPrayers, postureLabels, prayerSteps } from '../data/salat'
import { useProgress } from '../store/progress'
import RealPhoto from '../components/RealPhoto'
import DuaCard from '../components/DuaCard'
import { usePageTitle } from '../lib/usePageTitle'
import { BookOpenIcon, PrayerFigureIcon, RepeatIcon } from '../components/icons'

export default function SalatPage() {
  usePageTitle('La Salat')
  const prayerStepsSeen = useProgress((s) => s.prayerStepsSeen)
  const markPrayerStepSeen = useProgress((s) => s.markPrayerStepSeen)

  useEffect(() => {
    prayerSteps.forEach((s) => markPrayerStepSeen(s.id))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <h1 className="mb-1 flex items-center gap-2 text-2xl font-bold text-brand-800 dark:text-slate-100">
        <PrayerFigureIcon className="h-6 w-6 text-brand-600 dark:text-slate-300" /> La Salat
      </h1>
      <p className="mb-6 text-sm text-brand-500 dark:text-slate-400">
        {prayerStepsSeen.length} / {prayerSteps.length} étapes consultées
      </p>

      <section className="mb-8 rounded-2xl border border-indigo-100 dark:border-indigo-900/50 bg-indigo-50 dark:bg-indigo-950/30 p-5">
        <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
          Les 5 prières obligatoires de la journée
        </h2>
        <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {dailyPrayers.map((p) => (
            <div key={p.id} className="rounded-xl bg-white dark:bg-slate-800 p-3 shadow-sm">
              <div className="mb-1 flex items-baseline justify-between">
                <span className="font-bold text-brand-800 dark:text-slate-100">{p.name}</span>
                <span className="font-arabic text-brand-500 dark:text-slate-400">{p.arabicName}</span>
              </div>
              <p className="mb-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400">{p.rakahCount} rak'ât</p>
              <p className="text-xs text-brand-500 dark:text-slate-400">{p.timing}</p>
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs text-indigo-600 dark:text-indigo-400">
          Les horaires précis dépendent de la position du soleil à ton emplacement — utilise une appli de temps de
          prière locale pour les heures exactes.
        </p>
      </section>

      <p className="mb-6 text-sm text-brand-500 dark:text-slate-400">
        Déroulé complet d&apos;une prière à 2 rak&apos;at : les positions, dans l&apos;ordre, avec ce qui se dit à
        chaque étape. Cette base se retrouve, avec le même enchaînement, dans les 5 prières quotidiennes — pour les
        prières à 3 ou 4 rak&apos;ât, on répète simplement ce cycle avec un tashahhud intermédiaire après la 2e
        rak&apos;ah, avant de continuer debout.
      </p>

      <div className="space-y-3">
        {prayerSteps.map((step) => (
          <div key={step.id} className="overflow-hidden rounded-2xl border border-brand-100 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm">
            <div className="grid sm:grid-cols-[160px_1fr]">
              <RealPhoto photo={step.image} alt={postureLabels[step.posture]} className="h-48 w-full sm:h-full" />
              <div className="p-5">
                <div className="mb-1 flex flex-wrap items-center gap-2">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-100 dark:bg-slate-700 text-xs font-bold text-brand-700 dark:text-slate-200">
                    {step.order}
                  </span>
                  <h3 className="font-bold text-brand-800 dark:text-slate-100">{step.title}</h3>
                  <span className="font-arabic text-sm text-brand-400 dark:text-slate-500">{step.arabicTitle}</span>
                  <span className="rounded-full bg-brand-50 dark:bg-slate-700/50 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-brand-500 dark:text-slate-400">
                    {postureLabels[step.posture]}
                  </span>
                  {step.repeat && step.repeat > 1 && (
                    <span className="ml-auto flex items-center gap-1 rounded-full bg-sand-100 dark:bg-slate-700 px-2 py-0.5 text-xs font-semibold text-sand-600 dark:text-amber-300">
                      <RepeatIcon className="h-3 w-3" /> × {step.repeat}
                    </span>
                  )}
                </div>
                <p className="mb-3 text-sm text-brand-600 dark:text-slate-300">{step.instruction}</p>

                {step.linkToFatiha && (
                  <Link
                    to="/coran/1"
                    className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-emerald-600 px-4 py-1.5 text-xs font-semibold text-white transition hover:bg-emerald-700"
                  >
                    <BookOpenIcon className="h-3.5 w-3.5" /> Lire et écouter Al-Fâtiha
                  </Link>
                )}

                {step.suggestedSurahs && step.suggestedSurahs.length > 0 && (
                  <div className="mb-3">
                    <p className="mb-1.5 text-xs font-medium text-brand-500 dark:text-slate-400">
                      Puis une courte sourate, par exemple :
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {step.suggestedSurahs.map((s) => (
                        <Link
                          key={s.number}
                          to={`/coran/${s.number}`}
                          className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-100 dark:border-emerald-900/50 dark:bg-emerald-950/30 dark:text-emerald-300 dark:hover:bg-emerald-950/60"
                        >
                          <span className="font-arabic text-sm">{s.name}</span> {s.englishName}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {step.duas.length > 0 && (
                  <div className="space-y-2">
                    {step.duas.map((dua, i) => (
                      <DuaCard key={i} dua={dua} repeat={step.repeat} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
