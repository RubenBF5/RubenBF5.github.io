import { useState } from 'react';
import './Projects.css';

const PROJECTS = [
  {
    id: 1,
    title: 'Consejo Ciudadano CDMX',
    shortTitle: 'Consejo Ciudadano',
    category: 'Desarrollador Web Freelance',
    meta: 'Dic 2025 — May 2026',
    url: 'https://www.consejociudadanomx.org',
    stack: ['Laravel', 'Python', 'JavaScript', 'MySQL', 'HTML', 'CSS', 'NodeJS'],
    desc: 'Trabajé sobre una arquitectura monolítica Laravel para mejorar la experiencia de usuario del sitio público y del panel administrativo. Rediseñé la interfaz aplicando principios UX/UI, implementé módulos de capacitaciones, editor de newsletter, traducción automática de noticias con inteligencia artificial, paginación de boletines, búsqueda conectada a base de datos y un panel privado para monitoreo de correos.',
    accent: '#d7d9de',
    height: 330,
    width: 106
  },
  {
    id: 2,
    title: 'M3mento',
    shortTitle: 'M3mento',
    category: 'Front-End / UX-UI',
    meta: 'Ago 2024 — Actual',
    url: 'https://m3mento.com.mx',
    stack: ['JavaScript', 'HTML', 'CSS', 'UX/UI', 'Figma', 'Photoshop', 'Blender'],
    desc: 'Desarrollo y programación de interfaces web responsivas enfocadas en experiencia de usuario. Doy mantenimiento y mejora continua a interfaces digitales, optimizo usabilidad, rendimiento, accesibilidad y carga, creo recursos gráficos y 3D para páginas web y campañas, y reduje la tasa de rebote en 5% mejorando navegación y diseño de la página de inicio.',
    accent: '#868d9a',
    height: 292,
    width: 88
  },
  {
    id: 3,
    title: 'DUSK',
    shortTitle: 'DUSK',
    category: 'App Móvil Fitness',
    meta: '2025 — Actual',
    stack: ['React Native', 'TypeScript', 'Expo SDK 54', 'NativeWind', 'Zustand', 'Supabase'],
    desc: 'Aplicación premium offline-first para atletas con módulos de running, gimnasio y nutrición. Integra sincronización bidireccional con Supabase, GPS en segundo plano, Live Activities/Dynamic Island para iOS y log de macronutrientes con APIs USDA y Open Food Facts.',
    accent: '#b8bec8',
    height: 350,
    width: 92
  },
  {
    id: 4,
    title: 'WisEcho',
    shortTitle: 'WisEcho',
    category: 'UX Research / Accesibilidad',
    meta: 'EBAC — En curso',
    stack: ['WCAG', 'Benchmarking', 'Investigación UX', 'Business Model Canvas', 'Accesibilidad'],
    desc: 'Red social accesible para adultos mayores. Lideré análisis heurístico WCAG, benchmarking frente a competencia, definición de usuarios y stakeholders mediante entrevistas simuladas y una propuesta de negocio centrada en accesibilidad y simplicidad.',
    accent: '#686e79',
    height: 310,
    width: 86
  },
  {
    id: 5,
    title: 'Reto Nescafé',
    shortTitle: 'Reto Nescafé',
    category: 'Lean UX / MVP',
    meta: 'EBAC — En curso',
    stack: ['Lean UX', 'MVP', 'Objetivos SMART', 'Validación', 'UX Metrics'],
    desc: 'MVP de recetario digital para validar hipótesis de producto con objetivos SMART. Diseñé el MVP “Recetario Nescafé” con foco en contenido viral, recetas frías, métricas de clics en recetas y entrevistas para validación cualitativa.',
    accent: '#c4c7ce',
    height: 276,
    width: 98
  }
];

export default function Projects() {
  const [activeProjectId, setActiveProjectId] = useState(PROJECTS[0].id);
  const activeProject = PROJECTS.find((project) => project.id === activeProjectId);

  const selectProject = (projectId) => {
    setActiveProjectId(projectId);
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
            Presiona un volumen para consultar
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
                      onClick={() => selectProject(project.id)}
                      aria-pressed={isActive}
                      aria-label={`Ver detalles de ${project.title}`}
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
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visitar sitio
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
