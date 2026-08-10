// Polyfill minimal de localStorage pour les tests vitest (environnement Node, sans DOM).
// Nécessaire car `store/progress.ts` (et les autres stores zustand) utilisent le middleware
// `persist`, qui accède à `localStorage` de façon synchrone dès la création du store — avant
// qu'un éventuel mock posé dans un fichier de test n'ait pu s'exécuter (l'évaluation des modules
// importés précède le corps du fichier qui les importe). Ce fichier est chargé en amont via
// `test.setupFiles` (voir vitest.config.ts), donc avant que les stores ne soient importés.
class MemoryStorage implements Storage {
  private store = new Map<string, string>()

  get length() {
    return this.store.size
  }

  clear() {
    this.store.clear()
  }

  getItem(key: string) {
    return this.store.has(key) ? this.store.get(key)! : null
  }

  key(index: number) {
    return Array.from(this.store.keys())[index] ?? null
  }

  removeItem(key: string) {
    this.store.delete(key)
  }

  setItem(key: string, value: string) {
    this.store.set(key, value)
  }
}

if (typeof globalThis.localStorage === 'undefined') {
  globalThis.localStorage = new MemoryStorage()
}
