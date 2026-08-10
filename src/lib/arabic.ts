// Petits utilitaires de traitement de texte arabe : segmentation en lettres (en gardant
// leurs harakat) et normalisation pour comparer une transcription vocale à un mot cible.

const DIACRITIC = /[ً-ْٰ]/

/**
 * Découpe un mot arabe en « clusters » lettre + diacritiques (ex. 'بَ' reste ensemble).
 * Les espaces sont conservés comme clusters à part entière (utile pour les expressions
 * de plusieurs mots comme بِسْمِ اللَّهِ).
 */
export function clusterArabicWord(word: string): string[] {
  const clusters: string[] = []
  for (const ch of word) {
    if (DIACRITIC.test(ch) && clusters.length > 0) {
      clusters[clusters.length - 1] += ch
    } else {
      clusters.push(ch)
    }
  }
  return clusters
}

/**
 * Normalise un texte arabe pour la comparaison (reconnaissance vocale, correction) :
 * retire les harakat, le tatweel, uniformise les variantes de alif/yā'/tā' marbuta.
 */
export function normalizeArabic(text: string): string {
  return text
    .replace(/[ً-ْٰ]/g, '') // harakat, sukun, chadda, tanwin, alif khanjariyya
    .replace(/ـ/g, '') // tatweel
    .replace(/[إأآا]/g, 'ا')
    .replace(/ى/g, 'ي')
    .replace(/ة/g, 'ه')
    .replace(/\s+/g, ' ')
    .trim()
}

function levenshtein(a: string, b: string): number {
  const m = a.length
  const n = b.length
  if (m === 0) return n
  if (n === 0) return m
  const dp = new Array(n + 1)
  for (let j = 0; j <= n; j++) dp[j] = j
  for (let i = 1; i <= m; i++) {
    let prev = dp[0]
    dp[0] = i
    for (let j = 1; j <= n; j++) {
      const tmp = dp[j]
      dp[j] = a[i - 1] === b[j - 1] ? prev : 1 + Math.min(prev, dp[j], dp[j - 1])
      prev = tmp
    }
  }
  return dp[n]
}

/** Similarité entre 0 (rien en commun) et 1 (identique), basée sur la distance de Levenshtein. */
export function arabicSimilarity(a: string, b: string): number {
  const na = normalizeArabic(a)
  const nb = normalizeArabic(b)
  const maxLen = Math.max(na.length, nb.length)
  if (maxLen === 0) return 1
  return 1 - levenshtein(na, nb) / maxLen
}
