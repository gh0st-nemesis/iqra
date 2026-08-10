import type { ArabicNumber } from '../types'

// Chiffres indo-arabes (٠-١٠) et leur nom cardinal de base.
// Note pédagogique : contrairement aux lettres, les chiffres arabes s'écrivent
// et se lisent de gauche à droite, même au sein d'un texte en arabe (RTL).
export const numbers: ArabicNumber[] = [
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
]
