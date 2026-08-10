import { NavLink, Outlet } from 'react-router-dom'
import { useEffect } from 'react'
import { modules } from '../data/modules'
import { useProgress } from '../store/progress'
import { useTheme } from '../store/theme'
import { FlameIcon, HomeIcon, MoonIcon, SettingsIcon, StarIcon, SunIcon, moduleIcons } from './icons'

export default function Layout() {
  const xp = useProgress((s) => s.xp)
  const streak = useProgress((s) => s.streak)
  const touchStreak = useProgress((s) => s.touchStreak)
  const theme = useTheme((s) => s.theme)
  const toggleTheme = useTheme((s) => s.toggleTheme)

  useEffect(() => {
    touchStreak()
  }, [touchStreak])

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-20 border-b border-brand-100 bg-sand-50/90 backdrop-blur dark:border-slate-800 dark:bg-slate-900/90">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
          <NavLink to="/" className="flex items-center gap-2 font-bold text-brand-800 dark:text-slate-100">
            <span className="font-arabic text-2xl leading-none text-brand-600 dark:text-brand-400">اقرأ</span>
            <span className="hidden sm:inline">Iqra&apos; — Apprendre l&apos;arabe</span>
          </NavLink>
          <div className="flex items-center gap-2 text-sm font-semibold">
            <span className="flex items-center gap-1.5 rounded-full bg-sand-200 px-3 py-1 text-sand-600 dark:bg-slate-700 dark:text-amber-200">
              <FlameIcon className="h-4 w-4" /> {streak}
            </span>
            <span className="flex items-center gap-1.5 rounded-full bg-brand-100 px-3 py-1 text-brand-700 dark:bg-slate-700 dark:text-brand-300">
              <StarIcon className="h-4 w-4" /> {xp} XP
            </span>
            <button
              onClick={toggleTheme}
              title={theme === 'dark' ? 'Passer en thème clair' : 'Passer en thème sombre'}
              className="flex h-8 w-8 items-center justify-center rounded-full text-brand-600 transition hover:bg-brand-100 dark:text-slate-300 dark:hover:bg-slate-700"
            >
              {theme === 'dark' ? <SunIcon className="h-4 w-4" /> : <MoonIcon className="h-4 w-4" />}
            </button>
            <NavLink
              to="/profil"
              title="Profil et réglages"
              className={({ isActive }) =>
                `flex h-8 w-8 items-center justify-center rounded-full transition ${
                  isActive
                    ? 'bg-brand-600 text-white'
                    : 'text-brand-600 hover:bg-brand-100 dark:text-slate-300 dark:hover:bg-slate-700'
                }`
              }
            >
              <SettingsIcon className="h-4 w-4" />
            </NavLink>
          </div>
        </div>
        <nav className="scrollbar-thin mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 pb-2">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition ${
                isActive
                  ? 'bg-brand-600 text-white'
                  : 'text-brand-700 hover:bg-brand-100 dark:text-slate-300 dark:hover:bg-slate-700'
              }`
            }
          >
            <HomeIcon className="h-4 w-4" /> Accueil
          </NavLink>
          {modules.map((m) => {
            const Icon = moduleIcons[m.icon]
            return (
              <NavLink
                key={m.id}
                to={m.path}
                className={({ isActive }) =>
                  `flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition ${
                    isActive
                      ? 'bg-brand-600 text-white'
                      : 'text-brand-700 hover:bg-brand-100 dark:text-slate-300 dark:hover:bg-slate-700'
                  }`
                }
              >
                <Icon className="h-4 w-4" /> {m.title}
              </NavLink>
            )
          })}
        </nav>
      </header>
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6">
        <Outlet />
      </main>
      <footer className="border-t border-brand-100 py-4 text-center text-xs text-brand-400 dark:border-slate-800 dark:text-slate-500">
        Iqra&apos; · Un parcours pas à pas de l&apos;alphabet à la récitation coranique
      </footer>
    </div>
  )
}
