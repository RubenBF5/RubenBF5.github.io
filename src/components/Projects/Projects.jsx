import { useRef, useState } from 'react';
import noirDemo from '../../assets/noir/noir-demo.m4v?url';
import noirPoster from '../../assets/noir/noir-poster.jpg';
import './Projects.css';

const DOUBLE_PRESS_MS = 600;

const PROJECTS = [
  {
    id: 1,
    title: 'Consejo Ciudadano CDMX',
    shortTitle: 'Consejo Ciudadano',
    category: 'Desarrollador Web Freelance',
    meta: 'Dic 2025 — May 2026',
    url: 'https://www.consejociudadanomx.org',
    linkLabel: 'Visitar sitio real',
    isInternal: false,
    stack: ['Laravel', 'Python', 'JavaScript', 'MySQL', 'HTML', 'CSS', 'NodeJS'],
    desc: 'Trabajo sobre arquitectura monolítica Laravel para mejorar la experiencia de usuario del sitio público y del panel administrativo. Rediseño UX/UI, módulos de capacitaciones, editor de boletines, traducción con IA y optimización de base de datos.',
    accent: '#94a3b8',
    height: 290,
    width: 98
  },
  {
    id: 2,
    title: 'DUSK',
    shortTitle: 'DUSK',
    category: 'App Móvil Fitness & HealthTech',
    meta: '2025 — Actual',
    url: '#/projects/dusk',
    linkLabel: 'Explorar Landing',
    isInternal: true,
    stack: ['React Native', 'TypeScript', 'Expo SDK 54', 'NativeWind', 'Zustand', 'Supabase'],
    desc: 'Landing page y aplicación premium offline-first para atletas de alto rendimiento. Integra arquitectura de running, levantamiento y nutrición con sincronización bidireccional en Supabase, GPS en background, Live Activities en iOS y diseño visual de alto impacto.',
    accent: '#e11d48',
    height: 350,
    width: 96
  },
  {
    id: 3,
    title: 'NOIR',
    shortTitle: 'NOIR',
    category: 'Streaming & Audio Experience',
    meta: '2025 — Producto',
    url: 'https://rubenbf5.github.io/noir-music/',
    linkLabel: 'Abrir Noir Music',
    isInternal: false,
    previewVideo: noirDemo,
    previewPoster: noirPoster,
    stack: ['Producto Web', 'Reproductor Interactivo', 'Biblioteca Musical', 'UX/UI'],
    desc: 'Experiencia musical con reproductor visual, búsqueda y biblioteca de álbumes. El video muestra la navegación y los controles del proyecto publicado.',
    accent: '#d4af37',
    height: 330,
    width: 90
  },
  {
    id: 4,
    title: 'M3mento',
    shortTitle: 'M3mento',
    category: 'Streetwear & Archivo Visual',
    meta: '2024 — 2026',
    url: '#/projects/m3mento',
    linkLabel: 'Explorar Concepto',
    isInternal: true,
    stack: ['React', 'CSS', 'UX/UI', 'Catálogo Interactivo'],
    desc: 'Archivo visual de M3mento con cinco prendas y una ficha interactiva para cada una. El catálogo permite explorar los gráficos, colores y vistas de cada pieza dentro de una interfaz oscura de inspiración editorial.',
    accent: '#e2e8f0',
    height: 310,
    width: 88
  },
  {
    id: 5,
    title: 'Nexus AI',
    shortTitle: 'Nexus AI',
    category: 'B2B SaaS / Orquestación IA',
    meta: '2026 — SaaS Platform',
    url: '#/projects/nexus',
    linkLabel: 'Explorar Landing',
    isInternal: true,
    stack: ['React', 'CSS Grid', 'Diseño Editorial', 'Workflows Interactivos'],
    desc: 'Concepto de plataforma para coordinar agentes de IA. Combina una portada editorial de colores sólidos, capacidades de producto, ejemplos interactivos de workflows y una comparación de planes.',
    accent: '#818cf8',
    height: 340,
    width: 94
  },
  {
    id: 6,
    title: 'Dra. Corazón de Jesús Barrientos Flores',
    shortTitle: 'Dra. Cora',
    category: 'Medicina Especializada · Landing Page',
    meta: '2026 — Proyecto Web',
    url: '#/projects/cora',
    linkLabel: 'Explorar Landing',
    isInternal: true,
    stack: ['React', 'Diseño Web', 'UX/UI', 'Responsive'],
    desc: 'Landing para la Dra. Cora Barrientos con una identidad de colores sólidos, información clara sobre sus especialidades y acceso directo para agendar una consulta.',
    accent: '#7ca9bf',
    height: 326,
    width: 94
  }
];

