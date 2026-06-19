import { useEffect, useRef, useState } from 'react';
import './Projects.css';

const PROJECTS = [
  {
    id: 1,
    title: 'Consejo Ciudadano CDMX',
    category: 'Desarrollador Web Freelance',
    meta: 'Dic 2025 - May 2026',
    stack: ['Laravel', 'Python', 'JavaScript', 'MySQL', 'HTML', 'CSS', 'NodeJS'],
    desc: 'Trabajé sobre una arquitectura monolítica Laravel para mejorar la experiencia de usuario del sitio público y del panel administrativo. Rediseñé la interfaz aplicando principios UX/UI, implementé módulos de capacitaciones, editor de newsletter, traducción automática de noticias con inteligencia artificial, paginación de boletines, búsqueda conectada a base de datos y un panel privado para monitoreo de correos.'
  },
  {
    id: 2,
    title: 'M3mento',
    category: 'Front-End / UX-UI',
    meta: 'Ago 2024 - Actual',
    stack: ['JavaScript', 'HTML', 'CSS', 'UX/UI', 'Figma', 'Photoshop', 'Blender'],
    desc: 'Desarrollo y programación de interfaces web responsivas enfocadas en experiencia de usuario. Doy mantenimiento y mejora continua a interfaces digitales, optimizo usabilidad, rendimiento, accesibilidad y carga, creo recursos gráficos y 3D para páginas web y campañas, y reduje la tasa de rebote en 5% mejorando navegación y diseño de la página de inicio.'
  },
  {
    id: 3,
    title: 'DUSK',
    category: 'App Móvil Fitness',
    meta: '2025 - Actual',
    stack: ['React Native', 'TypeScript', 'Expo SDK 54', 'NativeWind', 'Zustand', 'Supabase'],
    desc: 'Aplicación premium offline-first para atletas con módulos de running, gimnasio y nutrición. Integra sincronización bidireccional con Supabase, GPS en segundo plano, Live Activities/Dynamic Island para iOS y log de macronutrientes con APIs USDA y Open Food Facts.'
  },
  {
    id: 4,
    title: 'WisEcho',
    category: 'UX Research / Accesibilidad',
    meta: 'EBAC - Certificación en curso',
    stack: ['WCAG', 'Benchmarking', 'Investigación UX', 'Business Model Canvas', 'Accesibilidad'],
    desc: 'Red social accesible para adultos mayores. Lideré análisis heurístico WCAG, benchmarking frente a competencia, definición de usuarios y stakeholders mediante entrevistas simuladas y una propuesta de negocio centrada en accesibilidad y simplicidad.'
  },
  {
    id: 5,
    title: 'Reto Nescafé',
    category: 'Lean UX / MVP',
    meta: 'EBAC - Certificación en curso',
    stack: ['Lean UX', 'MVP', 'Objetivos SMART', 'Validación', 'UX Metrics'],
    desc: 'MVP de recetario digital para validar hipótesis de producto con objetivos SMART. Diseñé el MVP “Recetario Nescafé” con foco en contenido viral, recetas frías, métricas de clics en recetas y entrevistas para validación cualitativa.'
  }
];

export default function Projects() {
  const [visibleItems, setVisibleItems] = useState(() => new Set());
  const itemRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.dataset.index);
          setVisibleItems((current) => {
            const next = new Set(current);
            if (entry.isIntersecting) {
              next.add(index);
            } else {
              next.delete(index);
            }
            return next;
          });
        });
      },
      {
        threshold: 0.24,
        rootMargin: '0px 0px -12% 0px'
      }
    );

    itemRefs.current.forEach((item) => {
      if (item) observer.observe(item);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="projects" id="projects">
      <div className="projects__container container">
        <div className="section-header">
          <h2 className="section-title">Trayectoria</h2>
          <p className="section-subtitle">Experiencia profesional y proyectos destacados</p>
        </div>

        <div className="projects__timeline">
          {PROJECTS.map((project, index) => (
            <div
              key={project.id}
              ref={(node) => {
                itemRefs.current[index] = node;
              }}
              data-index={index}
              className={`projects__timeline-item${visibleItems.has(index) ? ' projects__timeline-item--visible' : ''}`}
            >
              <div className="projects__timeline-node">
                <span className="projects__timeline-dot" />
              </div>

              <div className="glass-card project-card">
                <div className="project-card__header">
                  <span className="project-card__category mono-text">{project.category}</span>
                  <span className="project-card__meta mono-text">{project.meta}</span>
                </div>

                <h3 className="project-card__title display-text">{project.title}</h3>
                <p className="project-card__desc">{project.desc}</p>

                <div className="project-card__stack">
                  {project.stack.map((tech) => (
                    <span key={tech} className="project-card__tech-badge mono-text">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="project-card__glow" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
