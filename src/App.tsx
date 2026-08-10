import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import AlphabetPage from './pages/AlphabetPage'
import NumbersPage from './pages/NumbersPage'
import HarakatPage from './pages/HarakatPage'
import ReadingPage from './pages/ReadingPage'
import AblutionsPage from './pages/AblutionsPage'
import SalatPage from './pages/SalatPage'
import TajwidPage from './pages/TajwidPage'
import QuranPage from './pages/QuranPage'
import SurahPage from './pages/SurahPage'
import ProfilePage from './pages/ProfilePage'
import RevisionPage from './pages/RevisionPage'
import VocabularyPage from './pages/VocabularyPage'
import NamesPage from './pages/NamesPage'
import ProphetsPage from './pages/ProphetsPage'
import AdhkarPage from './pages/AdhkarPage'
import KnowledgePage from './pages/KnowledgePage'

export default function App() {
  return (
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
        <Route path="/profil" element={<ProfilePage />} />
        <Route path="/revision" element={<RevisionPage />} />
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  )
}
