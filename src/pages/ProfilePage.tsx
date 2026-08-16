import { useRef, useState, type ChangeEvent, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
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
import { useProgress } from '../store/progress'
import { useProfiles, type Profile } from '../store/profiles'
import { useTheme } from '../store/theme'
import { useSettings, TEXT_SCALE_LABELS, type TextScale } from '../store/settings'
import { requestNotificationPermission, cancelStreakReminder, isNotificationSupported } from '../lib/notifications'
import { getLevelInfo, badgeDefinitions } from '../lib/gamification'
import { usePageTitle } from '../lib/usePageTitle'
import {
  AlertTriangleIcon,
  BellIcon,
  BookOpenIcon,
  BookmarkIcon,
  CheckCircleIcon,
  DownloadIcon,
  DropletIcon,
  FlameIcon,
  HashIcon,
  CompassIcon,
  LayersIcon,
  LettersIcon,
  MoonIcon,
  MusicNoteIcon,
  PenIcon,
  PrayerFigureIcon,
  ScrollIcon,
  SettingsIcon,
  SparkleIcon,
  StarIcon,
  SunIcon,
  SunMoonIcon,
  TrophyIcon,
  UploadIcon,
  UsersIcon,
} from '../components/icons'
import ProgressBar from '../components/ProgressBar'

const badgeIcons = {
  letters: LettersIcon,
  hash: HashIcon,
  pen: PenIcon,
  book: BookOpenIcon,
  droplet: DropletIcon,
  prayer: PrayerFigureIcon,
  music: MusicNoteIcon,
  bookmark: BookmarkIcon,
  trophy: TrophyIcon,
  flame: FlameIcon,
  star: StarIcon,
  layers: LayersIcon,
  sparkle: SparkleIcon,
  scroll: ScrollIcon,
  sunmoon: SunMoonIcon,
  compass: CompassIcon,
}

export default function ProfilePage() {
  usePageTitle('Profil')
  const xp = useProgress((s) => s.xp)
  const streak = useProgress((s) => s.streak)
  const masteredLetters = useProgress((s) => s.masteredLetters)
  const masteredNumbers = useProgress((s) => s.masteredNumbers)
  const learnedHarakat = useProgress((s) => s.learnedHarakat)
  const wordsRead = useProgress((s) => s.wordsRead)
  const tajwidRulesSeen = useProgress((s) => s.tajwidRulesSeen)
  const versesListened = useProgress((s) => s.quranVersesListened)
  const memorizedVerses = useProgress((s) => s.memorizedVerses)
  const wuduStepsSeen = useProgress((s) => s.wuduStepsSeen)
  const tayammumStepsSeen = useProgress((s) => s.tayammumStepsSeen)
  const prayerStepsSeen = useProgress((s) => s.prayerStepsSeen)
  const masteredVocab = useProgress((s) => s.masteredVocab)
  const masteredNames = useProgress((s) => s.masteredNames)
  const prophetsRead = useProgress((s) => s.prophetsRead)
  const adhkarSeen = useProgress((s) => s.adhkarSeen)
  const pillarsIslamSeen = useProgress((s) => s.pillarsIslamSeen)
  const pillarsFaithSeen = useProgress((s) => s.pillarsFaithSeen)
  const akhlaqSeen = useProgress((s) => s.akhlaqSeen)
  const hijriMonthsSeen = useProgress((s) => s.hijriMonthsSeen)
  const resetProgress = useProgress((s) => s.resetProgress)
  const exportProgress = useProgress((s) => s.exportProgress)
  const importProgress = useProgress((s) => s.importProgress)

  const theme = useTheme((s) => s.theme)
  const setTheme = useTheme((s) => s.setTheme)

  const textScale = useSettings((s) => s.textScale)
  const setTextScale = useSettings((s) => s.setTextScale)
  const notificationsEnabled = useSettings((s) => s.notificationsEnabled)
  const setNotificationsEnabled = useSettings((s) => s.setNotificationsEnabled)
  const sidebarCollapsed = useSettings((s) => s.sidebarCollapsed)
  const setSidebarCollapsed = useSettings((s) => s.setSidebarCollapsed)

  const [confirmingReset, setConfirmingReset] = useState(false)
  const [importMessage, setImportMessage] = useState<{ ok: boolean; text: string } | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const profiles = useProfiles((s) => s.profiles)
  const activeProfileId = useProfiles((s) => s.activeProfileId)
  const switchProfile = useProfiles((s) => s.switchProfile)
  const addProfile = useProfiles((s) => s.addProfile)
  const renameProfile = useProfiles((s) => s.renameProfile)
  const deleteProfile = useProfiles((s) => s.deleteProfile)

  const [showAddProfile, setShowAddProfile] = useState(false)
  const [newProfileName, setNewProfileName] = useState('')
  const [renamingId, setRenamingId] = useState<string | null>(null)
  const [renameValue, setRenameValue] = useState('')
  const [confirmingDeleteId, setConfirmingDeleteId] = useState<string | null>(null)

  function handleAddProfile(e: FormEvent) {
    e.preventDefault()
    if (!newProfileName.trim()) return
    addProfile(newProfileName)
    setNewProfileName('')
    setShowAddProfile(false)
  }

  function startRename(p: Profile) {
    setRenamingId(p.id)
    setRenameValue(p.name)
  }

  function submitRename(e: FormEvent) {
    e.preventDefault()
    if (renamingId) renameProfile(renamingId, renameValue)
    setRenamingId(null)
  }

  const level = getLevelInfo(xp)
  const badgeTotals = {
    alphabet: alphabet.length,
    numbers: numbers.length,
    harakat: harakat.length,
    words: readingWords.length,
    tajwid: tajwidRules.length,
    ablutionSteps: wuduSteps.length + tayammumSteps.length,
    prayerSteps: prayerSteps.length,
    vocab: vocabWords.length,
    names: namesOfAllah.length,
    prophets: prophets.length,
    adhkar: adhkarItems.length,
    knowledge: pillarsOfIslam.length + pillarsOfFaith.length + akhlaqLessons.length + hijriMonths.length,
  }
  const badgeProgress = {
    masteredLetters,
    masteredNumbers,
    learnedHarakat,
    wordsRead,
    tajwidRulesSeen,
    wuduStepsSeen,
    tayammumStepsSeen,
    prayerStepsSeen,
    memorizedVerses,
    masteredVocab,
    masteredNames,
    prophetsRead,
    adhkarSeen,
    pillarsIslamSeen,
    pillarsFaithSeen,
    akhlaqSeen,
    hijriMonthsSeen,
    streak,
  }
  const unlockedBadges = badgeDefinitions.filter((b) => b.unlocked(badgeProgress, badgeTotals))

  function handleExport() {
    const json = exportProgress()
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `iqra-progression-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  function handleImportClick() {
    fileInputRef.current?.click()
  }

  function handleImportFile(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    file
      .text()
      .then((text) => {
        const ok = importProgress(text)
        setImportMessage(
          ok
            ? { ok: true, text: 'Progression importée avec succès.' }
            : { ok: false, text: "Fichier invalide — impossible d'importer cette sauvegarde." },
        )
      })
      .catch(() => setImportMessage({ ok: false, text: 'Impossible de lire ce fichier.' }))
  }

  async function handleToggleNotifications() {
    if (notificationsEnabled) {
      cancelStreakReminder()
      setNotificationsEnabled(false)
      return
    }
    const granted = await requestNotificationPermission()
    setNotificationsEnabled(granted)
  }

  const stats = [
    { label: 'Lettres maîtrisées', value: masteredLetters.length, max: alphabet.length },
    { label: 'Chiffres maîtrisés', value: masteredNumbers.length, max: numbers.length },
    { label: 'Harakat vues', value: learnedHarakat.length, max: harakat.length },
    { label: 'Mots pratiqués', value: wordsRead.length, max: readingWords.length },
    {
      label: 'Étapes des ablutions vues',
      value: wuduStepsSeen.length + tayammumStepsSeen.length,
      max: wuduSteps.length + tayammumSteps.length,
    },
    { label: 'Étapes de la salat vues', value: prayerStepsSeen.length, max: prayerSteps.length },
    { label: 'Règles de tajwîd vues', value: tajwidRulesSeen.length, max: tajwidRules.length },
    { label: 'Versets écoutés', value: versesListened.length, max: null },
    { label: 'Versets mémorisés', value: memorizedVerses.length, max: null },
    { label: 'Mots de vocabulaire maîtrisés', value: masteredVocab.length, max: vocabWords.length },
    { label: "Noms d'Allah maîtrisés", value: masteredNames.length, max: namesOfAllah.length },
    { label: 'Récits de prophètes lus', value: prophetsRead.length, max: prophets.length },
    { label: 'Adhkar consultés', value: adhkarSeen.length, max: adhkarItems.length },
    {
      label: 'Connaissances consultées (piliers, akhlâq, calendrier)',
      value: pillarsIslamSeen.length + pillarsFaithSeen.length + akhlaqSeen.length + hijriMonthsSeen.length,
      max: pillarsOfIslam.length + pillarsOfFaith.length + akhlaqLessons.length + hijriMonths.length,
    },
  ]

  function handleResetClick() {
    if (!confirmingReset) {
      setConfirmingReset(true)
      return
    }
    resetProgress()
    setConfirmingReset(false)
  }

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-6 flex items-center gap-2 text-2xl font-bold text-brand-800 dark:text-slate-100">
        <SettingsIcon className="h-6 w-6 text-brand-600 dark:text-brand-400" /> Profil &amp; réglages
      </h1>

      <section className="mb-6 rounded-2xl border border-brand-100 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="flex items-center gap-1.5 text-sm font-bold uppercase tracking-wide text-brand-500 dark:text-slate-400">
            <UsersIcon className="h-4 w-4" /> Profils sur cet appareil
          </h2>
          <Link
            to="/famille"
            className="text-xs font-semibold text-brand-600 underline decoration-dotted hover:text-brand-700 dark:text-brand-400"
          >
            Espace famille →
          </Link>
        </div>

        <div className="space-y-2">
          {profiles.map((p) => {
            const isActive = p.id === activeProfileId
            return (
              <div
                key={p.id}
                className={`flex flex-wrap items-center gap-2 rounded-xl border p-2.5 ${
                  isActive
                    ? 'border-brand-400 bg-brand-50 dark:border-brand-700 dark:bg-brand-950/20'
                    : 'border-brand-100 dark:border-slate-700'
                }`}
              >
                {renamingId === p.id ? (
                  <form onSubmit={submitRename} className="flex flex-1 items-center gap-2">
                    <input
                      autoFocus
                      value={renameValue}
                      onChange={(e) => setRenameValue(e.target.value)}
                      className="flex-1 rounded-lg border border-brand-200 bg-white px-2 py-1 text-sm dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100"
                    />
                    <button type="submit" className="text-xs font-semibold text-brand-600 dark:text-brand-400">
                      OK
                    </button>
                    <button type="button" onClick={() => setRenamingId(null)} className="text-xs text-brand-400 dark:text-slate-500">
                      Annuler
                    </button>
                  </form>
                ) : (
                  <>
                    <span className="flex-1 truncate text-sm font-semibold text-brand-800 dark:text-slate-100">
                      {p.name}
                      {isActive && (
                        <span className="ml-1.5 text-xs font-normal text-emerald-600 dark:text-emerald-400">(actif)</span>
                      )}
                    </span>
                    {!isActive && (
                      <button
                        onClick={() => switchProfile(p.id)}
                        className="rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-700 hover:bg-brand-200 dark:bg-slate-700 dark:text-slate-200"
                      >
                        Basculer
                      </button>
                    )}
                    <button
                      onClick={() => startRename(p)}
                      className="rounded-full px-2 py-1 text-xs text-brand-500 hover:bg-brand-50 dark:text-slate-400 dark:hover:bg-slate-700"
                    >
                      Renommer
                    </button>
                    {profiles.length > 1 &&
                      (confirmingDeleteId === p.id ? (
                        <>
                          <button
                            onClick={() => {
                              deleteProfile(p.id)
                              setConfirmingDeleteId(null)
                            }}
                            className="rounded-full bg-red-600 px-3 py-1 text-xs font-semibold text-white hover:bg-red-700"
                          >
                            Confirmer
                          </button>
                          <button onClick={() => setConfirmingDeleteId(null)} className="text-xs text-brand-400 dark:text-slate-500">
                            Annuler
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => setConfirmingDeleteId(p.id)}
                          className="rounded-full px-2 py-1 text-xs text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30"
                        >
                          Supprimer
                        </button>
                      ))}
                  </>
                )}
              </div>
            )
          })}
        </div>

        {showAddProfile ? (
          <form onSubmit={handleAddProfile} className="mt-3 flex items-center gap-2">
            <input
              autoFocus
              value={newProfileName}
              onChange={(e) => setNewProfileName(e.target.value)}
              placeholder="Nom du nouveau profil"
              className="flex-1 rounded-lg border border-brand-200 bg-white px-3 py-1.5 text-sm dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100"
            />
            <button type="submit" className="rounded-full bg-brand-600 px-4 py-1.5 text-xs font-semibold text-white hover:bg-brand-700">
              Créer
            </button>
            <button type="button" onClick={() => setShowAddProfile(false)} className="text-xs text-brand-400 dark:text-slate-500">
              Annuler
            </button>
          </form>
        ) : (
          <button
            onClick={() => setShowAddProfile(true)}
            className="mt-3 text-xs font-semibold text-brand-600 underline decoration-dotted hover:text-brand-700 dark:text-brand-400"
          >
            + Ajouter un profil
          </button>
        )}

        <p className="mt-3 text-xs text-brand-400 dark:text-slate-500">
          Créer un profil démarre une progression vierge (utile pour plusieurs enfants sur le même appareil) ; la
          progression du profil actif est sauvegardée automatiquement en changeant de profil.
        </p>
      </section>

      <section className="mb-6 grid grid-cols-2 gap-4">
        <div className="rounded-2xl border border-brand-100 bg-white p-5 text-center shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <StarIcon className="mx-auto mb-1 h-6 w-6 text-brand-500 dark:text-brand-400" />
          <p className="text-2xl font-extrabold text-brand-800 dark:text-slate-100">{xp}</p>
          <p className="text-xs text-brand-500 dark:text-slate-400">XP au total</p>
        </div>
        <div className="rounded-2xl border border-brand-100 bg-white p-5 text-center shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <FlameIcon className="mx-auto mb-1 h-6 w-6 text-sand-500 dark:text-amber-400" />
          <p className="text-2xl font-extrabold text-brand-800 dark:text-slate-100">{streak}</p>
          <p className="text-xs text-brand-500 dark:text-slate-400">jours de suite</p>
        </div>
      </section>

      <section className="mb-6 rounded-2xl border border-brand-100 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="flex items-center gap-1.5 text-sm font-bold uppercase tracking-wide text-brand-500 dark:text-slate-400">
            <StarIcon className="h-4 w-4" /> Niveau {level.level}
          </h2>
          <span className="text-sm font-bold text-brand-800 dark:text-slate-100">{level.title}</span>
        </div>
        {level.xpForNextLevel === null ? (
          <p className="text-xs text-brand-500 dark:text-slate-400">Niveau maximum atteint — mach'Allah !</p>
        ) : (
          <ProgressBar
            value={level.xpInLevel}
            max={level.xpForNextLevel}
            label={`${level.xpInLevel}/${level.xpForNextLevel} XP avant le niveau ${level.level + 1}`}
          />
        )}
      </section>

      <section className="mb-6 rounded-2xl border border-brand-100 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800">
        <h2 className="mb-4 flex items-center gap-1.5 text-sm font-bold uppercase tracking-wide text-brand-500 dark:text-slate-400">
          <TrophyIcon className="h-4 w-4" /> Badges ({unlockedBadges.length}/{badgeDefinitions.length})
        </h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {badgeDefinitions.map((badge) => {
            const Icon = badgeIcons[badge.iconName]
            const unlocked = unlockedBadges.includes(badge)
            return (
              <div
                key={badge.id}
                title={badge.description}
                className={`flex flex-col items-center gap-1.5 rounded-xl border p-3 text-center transition ${
                  unlocked
                    ? 'border-brand-200 bg-brand-50 dark:border-brand-800 dark:bg-brand-950/30'
                    : 'border-brand-100 bg-brand-50/40 opacity-50 dark:border-slate-700 dark:bg-slate-800/40'
                }`}
              >
                <Icon
                  className={`h-6 w-6 ${unlocked ? 'text-brand-600 dark:text-brand-400' : 'text-brand-400 dark:text-slate-500'}`}
                />
                <p className="text-xs font-semibold leading-tight text-brand-800 dark:text-slate-100">
                  {badge.title}
                </p>
              </div>
            )
          })}
        </div>
      </section>

      <section className="mb-6 rounded-2xl border border-brand-100 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800">
        <h2 className="mb-4 flex items-center gap-1.5 text-sm font-bold uppercase tracking-wide text-brand-500 dark:text-slate-400">
          <TrophyIcon className="h-4 w-4" /> Ma progression
        </h2>
        <div className="space-y-4">
          {stats.map((s) => (
            <div key={s.label}>
              {s.max === null ? (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-brand-600 dark:text-slate-300">{s.label}</span>
                  <span className="font-semibold text-brand-800 dark:text-slate-100">{s.value}</span>
                </div>
              ) : (
                <ProgressBar value={s.value} max={s.max} label={`${s.label} — ${s.value}/${s.max}`} />
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="mb-6 rounded-2xl border border-brand-100 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800">
        <h2 className="mb-4 text-sm font-bold uppercase tracking-wide text-brand-500 dark:text-slate-400">
          Apparence
        </h2>
        <div className="flex gap-2 rounded-full bg-brand-100 p-1 dark:bg-slate-700">
          <button
            onClick={() => setTheme('light')}
            className={`flex flex-1 items-center justify-center gap-1.5 rounded-full py-2 text-sm font-semibold transition ${
              theme === 'light' ? 'bg-white text-brand-700 shadow-sm' : 'text-brand-500 dark:text-slate-300'
            }`}
          >
            <SunIcon className="h-4 w-4" /> Clair
          </button>
          <button
            onClick={() => setTheme('dark')}
            className={`flex flex-1 items-center justify-center gap-1.5 rounded-full py-2 text-sm font-semibold transition ${
              theme === 'dark' ? 'bg-slate-800 text-slate-100 shadow-sm' : 'text-brand-500 dark:text-slate-300'
            }`}
          >
            <MoonIcon className="h-4 w-4" /> Sombre
          </button>
        </div>

        <h3 className="mb-2 mt-5 text-xs font-bold uppercase tracking-wide text-brand-500 dark:text-slate-400">
          Taille du texte
        </h3>
        <div className="flex gap-2 rounded-full bg-brand-100 p-1 dark:bg-slate-700">
          {(Object.keys(TEXT_SCALE_LABELS) as TextScale[]).map((scale) => (
            <button
              key={scale}
              onClick={() => setTextScale(scale)}
              className={`flex-1 rounded-full py-2 text-sm font-semibold transition ${
                textScale === scale
                  ? 'bg-white text-brand-700 shadow-sm dark:bg-slate-800 dark:text-slate-100'
                  : 'text-brand-500 dark:text-slate-300'
              }`}
            >
              {TEXT_SCALE_LABELS[scale]}
            </button>
          ))}
        </div>

        <h3 className="mb-2 mt-5 text-xs font-bold uppercase tracking-wide text-brand-500 dark:text-slate-400">
          Menu latéral (écrans larges)
        </h3>
        <div className="flex gap-2 rounded-full bg-brand-100 p-1 dark:bg-slate-700">
          <button
            onClick={() => setSidebarCollapsed(false)}
            className={`flex flex-1 items-center justify-center gap-1.5 rounded-full py-2 text-sm font-semibold transition ${
              !sidebarCollapsed ? 'bg-white text-brand-700 shadow-sm dark:bg-slate-800 dark:text-slate-100' : 'text-brand-500 dark:text-slate-300'
            }`}
          >
            Étendu
          </button>
          <button
            onClick={() => setSidebarCollapsed(true)}
            className={`flex flex-1 items-center justify-center gap-1.5 rounded-full py-2 text-sm font-semibold transition ${
              sidebarCollapsed ? 'bg-white text-brand-700 shadow-sm dark:bg-slate-800 dark:text-slate-100' : 'text-brand-500 dark:text-slate-300'
            }`}
          >
            Réduit (icônes)
          </button>
        </div>
      </section>

      <section className="mb-6 rounded-2xl border border-brand-100 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800">
        <h2 className="mb-2 flex items-center gap-1.5 text-sm font-bold uppercase tracking-wide text-brand-500 dark:text-slate-400">
          <BellIcon className="h-4 w-4" /> Rappels de série
        </h2>
        <p className="mb-4 text-sm text-brand-600 dark:text-slate-400">
          {isNotificationSupported()
            ? "Reçois une notification en soirée si tu n'as pas encore pratiqué aujourd'hui (tant que l'app reste ouverte dans un onglet)."
            : "Les notifications ne sont pas prises en charge par ce navigateur."}
        </p>
        <button
          onClick={handleToggleNotifications}
          disabled={!isNotificationSupported()}
          className={`rounded-full px-5 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 ${
            notificationsEnabled
              ? 'bg-brand-100 text-brand-700 dark:bg-slate-700 dark:text-slate-200'
              : 'bg-brand-600 text-white hover:bg-brand-700'
          }`}
        >
          {notificationsEnabled ? 'Rappels activés — désactiver' : 'Activer les rappels'}
        </button>
      </section>

      <section className="mb-6 rounded-2xl border border-brand-100 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800">
        <h2 className="mb-2 text-sm font-bold uppercase tracking-wide text-brand-500 dark:text-slate-400">
          Sauvegarde
        </h2>
        <p className="mb-4 text-sm text-brand-600 dark:text-slate-400">
          Ta progression est stockée uniquement sur cet appareil. Exporte-la pour la garder en sécurité ou la
          transférer vers un autre appareil.
        </p>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={handleExport}
            className="flex items-center gap-1.5 rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-700"
          >
            <DownloadIcon className="h-4 w-4" /> Exporter
          </button>
          <button
            onClick={handleImportClick}
            className="flex items-center gap-1.5 rounded-full bg-brand-100 px-4 py-2 text-sm font-semibold text-brand-700 transition hover:bg-brand-200 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600"
          >
            <UploadIcon className="h-4 w-4" /> Importer
          </button>
          <input ref={fileInputRef} type="file" accept="application/json" className="hidden" onChange={handleImportFile} />
        </div>
        {importMessage && (
          <p
            className={`mt-3 flex items-center gap-1.5 text-sm ${
              importMessage.ok ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'
            }`}
          >
            {importMessage.ok ? <CheckCircleIcon className="h-4 w-4" /> : <AlertTriangleIcon className="h-4 w-4" />}
            {importMessage.text}
          </p>
        )}
      </section>

      <section className="rounded-2xl border border-red-200 bg-red-50 p-5 dark:border-red-900/50 dark:bg-red-950/30">
        <h2 className="mb-2 flex items-center gap-1.5 text-sm font-bold uppercase tracking-wide text-red-700 dark:text-red-400">
          <AlertTriangleIcon className="h-4 w-4" /> Zone dangereuse
        </h2>
        <p className="mb-4 text-sm text-red-600 dark:text-red-300">
          Repartir de zéro effacera tout ton XP, ta série de jours et toute ta progression dans chaque module. Cette
          action est irréversible.
        </p>
        {confirmingReset ? (
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-sm font-semibold text-red-700 dark:text-red-300">Confirmer la réinitialisation ?</p>
            <button
              onClick={handleResetClick}
              className="rounded-full bg-red-600 px-4 py-1.5 text-sm font-semibold text-white transition hover:bg-red-700"
            >
              Oui, tout effacer
            </button>
            <button
              onClick={() => setConfirmingReset(false)}
              className="rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-red-600 transition hover:bg-red-100 dark:bg-slate-800 dark:hover:bg-slate-700"
            >
              Annuler
            </button>
          </div>
        ) : (
          <button
            onClick={handleResetClick}
            className="rounded-full bg-red-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
          >
            Réinitialiser ma progression
          </button>
        )}
      </section>
    </div>
  )
}
