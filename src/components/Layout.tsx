import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { modules } from '../data/modules'
import { useProgress, todayISO } from '../store/progress'
import { useTheme } from '../store/theme'
import { useSettings } from '../store/settings'
import { scheduleStreakReminder } from '../lib/notifications'
import { FlameIcon, HomeIcon, MenuIcon, MoonIcon, SettingsIcon, StarIcon, SunIcon, XIcon, moduleIcons } from './icons'

const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
  `flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium transition ${
    isActive
      ? 'bg-brand-600 text-white'
      : 'text-brand-700 hover:bg-brand-100 dark:text-slate-300 dark:hover:bg-slate-700'
  }`

export default function Layout() {
  const xp = useProgress((s) => s.xp)
  const streak = useProgress((s) => s.streak)
  const touchStreak = useProgress((s) => s.touchStreak)
  const theme = useTheme((s) => s.theme)
  const toggleTheme = useTheme((s) => s.toggleTheme)
  const notificationsEnabled = useSettings((s) => s.notificationsEnabled)

  const [streakToast, setStreakToast] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const wasAlreadyToday = useProgress.getState().lastActiveDate === todayISO()
    touchStreak()
    if (!wasAlreadyToday) {
      setStreakToast(true)
      const t = setTimeout(() => setStreakToast(false), 4000)
      return () => clearTimeout(t)
    }
  }, [touchStreak])

  useEffect(() => {
    if (notificationsEnabled) {
      scheduleStreakReminder(() => useProgress.getState().lastActiveDate === todayISO())
    }
  }, [notificationsEnabled])

  // Ferme le tiroir mobile à chaque changement de page.
  useEffect(() => {
    setSidebarOpen(false)
  }, [location.pathname])

  const arabicModules = modules.filter((m) => m.track === 'arabic')
  const islamModules = modules.filter((m) => m.track === 'islam')

  return (
    <div className="flex min-h-screen">
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-slate-900/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-[min(18rem,85vw)] shrink-0 flex-col border-r border-brand-100 bg-sand-50 transition-transform duration-200 dark:border-slate-800 dark:bg-slate-900 lg:static lg:z-0 lg:w-64 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between gap-2 px-4 py-4">
          <NavLink to="/" className="flex items-center gap-2 font-bold text-brand-800 dark:text-slate-100">
            <span className="font-arabic text-2xl leading-none text-brand-600 dark:text-brand-400">اقرأ</span>
            <span>Iqra&apos;</span>
          </NavLink>
          <button
            onClick={() => setSidebarOpen(false)}
            className="flex h-8 w-8 items-center justify-center rounded-full text-brand-600 hover:bg-brand-100 dark:text-slate-300 dark:hover:bg-slate-700 lg:hidden"
          >
            <XIcon className="h-4 w-4" />
          </button>
        </div>

        <nav className="scrollbar-thin flex-1 space-y-4 overflow-y-auto px-3 pb-4">
          <NavLink to="/" end className={navLinkClasses}>
            <HomeIcon className="h-4 w-4 shrink-0" /> Accueil
          </NavLink>

          <div>
            <p className="mb-1.5 px-3 text-xs font-bold uppercase tracking-wide text-brand-400 dark:text-slate-500">
              Langue arabe
            </p>
            <div className="space-y-0.5">
              {arabicModules.map((m) => {
                const Icon = moduleIcons[m.icon]
                return (
                  <NavLink key={m.id} to={m.path} className={navLinkClasses}>
                    <Icon className="h-4 w-4 shrink-0" /> {m.title}
                  </NavLink>
                )
              })}
            </div>
          </div>

          <div>
            <p className="mb-1.5 px-3 text-xs font-bold uppercase tracking-wide text-brand-400 dark:text-slate-500">
              Connaissances islamiques
            </p>
            <div className="space-y-0.5">
              {islamModules.map((m) => {
                const Icon = moduleIcons[m.icon]
                return (
                  <NavLink key={m.id} to={m.path} className={navLinkClasses}>
                    <Icon className="h-4 w-4 shrink-0" /> {m.title}
                  </NavLink>
                )
              })}
            </div>
          </div>
        </nav>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 border-b border-brand-100 bg-sand-50/90 backdrop-blur dark:border-slate-800 dark:bg-slate-900/90">
          <div className="flex flex-wrap items-center justify-between gap-y-2 px-3 py-2.5 sm:px-4 sm:py-3">
            <div className="flex min-w-0 items-center gap-1.5 sm:gap-2">
              <button
                onClick={() => setSidebarOpen(true)}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-brand-600 hover:bg-brand-100 dark:text-slate-300 dark:hover:bg-slate-700 lg:hidden"
              >
                <MenuIcon className="h-4 w-4" />
              </button>
              <NavLink to="/" className="flex items-center gap-2 font-bold text-brand-800 dark:text-slate-100 lg:hidden">
                <span className="font-arabic text-xl leading-none text-brand-600 dark:text-brand-400">اقرأ</span>
              </NavLink>
            </div>
            <div className="flex shrink-0 items-center gap-1 text-xs font-semibold sm:gap-2 sm:text-sm">
              <span className="flex items-center gap-1 rounded-full bg-sand-200 px-2 py-1 text-sand-600 dark:bg-slate-700 dark:text-amber-200 sm:gap-1.5 sm:px-3">
                <FlameIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> {streak}
              </span>
              <span className="flex items-center gap-1 rounded-full bg-brand-100 px-2 py-1 text-brand-700 dark:bg-slate-700 dark:text-brand-300 sm:gap-1.5 sm:px-3">
                <StarIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> {xp}<span className="hidden sm:inline"> XP</span>
              </span>
              <button
                onClick={toggleTheme}
                title={theme === 'dark' ? 'Passer en thème clair' : 'Passer en thème sombre'}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-brand-600 transition hover:bg-brand-100 dark:text-slate-300 dark:hover:bg-slate-700"
              >
                {theme === 'dark' ? <SunIcon className="h-4 w-4" /> : <MoonIcon className="h-4 w-4" />}
              </button>
              <NavLink
                to="/profil"
                title="Profil et réglages"
                className={({ isActive }) =>
                  `flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition ${
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
        </header>

        <main className="mx-auto w-full max-w-5xl flex-1 px-3 py-5 sm:px-4 sm:py-6">
          <Outlet />
        </main>

        <footer className="border-t border-brand-100 py-4 text-center text-xs text-brand-400 dark:border-slate-800 dark:text-slate-500">
          Iqra&apos; · Apprendre l&apos;arabe et l&apos;islam pas à pas
        </footer>
      </div>

      <div
        role="status"
        aria-live="polite"
        className={`pointer-events-none fixed inset-x-0 bottom-4 z-50 flex justify-center px-4 transition-all duration-500 ${
          streakToast ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        }`}
      >
        <span className="flex max-w-[92vw] items-center gap-2 rounded-full bg-brand-800 px-4 py-2 text-xs font-semibold text-white shadow-lg dark:bg-slate-700 sm:text-sm">
          <FlameIcon className="h-4 w-4 shrink-0 text-sand-300" /> Série de {streak} jour{streak > 1 ? 's' : ''} — continue comme ça !
        </span>
      </div>
    </div>
  )
}
