// Petite couche autour de l'API Web Speech pour prononcer du texte arabe.
// Utilisée pour les lettres, syllabes et mots isolés (pas pour le Coran, qui utilise
// de vrais récitateurs via l'API Coran — voir quranApi.ts).

let cachedVoices: SpeechSynthesisVoice[] = []

function loadVoices() {
  if (typeof window === 'undefined' || !window.speechSynthesis) return
  cachedVoices = window.speechSynthesis.getVoices()
}

if (typeof window !== 'undefined' && window.speechSynthesis) {
  loadVoices()
  window.speechSynthesis.onvoiceschanged = loadVoices
}

function pickArabicVoice(): SpeechSynthesisVoice | undefined {
  return (
    cachedVoices.find((v) => v.lang?.toLowerCase().startsWith('ar')) ??
    cachedVoices.find((v) => v.lang?.toLowerCase().includes('ar-'))
  )
}

export function isTtsAvailable() {
  return typeof window !== 'undefined' && !!window.speechSynthesis
}

export function speakArabic(text: string, rate = 0.75) {
  if (!isTtsAvailable()) return
  window.speechSynthesis.cancel()
  const utterance = new SpeechSynthesisUtterance(text)
  const voice = pickArabicVoice()
  if (voice) utterance.voice = voice
  utterance.lang = voice?.lang ?? 'ar-SA'
  utterance.rate = rate
  utterance.pitch = 1
  window.speechSynthesis.speak(utterance)
}

export function stopSpeaking() {
  if (isTtsAvailable()) window.speechSynthesis.cancel()
}
