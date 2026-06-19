import { useState } from 'react';
import Preloader from './components/Preloader/Preloader';
import Starfield from './components/Starfield/Starfield';
import ScrollReveal from './components/ScrollReveal/ScrollReveal';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Projects from './components/Projects/Projects';
import Contact from './components/Contact/Contact';

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {/* 0-100% Preloader screen */}
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      {/* Background star field */}
      {!loading && <Starfield />}

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
