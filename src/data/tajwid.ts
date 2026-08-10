import type { TajwidRule } from '../types'

export const tajwidRules: TajwidRule[] = [
  // --- Règles du Nūn Sākin et du Tanwīn ---
  {
    id: 'izhar',
    group: 'Nūn sākin (نْ) et Tanwīn',
    name: 'Al-Izhâr (la clarté)',
    shortName: 'Al-Izhâr',
    arabicName: 'الإظهار الحلقي',
    description:
      "Quand le nûn sâkin ou le tanwîn est suivi d'une des 6 lettres gutturales, on le prononce clairement, sans le fondre dans la lettre suivante.",
    letters: 'ء ه ع ح غ خ',
    examples: [
      { text: 'مَنْ آمَنَ', transliteration: 'man āmana', note: 'نْ + ء → prononcé clairement' },
      { text: 'مِنْ خَيْرٍ', transliteration: 'min khayrin', note: 'نْ + خ → prononcé clairement' },
    ],
  },
  {
    id: 'idgham-ghunnah',
    group: 'Nūn sākin (نْ) et Tanwīn',
    name: 'Al-Idghâm avec Ghunnah (fusion nasalisée)',
    shortName: 'Idghâm avec ghunnah',
    arabicName: 'الإدغام بغنة',
    description:
      "Quand le nûn sâkin ou le tanwîn est suivi de ي ن م و, on fond le son dans la lettre suivante avec une résonance nasale (ghunnah).",
    letters: 'ي ن م و',
    examples: [
      { text: 'مَنْ يَقُولُ', transliteration: 'may-yaqūlu', note: 'نْ + ي → fusion nasalisée' },
      { text: 'مِن مَّاءٍ', transliteration: 'mim-mā\'in', note: 'نْ + م → fusion nasalisée' },
    ],
  },
  {
    id: 'idgham-no-ghunnah',
    group: 'Nūn sākin (نْ) et Tanwīn',
    name: 'Al-Idghâm sans Ghunnah (fusion simple)',
    shortName: 'Idghâm sans ghunnah',
    arabicName: 'الإدغام بغير غنة',
    description: "Quand le nûn sâkin ou le tanwîn est suivi de ل ou ر, on fond complètement le son, sans résonance nasale.",
    letters: 'ل ر',
    examples: [{ text: 'مِن رَّبِّهِمْ', transliteration: 'mir-rabbihim', note: 'نْ + ر → fusion simple' }],
  },
  {
    id: 'iqlab',
    group: 'Nūn sākin (نْ) et Tanwīn',
    name: "Al-Iqlâb (la conversion)",
    shortName: 'Al-Iqlâb',
    arabicName: 'الإقلاب',
    description:
      "Quand le nûn sâkin ou le tanwîn est suivi de ب, on le convertit en un son « m » léger, avec résonance nasale, prononcé lèvres fermées.",
    letters: 'ب',
    examples: [{ text: 'مِنۢ بَعْدِ', transliteration: 'mim-ba\'di', note: 'نْ + ب → converti en « m »' }],
  },
  {
    id: 'ikhfa',
    group: 'Nūn sākin (نْ) et Tanwīn',
    name: "Al-Ikhfâ' (la dissimulation)",
    shortName: "Al-Ikhfâ'",
    arabicName: 'الإخفاء الحقيقي',
    description:
      "Pour les 15 lettres restantes, on cache le son du nûn entre la clarté et la fusion, avec une légère résonance nasale.",
    letters: 'ت ث ج د ذ ز س ش ص ض ط ظ ف ق ك',
    examples: [{ text: 'مَن تَابَ', transliteration: 'man tāba (nasalisé)', note: 'نْ + ت → son caché, nasalisé' }],
  },
  // --- Règles du Mīm Sākin ---
  {
    id: 'ikhfa-shafawi',
    group: 'Mīm sākin (مْ)',
    name: 'Al-Ikhfâ\' Shafawî',
    shortName: "Ikhfâ' Shafawî",
    arabicName: 'الإخفاء الشفوي',
    description: 'Quand le mîm sâkin est suivi de ب, le son est caché avec résonance nasale, lèvres légèrement fermées.',
    letters: 'ب',
    examples: [{ text: 'تَرْمِيهِم بِحِجَارَةٍ', transliteration: 'tarmīhim-bi...', note: 'مْ + ب → caché, nasalisé' }],
  },
  {
    id: 'idgham-shafawi',
    group: 'Mīm sākin (مْ)',
    name: 'Al-Idghâm Shafawî',
    shortName: 'Idghâm Shafawî',
    arabicName: 'الإدغام الشفوي',
    description: 'Quand le mîm sâkin est suivi d\'un autre mîm, les deux fusionnent en un seul son mîm renforcé.',
    letters: 'م',
    examples: [{ text: 'لَهُم مَّا', transliteration: 'lahum-mā', note: 'مْ + م → fusion' }],
  },
  {
    id: 'izhar-shafawi',
    group: 'Mīm sākin (مْ)',
    name: 'Al-Izhâr Shafawî',
    shortName: 'Izhâr Shafawî',
    arabicName: 'الإظهار الشفوي',
    description: 'Pour toutes les autres lettres, le mîm sâkin se prononce clairement, lèvres fermées un instant.',
    letters: 'toutes les lettres sauf ب et م',
    examples: [{ text: 'أَنْعَمْتَ', transliteration: 'an\'amta', note: 'مْ + ت → prononcé clairement' }],
  },
  // --- Qalqalah ---
  {
    id: 'qalqalah',
    group: 'Qalqalah',
    name: 'Al-Qalqalah (le rebond)',
    shortName: 'Al-Qalqalah',
    arabicName: 'القلقلة',
    description:
      'Quand une de ces 5 lettres porte un soukoun, on produit un léger « rebond » sonore, comme un écho, surtout en fin de mot.',
    letters: 'ق ط ب ج د',
    examples: [
      { text: 'يَخْلُقْ', transliteration: 'yakhluq', note: 'ق sâkin final → rebond net' },
      { text: 'أَحَدْ', transliteration: 'aḥad', note: 'د sâkin final → rebond net' },
    ],
  },
  // --- Madd ---
  {
    id: 'madd-tabii',
    group: 'Al-Madd (allongement)',
    name: 'Madd Ṭabī\'î (allongement naturel)',
    shortName: "Madd Ṭabī'î",
    arabicName: 'المد الطبيعي',
    description: 'Allongement de base (2 temps) par alif, wâw ou yâ\' sukun, sans lettre après la lettre de prolongation.',
    examples: [{ text: 'قَالَ', transliteration: 'qāla', note: 'allongement naturel de 2 temps' }],
  },
  {
    id: 'madd-muttasil',
    group: 'Al-Madd (allongement)',
    name: 'Madd Muttaṣil (allongement connecté)',
    shortName: 'Madd Muttaṣil',
    arabicName: 'المد المتصل',
    description: 'Quand une hamza suit directement la lettre de prolongation dans le même mot : allongement obligatoire (4-5 temps).',
    examples: [{ text: 'السَّمَاءُ', transliteration: 'as-samā\'u', note: 'allongement obligatoire, 4-5 temps' }],
  },
  {
    id: 'madd-munfasil',
    group: 'Al-Madd (allongement)',
    name: 'Madd Munfaṣil (allongement séparé)',
    shortName: 'Madd Munfaṣil',
    arabicName: 'المد المنفصل',
    description: 'Quand la lettre de prolongation termine un mot et que le mot suivant commence par une hamza : allongement (4-5 temps).',
    examples: [{ text: 'يَا أَيُّهَا', transliteration: 'yā ayyuhā', note: 'allongement de 4-5 temps entre les 2 mots' }],
  },
]

export const tajwidGroups = Array.from(new Set(tajwidRules.map((r) => r.group)))
