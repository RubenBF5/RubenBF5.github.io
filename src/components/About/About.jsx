import { useEffect, useRef, useState } from 'react';
import InteractiveGlobe from './InteractiveGlobe';
import './About.css';

const SKILLS = [
  {
    category: 'Frontend',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    items: ['JavaScript', 'TypeScript', 'React', 'React Native', 'HTML5 & CSS3']
  },
  {
    category: 'UX/UI',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
        <rect x="9" y="9" width="6" height="6" />
        <line x1="9" y1="1" x2="9" y2="4" />
        <line x1="15" y1="1" x2="15" y2="4" />
        <line x1="9" y1="20" x2="9" y2="23" />
        <line x1="15" y1="20" x2="15" y2="23" />
      </svg>
    ),
    items: ['Figma', 'Miro', 'Wireframing', 'Prototipado', 'Investigación UX']
  },
  {
    category: 'Backend / BD',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
        <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
      </svg>
    ),
    items: ['Supabase', 'Firebase', 'SQLite', 'MySQL', 'Laravel']
  },
  {
    category: 'Herramientas',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    ),
    items: ['Git & GitHub', 'Expo', 'NativeWind', 'Photoshop', 'Blender']
  }
];

export default function About() {
  const [translateX, setTranslateX] = useState(0);
  const [activeCard, setActiveCard] = useState(0);
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const scrollWrapperRef = useRef(null);
  const trackRef = useRef(null);
  const totalCards = SKILLS.length + 1;

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !trackRef.current || !containerRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const scrollableHeight = rect.height - windowHeight;

      if (scrollableHeight > 0) {
        // progressRatio is 0 when section top reaches top of viewport, 1 when section bottom reaches bottom of viewport
        const progressRatio = Math.min(Math.max(-rect.top / scrollableHeight, 0), 1);
        
        const trackWidth = trackRef.current.scrollWidth;
        const containerWidth = containerRef.current.offsetWidth;
        const maxScrollX = Math.max(0, trackWidth - containerWidth);
        const cardIndex = Math.round(progressRatio * (totalCards - 1));

        setTranslateX(-progressRatio * maxScrollX);
        setActiveCard(Math.min(totalCards - 1, Math.max(0, cardIndex)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [totalCards]);

  const scrollToCard = (index) => {
    if (!sectionRef.current) return;

    const nextIndex = Math.min(totalCards - 1, Math.max(0, index));
    const isCompactCarousel = window.matchMedia('(max-width: 992px)').matches;
    if (isCompactCarousel && scrollWrapperRef.current && trackRef.current) {
      const cards = Array.from(trackRef.current.children);
      const targetCard = cards[nextIndex];
      if (targetCard) {
        scrollWrapperRef.current.scrollTo({
          left: targetCard.offsetLeft - 20,
          behavior: 'smooth'
        });
        setActiveCard(nextIndex);
      }
      return;
    }

    const section = sectionRef.current;
    const scrollableHeight = section.offsetHeight - window.innerHeight;
    if (scrollableHeight <= 0) return;

    const sectionTop = section.offsetTop;
    const targetProgress = nextIndex / (totalCards - 1);

    window.scrollTo({
      top: sectionTop + scrollableHeight * targetProgress,
      behavior: 'smooth'
    });
  };

  const handleCarouselScroll = () => {
    if (!scrollWrapperRef.current || !trackRef.current) return;
    if (!window.matchMedia('(max-width: 992px)').matches) return;

    const wrapper = scrollWrapperRef.current;
    const cards = Array.from(trackRef.current.children);
    const nearestCard = cards.reduce(
      (nearest, card, index) => {
        const distance = Math.abs(card.offsetLeft - wrapper.scrollLeft - 20);
        return distance < nearest.distance ? { index, distance } : nearest;
      },
      { index: 0, distance: Infinity }
    );

    setActiveCard(nearestCard.index);
  };

  return (
    <section className="about" id="about" ref={sectionRef}>
      <div className="about__sticky-wrapper">
        <div className="about__container container">
          <div className="section-header">
            <h2 className="section-title">Sobre mí</h2>
            <p className="section-subtitle">Mi trayectoria, enfoque y tecnologías preferidas</p>
          </div>

          <div className="about__content-layout">
            {/* Left Column: Sliding Cards Track */}
            <div className="about__cards-column" ref={containerRef}>
              <div className="about__carousel-topline">
                <span className="about__carousel-label mono-text">Stack y perfil</span>
                <div className="about__carousel-actions" aria-label="Controles del carrusel">
                  <button
                    type="button"
                    className="about__carousel-button"
                    aria-label="Tarjeta anterior"
                    disabled={activeCard === 0}
                    onClick={() => scrollToCard(activeCard - 1)}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m15 18-6-6 6-6" />
                    </svg>
                  </button>
                  <span className="about__carousel-count mono-text">{activeCard + 1}/{totalCards}</span>
                  <button
                    type="button"
                    className="about__carousel-button"
                    aria-label="Tarjeta siguiente"
                    disabled={activeCard === totalCards - 1}
                    onClick={() => scrollToCard(activeCard + 1)}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="about__scroll-wrapper" ref={scrollWrapperRef} onScroll={handleCarouselScroll}>
                <div 
                  className="about__scroll-track"
                  ref={trackRef}
                  style={{ transform: `translateX(${translateX}px)` }}
                >
                  {/* CARD 1: SOBRE MÍ (BIO & DETAILS) */}
                  <div className="glass-card about__card about__card--intro">
                    <div>
                      <h3 className="about__card-title display-text">Rubén Barrientos</h3>
                      <h4 className="about__card-subtitle mono-text">Front-End Developer / UX-UI Designer</h4>
                      <p className="about__card-text">
                        Soy desarrollador Front-End y diseñador UX/UI en Querétaro, México. Construyo interfaces web responsivas y experiencias móviles combinando programación, arquitectura de información, accesibilidad y prototipado centrado en las personas.
                      </p>
                    </div>
                    <div className="about__card-details">
                      <div className="about__card-detail">
                        <span className="about__card-detail-label mono-text">Idiomas:</span>
                        <span className="about__card-detail-value">Español · Inglés (Técnico)</span>
                      </div>
                      <div className="about__card-detail">
                        <span className="about__card-detail-label mono-text">Ubicación:</span>
                        <span className="about__card-detail-value">Querétaro, México</span>
                      </div>
                      <div className="about__card-detail">
                        <span className="about__card-detail-label mono-text">Especialidad:</span>
                        <span className="about__card-detail-value">Front-End, Mobile & UX/UI</span>
                      </div>
                      <div className="about__card-detail">
                        <span className="about__card-detail-label mono-text">Formación:</span>
                        <span className="about__card-detail-value">Ing. Sistemas + UX/UI EBAC</span>
                      </div>
                    </div>
                  </div>

                  {/* CARDS 2-5: STACK GROUPS */}
                  {SKILLS.map((skillGroup) => (
                    <div key={skillGroup.category} className="glass-card about__card about__card--stack">
                      <div className="about__card-header">
                        <span className="about__card-icon">{skillGroup.icon}</span>
                        <h4 className="about__card-category-title mono-text">{skillGroup.category}</h4>
                      </div>
                      <div className="about__card-items">
                        {skillGroup.items.map((item) => (
                          <span key={item} className="about__card-badge">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="about__carousel-progress" aria-label="Progreso del carrusel">
                {Array.from({ length: totalCards }).map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    className={`about__carousel-dot${activeCard === index ? ' about__carousel-dot--active' : ''}`}
                    aria-label={`Ir a tarjeta ${index + 1}`}
                    onClick={() => scrollToCard(index)}
                  />
                ))}
              </div>
            </div>

            {/* Right Column: Standalone Interactive Globe */}
            <div className="about__globe-column">
              <InteractiveGlobe />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
