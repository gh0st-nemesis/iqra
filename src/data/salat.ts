import type { DailyPrayer, PrayerPosture, PrayerStep, RealPhoto } from '../types'

export const postureLabels: Record<PrayerPosture, string> = {
  qiyam: 'Debout (Qiyâm)',
  ruku: 'Inclinaison (Rukû\')',
  itidal: 'Redressement (I\'tidâl)',
  sujud: 'Prosternation (Sujûd)',
  julus: 'Position assise (Julûs)',
}

// Les 5 prières obligatoires (fard) de la journée.
export const dailyPrayers: DailyPrayer[] = [
  { id: 'fajr', name: 'Fajr', arabicName: 'الفجر', rakahCount: 2, timing: "De l'aube (avant le lever du soleil) jusqu'au lever du soleil" },
  { id: 'dhuhr', name: 'Dhuhr', arabicName: 'الظهر', rakahCount: 4, timing: "Après le passage du soleil au zénith, jusqu'au milieu de l'après-midi" },
  { id: 'asr', name: 'Asr', arabicName: 'العصر', rakahCount: 4, timing: "L'après-midi, jusqu'à peu avant le coucher du soleil" },
  { id: 'maghrib', name: 'Maghrib', arabicName: 'المغرب', rakahCount: 3, timing: 'Juste après le coucher du soleil, jusqu\'à la disparition du crépuscule' },
  { id: 'isha', name: "Isha'", arabicName: 'العشاء', rakahCount: 4, timing: "La nuit, jusqu'à l'aube" },
]

// Photos réelles (Pexels / Unsplash, licences libres de droits, vérifiées une à une).
// La majorité vient de la même séance photo (Michael Burrows, Pexels) pour une cohérence visuelle.
const qiyamPhoto: RealPhoto = {
  url: 'https://images.pexels.com/photos/7129199/pexels-photo-7129199.jpeg?auto=compress&cs=tinysrgb&w=800',
  credit: 'Michael Burrows',
  creditUrl: 'https://www.pexels.com/photo/man-doing-salah-7129199/',
  platform: 'Pexels',
}
const takbirPhoto: RealPhoto = {
  url: 'https://images.pexels.com/photos/7129584/pexels-photo-7129584.jpeg?auto=compress&cs=tinysrgb&w=800',
  credit: 'Michael Burrows',
  creditUrl: 'https://www.pexels.com/photo/man-in-white-thobe-7129584/',
  platform: 'Pexels',
}
const rukuPhoto: RealPhoto = {
  url: 'https://images.pexels.com/photos/7129615/pexels-photo-7129615.jpeg?auto=compress&cs=tinysrgb&w=800',
  credit: 'Michael Burrows',
  creditUrl: 'https://www.pexels.com/photo/man-in-white-thobe-praying-7129615/',
  platform: 'Pexels',
}
const sujudPhoto: RealPhoto = {
  url: 'https://images.pexels.com/photos/7129609/pexels-photo-7129609.jpeg?auto=compress&cs=tinysrgb&w=800',
  credit: 'Michael Burrows',
  creditUrl: 'https://www.pexels.com/photo/man-in-white-thobe-bowing-down-on-red-and-blue-rug-7129609/',
  platform: 'Pexels',
}
const julusTashahhudPhoto: RealPhoto = {
  url: 'https://images.pexels.com/photos/7129238/pexels-photo-7129238.jpeg?auto=compress&cs=tinysrgb&w=800',
  credit: 'Michael Burrows',
  creditUrl: 'https://www.pexels.com/photo/man-doing-salah-7129199/',
  platform: 'Pexels',
}
const julusBetweenPhoto: RealPhoto = {
  url: 'https://images.pexels.com/photos/7129388/pexels-photo-7129388.jpeg?auto=compress&cs=tinysrgb&w=800',
  credit: 'Michael Burrows',
  creditUrl: 'https://www.pexels.com/photo/man-doing-salah-7129199/',
  platform: 'Pexels',
}
const taslimPhoto: RealPhoto = {
  url: 'https://images.pexels.com/photos/7129242/pexels-photo-7129242.jpeg?auto=compress&cs=tinysrgb&w=800',
  credit: 'Michael Burrows',
  creditUrl: 'https://www.pexels.com/photo/man-doing-salah-7129199/',
  platform: 'Pexels',
}

