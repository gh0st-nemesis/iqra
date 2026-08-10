import type { SVGProps } from 'react'

interface IllustrationProps extends SVGProps<SVGSVGElement> {
  className?: string
}

const strokeProps = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

function Mat() {
  return <path d="M8,94 H92" className="text-brand-200" {...strokeProps} strokeWidth={3} />
}

// Aucune photo librement réutilisable et convenable n'a été trouvée pour le tayammum
// (geste rare à photographier) : illustration schématique à la place.
export function TayammumIllustration({ className = '', ...rest }: IllustrationProps) {
  return (
    <svg viewBox="0 0 100 100" className={className} {...rest}>
      <g className="text-brand-700" {...strokeProps}>
        <path d="M22,60 Q30,44 44,46 Q50,47 50,54 Q50,47 56,46 Q70,44 78,60" />
        <path d="M22,60 Q50,74 78,60" />
      </g>
      <g className="text-sand-500" {...strokeProps} strokeWidth={4}>
        <path d="M14,84 Q22,78 30,84" />
        <path d="M34,88 Q42,80 50,88" />
        <path d="M54,84 Q62,78 70,84" />
        <path d="M74,88 Q82,80 90,88" />
      </g>
      <Mat />
    </svg>
  )
}
