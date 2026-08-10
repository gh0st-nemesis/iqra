// Bibliothèque d'icônes SVG minimalistes (style trait, 24x24, currentColor).
// Toutes les icônes de l'app passent par ici — aucun emoji n'est utilisé dans l'UI.
import type { SVGProps } from 'react'
import type { ModuleIconName } from '../types'

export type IconProps = SVGProps<SVGSVGElement>

function base(props: IconProps) {
  return {
    xmlns: 'http://www.w3.org/2000/svg',
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    ...props,
  }
}

export function HomeIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M3 11.5 12 4l9 7.5" />
      <path d="M5.5 10v9a1 1 0 0 0 1 1H10v-6h4v6h3.5a1 1 0 0 0 1-1v-9" />
    </svg>
  )
}

export function LettersIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M4 19V7.5a3.5 3.5 0 0 1 7 0V19" />
      <path d="M4 13.5h7" />
      <path d="M14.5 19c-1.4 0-2.5-1-2.5-2.4 0-1.6 1.6-2.4 3-2.7l3-.6" />
      <path d="M18 19v-7.5" />
      <path d="M18 11.5c0-1.2-.9-2-2-2-.9 0-1.6.5-1.9 1.2" />
    </svg>
  )
}

export function HashIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M9.5 4 7 20" />
      <path d="M17 4l-2.5 16" />
      <path d="M4.5 9h15" />
      <path d="M3.5 15h15" />
    </svg>
  )
}

export function PenIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M4 20h4L19.5 8.5a2.1 2.1 0 0 0-3-3L5.5 16.5Z" />
      <path d="M13.5 6.5 17.5 10.5" />
      <path d="M4 20l.7-3.3L7.3 20Z" />
    </svg>
  )
}

export function BookOpenIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 6.5c-1.6-1.3-3.6-2-6.5-2A1 1 0 0 0 4.5 5.5v12c0 .6.4 1 1 1 2.6 0 4.7.6 6.2 1.9" />
      <path d="M12 6.5c1.6-1.3 3.6-2 6.5-2 .6 0 1 .4 1 1v12c0 .6-.4 1-1 1-2.6 0-4.7.6-6.2 1.9" />
      <path d="M12 6.5v13.9" />
    </svg>
  )
}

export function MusicNoteIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M9 18V5.8a1 1 0 0 1 .8-1L19 3v13" />
      <circle cx="6.5" cy="18" r="2.5" />
      <circle cx="16.5" cy="16" r="2.5" />
    </svg>
  )
}

export function LandmarkIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 3c1.8 1.8 3.8 2.8 6 3.2" />
      <path d="M12 3C10.2 4.8 8.2 5.8 6 6.2" />
      <path d="M12 3v3.2" />
      <circle cx="12" cy="8" r="1.4" />
      <path d="M4 21h16" />
      <path d="M5.5 21V11L12 8l6.5 3v10" />
      <path d="M9 21v-6h6v6" />
    </svg>
  )
}

export function FlameIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 21c-3.6 0-6.2-2.4-6.2-5.8 0-2.3 1.3-3.7 2.2-5.2.4.9.3 2 1.1 2.7-.2-2.7.6-5.3 3-7.2.4 1.8.6 3 2 4.4 1.2 1.2 2.1 2.6 2.1 4.5 0 .8-.1 1.5-.4 2.2" />
      <path d="M12 21c1.9 0 3.5-1.3 3.5-3.2 0-1.3-.7-2.1-1.2-2.9-.5.9-1.3 1.2-1.7 2-.2-1-.1-1.9.4-2.9-1.5.6-2.5 2-2.5 3.6 0 1.9 1.1 3.4 1.5 3.4Z" />
    </svg>
  )
}

export function StarIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path
        d="M12 3.5l2.6 5.3 5.9.8-4.3 4.1 1 5.8-5.2-2.8-5.2 2.8 1-5.8-4.3-4.1 5.9-.8Z"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function Volume2Icon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M4 9.5v5h3.2L12 18V6L7.2 9.5Z" strokeLinejoin="round" />
      <path d="M16 9c.8.7 1.3 1.7 1.3 3s-.5 2.3-1.3 3" />
      <path d="M18.3 6.8c1.5 1.3 2.4 3.2 2.4 5.2s-.9 3.9-2.4 5.2" />
    </svg>
  )
}

export function VolumeOffIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M4 9.5v5h3.2L12 18V6L7.2 9.5Z" strokeLinejoin="round" />
      <path d="M16.5 10 20 13.5" />
      <path d="M20 10l-3.5 3.5" />
    </svg>
  )
}

export function PlayIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M7 5.5v13l11-6.5Z" strokeLinejoin="round" />
    </svg>
  )
}

export function CheckIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M4.5 12.5 9.5 17.5 19.5 6.5" />
    </svg>
  )
}

