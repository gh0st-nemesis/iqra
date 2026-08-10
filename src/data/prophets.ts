import type { Prophet } from '../types'

// Récits courts et non-exhaustifs, basés sur les grandes lignes largement admises des récits
// coraniques des prophètes. Aucune illustration : par respect de la tradition islamique, les
// prophètes ne sont jamais représentés visuellement dans cette application.
export const prophets: Prophet[] = [
  {
    id: 'p-adam',
    order: 1,
    name: 'Adam',
    arabicName: 'آدَمُ',
    summary:
      "Adam (paix sur lui) est le premier être humain, créé directement par Allah. Il a vécu au Paradis avec son épouse Hawwa (Ève), avant d'en être fait descendre sur Terre après avoir désobéi à Allah en s'approchant de l'arbre interdit — une faute dont il s'est repenti et qu'Allah lui a pardonnée.",
    lesson: "Se tromper fait partie de la vie ; ce qui compte, c'est de se repentir sincèrement, comme l'a fait Adam.",
    vocab: [
      { arabic: 'آدَمُ', transliteration: 'Ādam', meaning: 'Adam' },
      { arabic: 'جَنَّةٌ', transliteration: 'Janna', meaning: 'Paradis, jardin' },
      { arabic: 'تَوْبَةٌ', transliteration: 'Tawba', meaning: 'Repentir' },
    ],
  },
  {
    id: 'p-nuh',
    order: 2,
    name: 'Noé',
    arabicName: 'نُوحٌ',
    summary:
      "Nûh (paix sur lui) a appelé son peuple à n'adorer qu'Allah pendant très longtemps, mais presque personne ne l'a écouté. Sur ordre d'Allah, il a construit une grande arche ; lorsque le déluge est arrivé, seuls lui, les croyants avec lui et un couple de chaque espèce animale ont été sauvés.",
    lesson: "La patience face au refus des autres : Nûh a continué à transmettre son message pendant des siècles sans se décourager.",
    vocab: [
      { arabic: 'نُوحٌ', transliteration: 'Nūḥ', meaning: 'Noé' },
      { arabic: 'سَفِينَةٌ', transliteration: 'Safīna', meaning: 'Bateau, arche' },
      { arabic: 'صَبْرٌ', transliteration: 'Ṣabr', meaning: 'Patience' },
    ],
  },
  {
    id: 'p-ibrahim',
    order: 3,
    name: 'Abraham',
    arabicName: 'إِبْرَاهِيمُ',
    summary:
      "Ibrahim (paix sur lui) a grandi dans un peuple qui adorait des idoles ; il a cherché seul la vérité et a reconnu Allah comme seul Créateur. Il a notamment brisé les idoles de son peuple pour leur montrer qu'elles ne pouvaient se défendre elles-mêmes, et a plus tard reconstruit la Kaaba à La Mecque avec son fils Isma'il.",
    lesson: "Chercher la vérité par soi-même et rester ferme dans sa foi, même seul face à tous les autres.",
    vocab: [
      { arabic: 'إِبْرَاهِيمُ', transliteration: 'Ibrāhīm', meaning: 'Abraham' },
      { arabic: 'صَنَمٌ', transliteration: 'Ṣanam', meaning: 'Idole' },
      { arabic: 'الْكَعْبَةُ', transliteration: 'Al-Kaʿba', meaning: 'La Kaaba' },
    ],
  },
  {
    id: 'p-yusuf',
    order: 4,
    name: 'Joseph',
    arabicName: 'يُوسُفُ',
    summary:
      "Yusuf (paix sur lui), fils de Ya'qub, a été jalousé par ses frères qui l'ont jeté dans un puits puis vendu comme esclave en Égypte. Après bien des épreuves — dont plusieurs années de prison injuste — Allah lui a donné une position d'autorité qui lui a permis de sauver son peuple de la famine et de pardonner à ses frères.",
    lesson: "Le pardon : malgré ce qu'ils lui avaient fait, Yusuf a pardonné à ses frères plutôt que de se venger.",
    vocab: [
      { arabic: 'يُوسُفُ', transliteration: 'Yūsuf', meaning: 'Joseph' },
      { arabic: 'بِئْرٌ', transliteration: 'Biʾr', meaning: 'Puits' },
      { arabic: 'عَفْوٌ', transliteration: 'ʿAfw', meaning: 'Pardon' },
    ],
  },
  {
    id: 'p-musa',
    order: 5,
    name: 'Moïse',
    arabicName: 'مُوسَى',
    summary:
      "Musa (paix sur lui) a grandi à la cour de Pharaon avant d'être appelé par Allah, au Mont Sinaï, à ramener les Enfants d'Israël vers la vérité et à s'opposer à l'injustice de Pharaon. Allah lui a donné plusieurs signes, dont la séparation de la mer, pour sauver son peuple.",
    lesson: "S'opposer à l'injustice avec courage, même face à un tyran puissant, en s'appuyant sur Allah.",
    vocab: [
      { arabic: 'مُوسَى', transliteration: 'Mūsā', meaning: 'Moïse' },
      { arabic: 'فِرْعَوْنُ', transliteration: 'Firʿawn', meaning: 'Pharaon' },
      { arabic: 'عَصًا', transliteration: 'ʿAṣā', meaning: 'Bâton' },
    ],
  },
  {
    id: 'p-isa',
    order: 6,
    name: 'Jésus',
    arabicName: 'عِيسَى',
    summary:
      "'Îsa (paix sur lui), fils de Maryam, est né par un miracle d'Allah sans intervention d'un père. Il a appelé les Enfants d'Israël à adorer Allah Seul et a accompli, avec la permission d'Allah, des miracles comme guérir des malades. Il occupe une place immense en islam, sans pour autant être considéré comme divin.",
    lesson: "La droiture et la sincérité dans l'adoration d'Allah, même face à un entourage hostile.",
    vocab: [
      { arabic: 'عِيسَى', transliteration: 'ʿĪsā', meaning: 'Jésus' },
      { arabic: 'مَرْيَمُ', transliteration: 'Maryam', meaning: 'Marie' },
      { arabic: 'مُعْجِزَةٌ', transliteration: 'Muʿjiza', meaning: 'Miracle' },
    ],
  },
  {
    id: 'p-muhammad',
    order: 7,
    name: 'Muhammad',
    arabicName: 'مُحَمَّدٌ ﷺ',
    summary:
      "Muhammad (paix et bénédiction sur lui) est né à La Mecque et a reçu la révélation du Coran par l'ange Jibril à partir de l'âge de 40 ans. Il a appelé les gens à n'adorer qu'Allah, a fait preuve d'une grande douceur et d'une grande honnêteté toute sa vie, et est le dernier prophète envoyé à l'humanité.",
    lesson: "L'honnêteté et la douceur envers tous : on le surnommait déjà « le digne de confiance » avant même de devenir prophète.",
    vocab: [
      { arabic: 'مُحَمَّدٌ', transliteration: 'Muḥammad', meaning: 'Muhammad' },
      { arabic: 'وَحْيٌ', transliteration: 'Waḥy', meaning: 'Révélation' },
      { arabic: 'أَمَانَةٌ', transliteration: 'Amāna', meaning: 'Honnêteté, fidélité' },
    ],
  },
]
