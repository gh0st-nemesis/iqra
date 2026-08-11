import type { ArabicNumber } from '../types'

// Chiffres indo-arabes (٠-١٠٠) et leur nom cardinal de base (forme masculine simplifiée, sans les
// variantes d'accord grammatical qui dépendent du genre du nom compté — hors du périmètre pédagogique
// de ce module). Note : contrairement aux lettres, les chiffres arabes s'écrivent et se lisent de
// gauche à droite, même au sein d'un texte en arabe (RTL).
export const numbers: ArabicNumber[] = [
  // --- 0 à 10 ---
  { id: 'n0', value: 0, digit: '٠', word: 'صِفْر', transliteration: 'ṣifr' },
  { id: 'n1', value: 1, digit: '١', word: 'وَاحِد', transliteration: 'wāḥid' },
  { id: 'n2', value: 2, digit: '٢', word: 'اِثْنَان', transliteration: 'ithnān' },
  { id: 'n3', value: 3, digit: '٣', word: 'ثَلَاثَة', transliteration: 'thalātha' },
  { id: 'n4', value: 4, digit: '٤', word: 'أَرْبَعَة', transliteration: 'arbaʿa' },
  { id: 'n5', value: 5, digit: '٥', word: 'خَمْسَة', transliteration: 'khamsa' },
  { id: 'n6', value: 6, digit: '٦', word: 'سِتَّة', transliteration: 'sitta' },
  { id: 'n7', value: 7, digit: '٧', word: 'سَبْعَة', transliteration: 'sabʿa' },
  { id: 'n8', value: 8, digit: '٨', word: 'ثَمَانِيَة', transliteration: 'thamāniya' },
  { id: 'n9', value: 9, digit: '٩', word: 'تِسْعَة', transliteration: 'tisʿa' },
  { id: 'n10', value: 10, digit: '١٠', word: 'عَشَرَة', transliteration: 'ʿashara' },

  // --- 11 à 19 ---
  { id: 'n11', value: 11, digit: '١١', word: 'أَحَدَ عَشَرَ', transliteration: 'aḥada ʿashar' },
  { id: 'n12', value: 12, digit: '١٢', word: 'اِثْنَا عَشَرَ', transliteration: 'ithnā ʿashar' },
  { id: 'n13', value: 13, digit: '١٣', word: 'ثَلَاثَةَ عَشَرَ', transliteration: 'thalāthata ʿashar' },
  { id: 'n14', value: 14, digit: '١٤', word: 'أَرْبَعَةَ عَشَرَ', transliteration: 'arbaʿata ʿashar' },
  { id: 'n15', value: 15, digit: '١٥', word: 'خَمْسَةَ عَشَرَ', transliteration: 'khamsata ʿashar' },
  { id: 'n16', value: 16, digit: '١٦', word: 'سِتَّةَ عَشَرَ', transliteration: 'sittata ʿashar' },
  { id: 'n17', value: 17, digit: '١٧', word: 'سَبْعَةَ عَشَرَ', transliteration: 'sabʿata ʿashar' },
  { id: 'n18', value: 18, digit: '١٨', word: 'ثَمَانِيَةَ عَشَرَ', transliteration: 'thamāniyata ʿashar' },
  { id: 'n19', value: 19, digit: '١٩', word: 'تِسْعَةَ عَشَرَ', transliteration: 'tisʿata ʿashar' },

  // --- Dizaines rondes et cent ---
  { id: 'n20', value: 20, digit: '٢٠', word: 'عِشْرُون', transliteration: 'ʿishrūn' },
  { id: 'n30', value: 30, digit: '٣٠', word: 'ثَلَاثُون', transliteration: 'thalāthūn' },
  { id: 'n40', value: 40, digit: '٤٠', word: 'أَرْبَعُون', transliteration: 'arbaʿūn' },
  { id: 'n50', value: 50, digit: '٥٠', word: 'خَمْسُون', transliteration: 'khamsūn' },
  { id: 'n60', value: 60, digit: '٦٠', word: 'سِتُّون', transliteration: 'sittūn' },
  { id: 'n70', value: 70, digit: '٧٠', word: 'سَبْعُون', transliteration: 'sabʿūn' },
  { id: 'n80', value: 80, digit: '٨٠', word: 'ثَمَانُون', transliteration: 'thamānūn' },
  { id: 'n90', value: 90, digit: '٩٠', word: 'تِسْعُون', transliteration: 'tisʿūn' },
  { id: 'n100', value: 100, digit: '١٠٠', word: 'مِئَة', transliteration: 'miʾa' },
]

// Bornes des trois groupes utilisés pour l'affichage (NumbersPage) : unités, la dizaine "onze à
// dix-neuf" à part (irrégulière), puis les dizaines rondes et cent.
export const NUMBER_GROUPS = [
  { label: 'Unités (0 à 10)', from: 0, to: 10 },
  { label: 'Onze à dix-neuf', from: 11, to: 19 },
  { label: 'Dizaines et cent', from: 20, to: 100 },
] as const
