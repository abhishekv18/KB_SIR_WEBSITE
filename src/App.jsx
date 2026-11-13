import { lazy } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router'
import RootLayout from './layouts/RootLayout'
import Home from './pages/Home'
import ErrorBoundary from './components/ErrorBoundary'

const About = lazy(() => import('./pages/About'))
const Services = lazy(() => import('./pages/Services'))
const ServiceDetail = lazy(() => import('./pages/ServiceDetail'))
const Methodology = lazy(() => import('./pages/Methodology'))
const SuccessStories = lazy(() => import('./pages/SuccessStories'))
const StoryDetail = lazy(() => import('./pages/StoryDetail'))
const Insights = lazy(() => import('./pages/Insights'))
const Article = lazy(() => import('./pages/Article'))
const Contact = lazy(() => import('./pages/Contact'))
const Legal = lazy(() => import('./pages/Legal'))
const NotFound = lazy(() => import('./pages/NotFound'))

export default function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Routes>
          <Route element={<RootLayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="services" element={<Services />} />
            <Route path="services/:slug" element={<ServiceDetail />} />
            <Route path="methodology" element={<Methodology />} />
            <Route path="success-stories" element={<SuccessStories />} />
            <Route path="success-stories/:slug" element={<StoryDetail />} />
            <Route path="insights" element={<Insights />} />
            <Route path="insights/:slug" element={<Article />} />
            <Route path="contact" element={<Contact />} />
            <Route path="privacy" element={<Legal kind="privacy" />} />
            <Route path="terms" element={<Legal kind="terms" />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  )
}
