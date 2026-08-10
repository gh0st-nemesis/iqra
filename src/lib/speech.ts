// Petite couche autour de la reconnaissance vocale du navigateur (Web Speech API),
// utilisée pour l'entraînement à la prononciation. Non disponible partout (Chrome/Edge
// uniquement à ce jour) : toujours vérifier isSpeechRecognitionAvailable() avant usage.

export function isSpeechRecognitionAvailable() {
  return typeof window !== 'undefined' && !!(window.SpeechRecognition || window.webkitSpeechRecognition)
}

export function createRecognizer(lang = 'ar-SA'): SpeechRecognitionLike | null {
  if (typeof window === 'undefined') return null
  const Ctor = window.SpeechRecognition ?? window.webkitSpeechRecognition
  if (!Ctor) return null
  const recognizer = new Ctor()
  recognizer.lang = lang
  recognizer.interimResults = false
  recognizer.maxAlternatives = 3
  recognizer.continuous = false
  return recognizer
}
