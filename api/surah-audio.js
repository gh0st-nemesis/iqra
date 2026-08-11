// Fonction Vercel (Edge Runtime) qui relaie le mp3 d'une sourate entière depuis le CDN
// d'alquran.cloud (cdn.islamic.network), en ajoutant un en-tête Content-Disposition: attachment.
//
// Pourquoi ce détour : le CDN source ne renvoie ni en-tête CORS ni Content-Disposition, donc un lien
// direct vers lui ne peut pas être forcé en téléchargement par le navigateur (voir src/lib/quranApi.ts
// pour le détail). En passant par une route de notre propre domaine (même origine), l'en-tête
// Content-Disposition posé ici est respecté de façon fiable par tous les navigateurs.
//
// Edge Runtime (et non une Serverless Function Node classique) : elle streame la réponse sans la
// bufferiser entièrement en mémoire, ce qui est nécessaire pour les longues sourates (jusqu'à environ
// 120 Mo pour Al-Baqara).
//
// Limite connue : ne fonctionne qu'une fois déployé sur Vercel (ou via `vercel dev`) — `npm run dev`
// (Vite seul) ne sert pas ce dossier /api.
export const config = { runtime: 'edge' }

const UPSTREAM_BASE = 'https://cdn.islamic.network/quran/audio-surah/128/ar.alafasy'

export default async function handler(request) {
  const { searchParams } = new URL(request.url)
  const number = Number(searchParams.get('number'))

  if (!Number.isInteger(number) || number < 1 || number > 114) {
    return new Response('Numéro de sourate invalide (1 à 114 attendu).', { status: 400 })
  }

  let upstream
  try {
    upstream = await fetch(`${UPSTREAM_BASE}/${number}.mp3`)
  } catch {
    return new Response("Impossible de joindre le serveur audio.", { status: 502 })
  }

  if (!upstream.ok || !upstream.body) {
    return new Response('Fichier audio indisponible pour cette sourate.', { status: 502 })
  }

  return new Response(upstream.body, {
    status: 200,
    headers: {
      'Content-Type': 'audio/mpeg',
      'Content-Disposition': `attachment; filename="sourate-${number}.mp3"`,
      // Le fichier ne change jamais pour un numéro de sourate donné : cache long côté navigateur/CDN.
      'Cache-Control': 'public, max-age=604800, immutable',
    },
  })
}
