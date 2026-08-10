import type { VocabCategory, VocabWord } from '../types'

export const vocabCategories: { id: VocabCategory; label: string }[] = [
  { id: 'salutations', label: 'Salutations' },
  { id: 'famille', label: 'Famille' },
  { id: 'maison', label: 'Maison' },
  { id: 'couleurs', label: 'Couleurs' },
  { id: 'phrases', label: 'Phrases simples' },
  { id: 'racines', label: 'Familles de mots' },
]

export const vocabWords: VocabWord[] = [
  // --- Salutations ---
  { id: 'v-salam', category: 'salutations', arabic: 'اَلسَّلَامُ عَلَيْكُمْ', transliteration: 'As-salāmu ʿalaykum', meaning: 'Que la paix soit sur vous (salutation)' },
  {
    id: 'v-salam-reply',
    category: 'salutations',
    arabic: 'وَعَلَيْكُمُ السَّلَامُ',
    transliteration: 'Wa ʿalaykumu s-salām',
    meaning: 'Et sur vous la paix (réponse à la salutation)',
  },
  { id: 'v-shukran', category: 'salutations', arabic: 'شُكْرًا', transliteration: 'Shukran', meaning: 'Merci' },
  { id: 'v-afwan', category: 'salutations', arabic: 'عَفْوًا', transliteration: 'ʿAfwan', meaning: "De rien / je t'en prie" },
  { id: 'v-naam', category: 'salutations', arabic: 'نَعَمْ', transliteration: 'Naʿam', meaning: 'Oui' },
  { id: 'v-la', category: 'salutations', arabic: 'لَا', transliteration: 'Lā', meaning: 'Non' },
  { id: 'v-min-fadlik', category: 'salutations', arabic: 'مِنْ فَضْلِكَ', transliteration: 'Min faḍlik', meaning: "S'il te plaît" },
  { id: 'v-kaifa-haluk', category: 'salutations', arabic: 'كَيْفَ حَالُكَ؟', transliteration: 'Kayfa ḥāluk?', meaning: 'Comment vas-tu ?' },

  // --- Famille ---
  { id: 'v-ab', category: 'famille', arabic: 'أَبٌ', transliteration: 'Ab', meaning: 'Père' },
  { id: 'v-umm', category: 'famille', arabic: 'أُمٌّ', transliteration: 'Umm', meaning: 'Mère' },
  { id: 'v-akh', category: 'famille', arabic: 'أَخٌ', transliteration: 'Akh', meaning: 'Frère' },
  { id: 'v-ukht', category: 'famille', arabic: 'أُخْتٌ', transliteration: 'Ukht', meaning: 'Sœur' },
  { id: 'v-jadd', category: 'famille', arabic: 'جَدٌّ', transliteration: 'Jadd', meaning: 'Grand-père' },
  { id: 'v-jadda', category: 'famille', arabic: 'جَدَّةٌ', transliteration: 'Jadda', meaning: 'Grand-mère' },
  { id: 'v-ibn', category: 'famille', arabic: 'اِبْنٌ', transliteration: 'Ibn', meaning: 'Fils' },
  { id: 'v-bint', category: 'famille', arabic: 'بِنْتٌ', transliteration: 'Bint', meaning: 'Fille' },

  // --- Maison ---
  { id: 'v-bayt', category: 'maison', arabic: 'بَيْتٌ', transliteration: 'Bayt', meaning: 'Maison' },
  { id: 'v-bab', category: 'maison', arabic: 'بَابٌ', transliteration: 'Bāb', meaning: 'Porte' },
  { id: 'v-taula', category: 'maison', arabic: 'طَاوِلَةٌ', transliteration: 'Ṭāwila', meaning: 'Table' },
  { id: 'v-kursi', category: 'maison', arabic: 'كُرْسِيٌّ', transliteration: 'Kursī', meaning: 'Chaise' },
  { id: 'v-kitab', category: 'maison', arabic: 'كِتَابٌ', transliteration: 'Kitāb', meaning: 'Livre' },
  { id: 'v-qalam', category: 'maison', arabic: 'قَلَمٌ', transliteration: 'Qalam', meaning: 'Stylo / crayon' },
  { id: 'v-shams', category: 'maison', arabic: 'شَمْسٌ', transliteration: 'Shams', meaning: 'Soleil' },
  { id: 'v-qamar', category: 'maison', arabic: 'قَمَرٌ', transliteration: 'Qamar', meaning: 'Lune' },

  // --- Couleurs ---
  { id: 'v-ahmar', category: 'couleurs', arabic: 'أَحْمَرُ', transliteration: 'Aḥmar', meaning: 'Rouge' },
  { id: 'v-azraq', category: 'couleurs', arabic: 'أَزْرَقُ', transliteration: 'Azraq', meaning: 'Bleu' },
  { id: 'v-akhdar', category: 'couleurs', arabic: 'أَخْضَرُ', transliteration: 'Akhḍar', meaning: 'Vert' },
  { id: 'v-asfar', category: 'couleurs', arabic: 'أَصْفَرُ', transliteration: 'Aṣfar', meaning: 'Jaune' },
  { id: 'v-abyad', category: 'couleurs', arabic: 'أَبْيَضُ', transliteration: 'Abyaḍ', meaning: 'Blanc' },
  { id: 'v-aswad', category: 'couleurs', arabic: 'أَسْوَدُ', transliteration: 'Aswad', meaning: 'Noir' },
  { id: 'v-bunni', category: 'couleurs', arabic: 'بُنِّيٌّ', transliteration: 'Bunnī', meaning: 'Marron' },
  { id: 'v-wardi', category: 'couleurs', arabic: 'وَرْدِيٌّ', transliteration: 'Wardī', meaning: 'Rose' },

  // --- Phrases simples ---
  { id: 'v-ph-name', category: 'phrases', arabic: 'مَا اسْمُكَ؟', transliteration: "Mā smuka?", meaning: 'Comment tu t\'appelles ?' },
  { id: 'v-ph-myname', category: 'phrases', arabic: 'اِسْمِي...', transliteration: 'Ismī...', meaning: 'Je m\'appelle...' },
  { id: 'v-ph-student', category: 'phrases', arabic: 'أَنَا طَالِبٌ', transliteration: 'Anā ṭālib', meaning: 'Je suis élève (garçon)' },
  { id: 'v-ph-student-f', category: 'phrases', arabic: 'أَنَا طَالِبَةٌ', transliteration: 'Anā ṭāliba', meaning: 'Je suis élève (fille)' },
  { id: 'v-ph-book', category: 'phrases', arabic: 'هَذَا كِتَابٌ', transliteration: 'Hādhā kitāb', meaning: 'Ceci est un livre' },
  { id: 'v-ph-bighouse', category: 'phrases', arabic: 'اَلْبَيْتُ كَبِيرٌ', transliteration: 'Al-baytu kabīr', meaning: 'La maison est grande' },
  { id: 'v-ph-love-quran', category: 'phrases', arabic: 'أُحِبُّ الْقُرْآنَ', transliteration: 'Uḥibbu l-Qurʾān', meaning: "J'aime le Coran" },
  { id: 'v-ph-where', category: 'phrases', arabic: 'أَيْنَ الْمَسْجِدُ؟', transliteration: 'Ayna l-masjid?', meaning: 'Où est la mosquée ?' },
  { id: 'v-ph-hamdulillah', category: 'phrases', arabic: 'أَنَا بِخَيْرٍ، الْحَمْدُ لِلَّهِ', transliteration: 'Anā bikhayr, al-ḥamdu lillāh', meaning: 'Je vais bien, louange à Allah' },
  { id: 'v-ph-thankyou', category: 'phrases', arabic: 'جَزَاكَ اللَّهُ خَيْرًا', transliteration: 'Jazāka Allāhu khayran', meaning: "Qu'Allah te récompense en bien" },

  // --- Familles de mots (racines) ---
  { id: 'v-r-ktb-kataba', category: 'racines', arabic: 'كَتَبَ', transliteration: 'Kataba', meaning: 'Il a écrit', note: 'Racine ك ت ب (écrire)' },
  { id: 'v-r-ktb-kitab', category: 'racines', arabic: 'كِتَابٌ', transliteration: 'Kitāb', meaning: 'Livre', note: 'Racine ك ت ب (écrire)' },
  { id: 'v-r-ktb-maktaba', category: 'racines', arabic: 'مَكْتَبَةٌ', transliteration: 'Maktaba', meaning: 'Bibliothèque', note: 'Racine ك ت ب (écrire)' },
  { id: 'v-r-slm-salam', category: 'racines', arabic: 'سَلَامٌ', transliteration: 'Salām', meaning: 'Paix', note: 'Racine س ل م (paix, sécurité)' },
  { id: 'v-r-slm-muslim', category: 'racines', arabic: 'مُسْلِمٌ', transliteration: 'Muslim', meaning: 'Musulman (soumis à Allah)', note: 'Racine س ل م (paix, sécurité)' },
  { id: 'v-r-slm-islam', category: 'racines', arabic: 'إِسْلَامٌ', transliteration: 'Islām', meaning: 'Soumission à Allah', note: 'Racine س ل م (paix, sécurité)' },
  { id: 'v-r-ilm-alim', category: 'racines', arabic: 'عَالِمٌ', transliteration: 'ʿĀlim', meaning: 'Savant', note: 'Racine ع ل م (savoir)' },
  { id: 'v-r-ilm-ilm', category: 'racines', arabic: 'عِلْمٌ', transliteration: 'ʿIlm', meaning: 'Science, savoir', note: 'Racine ع ل م (savoir)' },
  { id: 'v-r-ilm-taalim', category: 'racines', arabic: 'تَعْلِيمٌ', transliteration: 'Taʿlīm', meaning: 'Enseignement', note: 'Racine ع ل م (savoir)' },
]
