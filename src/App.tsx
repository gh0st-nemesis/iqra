import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'

// Découpage par route : chaque page n'est chargée que lorsqu'on y navigue, pour garder
// le chargement initial léger malgré le nombre croissant de modules.
const AlphabetPage = lazy(() => import('./pages/AlphabetPage'))
const NumbersPage = lazy(() => import('./pages/NumbersPage'))
const HarakatPage = lazy(() => import('./pages/HarakatPage'))
const ReadingPage = lazy(() => import('./pages/ReadingPage'))
const AblutionsPage = lazy(() => import('./pages/AblutionsPage'))
const SalatPage = lazy(() => import('./pages/SalatPage'))
const TajwidPage = lazy(() => import('./pages/TajwidPage'))
const QuranPage = lazy(() => import('./pages/QuranPage'))
const SurahPage = lazy(() => import('./pages/SurahPage'))
const ProfilePage = lazy(() => import('./pages/ProfilePage'))
const RevisionPage = lazy(() => import('./pages/RevisionPage'))
const VocabularyPage = lazy(() => import('./pages/VocabularyPage'))
const NamesPage = lazy(() => import('./pages/NamesPage'))
const ProphetsPage = lazy(() => import('./pages/ProphetsPage'))
const AdhkarPage = lazy(() => import('./pages/AdhkarPage'))
const KnowledgePage = lazy(() => import('./pages/KnowledgePage'))
const AboutPage = lazy(() => import('./pages/AboutPage'))

function PageFallback() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-200 border-t-brand-600 dark:border-slate-700 dark:border-t-brand-400" />
    </div>
  )
}

export default function App() {
  return (
    <Suspense fallback={<PageFallback />}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/alphabet" element={<AlphabetPage />} />
          <Route path="/chiffres" element={<NumbersPage />} />
          <Route path="/harakat" element={<HarakatPage />} />
          <Route path="/lecture" element={<ReadingPage />} />
          <Route path="/ablutions" element={<AblutionsPage />} />
          <Route path="/salat" element={<SalatPage />} />
          <Route path="/tajwid" element={<TajwidPage />} />
          <Route path="/coran" element={<QuranPage />} />
          <Route path="/coran/:number" element={<SurahPage />} />
          <Route path="/vocabulaire" element={<VocabularyPage />} />
          <Route path="/noms-d-allah" element={<NamesPage />} />
          <Route path="/prophetes" element={<ProphetsPage />} />
          <Route path="/adhkar" element={<AdhkarPage />} />
          <Route path="/connaissances" element={<KnowledgePage />} />
          <Route path="/a-propos" element={<AboutPage />} />
          <Route path="/profil" element={<ProfilePage />} />
          <Route path="/revision" element={<RevisionPage />} />
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </Suspense>
  )
}
