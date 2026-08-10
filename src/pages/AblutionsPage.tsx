import { useEffect, useState } from 'react'
import { tayammumSteps, wuduHeroPhoto, wuduSteps } from '../data/ablutions'
import { useProgress } from '../store/progress'
import { TayammumIllustration } from '../components/PostureIllustration'
import RealPhoto from '../components/RealPhoto'
import DuaCard from '../components/DuaCard'
import { DropletIcon, InfoIcon, RepeatIcon } from '../components/icons'

type Tab = 'wudu' | 'tayammum'

export default function AblutionsPage() {
  const [tab, setTab] = useState<Tab>('wudu')
  const wuduStepsSeen = useProgress((s) => s.wuduStepsSeen)
  const tayammumStepsSeen = useProgress((s) => s.tayammumStepsSeen)
  const markWuduStepSeen = useProgress((s) => s.markWuduStepSeen)
  const markTayammumStepSeen = useProgress((s) => s.markTayammumStepSeen)

  const steps = tab === 'wudu' ? wuduSteps : tayammumSteps
  const seen = tab === 'wudu' ? wuduStepsSeen : tayammumStepsSeen
  const markSeen = tab === 'wudu' ? markWuduStepSeen : markTayammumStepSeen

  // Marque les étapes comme vues au fil de la lecture (liste déjà entièrement affichée).
  useEffect(() => {
    steps.forEach((s) => markSeen(s.id))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab])

  return (
    <div>
      <h1 className="mb-1 flex items-center gap-2 text-2xl font-bold text-brand-800 dark:text-slate-100">
        <DropletIcon className="h-6 w-6 text-brand-600 dark:text-slate-300" /> Les ablutions
      </h1>
      <p className="mb-6 text-sm text-brand-500 dark:text-slate-400">
        Se purifier avant la prière : le wudû (avec de l&apos;eau) ou, à défaut, le tayammum (à sec).
      </p>

      <div className="mb-6 flex gap-2 rounded-full bg-brand-100 dark:bg-slate-700 p-1 w-fit">
        <button
          onClick={() => setTab('wudu')}
          className={`rounded-full px-4 py-1.5 text-sm font-semibold transition ${
            tab === 'wudu' ? 'bg-white dark:bg-slate-800 text-brand-700 dark:text-slate-200 shadow-sm' : 'text-brand-500 dark:text-slate-400'
          }`}
        >
          Wudû (avec eau)
        </button>
        <button
          onClick={() => setTab('tayammum')}
          className={`rounded-full px-4 py-1.5 text-sm font-semibold transition ${
            tab === 'tayammum' ? 'bg-white dark:bg-slate-800 text-brand-700 dark:text-slate-200 shadow-sm' : 'text-brand-500 dark:text-slate-400'
          }`}
        >
          Tayammum (à sec)
        </button>
      </div>

      <p className="mb-6 text-xs text-brand-400 dark:text-slate-500">
        {seen.length} / {steps.length} étapes consultées
      </p>

      {tab === 'wudu' ? (
        <RealPhoto
          photo={wuduHeroPhoto}
          alt="Homme faisant ses ablutions, eau sur les mains"
          className="mb-6 h-56 w-full rounded-2xl sm:h-72"
        />
      ) : (
        <div className="mb-6 flex h-48 w-full items-center justify-center rounded-2xl bg-gradient-to-br from-brand-50 to-brand-100 sm:h-56">
          <TayammumIllustration className="h-36 w-36" />
        </div>
      )}

      {tab === 'tayammum' && (
        <div className="mb-6 flex items-start gap-2 rounded-2xl border border-cyan-100 dark:border-cyan-900/50 bg-cyan-50 dark:bg-cyan-950/30 p-4 text-sm text-cyan-700 dark:text-cyan-300">
          <InfoIcon className="h-4 w-4 shrink-0 translate-y-0.5" />
          <span>Le tayammum est une tolérance : il ne remplace le wudû que dans les cas prévus (voir la première étape).</span>
        </div>
      )}

      <div className="space-y-3">
        {steps.map((step) => (
          <div key={step.id} className="rounded-2xl border border-brand-100 dark:border-slate-700 bg-white dark:bg-slate-800 p-5 shadow-sm">
            <div className="mb-2 flex items-center gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-100 dark:bg-slate-700 text-sm font-bold text-brand-700 dark:text-slate-200">
                {step.order}
              </span>
              <h3 className="font-bold text-brand-800 dark:text-slate-100">{step.title}</h3>
              {step.repeat && step.repeat > 1 && (
                <span className="ml-auto flex items-center gap-1 rounded-full bg-sand-100 dark:bg-slate-700 px-2 py-0.5 text-xs font-semibold text-sand-600 dark:text-amber-300">
                  <RepeatIcon className="h-3 w-3" /> × {step.repeat}
                </span>
              )}
            </div>
            <p className="mb-3 text-sm text-brand-600 dark:text-slate-300">{step.instruction}</p>
            {step.dua && <DuaCard dua={step.dua} />}
          </div>
        ))}
      </div>
    </div>
  )
}
