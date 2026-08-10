# Iqra' — Apprendre l'arabe

Application web pour apprendre l'arabe pas à pas : de l'alphabet à la récitation coranique.

## Démarrer

```bash
npm install
npm run dev
```

Puis ouvre l'URL affichée (par défaut http://localhost:5173).

Autres commandes :

```bash
npm run build    # build de production (dist/)
npm run preview  # prévisualiser le build
npm run lint     # vérifier le code
```

## Modules

| Module | Contenu |
|---|---|
| **Alphabet** | Les 28 lettres, leurs 4 formes (isolée/initiale/médiane/finale), prononciation, quiz |
| **Chiffres** | Chiffres indo-arabes ٠-١٠ et leurs noms, quiz |
| **Voyelles (Harakat)** | Fatha, kasra, damma, tanwîn, soukoun, chadda, madd, quiz |
| **Lecture** | Constructeur de syllabes + exercices : reconstituer un mot lettre par lettre, puis s'entraîner à le prononcer (reconnaissance vocale si le navigateur le permet). 45 mots répartis sur 3 niveaux |
| **Ablutions** | Wudû (avec eau) et tayammum (à sec), étape par étape, avec invocations |
| **La Salat** | Séquence complète d'une prière, les 5 prières quotidiennes, photos réelles par posture |
| **Tajwîd** | Règles de récitation (nûn sâkin, mîm sâkin, qalqalah, madd), avec quiz |
| **Récitation coranique** | Texte + audio (vrais récitateurs) via l'API publique alquran.cloud, onglet Mémorisation (hifz) pour suivre les versets appris par cœur |

Transverse :
- **Révision** (`/revision`) — quiz ciblé sur les lettres/chiffres/harakat où l'utilisateur s'est trompé récemment (accessible depuis le bandeau d'accueil quand il y a des points à réviser)
- **Profil** (`/profil`) — récapitulatif de la progression, bascule clair/sombre, réinitialisation de la progression

## Stack technique

- React + TypeScript + Vite
- Tailwind CSS (mode sombre via `darkMode: 'class'`, bascule persistée dans `localStorage`)
- Zustand (progression persistée en `localStorage`, clé `iqra-progress` ; thème dans `iqra-theme`)
- React Router
- Web Speech API : synthèse vocale (`speechSynthesis`) pour la prononciation des lettres/mots, reconnaissance vocale (`SpeechRecognition`, Chrome/Edge uniquement) pour l'exercice de prononciation

## Structure

```
src/
  components/   composants réutilisables (icônes SVG, quiz, audio, exercices...)
  data/         contenu pédagogique (lettres, chiffres, harakat, mots, tajwîd, salat, ablutions)
  lib/          utilitaires (API Coran, arabe, synthèse/reconnaissance vocale, quiz)
  pages/        une page par module
  store/        progression utilisateur et thème (zustand)
  types/        déclarations ambiantes (Web Speech API)
```

## Pistes d'amélioration restantes

- Sourates au-delà d'Al-Fâtiha reliées depuis le module Salat
- Mode hors-ligne pour le module Coran (l'audio nécessite Internet)
- Profils multiples (actuellement une seule progression par appareil/navigateur)
- Tests automatisés (aucun actuellement, notamment sur `src/lib/arabic.ts`)