const tashahhud = {
  arabic:
    'التَّحِيَّاتُ لِلَّهِ وَالصَّلَوَاتُ وَالطَّيِّبَاتُ، السَّلَامُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ، السَّلَامُ عَلَيْنَا وَعَلَى عِبَادِ اللَّهِ الصَّالِحِينَ، أَشْهَدُ أَنْ لَا إِلَٰهَ إِلَّا اللَّهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ',
  transliteration:
    'At-taḥiyyātu lillāhi wa-ṣ-ṣalawātu wa-ṭ-ṭayyibāt, as-salāmu ʿalayka ayyuha-n-nabiyyu wa raḥmatu-llāhi wa barakātuh, as-salāmu ʿalaynā wa ʿalā ʿibādi-llāhi-ṣ-ṣāliḥīn, ash-hadu an lā ilāha illa-llāh wa ash-hadu anna Muḥammadan ʿabduhu wa rasūluh',
  meaning:
    'Les salutations sont pour Allah, ainsi que les prières et les bonnes actions. Que la paix soit sur toi, ô Prophète, ainsi que la miséricorde d\'Allah et Ses bénédictions. Que la paix soit sur nous et sur les serviteurs vertueux d\'Allah. J\'atteste qu\'il n\'y a de divinité qu\'Allah et j\'atteste que Muhammad est Son serviteur et Son messager.',
}

