import { usePageTitle } from '../lib/usePageTitle'
import { InfoIcon } from '../components/icons'

export default function AboutPage() {
  usePageTitle('À propos')
  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-6 flex items-center gap-2 text-2xl font-bold text-brand-800 dark:text-slate-100">
        <InfoIcon className="h-6 w-6 text-brand-600 dark:text-brand-400" /> À propos d&apos;Iqra&apos;
      </h1>

      <section className="mb-5 rounded-2xl border border-brand-100 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800">
        <h2 className="mb-2 text-sm font-bold uppercase tracking-wide text-brand-500 dark:text-slate-400">
          Ce qu&apos;est Iqra&apos;
        </h2>
        <p className="text-sm text-brand-600 dark:text-slate-300">
          Iqra&apos; est une application d&apos;apprentissage pas à pas : l&apos;arabe (alphabet, lecture, tajwîd…) et
          des repères de base sur l&apos;islam (le culte, le Coran, quelques récits et connaissances). C&apos;est un
          outil pédagogique d&apos;initiation, pensé pour donner l&apos;envie et les bases — pas un ouvrage de
          référence ni un avis religieux (fatwa).
        </p>
      </section>

      <section className="mb-5 rounded-2xl border border-brand-100 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800">
        <h2 className="mb-2 text-sm font-bold uppercase tracking-wide text-brand-500 dark:text-slate-400">
          Tradition suivie et sources
        </h2>
        <p className="mb-2 text-sm text-brand-600 dark:text-slate-300">
          Le contenu suit les grandes lignes largement admises de la tradition sunnite, présentées ici de façon
          simplifiée et non-exhaustive. Sur des points où les savants et écoles (madhâhib) divergent légitimement —
          certains détails du wudû ou de la salat, l&apos;ordre exact des 99 Noms d&apos;Allah, la datation
          hijri — l&apos;application retient une présentation courante à but pédagogique, sans prétendre trancher.
        </p>
        <p className="text-sm text-brand-600 dark:text-slate-300">
          Les invocations (adhkar) s&apos;inspirent de recueils de référence comme <em>Hisnul Muslim</em>, les récits
          des prophètes des grandes lignes coraniques, et les Noms d&apos;Allah de l&apos;énumération la plus
          répandue (rapportée via At-Tirmidhi).
        </p>
      </section>

      <section className="mb-5 rounded-2xl border border-brand-100 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800">
        <h2 className="mb-2 text-sm font-bold uppercase tracking-wide text-brand-500 dark:text-slate-400">Limites</h2>
        <p className="text-sm text-brand-600 dark:text-slate-300">
          Cette application ne remplace ni un enseignant, ni un savant, ni une mosquée. Pour toute question de
          pratique (fiqh) ou de jugement religieux, mieux vaut se référer à une personne qualifiée plutôt qu&apos;à
          une appli. La reconnaissance et la synthèse vocales utilisées pour la prononciation (Web Speech API) sont
          également approximatives, notamment sur les nuances fines du tajwîd.
        </p>
      </section>

      <section className="rounded-2xl border border-brand-100 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800">
        <h2 className="mb-2 text-sm font-bold uppercase tracking-wide text-brand-500 dark:text-slate-400">
          Tes données
        </h2>
        <p className="text-sm text-brand-600 dark:text-slate-300">
          Ta progression (XP, badges, éléments maîtrisés…) est stockée uniquement sur cet appareil, dans le
          navigateur (<code className="rounded bg-brand-50 px-1 py-0.5 text-xs dark:bg-slate-700">localStorage</code>).
          Aucun compte, aucun serveur, aucun suivi. Le Profil propose un export/import JSON pour la garder en
          sécurité ou changer d&apos;appareil.
        </p>
      </section>
    </div>
  )
}