export function CheckCircleIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M8.3 12.3 10.8 14.8 15.8 9.3" />
    </svg>
  )
}

export function XCircleIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M9.3 9.3 14.7 14.7" />
      <path d="M14.7 9.3 9.3 14.7" />
    </svg>
  )
}

export function AlertTriangleIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 4 21.5 20H2.5Z" strokeLinejoin="round" />
      <path d="M12 10v4.2" />
      <circle cx="12" cy="17.3" r="0.15" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function LightbulbIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M9 18h6" />
      <path d="M10 21h4" />
      <path d="M12 3a6 6 0 0 0-3.6 10.8c.6.5 1 1.2 1.1 2h5a2.7 2.7 0 0 1 1.1-2A6 6 0 0 0 12 3Z" />
    </svg>
  )
}

export function SproutIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 21v-8.5" />
      <path d="M12 12.5C12 8.9 9.4 6.5 5 6.3c0 4.3 2.7 6.5 7 6.2Z" strokeLinejoin="round" />
      <path d="M12 10.8c0-3 2.2-5 6-5.1.2 3.5-2 5.3-6 5.1Z" strokeLinejoin="round" />
    </svg>
  )
}

export function TrophyIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M8 4h8v6a4 4 0 0 1-8 0Z" />
      <path d="M8 5H5.5a1 1 0 0 0-1 1.2c.4 2.2 1.7 3.6 3.7 4" />
      <path d="M16 5h2.5a1 1 0 0 1 1 1.2c-.4 2.2-1.7 3.6-3.7 4" />
      <path d="M12 14v3" />
      <path d="M9 20.5c0-1.4 1.3-2.2 3-2.2s3 .8 3 2.2" />
      <path d="M8.5 20.5h7" />
    </svg>
  )
}

export function ArrowLeftIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M19 12H5" />
      <path d="M10.5 6.5 5 12l5.5 5.5" />
    </svg>
  )
}

export function ChevronUpIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M5.5 14.5 12 8l6.5 6.5" />
    </svg>
  )
}

export function ChevronDownIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M5.5 9.5 12 16l6.5-6.5" />
    </svg>
  )
}

export function DropletIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 3.5c3 3.8 6 7.7 6 11.2a6 6 0 0 1-12 0c0-3.5 3-7.4 6-11.2Z" strokeLinejoin="round" />
      <path d="M9.3 14.5a2.7 2.7 0 0 0 2.7 2.7" />
    </svg>
  )
}

export function PrayerFigureIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="4.3" r="1.6" />
      <path d="M12 6.5v5.5" />
      <path d="M8 20c.5-3.5 2-5 4-5s3.5 1.5 4 5" />
      <path d="M9 12.3 6.5 15" />
      <path d="M15 12.3 17.5 15" />
    </svg>
  )
}

export function SandIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M4 18c1.5-4 3-6 8-6s6.5 2 8 6" />
      <circle cx="8.5" cy="14.5" r="0.15" fill="currentColor" stroke="none" />
      <circle cx="12" cy="13" r="0.15" fill="currentColor" stroke="none" />
      <circle cx="15.5" cy="14.5" r="0.15" fill="currentColor" stroke="none" />
      <circle cx="10" cy="16" r="0.15" fill="currentColor" stroke="none" />
      <circle cx="14" cy="16" r="0.15" fill="currentColor" stroke="none" />
      <path d="M3 20.5h18" />
    </svg>
  )
}

export function RepeatIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M4 11a8 8 0 0 1 13.7-5.7L20 7.5" />
      <path d="M20 4v3.5h-3.5" />
      <path d="M20 13a8 8 0 0 1-13.7 5.7L4 16.5" />
      <path d="M4 20v-3.5h3.5" />
    </svg>
  )
}

export function MicIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 3.5a3.2 3.2 0 0 0-3.2 3.2v5.6a3.2 3.2 0 0 0 6.4 0V6.7A3.2 3.2 0 0 0 12 3.5Z" />
      <path d="M6.5 11v1a5.5 5.5 0 0 0 11 0v-1" />
      <path d="M12 17.5V21" />
      <path d="M9 21h6" />
    </svg>
  )
}

export function SettingsIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 13.5a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.9 2.9l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6V20a2 2 0 1 1-4 0v-.2a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.9-2.9l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.6-1H4a2 2 0 1 1 0-4h.2a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.9-2.9l.1.1a1.7 1.7 0 0 0 1.9.3H10.5a1.7 1.7 0 0 0 1-1.6V4a2 2 0 1 1 4 0v.2a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.9 2.9l-.1.1a1.7 1.7 0 0 0-.3 1.9V10.5a1.7 1.7 0 0 0 1.6 1H20a2 2 0 1 1 0 4h-.2a1.7 1.7 0 0 0-1.6 1Z" />
    </svg>
  )
}

