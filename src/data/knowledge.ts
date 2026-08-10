import type { AkhlaqLesson, HijriMonth, PillarItem } from '../types'

// Les 5 piliers de l'islam (arkân al-islâm) : les actes fondamentaux du culte.
export const pillarsOfIslam: PillarItem[] = [
  {
    id: 'pi-shahada',
    order: 1,
    title: 'La Chahada',
    arabicTitle: 'الشَّهَادَةُ',
    description:
      "L'attestation de foi : témoigner qu'il n'y a de divinité digne d'adoration qu'Allah, et que Muhammad est Son messager. C'est la porte d'entrée dans l'islam.",
  },
  {
    id: 'pi-salat',
    order: 2,
    title: 'La Salat',
    arabicTitle: 'الصَّلَاةُ',
    description: 'Les cinq prières quotidiennes obligatoires, à heures fixes, qui rythment la journée du croyant.',
  },
  {
    id: 'pi-zakat',
    order: 3,
    title: 'La Zakât',
    arabicTitle: 'الزَّكَاةُ',
    description:
      "L'aumône légale obligatoire : une part définie des biens, versée chaque année aux nécessiteux pour qui en a les moyens, afin de purifier sa richesse.",
  },
  {
    id: 'pi-sawm',
    order: 4,
    title: 'Le jeûne du Ramadan',
    arabicTitle: 'الصَّوْمُ',
    description: "S'abstenir de nourriture, de boisson et d'autres choses de l'aube au coucher du soleil, durant tout le mois de Ramadan.",
  },
  {
    id: 'pi-hajj',
    order: 5,
    title: 'Le Hajj',
    arabicTitle: 'الْحَجُّ',
    description: "Le pèlerinage à La Mecque, à accomplir une fois dans sa vie pour qui en a la capacité physique et financière.",
  },
]

// Les 6 piliers de la foi (arkân al-îmân) : ce en quoi le croyant doit croire.
export const pillarsOfFaith: PillarItem[] = [
  {
    id: 'pf-allah',
    order: 1,
    title: 'Croire en Allah',
    arabicTitle: 'الْإِيمَانُ بِاللَّهِ',
    description: "Croire en Allah, Unique, sans associé, Créateur de toute chose, et Seul digne d'être adoré.",
  },
  {
    id: 'pf-anges',
    order: 2,
    title: 'Croire aux anges',
    arabicTitle: 'الْإِيمَانُ بِالْمَلَائِكَةِ',
    description: "Croire en l'existence des anges, créatures de lumière qui obéissent à Allah sans jamais désobéir.",
  },
  {
    id: 'pf-livres',
    order: 3,
    title: 'Croire aux Livres',
    arabicTitle: 'الْإِيمَانُ بِالْكُتُبِ',
    description: "Croire que Allah a révélé des Livres à Ses prophètes, dont le Coran, révélé à Muhammad ﷺ, qui les confirme et les complète.",
  },
  {
    id: 'pf-messagers',
    order: 4,
    title: 'Croire aux messagers',
    arabicTitle: 'الْإِيمَانُ بِالرُّسُلِ',
    description: "Croire que Allah a envoyé des prophètes et messagers à toute l'humanité pour l'appeler à Son adoration exclusive.",
  },
  {
    id: 'pf-jour-dernier',
    order: 5,
    title: 'Croire au Jour Dernier',
    arabicTitle: 'الْإِيمَانُ بِالْيَوْمِ الْآخِرِ',
    description: "Croire en la résurrection après la mort et au jugement de chacun selon ses actes.",
  },
  {
    id: 'pf-destin',
    order: 6,
    title: 'Croire au destin',
    arabicTitle: 'الْإِيمَانُ بِالْقَدَرِ',
    description: "Croire au destin (al-qadar), en son bien comme en ce qui paraît une épreuve, tout en agissant et en faisant des efforts.",
  },
]

