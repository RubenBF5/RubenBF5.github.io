import { lazy, Suspense, useEffect, useState } from 'react';
import HireMatch from './HireMatch';
import './Hero.css';

const HeroScene3D = lazy(() => import('./HeroScene3D'));

const roles = [
  'Front-End Developer',
  'Mobile Developer',
  'UX/UI Designer',
  'React Native Developer',
];

export default function Hero() {
  const [currentRole, setCurrentRole] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
  const [supportsWebGL] = useState(() => {
    const canvas = document.createElement('canvas');
    return Boolean(
      window.WebGLRenderingContext
      && (canvas.getContext('webgl2') || canvas.getContext('webgl'))
    );
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotionPreference = () => setReducedMotion(mediaQuery.matches);

    updateMotionPreference();
    mediaQuery.addEventListener('change', updateMotionPreference);

    return () => mediaQuery.removeEventListener('change', updateMotionPreference);
  }, []);

  // Scroll listener to toggle cover/split modes
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Typewriter effect
  useEffect(() => {
    const target = roles[currentRole];
    const speed = isDeleting ? 40 : 80;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < target.length) {
          setDisplayText(target.substring(0, displayText.length + 1));
        } else {
          // Pause before deleting
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(target.substring(0, displayText.length - 1));
        } else {
          setIsDeleting(false);
          setCurrentRole((prev) => (prev + 1) % roles.length);
        }
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentRole]);

  const handleScrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className={`hero ${scrolled ? 'hero--split' : 'hero--cover'}`} id="hero">
      {!reducedMotion && supportsWebGL ? (
        <Suspense fallback={<div className="hero__scene-placeholder" aria-hidden="true" />}>
          <HeroScene3D />
        </Suspense>
      ) : (
        <div className="hero__scene-placeholder" aria-hidden="true" />
      )}
      <div className="hero__grid" />

      <div className="hero__content container">
        {/* Left Side: Bio & Actions */}
        <div className="hero__intro">
          <div className="hero__badge">
            <span className="hero__badge-dot" />
            Disponible para trabajar
          </div>

          <h2 className="hero__greeting">¡Hola! Soy</h2>
          <h1 className="hero__name display-text">
            RUBÉN <span className="gradient-text">BARRIENTOS</span>
          </h1>

          <div className="hero__role">
            <span className="hero__role-prefix">Un</span>
            <span className="hero__role-text">{displayText}</span>
            <span className="hero__role-cursor">|</span>
          </div>

          <p className="hero__description">
            Desarrollo interfaces web responsivas y experiencias móviles con enfoque UX/UI. Combino React, React Native y TypeScript con investigación, prototipado y buenas prácticas de accesibilidad para construir productos claros, rápidos y útiles.
          </p>

          <div className="hero__actions">
            <button 
              onClick={() => handleScrollTo('projects')} 
              className="btn btn-primary"
            >
              Ver Proyectos
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
            <button 
              onClick={() => handleScrollTo('contact')} 
              className="btn btn-secondary"
            >
              Hablemos
            </button>
          </div>

          {/* Social links */}
          <div className="hero__socials">
            <a href="tel:+527811079966" className="hero__social-link" aria-label="Teléfono">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.08 4.18 2 2 0 0 1 4.06 2h3a2 2 0 0 1 2 1.72c.12.9.32 1.77.59 2.61a2 2 0 0 1-.45 2.11L8 9.64a16 16 0 0 0 6.36 6.36l1.2-1.2a2 2 0 0 1 2.11-.45c.84.27 1.71.47 2.61.59A2 2 0 0 1 22 16.92z" />
              </svg>
            </a>
            <a href="mailto:rubenbarrientos33@gmail.com" className="hero__social-link" aria-label="Email">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2"/>
                <path d="M22 7L13.03 12.7c-.63.38-1.43.38-2.06 0L2 7"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Right Side: Interactive Recruiter Card */}
        <div className="hero__interactive">
          <HireMatch />
        </div>
      </div>

      <div className="hero__scroll-indicator">
        <span className="hero__scroll-dot" />
      </div>
    </section>
  );
}
