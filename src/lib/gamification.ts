// Niveaux (basés sur l'XP total) et badges (basés sur des jalons de progression).
// Purement dérivé de l'état du store `progress` — aucune donnée propre à persister ici.

export interface LevelInfo {
  level: number
  title: string
  xp: number
  xpInLevel: number
  xpForNextLevel: number | null // null = niveau maximum atteint
  progress: number // 0..1 vers le niveau suivant
}

const LEVELS: { title: string; minXp: number }[] = [
  { title: 'Graine', minXp: 0 },
  { title: 'Pousse', minXp: 30 },
  { title: 'Bourgeon', minXp: 75 },
  { title: 'Jeune arbre', minXp: 150 },
  { title: 'Arbre', minXp: 300 },
  { title: 'Arbre fruitier', minXp: 500 },
  { title: 'Palmier', minXp: 800 },
  { title: 'Oasis', minXp: 1200 },
  { title: 'Jardin du savoir', minXp: 1800 },
  { title: "Lumière du Coran", minXp: 2600 },
]

export function getLevelInfo(xp: number): LevelInfo {
  let index = 0
  for (let i = 0; i < LEVELS.length; i++) {
    if (xp >= LEVELS[i].minXp) index = i
  }
  const current = LEVELS[index]
  const next = LEVELS[index + 1]
  return {
    level: index + 1,
    title: current.title,
    xp,
    xpInLevel: xp - current.minXp,
    xpForNextLevel: next ? next.minXp - current.minXp : null,
    progress: next ? (xp - current.minXp) / (next.minXp - current.minXp) : 1,
  }
}

export interface BadgeTotals {
  alphabet: number
  numbers: number
  harakat: number
  words: number
  tajwid: number
  ablutionSteps: number
  prayerSteps: number
  vocab: number
  names: number
  prophets: number
}

export interface BadgeProgressInput {
  masteredLetters: string[]
  masteredNumbers: string[]
  learnedHarakat: string[]
  wordsRead: string[]
  tajwidRulesSeen: string[]
  wuduStepsSeen: string[]
  tayammumStepsSeen: string[]
  prayerStepsSeen: string[]
  memorizedVerses: unknown[]
  masteredVocab: string[]
  masteredNames: string[]
  prophetsRead: string[]
  streak: number
}

export interface BadgeDefinition {
  id: string
  title: string
  description: string
  iconName:
    | 'letters'
    | 'hash'
    | 'pen'
    | 'book'
    | 'droplet'
    | 'prayer'
    | 'music'
    | 'bookmark'
    | 'trophy'
    | 'flame'
    | 'star'
    | 'layers'
    | 'sparkle'
    | 'scroll'
  unlocked: (p: BadgeProgressInput, t: BadgeTotals) => boolean
}

export const badgeDefinitions: BadgeDefinition[] = [
  {
    id: 'first-steps',
    title: 'Premiers pas',
    description: 'Maîtriser sa première lettre de l’alphabet',
    iconName: 'letters',
    unlocked: (p) => p.masteredLetters.length >= 1,
  },
  {
    id: 'alphabet-master',
    title: 'Maître de l’alphabet',
    description: 'Maîtriser les 28 lettres',
    iconName: 'letters',
    unlocked: (p, t) => p.masteredLetters.length >= t.alphabet,
  },
  {
    id: 'numbers-master',
    title: 'As des chiffres',
    description: 'Maîtriser tous les chiffres indo-arabes',
    iconName: 'hash',
    unlocked: (p, t) => p.masteredNumbers.length >= t.numbers,
  },
  {
    id: 'harakat-master',
    title: 'Voyelles connues',
    description: 'Voir toutes les harakat',
    iconName: 'pen',
    unlocked: (p, t) => p.learnedHarakat.length >= t.harakat,
  },
  {
    id: 'reader',
    title: 'Lecteur confirmé',
    description: 'Pratiquer tous les mots du module Lecture',
    iconName: 'book',
    unlocked: (p, t) => p.wordsRead.length >= t.words,
  },
  {
    id: 'tajwid-master',
    title: 'Expert tajwîd',
    description: 'Voir toutes les règles de tajwîd',
    iconName: 'music',
    unlocked: (p, t) => p.tajwidRulesSeen.length >= t.tajwid,
  },
  {
    id: 'purification',
    title: 'Purification complète',
    description: 'Voir toutes les étapes du wudû et du tayammum',
    iconName: 'droplet',
    unlocked: (p, t) => p.wuduStepsSeen.length + p.tayammumStepsSeen.length >= t.ablutionSteps,
  },
  {
    id: 'salat-master',
    title: 'Salat maîtrisée',
    description: 'Voir toutes les étapes de la prière',
    iconName: 'prayer',
    unlocked: (p, t) => p.prayerStepsSeen.length >= t.prayerSteps,
  },
  {
    id: 'first-verse',
    title: 'Premier verset',
    description: 'Mémoriser un premier verset du Coran',
    iconName: 'bookmark',
    unlocked: (p) => p.memorizedVerses.length >= 1,
  },
  {
    id: 'hafiz-en-herbe',
    title: 'Hafiz en herbe',
    description: 'Mémoriser 10 versets du Coran',
    iconName: 'bookmark',
    unlocked: (p) => p.memorizedVerses.length >= 10,
  },
  {
    id: 'vocab-master',
    title: 'Riche vocabulaire',
    description: 'Maîtriser tous les mots de vocabulaire',
    iconName: 'layers',
    unlocked: (p, t) => p.masteredVocab.length >= t.vocab,
  },
  {
    id: 'names-master',
    title: 'Les 99 Noms',
    description: 'Maîtriser les 99 Noms d’Allah',
    iconName: 'sparkle',
    unlocked: (p, t) => p.masteredNames.length >= t.names,
  },
  {
    id: 'prophets-master',
    title: 'Conteur des prophètes',
    description: 'Lire tous les récits des prophètes',
    iconName: 'scroll',
    unlocked: (p, t) => p.prophetsRead.length >= t.prophets,
  },
  {
    id: 'streak-7',
    title: 'Une semaine de suite',
    description: 'Pratiquer 7 jours de suite',
    iconName: 'flame',
    unlocked: (p) => p.streak >= 7,
  },
  {
    id: 'streak-30',
    title: 'Un mois de suite',
    description: 'Pratiquer 30 jours de suite',
    iconName: 'flame',
    unlocked: (p) => p.streak >= 30,
  },
]