// Quelques leçons d'akhlâq (comportement, savoir-être) — sélection non-exhaustive.
export const akhlaqLessons: AkhlaqLesson[] = [
  {
    id: 'ak-sidq',
    order: 1,
    title: 'La sincérité (Sidq)',
    description: "Dire la vérité en toute circonstance, même quand c'est difficile — le mensonge éloigne de la droiture.",
  },
  {
    id: 'ak-sabr',
    order: 2,
    title: 'La patience (Sabr)',
    description: "Rester constant face aux épreuves, à la colère ou à la difficulté, sans se plaindre excessivement ni désespérer.",
  },
  {
    id: 'ak-birr',
    order: 3,
    title: 'La bonté envers les parents (Birr al-wâlidayn)',
    description: "Traiter ses parents avec douceur, respect et gratitude, surtout lorsqu'ils avancent en âge.",
  },
  {
    id: 'ak-voisin',
    order: 4,
    title: 'Le bon voisinage',
    description: "Bien se comporter envers ses voisins : les respecter, les aider et ne jamais leur nuire.",
  },
  {
    id: 'ak-afw',
    order: 5,
    title: 'Le pardon (ʿAfw)',
    description: "Savoir pardonner à qui nous a fait du tort plutôt que de nourrir la rancune ou de se venger.",
  },
  {
    id: 'ak-karam',
    order: 6,
    title: 'La générosité (Karam)',
    description: "Donner de son temps, de ses biens ou de son aide sans attendre de retour, même modestement.",
  },
  {
    id: 'ak-amana',
    order: 7,
    title: "La fiabilité (Amâna)",
    description: "Tenir ses promesses et respecter ce qui nous est confié — un dépôt, un secret, une responsabilité.",
  },
  {
    id: 'ak-haya',
    order: 8,
    title: 'La pudeur (Hayâ)',
    description: "Une retenue naturelle qui pousse à éviter ce qui est inconvenant, dans les paroles comme dans les actes.",
  },
]

// Les 12 mois du calendrier hijri (lunaire).
export const hijriMonths: HijriMonth[] = [
  { id: 'hm-1', order: 1, arabicName: 'مُحَرَّمٌ', transliteration: 'Muharram', note: "Premier mois de l'année hijri, l'un des quatre mois sacrés." },
  { id: 'hm-2', order: 2, arabicName: 'صَفَرٌ', transliteration: 'Safar', note: 'Deuxième mois du calendrier hijri.' },
  { id: 'hm-3', order: 3, arabicName: 'رَبِيعُ الْأَوَّلُ', transliteration: "Rabî' al-Awwal", note: 'Mois de la naissance du prophète Muhammad ﷺ.' },
  { id: 'hm-4', order: 4, arabicName: 'رَبِيعُ الْآخِرُ', transliteration: "Rabî' ath-Thânî", note: 'Quatrième mois du calendrier hijri.' },
  { id: 'hm-5', order: 5, arabicName: 'جُمَادَى الْأُولَى', transliteration: "Jumâdâ al-Ûlâ", note: 'Cinquième mois du calendrier hijri.' },
  { id: 'hm-6', order: 6, arabicName: 'جُمَادَى الْآخِرَةُ', transliteration: 'Jumâdâ al-Âkhira', note: 'Sixième mois du calendrier hijri.' },
  { id: 'hm-7', order: 7, arabicName: 'رَجَبٌ', transliteration: 'Rajab', note: "Un des quatre mois sacrés ; mois de l'Isrâ' wal-Mi'râj (voyage nocturne)." },
  { id: 'hm-8', order: 8, arabicName: 'شَعْبَانُ', transliteration: "Sha'bân", note: 'Mois précédant le Ramadan, souvent marqué par davantage de jeûnes surérogatoires.' },
  { id: 'hm-9', order: 9, arabicName: 'رَمَضَانُ', transliteration: 'Ramadân', note: 'Mois du jeûne obligatoire et de la révélation du Coran.' },
  { id: 'hm-10', order: 10, arabicName: 'شَوَّالٌ', transliteration: 'Shawwâl', note: "Mois de la fête de l'Aïd al-Fitr, au lendemain du Ramadan." },
  { id: 'hm-11', order: 11, arabicName: 'ذُو الْقَعْدَةِ', transliteration: "Dhû al-Qa'da", note: 'Un des quatre mois sacrés.' },
  { id: 'hm-12', order: 12, arabicName: 'ذُو الْحِجَّةِ', transliteration: 'Dhû al-Hijja', note: "Un des quatre mois sacrés ; mois du Hajj et de la fête de l'Aïd al-Adha." },
]