export function SunIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="12" r="4.2" />
      <path d="M12 2.5v2.3" />
      <path d="M12 19.2v2.3" />
      <path d="M4.6 4.6l1.6 1.6" />
      <path d="M17.8 17.8l1.6 1.6" />
      <path d="M2.5 12h2.3" />
      <path d="M19.2 12h2.3" />
      <path d="M4.6 19.4l1.6-1.6" />
      <path d="M17.8 6.2l1.6-1.6" />
    </svg>
  )
}

export function MoonIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5Z" />
    </svg>
  )
}

export function BookmarkIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M6.5 4h11a1 1 0 0 1 1 1v15.2l-6.5-3.7-6.5 3.7V5a1 1 0 0 1 1-1Z" />
    </svg>
  )
}

export function RefreshIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M4 12a8 8 0 0 1 13.7-5.7L20 8.5" />
      <path d="M20 4v4.5h-4.5" />
      <path d="M20 12a8 8 0 0 1-13.7 5.7L4 15.5" />
      <path d="M4 20v-4.5h4.5" />
    </svg>
  )
}

export function InfoIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 11v5.5" />
      <circle cx="12" cy="7.8" r="0.15" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function TagIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M11.5 4H6a2 2 0 0 0-2 2v5.5a2 2 0 0 0 .6 1.4l8 8a2 2 0 0 0 2.8 0l5.1-5.1a2 2 0 0 0 0-2.8l-8-8a2 2 0 0 0-1-.6Z" />
      <circle cx="8" cy="8" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function BellIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M6 17v-5.5a6 6 0 0 1 12 0V17l1.8 2.5H4.2Z" strokeLinejoin="round" />
      <path d="M10 20.5a2 2 0 0 0 4 0" />
    </svg>
  )
}

export function DownloadIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 3.5v11" />
      <path d="M7.5 10 12 14.5 16.5 10" />
      <path d="M4.5 17v2.5a1 1 0 0 0 1 1h13a1 1 0 0 0 1-1V17" />
    </svg>
  )
}

export function UploadIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 14.5v-11" />
      <path d="M7.5 7.5 12 3l4.5 4.5" />
      <path d="M4.5 17v2.5a1 1 0 0 0 1 1h13a1 1 0 0 0 1-1V17" />
    </svg>
  )
}

export function LayersIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 3.5 20.5 8 12 12.5 3.5 8Z" strokeLinejoin="round" />
      <path d="M3.5 12 12 16.5 20.5 12" />
      <path d="M3.5 16 12 20.5 20.5 16" />
    </svg>
  )
}

export function SparkleIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path
        d="M12 3.5c.6 3 2.2 4.6 5.2 5.2-3 .6-4.6 2.2-5.2 5.2-.6-3-2.2-4.6-5.2-5.2 3-.6 4.6-2.2 5.2-5.2Z"
        strokeLinejoin="round"
      />
      <path d="M18.5 15.5c.3 1.5 1.1 2.3 2.6 2.6-1.5.3-2.3 1.1-2.6 2.6-.3-1.5-1.1-2.3-2.6-2.6 1.5-.3 2.3-1.1 2.6-2.6Z" strokeLinejoin="round" />
    </svg>
  )
}

export function ScrollIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M6.5 4.5h11V17a2.5 2.5 0 0 1-2.5 2.5h-8" />
      <path d="M6.5 4.5a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2" />
      <path d="M17.5 19.5a2 2 0 0 0 2-2V15h-2.5" />
      <path d="M9 9h6" />
      <path d="M9 12.5h6" />
    </svg>
  )
}

export function SunMoonIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 3.5v2" />
      <path d="M5.5 6.5 7 8" />
      <path d="M3.5 13.5h2" />
      <circle cx="12" cy="13.5" r="4" />
      <path d="M17.5 9.5a5.5 5.5 0 0 0 4 5.3 6 6 0 0 1-11.3 2.7" />
    </svg>
  )
}

export function CompassIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M14.8 9.2 13.3 14 8.5 15.3l1.5-4.8Z" strokeLinejoin="round" />
    </svg>
  )
}

export function MenuIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M3.5 6.5h17" />
      <path d="M3.5 12h17" />
      <path d="M3.5 17.5h17" />
    </svg>
  )
}

export function XIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M5.5 5.5l13 13" />
      <path d="M18.5 5.5l-13 13" />
    </svg>
  )
}

export const moduleIcons: Record<ModuleIconName, (props: IconProps) => JSX.Element> = {
  letters: LettersIcon,
  hash: HashIcon,
  pen: PenIcon,
  book: BookOpenIcon,
  music: MusicNoteIcon,
  landmark: LandmarkIcon,
  droplet: DropletIcon,
  prayer: PrayerFigureIcon,
  layers: LayersIcon,
  sparkle: SparkleIcon,
  scroll: ScrollIcon,
  sunmoon: SunMoonIcon,
  compass: CompassIcon,
}
