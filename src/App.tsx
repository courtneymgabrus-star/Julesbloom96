import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MotionConfig } from 'motion/react';
import ErrorBoundary from './components/ErrorBoundary';

const LandingPage = lazy(() => import('./LandingPage'));
const EventDetails = lazy(() => import('./pages/EventDetails'));
const Gatherings = lazy(() => import('./pages/Gatherings'));
const Research = lazy(() => import('./pages/Research'));
const SanctuaryStudio = lazy(() => import('./pages/SanctuaryStudio'));
const NotFound = lazy(() => import('./pages/NotFound'));

function PageLoader() {
  return (
    <div className="min-h-screen bg-cream flex flex-col items-center justify-center space-y-4">
      <div className="w-10 h-10 rounded-full border-2 border-wine border-t-transparent animate-spin" />
      <p className="font-serif italic text-lg text-wine tracking-wide">Breathing into Sanctuary...</p>
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <MotionConfig reducedMotion="user">
        <BrowserRouter>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/events/:eventId" element={<EventDetails />} />
              <Route path="/gatherings" element={<Gatherings />} />
              <Route path="/research" element={<Research />} />
              <Route path="/studio" element={<SanctuaryStudio />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </MotionConfig>
    </ErrorBoundary>
  );
}
