import { useState } from 'react'
import type { RealPhoto as RealPhotoData } from '../types'
import { AlertTriangleIcon } from './icons'

interface RealPhotoProps {
  photo: RealPhotoData
  alt: string
  className?: string
}

// Affiche une vraie photo (Pexels / Unsplash, licences libres de droits) avec crédit discret
// et une dégradation propre si le chargement échoue (image hotlinkée).
export default function RealPhoto({ photo, alt, className = '' }: RealPhotoProps) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <div className={`flex flex-col items-center justify-center gap-2 bg-brand-100 dark:bg-slate-700 text-center text-xs text-brand-400 dark:text-slate-500 ${className}`}>
        <AlertTriangleIcon className="h-6 w-6" />
        Image indisponible
      </div>
    )
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <img
        src={photo.url}
        alt={alt}
        loading="lazy"
        onError={() => setFailed(true)}
        className="h-full w-full object-cover"
      />
      <a
        href={photo.creditUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-0 right-0 rounded-tl-lg bg-black/55 px-2 py-0.5 text-[10px] text-white/90 backdrop-blur-sm transition hover:bg-black/70"
      >
        {photo.credit} · {photo.platform}
      </a>
    </div>
  )
}
