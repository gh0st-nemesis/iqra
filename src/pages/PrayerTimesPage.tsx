import { useEffect, useMemo, useState } from 'react'
import { usePageTitle } from '../lib/usePageTitle'
import { bearingToCompassLabel, distanceToKaabaKm, qiblaBearing } from '../lib/qibla'
import { fetchPrayerTimes, getNextPrayer, PRAYER_LABELS, type PrayerTimings } from '../lib/prayerTimes'
import { AlertTriangleIcon, ClockIcon, KaabaIcon, NavigationIcon } from '../components/icons'

type GeoStatus = 'idle' | 'loading' | 'granted' | 'denied' | 'unsupported'

// Type minimal pour l'API non-standard `requestPermission()` de DeviceOrientationEvent sur
// iOS 13+ (absente du lib.dom.d.ts de TypeScript).
interface DeviceOrientationEventConstructorIOS {
  requestPermission?: () => Promise<'granted' | 'denied'>
}

export default function PrayerTimesPage() {
  usePageTitle('Horaires & Qibla')

  const [geoStatus, setGeoStatus] = useState<GeoStatus>('idle')
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(null)

  const [timings, setTimings] = useState<PrayerTimings | null>(null)
  const [timingsError, setTimingsError] = useState<string | null>(null)

  const [compassActive, setCompassActive] = useState(false)
  const [heading, setHeading] = useState<number | null>(null)

  function requestLocation() {
    if (!('geolocation' in navigator)) {
      setGeoStatus('unsupported')
      return
    }
    setGeoStatus('loading')
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({ lat: pos.coords.latitude, lon: pos.coords.longitude })
        setGeoStatus('granted')
      },
      () => setGeoStatus('denied'),
      { enableHighAccuracy: false, timeout: 10000 },
    )
  }

  useEffect(() => {
    if (!coords) return
    setTimings(null)
    setTimingsError(null)
    fetchPrayerTimes(coords.lat, coords.lon)
      .then(setTimings)
      .catch((e) => setTimingsError(e.message ?? 'Impossible de charger les horaires de prière.'))
  }, [coords])

  // Boussole (best-effort) : l'orientation "vraie" (par rapport au nord) donnée par les
  // navigateurs varie selon les plateformes — fiable sur Safari iOS (`webkitCompassHeading`),
  // approximative ailleurs (dérivée de `alpha`, sans garantie d'étalonnage). En l'absence de
  // capteur ou de permission, on retombe sur le cap affiché en chiffres.
  useEffect(() => {
    if (!compassActive) return
    function handleOrientation(e: DeviceOrientationEvent) {
      const webkitHeading = (e as DeviceOrientationEvent & { webkitCompassHeading?: number }).webkitCompassHeading
      if (typeof webkitHeading === 'number') {
        setHeading(webkitHeading)
        return
      }
      if (e.alpha != null) setHeading(360 - e.alpha)
    }
    window.addEventListener('deviceorientation', handleOrientation)
    return () => window.removeEventListener('deviceorientation', handleOrientation)
  }, [compassActive])

  async function enableCompass() {
    const DOE = (window as unknown as { DeviceOrientationEvent?: DeviceOrientationEventConstructorIOS }).DeviceOrientationEvent
    if (typeof DOE?.requestPermission === 'function') {
      try {
        const state = await DOE.requestPermission()
        if (state === 'granted') setCompassActive(true)
      } catch {
        // Permission refusée ou API indisponible : on reste en repli chiffré.
      }
      return
    }
    if (typeof DeviceOrientationEvent !== 'undefined') setCompassActive(true)
  }

  const bearing = coords ? qiblaBearing(coords.lat, coords.lon) : null
  const distanceKm = coords ? distanceToKaabaKm(coords.lat, coords.lon) : null
  const nextPrayer = useMemo(() => (timings ? getNextPrayer(timings) : null), [timings])

  // Rotation visuelle de la flèche : différence entre le cap vers la Qibla et l'orientation
  // actuelle du téléphone (si connue), sinon simplement le cap brut par rapport au nord.
  const arrowRotation = bearing != null ? (heading != null ? bearing - heading : bearing) : 0

  return (
    <div>
      <h1 className="mb-1 flex items-center gap-2 text-2xl font-bold text-brand-800 dark:text-slate-100">
        <KaabaIcon className="h-6 w-6 text-brand-600 dark:text-brand-400" /> Horaires & Qibla
      </h1>
      <p className="mb-6 text-sm text-brand-500 dark:text-slate-400">
        Horaires des 5 prières et direction de la Qibla, calculés à partir de ta position. Ta position n&apos;est
        utilisée que pour ce calcul (envoyée à l&apos;API des horaires de prière aladhan.com), jamais stockée ni
        partagée ailleurs.
      </p>

      {geoStatus !== 'granted' && (
        <div className="mb-6 rounded-2xl border border-brand-100 bg-white p-5 text-center dark:border-slate-700 dark:bg-slate-800">
          <p className="mb-3 text-sm text-brand-600 dark:text-slate-300">
            Autorise la géolocalisation pour afficher tes horaires de prière et la direction de la Qibla.
          </p>
          <button
            onClick={requestLocation}
            disabled={geoStatus === 'loading'}
            className="rounded-full bg-brand-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-brand-700 disabled:opacity-60"
          >
            {geoStatus === 'loading' ? 'Localisation…' : 'Utiliser ma position'}
          </button>
          {geoStatus === 'denied' && (
            <p className="mt-3 flex items-center justify-center gap-2 text-xs text-red-500 dark:text-red-400">
              <AlertTriangleIcon className="h-3.5 w-3.5 shrink-0" /> Localisation refusée. Autorise-la dans les
              réglages de ton navigateur puis réessaie.
            </p>
          )}
          {geoStatus === 'unsupported' && (
            <p className="mt-3 flex items-center justify-center gap-2 text-xs text-red-500 dark:text-red-400">
              <AlertTriangleIcon className="h-3.5 w-3.5 shrink-0" /> Ton navigateur ne prend pas en charge la
              géolocalisation.
            </p>
          )}
        </div>
      )}

      {coords && (
        <div className="grid gap-6 lg:grid-cols-2">
          <section className="rounded-2xl border border-brand-100 bg-white p-5 dark:border-slate-700 dark:bg-slate-800">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-brand-800 dark:text-slate-100">
              <ClockIcon className="h-5 w-5 text-brand-600 dark:text-brand-400" /> Horaires du jour
            </h2>

            {timingsError && (
              <div className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-600 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-300">
                <AlertTriangleIcon className="h-4 w-4 shrink-0 translate-y-0.5" />
                <span>{timingsError} Vérifie ta connexion Internet puis réessaie.</span>
              </div>
            )}

            {!timingsError && !timings && (
              <div className="space-y-2">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="h-9 animate-pulse rounded-lg bg-brand-100 dark:bg-slate-700" />
                ))}
              </div>
            )}

            {timings && (
              <div className="space-y-1.5">
                {PRAYER_LABELS.map(({ key, label, arabicLabel }) => {
                  const isNext = nextPrayer?.key === key
                  return (
                    <div
                      key={key}
                      className={`flex items-center justify-between rounded-xl px-3 py-2 text-sm ${
                        isNext
                          ? 'bg-brand-600 text-white'
                          : 'text-brand-700 odd:bg-sand-50 dark:text-slate-200 dark:odd:bg-slate-700/40'
                      }`}
                    >
                      <span className="flex items-center gap-2 font-medium">
                        {label} <span className="font-arabic text-base">{arabicLabel}</span>
                      </span>
                      <span className="font-mono font-bold">{timings[key]}</span>
                    </div>
                  )
                })}
                {nextPrayer && (
                  <p className="pt-2 text-center text-xs text-brand-500 dark:text-slate-400">
                    Prochaine prière : <strong>{nextPrayer.label}</strong> dans{' '}
                    {nextPrayer.minutesUntil >= 60
                      ? `${Math.floor(nextPrayer.minutesUntil / 60)} h ${nextPrayer.minutesUntil % 60} min`
                      : `${nextPrayer.minutesUntil} min`}
                  </p>
                )}
              </div>
            )}
          </section>

          <section className="rounded-2xl border border-brand-100 bg-white p-5 text-center dark:border-slate-700 dark:bg-slate-800">
            <h2 className="mb-4 flex items-center justify-center gap-2 text-lg font-bold text-brand-800 dark:text-slate-100">
              <KaabaIcon className="h-5 w-5 text-brand-600 dark:text-brand-400" /> Direction de la Qibla
            </h2>

            <div className="relative mx-auto mb-4 flex h-40 w-40 items-center justify-center rounded-full border-4 border-brand-100 dark:border-slate-700">
              <span className="absolute top-1 text-[10px] font-bold text-brand-400 dark:text-slate-500">N</span>
              <div
                className="transition-transform duration-200"
                style={{ transform: `rotate(${arrowRotation}deg)` }}
              >
                <NavigationIcon className="h-16 w-16 text-emerald-600 dark:text-emerald-400" />
              </div>
            </div>

            {bearing != null && (
              <p className="text-sm text-brand-700 dark:text-slate-200">
                Cap <strong>{Math.round(bearing)}°</strong> ({bearingToCompassLabel(bearing)}) depuis le nord
                {distanceKm != null && <> · à environ {Math.round(distanceKm).toLocaleString('fr-FR')} km de la Kaaba</>}
              </p>
            )}

            {!compassActive ? (
              <button
                onClick={enableCompass}
                className="mt-4 rounded-full bg-brand-100 px-4 py-2 text-xs font-semibold text-brand-700 hover:bg-brand-200 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600"
              >
                Activer la boussole du téléphone
              </button>
            ) : (
              <p className="mt-4 text-xs text-brand-400 dark:text-slate-500">
                La flèche suit l&apos;orientation de ton téléphone (approximatif selon les appareils) : oriente-toi
                jusqu&apos;à ce qu&apos;elle pointe vers le haut de l&apos;écran.
              </p>
            )}
          </section>
        </div>
      )}
    </div>
  )
}
