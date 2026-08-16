import { Link } from 'react-router-dom'
import { useProfiles, type Profile } from '../store/profiles'
import { useProgress } from '../store/progress'
import { getLevelInfo } from '../lib/gamification'
import { usePageTitle } from '../lib/usePageTitle'
import { BookmarkIcon, FlameIcon, StarIcon, UsersIcon } from '../components/icons'

const AVATAR_COLORS = [
  'from-teal-500 to-teal-600',
  'from-rose-500 to-rose-600',
  'from-amber-500 to-amber-600',
  'from-sky-500 to-sky-600',
  'from-purple-500 to-purple-600',
  'from-emerald-500 to-emerald-600',
]

interface ProfileData {
  xp: number
  streak: number
  masteredLettersCount: number
  memorizedVersesCount: number
}

const EMPTY_DATA: ProfileData = { xp: 0, streak: 0, masteredLettersCount: 0, memorizedVersesCount: 0 }

// Le profil actif a sa progression "en direct" dans le store `progress` (voir store/profiles.ts) :
// on la lit depuis là plutôt que depuis son instantané, qui n'est mis à jour qu'au moment de
// basculer vers un autre profil et serait donc en retard tant qu'on reste dessus.
function readProfileData(profile: Profile, isActive: boolean, live: ProfileData): ProfileData {
  if (isActive) return live
  try {
    const parsed = JSON.parse(profile.snapshot)
    const d = parsed?.data ?? {}
    return {
      xp: d.xp ?? 0,
      streak: d.streak ?? 0,
      masteredLettersCount: Array.isArray(d.masteredLetters) ? d.masteredLetters.length : 0,
      memorizedVersesCount: Array.isArray(d.memorizedVerses) ? d.memorizedVerses.length : 0,
    }
  } catch {
    return EMPTY_DATA
  }
}

export default function FamilyPage() {
  usePageTitle('Espace famille')
  const profiles = useProfiles((s) => s.profiles)
  const activeProfileId = useProfiles((s) => s.activeProfileId)
  const switchProfile = useProfiles((s) => s.switchProfile)

  const live: ProfileData = {
    xp: useProgress((s) => s.xp),
    streak: useProgress((s) => s.streak),
    masteredLettersCount: useProgress((s) => s.masteredLetters.length),
    memorizedVersesCount: useProgress((s) => s.memorizedVerses.length),
  }

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-1 flex items-center gap-2 text-2xl font-bold text-brand-800 dark:text-slate-100">
        <UsersIcon className="h-6 w-6 text-brand-600 dark:text-brand-400" /> Espace famille
      </h1>
      <p className="mb-6 text-sm text-brand-500 dark:text-slate-400">
        Vue d&apos;ensemble de tous les profils sur cet appareil (utile pour un parent qui suit plusieurs enfants).
        Ajouter, renommer ou supprimer un profil se fait depuis{' '}
        <Link to="/profil" className="underline decoration-dotted hover:text-brand-700 dark:hover:text-slate-200">
          Profil &amp; réglages
        </Link>
        .
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        {profiles.map((profile) => {
          const isActive = profile.id === activeProfileId
          const data = readProfileData(profile, isActive, live)
          const level = getLevelInfo(data.xp)
          return (
            <div
              key={profile.id}
              className={`rounded-2xl border p-5 shadow-sm ${
                isActive
                  ? 'border-brand-400 bg-brand-50/60 dark:border-brand-700 dark:bg-brand-950/20'
                  : 'border-brand-100 bg-white dark:border-slate-700 dark:bg-slate-800'
              }`}
            >
              <div className="mb-4 flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${AVATAR_COLORS[profile.colorIndex % AVATAR_COLORS.length]} text-sm font-bold text-white`}
                >
                  {profile.name.trim().slice(0, 1).toUpperCase() || '?'}
                </div>
                <div className="min-w-0">
                  <p className="truncate font-bold text-brand-800 dark:text-slate-100">{profile.name}</p>
                  <p className="text-xs text-brand-400 dark:text-slate-500">
                    {isActive ? 'Profil actif sur cet appareil' : `Niveau ${level.level} — ${level.title}`}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2 text-center">
                <div className="rounded-xl bg-sand-50 py-2 dark:bg-slate-700/40">
                  <StarIcon className="mx-auto mb-0.5 h-3.5 w-3.5 text-brand-500 dark:text-brand-400" />
                  <p className="text-sm font-bold text-brand-800 dark:text-slate-100">{data.xp}</p>
                  <p className="text-[10px] text-brand-400 dark:text-slate-500">XP</p>
                </div>
                <div className="rounded-xl bg-sand-50 py-2 dark:bg-slate-700/40">
                  <FlameIcon className="mx-auto mb-0.5 h-3.5 w-3.5 text-sand-500 dark:text-amber-400" />
                  <p className="text-sm font-bold text-brand-800 dark:text-slate-100">{data.streak}</p>
                  <p className="text-[10px] text-brand-400 dark:text-slate-500">série</p>
                </div>
                <div className="rounded-xl bg-sand-50 py-2 dark:bg-slate-700/40">
                  <span className="mx-auto mb-0.5 block font-arabic text-sm text-brand-500 dark:text-brand-400">أ</span>
                  <p className="text-sm font-bold text-brand-800 dark:text-slate-100">{data.masteredLettersCount}</p>
                  <p className="text-[10px] text-brand-400 dark:text-slate-500">lettres</p>
                </div>
                <div className="rounded-xl bg-sand-50 py-2 dark:bg-slate-700/40">
                  <BookmarkIcon className="mx-auto mb-0.5 h-3.5 w-3.5 text-brand-500 dark:text-brand-400" />
                  <p className="text-sm font-bold text-brand-800 dark:text-slate-100">{data.memorizedVersesCount}</p>
                  <p className="text-[10px] text-brand-400 dark:text-slate-500">versets</p>
                </div>
              </div>

              {!isActive && (
                <button
                  onClick={() => switchProfile(profile.id)}
                  className="mt-4 w-full rounded-full bg-brand-600 py-2 text-xs font-semibold text-white transition hover:bg-brand-700"
                >
                  Basculer sur ce profil
                </button>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
