import type { AblutionStep, RealPhoto } from '../types'

// Photo réelle (Unsplash, licence libre de droits, vérifiée).
export const wuduHeroPhoto: RealPhoto = {
  url: 'https://images.unsplash.com/photo-1783953333111-3375b999fa1d?fm=jpg&q=80&w=1200&auto=format&fit=crop',
  credit: 'ZAKIUDDIN',
  creditUrl: 'https://unsplash.com/photos/a-man-performs-ritual-ablution-with-splashing-water-PcVKZyP1V2s',
  platform: 'Unsplash',
}

export const wuduSteps: AblutionStep[] = [
  {
    id: 'w-niyyah',
    order: 1,
    title: 'Intention (Niyyah)',
    instruction:
      "Avant de commencer, forme dans ton cœur l'intention de faire les ablutions pour pouvoir prier. Ce n'est pas une formule à réciter, juste une intention silencieuse.",
  },
  {
    id: 'w-bismillah',
    order: 2,
    title: 'Bismillah',
    instruction: 'Commence en prononçant le nom d\'Allah.',
    dua: {
      arabic: 'بِسْمِ اللَّهِ',
      transliteration: 'Bismillah',
      meaning: 'Au nom d\'Allah',
    },
  },
  {
    id: 'w-hands',
    order: 3,
    title: 'Laver les mains',
    instruction: 'Lave les mains jusqu\'aux poignets, en veillant à bien faire passer l\'eau entre les doigts.',
    repeat: 3,
  },
  {
    id: 'w-mouth',
    order: 4,
    title: 'Rincer la bouche',
    instruction: 'Prends de l\'eau dans la bouche, fais-la tourner, puis recrache-la.',
    repeat: 3,
  },
  {
    id: 'w-nose',
    order: 5,
    title: 'Nettoyer le nez',
    instruction: 'Aspire un peu d\'eau par le nez, puis expire pour l\'évacuer.',
    repeat: 3,
  },
  {
    id: 'w-face',
    order: 6,
    title: 'Laver le visage',
    instruction: 'Lave tout le visage, du haut du front au bas du menton, et d\'une oreille à l\'autre.',
    repeat: 3,
  },
  {
    id: 'w-arms',
    order: 7,
    title: 'Laver les bras',
    instruction: 'Lave le bras droit puis le bras gauche, jusqu\'aux coudes inclus.',
    repeat: 3,
  },
  {
    id: 'w-head',
    order: 8,
    title: 'Essuyer la tête',
    instruction: 'Passe les mains mouillées sur toute la tête, de l\'avant vers l\'arrière puis retour.',
    repeat: 1,
  },
  {
    id: 'w-ears',
    order: 9,
    title: 'Essuyer les oreilles',
    instruction: 'Avec les mains encore humides, essuie l\'intérieur des oreilles avec les index et l\'extérieur avec les pouces.',
    repeat: 1,
  },
  {
    id: 'w-feet',
    order: 10,
    title: 'Laver les pieds',
    instruction: 'Lave le pied droit puis le pied gauche, jusqu\'aux chevilles incluses, sans oublier entre les orteils.',
    repeat: 3,
  },
  {
    id: 'w-final-dua',
    order: 11,
    title: 'Invocation finale',
    instruction: 'Une fois les ablutions terminées, on peut réciter cette invocation.',
    dua: {
      arabic: 'أَشْهَدُ أَنْ لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ',
      transliteration: 'Ash-hadu an lā ilāha illa-llāhu waḥdahu lā sharīka lah, wa ash-hadu anna Muḥammadan ʿabduhu wa rasūluh',
      meaning:
        'J\'atteste qu\'il n\'y a de divinité qu\'Allah, Seul, sans associé, et j\'atteste que Muhammad est Son serviteur et Son messager.',
    },
  },
]

export const tayammumSteps: AblutionStep[] = [
  {
    id: 't-when',
    order: 1,
    title: 'Quand faire le tayammum ?',
    instruction:
      'Le tayammum remplace le wudu (ou le ghusl) quand on ne trouve pas d\'eau, quand l\'eau est trop loin ou insuffisante, ou quand l\'utiliser serait nuisible à la santé (maladie, blessure, grand froid...).',
  },
  {
    id: 't-niyyah',
    order: 2,
    title: 'Intention (Niyyah)',
    instruction: 'Forme l\'intention dans ton cœur de te purifier pour pouvoir prier, puis dis Bismillah.',
    dua: {
      arabic: 'بِسْمِ اللَّهِ',
      transliteration: 'Bismillah',
      meaning: 'Au nom d\'Allah',
    },
  },
  {
    id: 't-strike-1',
    order: 3,
    title: 'Frapper la terre',
    instruction:
      'Frappe une fois les deux paumes de mains sur une surface propre (terre, sable, pierre, ou tout objet couvert de poussière), puis souffle légèrement dessus.',
    repeat: 1,
  },
  {
    id: 't-face',
    order: 4,
    title: 'Essuyer le visage',
    instruction: 'Passe les deux paumes sur tout le visage, comme lors du wudu.',
    repeat: 1,
  },
  {
    id: 't-strike-2',
    order: 5,
    title: 'Frapper la terre à nouveau',
    instruction: 'Frappe une seconde fois les paumes sur la surface propre.',
    repeat: 1,
  },
  {
    id: 't-arms',
    order: 6,
    title: 'Essuyer les mains et avant-bras',
    instruction: 'Essuie la main et l\'avant-bras droits avec la paume gauche, puis la main et l\'avant-bras gauches avec la paume droite.',
    repeat: 1,
  },
]
