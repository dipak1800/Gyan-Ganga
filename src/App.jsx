import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LanguageProvider } from './i18n/useLanguage.jsx'
import Layout from './layouts/Layout'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import Programs from './pages/Programs'
import GyanGanga from './pages/GyanGanga'
import Apply from './pages/Apply'
import Volunteer from './pages/Volunteer'
import Donate from './pages/Donate'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsOfUse from './pages/TermsOfUse'

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/programs/gyan-ganga" element={<GyanGanga />} />
            <Route path="/apply" element={<Apply />} />
            <Route path="/volunteer" element={<Volunteer />} />
            <Route path="/donate" element={<Donate />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-use" element={<TermsOfUse />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </LanguageProvider>
  )
}

export default App

