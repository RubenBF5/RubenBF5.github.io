import { useState, useEffect, lazy, Suspense } from 'react';
import Preloader from './components/Preloader/Preloader';
import Starfield from './components/Starfield/Starfield';
import ScrollReveal from './components/ScrollReveal/ScrollReveal';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Projects from './components/Projects/Projects';
import Contact from './components/Contact/Contact';
import CursorGlow from './components/CursorGlow/CursorGlow';

const DuskLanding = lazy(() => import('./components/Landings/Dusk/DuskLanding'));
const NoirLanding = lazy(() => import('./components/Landings/Noir/NoirLanding'));
const M3mentoLanding = lazy(() => import('./components/Landings/M3mento/M3mentoLanding'));
const NexusLanding = lazy(() => import('./components/Landings/Nexus/NexusLanding'));
const CoraLanding = lazy(() => import('./components/Landings/Cora/CoraLanding'));

function parseRoute() {
  const hash = window.location.hash.toLowerCase();
  if (hash.startsWith('#/projects/dusk')) return 'dusk';
  if (hash.startsWith('#/projects/noir')) return 'noir';
  if (hash.startsWith('#/projects/m3mento')) return 'm3mento';
  if (hash.startsWith('#/projects/nexus')) return 'nexus';
  if (hash.startsWith('#/projects/cora')) return 'cora';
  return null;
}

function App() {
  const [loading, setLoading] = useState(() => !parseRoute());
  const [route, setRoute] = useState(() => parseRoute());

  useEffect(() => {
    const handleHashChange = () => {
      const newRoute = parseRoute();
      setRoute(newRoute);
      if (newRoute) {
        window.scrollTo(0, 0);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Dedicated landing page view
  if (route) {
    return (
      <Suspense fallback={<div style={{ minHeight: '100vh', background: '#08080c' }} />}>
        {route === 'dusk' && <DuskLanding />}
        {route === 'noir' && <NoirLanding />}
        {route === 'm3mento' && <M3mentoLanding />}
        {route === 'nexus' && <NexusLanding />}
        {route === 'cora' && <CoraLanding />}
      </Suspense>
    );
  }

  return (
    <>
      {/* 0-100% Preloader screen */}
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      {/* Background star field */}
      {!loading && <Starfield />}

      {/* Ambient cursor light */}
      {!loading && <CursorGlow />}

      {/* Navbar placed outside animated wrapper to prevent parent transform from breaking fixed positioning */}
      {!loading && <Navbar />}

      {/* Main site layout container (revealed with smooth slide-up animation) */}
      <div className={`app-content ${!loading ? 'app-content--visible' : ''}`}>
        <main>
          {/* Hero introduction with typing role list */}
          <Hero />

          {/* Profile bio + technical skill tag grids */}
          <ScrollReveal>
            <About />
          </ScrollReveal>

          {/* Showcase grids of work cards with custom border glows */}
          <ScrollReveal>
            <Projects />
          </ScrollReveal>

          {/* Call to action connecting email and downloadable curriculum */}
          <ScrollReveal>
            <Contact />
          </ScrollReveal>
        </main>
      </div>
    </>
  );
}

export default App;
