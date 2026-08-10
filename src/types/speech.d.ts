// Déclarations minimales pour la Web Speech API (reconnaissance vocale), non standard
// mais disponible sur Chrome/Edge sous window.SpeechRecognition / webkitSpeechRecognition.
// Pas d'import/export ici : fichier de script global, fusionné avec `lib.dom`.

interface SpeechRecognitionAlternativeLike {
  transcript: string
  confidence: number
}

interface SpeechRecognitionResultLike {
  readonly length: number
  [index: number]: SpeechRecognitionAlternativeLike
}

interface SpeechRecognitionResultListLike {
  readonly length: number
  [index: number]: SpeechRecognitionResultLike
}

interface SpeechRecognitionEventLike extends Event {
  resultIndex: number
  results: SpeechRecognitionResultListLike
}

interface SpeechRecognitionErrorEventLike extends Event {
  error: string
  message: string
}

interface SpeechRecognitionLike extends EventTarget {
  lang: string
  interimResults: boolean
  maxAlternatives: number
  continuous: boolean
  start: () => void
  stop: () => void
  abort: () => void
  onresult: ((this: SpeechRecognitionLike, ev: SpeechRecognitionEventLike) => void) | null
  onerror: ((this: SpeechRecognitionLike, ev: SpeechRecognitionErrorEventLike) => void) | null
  onend: ((this: SpeechRecognitionLike) => void) | null
  onstart: ((this: SpeechRecognitionLike) => void) | null
}

interface Window {
  SpeechRecognition?: new () => SpeechRecognitionLike
  webkitSpeechRecognition?: new () => SpeechRecognitionLike
}