// Séquence d'une prière à 2 rak'at : les postures et paroles se répètent à l'identique
// à chaque rak'ah, seule la position assise finale (avec le tashahhud complet) et le
// salut de fin (taslim) n'arrivent qu'à la fin de la prière. Cette base de 2 rak'ât se
// répète (avec un tashahhud intermédiaire) pour les prières à 3 ou 4 rak'ât — voir plus haut.
export const prayerSteps: PrayerStep[] = [
  {
    id: 's-niyyah',
    order: 1,
    posture: 'qiyam',
    title: 'Intention (Niyyah)',
    arabicTitle: 'النِّيَّة',
    instruction:
      'Debout, face à la Qibla (direction de la Kaaba), on forme dans le cœur l\'intention de prier telle prière. Ce n\'est pas une formule à réciter à voix haute.',
    duas: [],
    image: qiyamPhoto,
  },
  {
    id: 's-takbir',
    order: 2,
    posture: 'qiyam',
    title: 'Takbîr d\'ouverture',
    arabicTitle: 'تَكْبِيرَة الإِحْرَام',
    instruction: 'On lève les mains à hauteur des épaules ou des oreilles en prononçant le takbîr, qui ouvre la prière.',
    duas: [{ arabic: 'اللَّهُ أَكْبَرُ', transliteration: 'Allāhu akbar', meaning: 'Allah est le plus Grand' }],
    image: takbirPhoto,
  },
  {
    id: 's-qiyam-recitation',
    order: 3,
    posture: 'qiyam',
    title: 'Récitation debout',
    arabicTitle: 'الْقِيَام وَالْقِرَاءَة',
    instruction:
      'Les mains posées sur la poitrine (droite sur gauche), on récite d\'abord Al-Fâtiha, puis une autre sourate ou quelques versets (aux 2 premières rak\'ât).',
    duas: [],
    linkToFatiha: true,
    image: qiyamPhoto,
  },
  {
    id: 's-ruku',
    order: 4,
    posture: 'ruku',
    title: 'Inclinaison',
    arabicTitle: 'الرُّكُوع',
    instruction: 'On s\'incline en posant les mains sur les genoux, le dos bien droit et horizontal, en répétant 3 fois :',
    duas: [
      { arabic: 'سُبْحَانَ رَبِّيَ الْعَظِيمِ', transliteration: 'Subḥāna rabbiya-l-ʿaẓīm', meaning: 'Gloire à mon Seigneur, le Très Grand' },
    ],
    repeat: 3,
    image: rukuPhoto,
  },
  {
    id: 's-itidal',
    order: 5,
    posture: 'itidal',
    title: 'Redressement',
    arabicTitle: 'الاعْتِدَال',
    instruction: 'On se redresse complètement, debout, en disant :',
    duas: [
      { arabic: 'سَمِعَ اللَّهُ لِمَنْ حَمِدَهُ', transliteration: 'Samiʿa-llāhu liman ḥamidah', meaning: 'Allah entend celui qui Le loue' },
      { arabic: 'رَبَّنَا وَلَكَ الْحَمْدُ', transliteration: 'Rabbanā wa laka-l-ḥamd', meaning: 'Notre Seigneur, à Toi la louange' },
    ],
    image: qiyamPhoto,
  },
  {
    id: 's-sujud-1',
    order: 6,
    posture: 'sujud',
    title: 'Première prosternation',
    arabicTitle: 'السُّجُود',
    instruction:
      'On se prosterne jusqu\'à ce que 7 parties du corps touchent le sol (front et nez, deux mains, deux genoux, deux pieds), en répétant 3 fois :',
    duas: [
      { arabic: 'سُبْحَانَ رَبِّيَ الْأَعْلَى', transliteration: 'Subḥāna rabbiya-l-aʿlā', meaning: 'Gloire à mon Seigneur, le Très Haut' },
    ],
    repeat: 3,
    image: sujudPhoto,
  },
  {
    id: 's-julus-between',
    order: 7,
    posture: 'julus',
    title: 'Assise entre les deux prosternations',
    arabicTitle: 'الْجُلُوس بَيْنَ السَّجْدَتَيْنِ',
    instruction: 'On s\'assoit brièvement, en disant :',
    duas: [{ arabic: 'رَبِّ اغْفِرْ لِي', transliteration: 'Rabbi-ghfir lī', meaning: 'Seigneur, pardonne-moi' }],
    image: julusBetweenPhoto,
  },
  {
    id: 's-sujud-2',
    order: 8,
    posture: 'sujud',
    title: 'Seconde prosternation',
    arabicTitle: 'السُّجُود',
    instruction: 'On se prosterne une seconde fois, avec la même invocation répétée 3 fois. Ceci termine une rak\'ah.',
    duas: [
      { arabic: 'سُبْحَانَ رَبِّيَ الْأَعْلَى', transliteration: 'Subḥāna rabbiya-l-aʿlā', meaning: 'Gloire à mon Seigneur, le Très Haut' },
    ],
    repeat: 3,
    image: sujudPhoto,
  },
  {
    id: 's-repeat',
    order: 9,
    posture: 'qiyam',
    title: 'Deuxième rak\'ah',
    arabicTitle: 'الرَّكْعَة الثَّانِيَة',
    instruction:
      'On se relève (sans lever les mains cette fois) et on recommence à l\'identique : récitation debout, inclinaison, redressement, deux prosternations.',
    duas: [],
    image: qiyamPhoto,
  },
  {
    id: 's-tashahhud',
    order: 10,
    posture: 'julus',
    title: 'Assise finale et Tashahhud',
    arabicTitle: 'التَّشَهُّد',
    instruction:
      'Après la dernière prosternation de la prière, on s\'assoit et on récite le témoignage de foi, index droit pointé en direction de la Qibla :',
    duas: [tashahhud],
    image: julusTashahhudPhoto,
  },
  {
    id: 's-taslim',
    order: 11,
    posture: 'julus',
    title: 'Salut final',
    arabicTitle: 'التَّسْلِيم',
    instruction:
      'Toujours assis, on tourne la tête vers la droite puis vers la gauche, en disant à chaque fois. Ceci termine la prière.',
    duas: [
      { arabic: 'السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ', transliteration: 'As-salāmu ʿalaykum wa raḥmatu-llāh', meaning: 'Que la paix et la miséricorde d\'Allah soient sur vous' },
    ],
    image: taslimPhoto,
  },
]
