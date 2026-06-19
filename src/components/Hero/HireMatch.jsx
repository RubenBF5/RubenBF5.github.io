import { useState } from 'react';
import './HireMatch.css';

const MATCH_DATA = {
  experiencia: {
    icon: (
      <svg className="hire-card__icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
    title: 'Trayectoria Profesional',
    subtitle: 'Experiencia y Liderazgo Técnico',
    text: 'Experiencia como Desarrollador Web Freelance para el Consejo Ciudadano de la CDMX y como Diseñador/Desarrollador Web Front-End UX-UI en M3mento, creando interfaces responsivas, paneles administrativos y mejoras de usabilidad.',
    badge: 'Front-End / UX-UI'
  },
  stack: {
    icon: (
      <svg className="hire-card__icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    title: 'Tecnologías Clave',
    subtitle: 'Especialidades del Stack',
    text: 'Trabajo con JavaScript, TypeScript, React, React Native, HTML5, CSS3, SASS, Redux, Bootstrap, Supabase, Firebase, SQLite y MySQL; además de Figma, Photoshop, Miro, Blender y herramientas de prototipado.',
    badge: 'React / RN / UX'
  },
  modalidad: {
    icon: (
      <svg className="hire-card__icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    title: 'Esquema y Disponibilidad',
    subtitle: 'Ubicación y Zona Horaria',
    text: 'Ubicado en Querétaro, México (GMT-6). Disponible para colaborar en proyectos remotos o híbridos de Front-End, UX/UI y desarrollo móvil con alta coincidencia horaria para México, EE.UU. y Latinoamérica.',
    badge: 'Querétaro / GMT-6'
  },
  enfoque: {
    icon: (
      <svg className="hire-card__icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    ),
    title: 'Filosofía de Desarrollo',
    subtitle: 'Foco en UX e Impacto Técnico',
    text: 'Enfoque en accesibilidad, arquitectura de información, prototipado y validación. He trabajado con heurísticas WCAG, benchmarking, entrevistas simuladas, métricas cuantitativas y diseño centrado en el usuario.',
    badge: 'Accesibilidad & UX'
  }
};

export default function HireMatch() {
  const [activeTab, setActiveTab] = useState('experiencia');
  const [isFlipped, setIsFlipped] = useState(false);

  const handleTabClick = (tabKey) => {
    if (activeTab === tabKey && isFlipped) {
      // Toggle back to front
      setIsFlipped(false);
      return;
    }

    if (isFlipped) {
      // Double flip logic: flip back to front, change data, flip to back
      setIsFlipped(false);
      setTimeout(() => {
        setActiveTab(tabKey);
        setIsFlipped(true);
      }, 250); // Matches half of CSS transition time (500ms total)
    } else {
      setActiveTab(tabKey);
      setIsFlipped(true);
    }
  };

  const currentData = MATCH_DATA[activeTab];

  return (
    <div className="hire-container">
      {/* 3D Flipping Card Container */}
      <div className={`hire-card ${isFlipped ? 'hire-card--flipped' : ''}`}>
        <div className="hire-card__inner">
          
          {/* FRONT FACE: Profile Intro */}
          <div className="hire-card__front glass-card">
            <div className="hire-card__header">
              <span className="hire-card__badge-top">Recruiter Match</span>
              <div className="hire-card__status">
                <span className="hire-card__status-dot" />
                Active
              </div>
            </div>

            <div className="hire-card__profile">
              <div className="hire-card__avatar-placeholder">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <h3 className="hire-card__name">Rubén Barrientos</h3>
              <p className="hire-card__tagline">Front-End Developer & UX/UI Designer</p>
            </div>

            <div className="hire-card__prompt">
              <p className="hire-card__prompt-text">
                ¿Buscas un perfil ideal para tu equipo? 
              </p>
              <span className="hire-card__prompt-sub">
                Selecciona una pregunta abajo para consultar el match directo.
              </span>
            </div>
          </div>

          {/* BACK FACE: Question Details */}
          <div className="hire-card__back glass-card">
            <div className="hire-card__header">
              <span className="hire-card__badge-top">{currentData.badge}</span>
              <button 
                type="button" 
                className="hire-card__close-btn" 
                onClick={() => setIsFlipped(false)}
                aria-label="Cerrar detalles"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <div className="hire-card__detail-body">
              <div className="hire-card__icon-wrapper">
                {currentData.icon}
              </div>
              <h4 className="hire-card__detail-title">{currentData.title}</h4>
              <h5 className="hire-card__detail-subtitle">{currentData.subtitle}</h5>
              <p className="hire-card__detail-text">{currentData.text}</p>
            </div>

            <div className="hire-card__footer">
              <span className="hire-card__match-rate">Match Rate: 99%</span>
            </div>
          </div>

        </div>
      </div>

      {/* Control Buttons (Tabs) */}
      <div className="hire-controls">
        <button
          type="button"
          onClick={() => handleTabClick('experiencia')}
          className={`hire-ctrl-btn ${activeTab === 'experiencia' && isFlipped ? 'hire-ctrl-btn--active' : ''}`}
          title="Ver Experiencia"
          aria-label="Ver Experiencia"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
          </svg>
          <span className="hire-ctrl-btn__label">Experiencia</span>
        </button>

        <button
          type="button"
          onClick={() => handleTabClick('stack')}
          className={`hire-ctrl-btn ${activeTab === 'stack' && isFlipped ? 'hire-ctrl-btn--active' : ''}`}
          title="Ver Stack"
          aria-label="Ver Stack"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
            <line x1="8" y1="21" x2="16" y2="21" />
            <line x1="12" y1="17" x2="12" y2="21" />
          </svg>
          <span className="hire-ctrl-btn__label">Stack</span>
        </button>

        <button
          type="button"
          onClick={() => handleTabClick('modalidad')}
          className={`hire-ctrl-btn ${activeTab === 'modalidad' && isFlipped ? 'hire-ctrl-btn--active' : ''}`}
          title="Ver Modalidad"
          aria-label="Ver Modalidad"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          </svg>
          <span className="hire-ctrl-btn__label">Esquema</span>
        </button>

        <button
          type="button"
          onClick={() => handleTabClick('enfoque')}
          className={`hire-ctrl-btn ${activeTab === 'enfoque' && isFlipped ? 'hire-ctrl-btn--active' : ''}`}
          title="Ver Enfoque"
          aria-label="Ver Enfoque"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 2 7 12 12 22 7 12 2" />
            <polyline points="2 17 12 22 22 17" />
            <polyline points="2 12 12 17 22 12" />
          </svg>
          <span className="hire-ctrl-btn__label">Enfoque</span>
        </button>
      </div>
    </div>
  );
}
