import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { modules } from '../data/modules'
import { useProgress, todayISO } from '../store/progress'
import { useTheme } from '../store/theme'
import { useSettings } from '../store/settings'
import { scheduleStreakReminder } from '../lib/notifications'
import CommandPalette from './CommandPalette'
import {
  ArrowLeftIcon,
  FlameIcon,
  HomeIcon,
  MenuIcon,
  MoonIcon,
  SearchIcon,
  SettingsIcon,
  StarIcon,
  SunIcon,
  XIcon,
} from './icons'
import { moduleIcons } from './moduleIcons'

export default function Layout() {
  const xp = useProgress((s) => s.xp)
  const streak = useProgress((s) => s.streak)
  const touchStreak = useProgress((s) => s.touchStreak)
  const theme = useTheme((s) => s.theme)
  const toggleTheme = useTheme((s) => s.toggleTheme)
  const notificationsEnabled = useSettings((s) => s.notificationsEnabled)
  const collapsed = useSettings((s) => s.sidebarCollapsed)
  const setSidebarCollapsed = useSettings((s) => s.setSidebarCollapsed)

  const [streakToast, setStreakToast] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [paletteOpen, setPaletteOpen] = useState(false)
  const location = useLocation()
  const asideRef = useRef<HTMLElement>(null)
  const hamburgerRef = useRef<HTMLButtonElement>(null)

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

  // Accessibilité du tiroir mobile : focus dedans à l'ouverture, Échap pour fermer,
  // Tab piégé à l'intérieur tant qu'il est ouvert. Sans effet sur desktop (sidebar statique,
  // jamais ouverte comme overlay là où le bouton hamburger est masqué).
  useEffect(() => {
    if (!sidebarOpen) return
    if (typeof window !== 'undefined' && window.matchMedia('(min-width: 1024px)').matches) return
    const el = asideRef.current
    if (!el) return
    const focusables = el.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')
    const first = focusables[0]
    const last = focusables[focusables.length - 1]
    first?.focus()

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setSidebarOpen(false)
        hamburgerRef.current?.focus()
        return
      }
      if (e.key !== 'Tab' || focusables.length === 0) return
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [sidebarOpen])

  // Raccourcis globaux : Ctrl/Cmd+K ouvre la palette de commande, Ctrl/Cmd+B réduit/déplie
  // la sidebar (desktop). Actifs à tout moment, y compris depuis un champ de recherche.
  useEffect(() => {
    function handleGlobalKeyDown(e: globalThis.KeyboardEvent) {
      const mod = e.ctrlKey || e.metaKey
      if (!mod) return
      if (e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setPaletteOpen((open) => !open)
      } else if (e.key.toLowerCase() === 'b') {
        e.preventDefault()
        setSidebarCollapsed(!collapsed)
      }
    }
    document.addEventListener('keydown', handleGlobalKeyDown)
    return () => document.removeEventListener('keydown', handleGlobalKeyDown)
  }, [collapsed, setSidebarCollapsed])

  const arabicModules = modules.filter((m) => m.track === 'arabic')
  const islamModules = modules.filter((m) => m.track === 'islam')

  // `lg:hidden` uniquement quand replié : le libellé reste visible en dessous de lg (tiroir
  // mobile toujours en détail complet), et disparaît sur desktop seulement si l'utilisateur a
  // choisi le mode rail.
  const collapsibleLabel = collapsed ? 'lg:hidden' : ''

  function navLinkClasses({ isActive }: { isActive: boolean }) {
    return `flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium transition ${
      collapsed ? 'lg:justify-center lg:px-2' : ''
    } ${
      isActive
        ? 'bg-brand-600 text-white'
        : 'text-brand-700 hover:bg-brand-100 dark:text-slate-300 dark:hover:bg-slate-700'
    }`
  }

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
        id="app-sidebar"
        ref={asideRef}
        className={`fixed inset-y-0 left-0 z-40 flex w-[min(18rem,85vw)] shrink-0 flex-col border-r border-brand-100 bg-sand-50 transition-transform duration-200 dark:border-slate-800 dark:bg-slate-900 lg:sticky lg:top-0 lg:z-0 lg:h-screen lg:translate-x-0 ${
          collapsed ? 'lg:w-16' : 'lg:w-64'
        } ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className={`flex items-center justify-between gap-2 px-4 py-4 ${collapsed ? 'lg:flex-col lg:gap-2 lg:px-2' : ''}`}>
          <NavLink to="/" className="flex items-center gap-2 font-bold text-brand-800 dark:text-slate-100">
            <span className="font-arabic text-2xl leading-none text-brand-600 dark:text-brand-400">اقرأ</span>
            <span className={collapsibleLabel}>Iqra&apos;</span>
          </NavLink>
          <button
            onClick={() => setSidebarCollapsed(!collapsed)}
            title={collapsed ? 'Déplier le menu' : 'Réduire le menu'}
            className="hidden h-8 w-8 shrink-0 items-center justify-center rounded-full text-brand-600 hover:bg-brand-100 dark:text-slate-300 dark:hover:bg-slate-700 lg:flex"
          >
            <ArrowLeftIcon className={`h-4 w-4 transition-transform ${collapsed ? 'rotate-180' : ''}`} />
          </button>
          <button
            onClick={() => setSidebarOpen(false)}
            aria-label="Fermer le menu"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-brand-600 hover:bg-brand-100 dark:text-slate-300 dark:hover:bg-slate-700 lg:hidden"
          >
            <XIcon className="h-4 w-4" />
          </button>
        </div>

        <nav className="scrollbar-thin flex-1 space-y-4 overflow-y-auto px-3 pb-4">
          <NavLink to="/" end className={navLinkClasses} title="Accueil">
            <HomeIcon className="h-4 w-4 shrink-0" /> <span className={collapsibleLabel}>Accueil</span>
          </NavLink>

          <div>
            <p className={`mb-1.5 px-3 text-xs font-bold uppercase tracking-wide text-brand-400 dark:text-slate-500 ${collapsibleLabel}`}>
              Langue arabe
            </p>
            {collapsed && <div className="mx-2 mb-1.5 hidden border-t border-brand-100 dark:border-slate-700 lg:block" aria-hidden />}
            <div className="space-y-0.5">
              {arabicModules.map((m) => {
                const Icon = moduleIcons[m.icon]
                return (
                  <NavLink key={m.id} to={m.path} className={navLinkClasses} title={m.title}>
                    <Icon className="h-4 w-4 shrink-0" /> <span className={collapsibleLabel}>{m.title}</span>
                  </NavLink>
                )
              })}
            </div>
          </div>

          <div>
            <p className={`mb-1.5 px-3 text-xs font-bold uppercase tracking-wide text-brand-400 dark:text-slate-500 ${collapsibleLabel}`}>
              Connaissances islamiques
            </p>
            {collapsed && <div className="mx-2 mb-1.5 hidden border-t border-brand-100 dark:border-slate-700 lg:block" aria-hidden />}
            <div className="space-y-0.5">
              {islamModules.map((m) => {
                const Icon = moduleIcons[m.icon]
                return (
                  <NavLink key={m.id} to={m.path} className={navLinkClasses} title={m.title}>
                    <Icon className="h-4 w-4 shrink-0" /> <span className={collapsibleLabel}>{m.title}</span>
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
                ref={hamburgerRef}
                onClick={() => setSidebarOpen(true)}
                aria-label="Ouvrir le menu"
                aria-expanded={sidebarOpen}
                aria-controls="app-sidebar"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-brand-600 hover:bg-brand-100 dark:text-slate-300 dark:hover:bg-slate-700 lg:hidden"
              >
                <MenuIcon className="h-4 w-4" />
              </button>
              <NavLink to="/" className="flex items-center gap-2 font-bold text-brand-800 dark:text-slate-100 lg:hidden">
                <span className="font-arabic text-xl leading-none text-brand-600 dark:text-brand-400">اقرأ</span>
              </NavLink>
            </div>
            <div className="flex shrink-0 items-center gap-1 text-xs font-semibold sm:gap-2 sm:text-sm">
              <button
                onClick={() => setPaletteOpen(true)}
                title="Recherche rapide (Ctrl/Cmd+K)"
                className="flex h-8 items-center gap-1.5 rounded-full px-2 text-brand-500 transition hover:bg-brand-100 dark:text-slate-400 dark:hover:bg-slate-700 sm:px-3"
              >
                <SearchIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <kbd className="hidden rounded border border-brand-200 px-1 text-[10px] font-semibold text-brand-400 dark:border-slate-600 dark:text-slate-500 md:inline">
                  Ctrl K
                </kbd>
              </button>
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
          Iqra&apos; · Apprendre l&apos;arabe et l&apos;islam pas à pas ·{' '}
          <NavLink to="/a-propos" className="underline hover:text-brand-600 dark:hover:text-slate-300">
            À propos
          </NavLink>
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

      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
    </div>
  )
}
