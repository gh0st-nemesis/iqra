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
npm run test     # lancer les tests (vitest)
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
- **Profil** (`/profil`) — récapitulatif de la progression, niveaux et badges, réglages d'apparence (thème, taille du texte), rappels de série, export/import de la sauvegarde, réinitialisation de la progression

## Gamification, PWA et accessibilité

- **Niveaux & badges** (`src/lib/gamification.ts`) — paliers dérivés de l'XP total et badges de jalons (alphabet maîtrisé, série de 7/30 jours, versets mémorisés…), affichés dans le Profil
- **Sauvegarde exportable** — bouton Exporter/Importer dans le Profil (fichier JSON), utile pour changer d'appareil vu que la progression est en `localStorage` uniquement
- **Rappels de série** — notification navigateur optionnelle (`src/lib/notifications.ts`) en soirée si aucune activité n'a eu lieu ; limité à la durée de vie de l'onglet ouvert (pas de Push API serveur)
- **PWA** — installable, avec mise en cache hors-ligne du shell de l'app et des sourates/audio déjà consultés (`vite-plugin-pwa`, voir `vite.config.ts`)
- **Taille du texte** — réglage Normal/Grande/Très grande dans le Profil (`src/store/settings.ts`), applique une échelle globale via `font-size` sur `<html>`

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
- Profils multiples (actuellement une seule progression par appareil/navigateur — l'export/import JSON permet un contournement manuel)
- Élargir la couverture de tests au-delà de `src/lib/arabic.ts` (store, composants)
- Icônes PWA générées automatiquement à partir du favicon (`@vite-pwa/assets-generator`) — à remplacer par un vrai visuel si besoin d'une identité plus travaillée
