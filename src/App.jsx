import { lazy } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router'
import RootLayout from './layouts/RootLayout'
import Home from './pages/Home'
import ErrorBoundary from './components/ErrorBoundary'

const About = lazy(() => import('./pages/About'))
const Services = lazy(() => import('./pages/Services'))
const ServiceDetail = lazy(() => import('./pages/ServiceDetail'))
const Methodology = lazy(() => import('./pages/Methodology'))
const Insights = lazy(() => import('./pages/Insights'))
const Article = lazy(() => import('./pages/Article'))
const Contact = lazy(() => import('./pages/Contact'))
const Legal = lazy(() => import('./pages/Legal'))
const NotFound = lazy(() => import('./pages/NotFound'))

/* Inner pages are designed but held back until Kunal's real content arrives:
   they show while previewing locally (npm run dev) and stay off on the live site.
   To publish them later, set VITE_INNER_PAGES=true in the Vercel project settings. */
const showInner = import.meta.env.DEV || import.meta.env.VITE_INNER_PAGES === 'true'

export default function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Routes>
          <Route element={<RootLayout />}>
            <Route index element={<Home />} />
            {/* {showInner && (<>
            <Route path="about" element={<About />} />
            <Route path="services" element={<Services />} />
            <Route path="services/:slug" element={<ServiceDetail />} />
            <Route path="methodology" element={<Methodology />} />
            <Route path="insights" element={<Insights />} />
            <Route path="insights/:slug" element={<Article />} />
            <Route path="contact" element={<Contact />} />
            <Route path="privacy" element={<Legal kind="privacy" />} />
            <Route path="terms" element={<Legal kind="terms" />} />
            </>)} */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  )
}
