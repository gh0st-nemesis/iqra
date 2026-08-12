import { useState } from 'react'
import { speakArabic, isTtsAvailable } from '../lib/tts'
import { Volume2Icon, VolumeOffIcon } from './icons'

interface AudioButtonProps {
  text: string
  rate?: number
  size?: 'sm' | 'md' | 'lg'
  label?: string
}

const sizeClasses = {
  sm: 'h-8 w-8',
  md: 'h-11 w-11',
  lg: 'h-14 w-14',
}

const iconSizeClasses = {
  sm: 'h-4 w-4',
  md: 'h-5 w-5',
  lg: 'h-7 w-7',
}

export default function AudioButton({ text, rate = 0.75, size = 'md', label }: AudioButtonProps) {
  const [playing, setPlaying] = useState(false)
  const available = isTtsAvailable()

  const handleClick = () => {
    if (!available) return
    setPlaying(true)
    speakArabic(text, rate)
    setTimeout(() => setPlaying(false), 900)
  }

  const Icon = playing ? Volume2Icon : available ? Volume2Icon : VolumeOffIcon
  // `label` (optionnel) précise le texte lu, ex. "Écouter Al-Faatiha" — sinon on retombe sur un
  // intitulé générique. Dans les deux cas le bouton reste utilisable au clavier/lecteur d'écran :
  // le `title` seul ne suffit pas (non fiable au clavier/tactile), il faut un aria-label explicite.
  const accessibleLabel = available
    ? (label ? `Écouter ${label}` : 'Écouter la prononciation')
    : 'Synthèse vocale non disponible sur ce navigateur'

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={!available}
      title={accessibleLabel}
      aria-label={accessibleLabel}
      className={`${sizeClasses[size]} flex shrink-0 items-center justify-center rounded-full bg-brand-600 text-white shadow-sm transition hover:bg-brand-700 active:scale-95 disabled:cursor-not-allowed disabled:bg-brand-200 dark:disabled:bg-slate-700 ${
        playing ? 'animate-pulse' : ''
      }`}
    >
      <Icon className={iconSizeClasses[size]} aria-hidden />
    </button>
  )
}
