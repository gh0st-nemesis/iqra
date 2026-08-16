// Table de correspondance ModuleIconName -> composant icône, isolée dans son propre fichier
// (plutôt que dans icons.tsx) pour que ce dernier n'exporte que des composants : le Fast Refresh
// de Vite exige qu'un fichier de composants n'exporte que des composants (react-refresh/only-export-components).
import type { ModuleIconName } from '../types'
import {
  LettersIcon,
  HashIcon,
  PenIcon,
  BookOpenIcon,
  MusicNoteIcon,
  LandmarkIcon,
  DropletIcon,
  PrayerFigureIcon,
  LayersIcon,
  SparkleIcon,
  ScrollIcon,
  SunMoonIcon,
  CompassIcon,
  KaabaIcon,
  type IconProps,
} from './icons'

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
  kaaba: KaabaIcon,
}
