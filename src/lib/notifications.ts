// Rappel de série "best effort" via l'API Notification du navigateur, programmé avec
// setTimeout. Limite importante : ça ne marche que tant que l'onglet/l'app reste ouvert(e)
// (pas de backend ni de Push API serveur ici) — un vrai rappel fiable à app fermée
// demanderait un service worker avec Push + un serveur pour déclencher l'envoi.

let scheduledTimeout: ReturnType<typeof setTimeout> | null = null

export function isNotificationSupported(): boolean {
  return typeof window !== 'undefined' && 'Notification' in window
}

export async function requestNotificationPermission(): Promise<boolean> {
  if (!isNotificationSupported()) return false
  if (Notification.permission === 'granted') return true
  if (Notification.permission === 'denied') return false
  const result = await Notification.requestPermission()
  return result === 'granted'
}

function msUntilNextReminder(hour: number): number {
  const now = new Date()
  const target = new Date(now)
  target.setHours(hour, 0, 0, 0)
  if (target.getTime() <= now.getTime()) target.setDate(target.getDate() + 1)
  return target.getTime() - now.getTime()
}

/**
 * Programme un rappel quotidien (par défaut 19h heure locale) tant que l'app reste ouverte.
 * `hasPracticedToday` est ré-évalué au moment du déclenchement pour ne pas déranger
 * inutilement quelqu'un qui a déjà pratiqué.
 */
export function scheduleStreakReminder(hasPracticedToday: () => boolean, hour = 19) {
  if (!isNotificationSupported() || Notification.permission !== 'granted') return
  cancelStreakReminder()
  scheduledTimeout = setTimeout(() => {
    if (!hasPracticedToday()) {
      new Notification("Iqra' — Ta série t'attend", {
        body: 'Quelques minutes suffisent pour garder ta série de jours consécutifs.',
        icon: '/favicon.svg',
      })
    }
    scheduleStreakReminder(hasPracticedToday, hour) // reprogrammer pour le jour suivant
  }, msUntilNextReminder(hour))
}

export function cancelStreakReminder() {
  if (scheduledTimeout) clearTimeout(scheduledTimeout)
  scheduledTimeout = null
}
