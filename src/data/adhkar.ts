import type { AdhkarCategory, AdhkarItem } from '../types'

// Une sélection non-exhaustive d'invocations quotidiennes (adhkar), parmi les plus connues et les
// plus courtes, tirées d'ouvrages de référence comme Hisnul Muslim. Ce n'est pas un recueil complet :
// l'objectif est de donner un point de départ facile à mémoriser au quotidien.
export const adhkarCategories: { id: AdhkarCategory; label: string }[] = [
  { id: 'matin', label: 'Le matin' },
  { id: 'soir', label: 'Le soir' },
  { id: 'quotidien', label: 'Au quotidien' },
]

export const adhkarItems: AdhkarItem[] = [
  {
    id: 'adh-reveil',
    order: 1,
    category: 'matin',
    title: 'Au réveil',
    dua: {
      arabic: 'الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ',
      transliteration: 'Al-ḥamdu lillāhi lladhī aḥyānā baʿda mā amātanā wa ilayhi n-nushūr',
      meaning: "Louange à Allah qui nous a redonné la vie après nous avoir fait mourir (le sommeil), et c'est vers Lui que se fera la résurrection.",
    },
  },
  {
    id: 'adh-matin',
    order: 2,
    category: 'matin',
    title: 'Dhikr du matin',
    dua: {
      arabic: 'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ',
      transliteration: 'Aṣbaḥnā wa aṣbaḥa l-mulku lillāh, wal-ḥamdu lillāh, lā ilāha illa Llāhu waḥdahu lā sharīka lah',
      meaning: "Nous voici au matin, et la royauté appartient à Allah ; louange à Allah, il n'y a de divinité qu'Allah, Seul, sans associé.",
    },
  },
  {
    id: 'adh-soir',
    order: 3,
    category: 'soir',
    title: 'Dhikr du soir',
    dua: {
      arabic: 'أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ',
      transliteration: 'Amsaynā wa amsā l-mulku lillāh, wal-ḥamdu lillāh, lā ilāha illa Llāhu waḥdahu lā sharīka lah',
      meaning: "Nous voici au soir, et la royauté appartient à Allah ; louange à Allah, il n'y a de divinité qu'Allah, Seul, sans associé.",
    },
  },
  {
    id: 'adh-dormir',
    order: 4,
    category: 'soir',
    title: 'Avant de dormir',
    dua: {
      arabic: 'بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا',
      transliteration: 'Bismika Allāhumma amūtu wa aḥyā',
      meaning: 'En Ton nom, ô Allah, je meurs (je dors) et je vis (je me réveille).',
    },
  },
  {
    id: 'adh-manger-avant',
    order: 5,
    category: 'quotidien',
    title: 'Avant de manger',
    dua: {
      arabic: 'بِسْمِ اللَّهِ',
      transliteration: 'Bismillāh',
      meaning: "Au nom d'Allah.",
    },
  },
  {
    id: 'adh-manger-apres',
    order: 6,
    category: 'quotidien',
    title: 'Après avoir mangé',
    dua: {
      arabic: 'الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنِي هَذَا وَرَزَقَنِيهِ مِنْ غَيْرِ حَوْلٍ مِنِّي وَلَا قُوَّةٍ',
      transliteration: 'Al-ḥamdu lillāhi lladhī aṭʿamanī hādhā wa razaqanīhi min ghayri ḥawlin minnī wa lā quwwa',
      meaning: "Louange à Allah qui m'a nourri de ceci et me l'a accordé, sans force ni pouvoir de ma part.",
    },
  },
  {
    id: 'adh-entree-maison',
    order: 7,
    category: 'quotidien',
    title: 'En entrant à la maison',
    dua: {
      arabic: 'بِسْمِ اللَّهِ وَلَجْنَا، وَبِسْمِ اللَّهِ خَرَجْنَا، وَعَلَى رَبِّنَا تَوَكَّلْنَا',
      transliteration: 'Bismillāhi walajnā, wa bismillāhi kharajnā, wa ʿalā rabbinā tawakkalnā',
      meaning: "Au nom d'Allah nous entrons, au nom d'Allah nous sortons, et c'est en notre Seigneur que nous plaçons notre confiance.",
    },
  },
  {
    id: 'adh-sortie-maison',
    order: 8,
    category: 'quotidien',
    title: 'En sortant de la maison',
    dua: {
      arabic: 'بِسْمِ اللَّهِ تَوَكَّلْتُ عَلَى اللَّهِ وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ',
      transliteration: 'Bismillāh, tawakkaltu ʿalā Llāh, wa lā ḥawla wa lā quwwata illā billāh',
      meaning: "Au nom d'Allah, je place ma confiance en Allah ; il n'y a de force ni de puissance qu'en Allah.",
    },
  },
  {
    id: 'adh-mosquee-entree',
    order: 9,
    category: 'quotidien',
    title: 'En entrant à la mosquée',
    dua: {
      arabic: 'اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ',
      transliteration: 'Allāhumma ftaḥ lī abwāba raḥmatik',
      meaning: "Ô Allah, ouvre-moi les portes de Ta miséricorde.",
    },
  },
  {
    id: 'adh-mosquee-sortie',
    order: 10,
    category: 'quotidien',
    title: 'En sortant de la mosquée',
    dua: {
      arabic: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ',
      transliteration: 'Allāhumma innī asʾaluka min faḍlik',
      meaning: "Ô Allah, je Te demande de Ta grâce.",
    },
  },
  {
    id: 'adh-voyage',
    order: 11,
    category: 'quotidien',
    title: 'Avant un voyage',
    dua: {
      arabic: 'سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ وَإِنَّا إِلَى رَبِّنَا لَمُنْقَلِبُونَ',
      transliteration: 'Subḥāna lladhī sakhkhara lanā hādhā wa mā kunnā lahu muqrinīn, wa innā ilā rabbinā la-munqalibūn',
      meaning: "Gloire à Celui qui a mis ceci à notre service ; nous n'aurions pu le maîtriser par nous-mêmes, et c'est vers notre Seigneur que nous retournerons.",
    },
    quranRef: { surahNumber: 43, label: 'Sourate Az-Zukhruf, 43:13-14' },
  },
  {
    id: 'adh-contrariete',
    order: 12,
    category: 'quotidien',
    title: 'Face à une contrariété ou une perte',
    dua: {
      arabic: 'إِنَّا لِلَّهِ وَإِنَّا إِلَيْهِ رَاجِعُونَ',
      transliteration: 'Innā lillāhi wa innā ilayhi rājiʿūn',
      meaning: 'Nous appartenons à Allah et à Lui nous retournons.',
    },
    quranRef: { surahNumber: 2, label: 'Sourate Al-Baqara, 2:156' },
  },
  {
    id: 'adh-tasbih',
    order: 13,
    category: 'quotidien',
    title: 'Après la prière',
    dua: {
      arabic: 'سُبْحَانَ اللَّهِ',
      transliteration: 'Subḥāna Llāh',
      meaning: 'Gloire à Allah (à répéter, avec Al-ḥamdu lillāh et Allāhu akbar, dans le dhikr après chaque prière).',
    },
    repeat: 33,
  },
]
