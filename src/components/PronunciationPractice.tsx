import { useRef, useState } from 'react'
import { createRecognizer, isSpeechRecognitionAvailable } from '../lib/speech'
import { arabicSimilarity } from '../lib/arabic'
import AudioButton from './AudioButton'
import { CheckCircleIcon, MicIcon, XCircleIcon } from './icons'

interface PronunciationPracticeProps {
  text: string
}

type Status = 'idle' | 'listening' | 'result' | 'error'

export default function PronunciationPractice({ text }: PronunciationPracticeProps) {
  const [status, setStatus] = useState<Status>('idle')
  const [heard, setHeard] = useState('')
  const [score, setScore] = useState(0)
  const recognizerRef = useRef<SpeechRecognitionLike | null>(null)
  const available = isSpeechRecognitionAvailable()

  function startListening() {
    const recognizer = createRecognizer('ar-SA')
    if (!recognizer) return
    recognizerRef.current = recognizer
    setStatus('listening')
    setHeard('')

    recognizer.onresult = (event) => {
      const result = event.results[event.results.length - 1]
      let bestScore = -1
      let bestTranscript = ''
      for (let i = 0; i < result.length; i++) {
        const alt = result[i]
        const s = arabicSimilarity(alt.transcript, text)
        if (s > bestScore) {
          bestScore = s
          bestTranscript = alt.transcript
        }
      }
      setHeard(bestTranscript)
      setScore(Math.max(bestScore, 0))
      setStatus('result')
    }
    recognizer.onerror = () => setStatus('error')
    recognizer.onend = () => {
      setStatus((s) => (s === 'listening' ? 'idle' : s))
    }
    recognizer.start()
  }

  function stopListening() {
    recognizerRef.current?.stop()
  }

  if (!available) {
    return (
      <div className="rounded-xl bg-sand-50 dark:bg-slate-700/50 p-4">
        <p className="mb-2 flex items-center gap-2 text-sm font-medium text-brand-700 dark:text-slate-200">
          <MicIcon className="h-4 w-4" /> Entraîne-toi à voix haute
        </p>
        <p className="text-sm text-brand-500 dark:text-slate-400">
          La reconnaissance vocale n&apos;est pas disponible sur ce navigateur (essaie avec Chrome ou Edge). En
          attendant, écoute le modèle et répète-le à voix haute plusieurs fois.
        </p>
        <div className="mt-3">
          <AudioButton text={text} size="md" rate={0.6} />
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-xl bg-sand-50 dark:bg-slate-700/50 p-4">
      <p className="mb-3 text-sm font-medium text-brand-700 dark:text-slate-200">Écoute le modèle, puis prononce le mot à voix haute :</p>
      <div className="flex items-center gap-3">
        <AudioButton text={text} size="md" rate={0.6} />
        <button
          onClick={status === 'listening' ? stopListening : startListening}
          className={`flex h-11 items-center gap-2 rounded-full px-4 text-sm font-semibold text-white transition ${
            status === 'listening' ? 'animate-pulse bg-red-500' : 'bg-brand-600 hover:bg-brand-700'
          }`}
        >
          <MicIcon className="h-4 w-4" />
          {status === 'listening' ? 'Je t’écoute…' : 'Je prononce'}
        </button>
      </div>

      {status === 'result' && (
        <div className="mt-3 flex items-start gap-2">
          {score >= 0.6 ? (
            <CheckCircleIcon className="h-4 w-4 shrink-0 text-green-600" />
          ) : (
            <XCircleIcon className="h-4 w-4 shrink-0 text-amber-500" />
          )}
          <div>
            <p className={`text-sm font-medium ${score >= 0.6 ? 'text-green-700' : 'text-amber-600'}`}>
              {score >= 0.8 ? 'Excellent !' : score >= 0.6 ? 'Bien, continue !' : 'Réessaie, écoute encore le modèle.'}
            </p>
            <p className="text-xs text-brand-400 dark:text-slate-500">Compris : « {heard || '…'} »</p>
          </div>
        </div>
      )}
      {status === 'error' && (
        <p className="mt-3 text-xs text-red-500 dark:text-red-400">
          Micro non accessible (autorisation refusée ?). Tu peux quand même t&apos;entraîner à l&apos;oreille.
        </p>
      )}
    </div>
  )
}
