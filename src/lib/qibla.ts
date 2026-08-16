// Calculs géographiques pour le module Horaires & Qibla, sans dépendance externe : cap vers la
// Kaaba (formule du cap orthodromique initial) et distance (formule de Haversine).
// Référence pour les deux formules : https://www.movable-type.co.uk/scripts/latlong.html

const KAABA_LAT = 21.4225
const KAABA_LON = 39.8262

function toRad(deg: number): number {
  return (deg * Math.PI) / 180
}

function toDeg(rad: number): number {
  return (rad * 180) / Math.PI
}

/**
 * Cap initial (great-circle) en degrés, 0-360, 0 = nord / sens horaire, depuis (lat, lon)
 * vers la Kaaba. C'est la direction vers laquelle se tourner pour prier, indiquée par rapport
 * au nord géographique (à combiner avec une boussole pour s'orienter physiquement).
 */
export function qiblaBearing(lat: number, lon: number): number {
  const phi1 = toRad(lat)
  const phi2 = toRad(KAABA_LAT)
  const deltaLambda = toRad(KAABA_LON - lon)

  const y = Math.sin(deltaLambda) * Math.cos(phi2)
  const x = Math.cos(phi1) * Math.sin(phi2) - Math.sin(phi1) * Math.cos(phi2) * Math.cos(deltaLambda)
  const theta = Math.atan2(y, x)

  return (toDeg(theta) + 360) % 360
}

/** Distance orthodromique en kilomètres jusqu'à la Kaaba, à titre indicatif. */
export function distanceToKaabaKm(lat: number, lon: number): number {
  const R = 6371
  const phi1 = toRad(lat)
  const phi2 = toRad(KAABA_LAT)
  const dPhi = toRad(KAABA_LAT - lat)
  const dLambda = toRad(KAABA_LON - lon)

  const a = Math.sin(dPhi / 2) ** 2 + Math.cos(phi1) * Math.cos(phi2) * Math.sin(dLambda / 2) ** 2
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  return R * c
}

/** Nom + abréviation des points cardinaux les plus proches d'un cap, pour un affichage lisible. */
export function bearingToCompassLabel(bearing: number): string {
  const labels = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSO', 'SO', 'OSO', 'O', 'ONO', 'NO', 'NNO']
  const index = Math.round(bearing / 22.5) % 16
  return labels[index]
}