export default function Projects() {
  const [activeProjectId, setActiveProjectId] = useState(PROJECTS[0].id);
  const lastBookPress = useRef({ projectId: null, time: 0 });
  const activeProject = PROJECTS.find((project) => project.id === activeProjectId);

  const handleBookPress = (event, project) => {
    const now = event.timeStamp;
    const isSecondPress = lastBookPress.current.projectId === project.id
      && now - lastBookPress.current.time < DOUBLE_PRESS_MS;

    if (isSecondPress) {
      lastBookPress.current = { projectId: null, time: 0 };
      if (project.isInternal) {
        window.location.assign(project.url);
      } else {
        window.open(project.url, '_blank', 'noopener,noreferrer');
      }
      return;
    }

    lastBookPress.current = { projectId: project.id, time: now };
    setActiveProjectId(project.id);
  };

  return (
    <section className="projects" id="projects">
      <div className="projects__container container">
        <div className="section-header projects__header">
          <div>
            <span className="projects__eyebrow mono-text">Archivo seleccionado</span>
            <h2 className="section-title">Biblioteca de proyectos</h2>
            <p className="section-subtitle">
              Experiencia profesional, producto y exploraciones UX reunidas en una colección.
            </p>
          </div>
          <p className="projects__instruction mono-text">
            Una pulsación: detalles · dos seguidas: abrir
          </p>
        </div>

        <div className="projects__library">
          <div className="projects__ambient-glow" aria-hidden="true" />

          <div className="projects__shelf-window">
            <ul className="projects__books" aria-label="Colección de proyectos">
              {PROJECTS.map((project, index) => {
                const isActive = project.id === activeProjectId;

                return (
                  <li
                    key={project.id}
                    className="project-book-slot"
                    style={{
                      '--book-height': `${project.height}px`,
                      '--book-width': `${project.width}px`,
                      '--book-accent': project.accent,
                      '--book-index': index
                    }}
                  >
                    <button
                      type="button"
                      className={`project-book${isActive ? ' project-book--active' : ''}`}
                      onClick={(event) => handleBookPress(event, project)}
                      aria-pressed={isActive}
                      aria-label={`Ver detalles de ${project.title}. Pulsa dos veces seguidas para abrir.`}
                    >
                      <span className="project-book__top" aria-hidden="true" />
                      <span className="project-book__edge" aria-hidden="true" />
                      <span className="project-book__spine">
                        <span className="project-book__number mono-text">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <span className="project-book__title">{project.shortTitle}</span>
                        <span className="project-book__category mono-text">{project.category}</span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
            <div className="projects__shelf" aria-hidden="true">
              <span className="projects__shelf-front" />
            </div>
          </div>

          <article
            className="project-detail"
            key={activeProject.id}
            aria-live="polite"
          >
            <div className="project-detail__index mono-text">
              VOL. {String(activeProject.id).padStart(2, '0')}
            </div>

            <div className="project-detail__content">
              <div className="project-detail__heading">
                <div>
                  <span className="project-detail__category mono-text">
                    {activeProject.category}
                  </span>
                  <h3 className="project-detail__title display-text">
                    {activeProject.title}
                  </h3>
                </div>
                <span className="project-detail__meta mono-text">
                  {activeProject.meta}
                </span>
              </div>

              <p className="project-detail__desc">{activeProject.desc}</p>

              {activeProject.previewVideo && (
                <div className="project-detail__preview">
                  <div className="project-detail__preview-heading mono-text">
                    <span>RECORRIDO EN VIDEO</span>
                    <span>{activeProject.title} MUSIC</span>
                  </div>
                  <video
                    controls
                    playsInline
                    preload="none"
                    poster={activeProject.previewPoster}
                    aria-label={'Video de demostración de ' + activeProject.title}
                  >
                    <source src={activeProject.previewVideo} type="video/mp4" />
                    Tu navegador no puede reproducir este video.
                  </video>
                </div>
              )}

              <div className="project-detail__footer">
                <div className="project-detail__stack">
                  {activeProject.stack.map((tech) => (
                    <span key={tech} className="project-detail__tech mono-text">
                      {tech}
                    </span>
                  ))}
                </div>

                {activeProject.url && (
                  <a
                    href={activeProject.url}
                    className="project-detail__link"
                    target={activeProject.isInternal ? '_self' : '_blank'}
                    rel={activeProject.isInternal ? undefined : 'noopener noreferrer'}
                  >
                    {activeProject.linkLabel || 'Visitar sitio'}
                    <svg
                      width="17"
                      height="17"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M7 17 17 7M7 7h10v10" />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
