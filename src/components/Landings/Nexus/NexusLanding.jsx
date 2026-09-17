import { useState } from 'react';
import './NexusLanding.css';

const workflows = [
  {
    id: 'refactor',
    label: 'Refactorización',
    title: 'Una migración, tres agentes coordinados.',
    input: 'Migrar el servicio de autenticación de Node.js a Go y conservar los contratos de la API.',
    steps: [
      { number: '01', title: 'Analizar', detail: 'Revisar dependencias y contratos existentes.' },
      { number: '02', title: 'Construir', detail: 'Preparar la nueva implementación en Go.' },
      { number: '03', title: 'Validar', detail: 'Comparar resultados y ejecutar pruebas.' }
    ]
  },
  {
    id: 'triage',
    label: 'Incidencias',
    title: 'De la alerta a un plan de respuesta.',
    input: 'Investigar un aumento de latencia después de los últimos despliegues.',
    steps: [
      { number: '01', title: 'Reunir', detail: 'Agrupar señales, cambios y registros.' },
      { number: '02', title: 'Relacionar', detail: 'Identificar las causas más probables.' },
      { number: '03', title: 'Proponer', detail: 'Preparar un plan de corrección revisable.' }
    ]
  },
  {
    id: 'audit',
    label: 'Auditoría',
    title: 'Más claridad en cada revisión.',
    input: 'Revisar el tratamiento de datos sensibles en una API pública.',
    steps: [
      { number: '01', title: 'Inspeccionar', detail: 'Localizar puntos donde circulan datos sensibles.' },
      { number: '02', title: 'Contrastar', detail: 'Comparar el flujo con las reglas del equipo.' },
      { number: '03', title: 'Documentar', detail: 'Organizar hallazgos y próximos pasos.' }
    ]
  }
];

const capabilities = [
  { number: '01', label: 'COORDINACIÓN', title: 'Conecta a tus agentes.', description: 'Distribuye tareas entre agentes especializados y mantén el contexto de cada paso en una sola vista.', tone: 'sand' },
  { number: '02', label: 'CONTROL', title: 'Decide qué se ejecuta.', description: 'Revisa los resultados y conserva puntos de aprobación antes de aplicar cambios importantes.', tone: 'navy' },
  { number: '03', label: 'VISIBILIDAD', title: 'Entiende cada resultado.', description: 'Sigue las decisiones, entradas y entregables de un flujo sin perder el hilo del trabajo.', tone: 'ice' },
  { number: '04', label: 'ADAPTABILIDAD', title: 'Crece a tu ritmo.', description: 'Organiza flujos para desarrollo, operaciones y análisis desde el mismo espacio de trabajo.', tone: 'clay' }
];

const plans = [
  { name: 'Developer', monthly: '$0', annual: '$0', detail: 'Para explorar el producto en proyectos individuales.', items: ['Flujos de ejemplo', 'Espacio personal', 'Vista de actividades'] },
  { name: 'Scale Team', monthly: '$49', annual: '$39', detail: 'Para equipos que coordinan más trabajo en conjunto.', items: ['Workflows compartidos', 'Historial del equipo', 'Roles y revisiones'], featured: true },
  { name: 'Enterprise', monthly: '$199', annual: '$159', detail: 'Para organizaciones con procesos y controles propios.', items: ['Espacios por equipo', 'Controles avanzados', 'Acompañamiento dedicado'] }
];

export default function NexusLanding() {
  const [selectedWorkflow, setSelectedWorkflow] = useState(0);
  const [billingCycle, setBillingCycle] = useState('annual');
  const workflow = workflows[selectedWorkflow];

  return (
    <div className="nexus-page">
      <section className="nexus-hero" id="top">
        <header className="nexus-nav nexus-container">
          <button type="button" className="nexus-nav__back" onClick={() => window.location.hash = ''} aria-label="Volver al portafolio">←</button>
          <a className="nexus-nav__brand" href="#top">NEXUS<span>®</span></a>
          <nav className="nexus-nav__links" aria-label="Navegación de Nexus">
            <a href="#features">Producto</a>
            <a href="#workflows">Soluciones</a>
            <a href="#pricing">Planes</a>
          </nav>
          <a className="nexus-nav__cta" href="#workflows">EXPLORAR DEMO</a>
        </header>

        <div className="nexus-container nexus-hero__content">
          <span className="nexus-eyebrow">UNA PLATAFORMA PARA LA IA QUE TRABAJA CONTIGO</span>
          <h1>Ideas grandes.<br />Ejecución conectada.</h1>
          <p>Diseña, coordina y supervisa flujos de agentes desde un solo lugar. Convierte tareas complejas en pasos claros para tu equipo.</p>
          <a className="nexus-button nexus-button--light" href="#workflows">VER CÓMO FUNCIONA <span aria-hidden="true">↗</span></a>
        </div>

        <div className="nexus-container nexus-showcase" aria-label="Vista conceptual de la plataforma Nexus">
          <article className="nexus-showcase__card nexus-showcase__card--left">
            <span className="nexus-showcase__small">01 / IDEA</span>
            <h2>Empieza con<br />una pregunta.</h2>
            <p>¿Cómo puede mi equipo resolver esto mejor?</p>
            <span className="nexus-showcase__corner">↗</span>
          </article>
          <article className="nexus-showcase__card nexus-showcase__card--main">
            <div className="nexus-showcase__top"><span>NEXUS / WORKSPACE</span><span>● EN CURSO</span></div>
            <h2>Un espacio.<br />Muchas posibilidades.</h2>
            <div className="nexus-showcase__flow">
              <div><span>01</span><strong>Entender el reto</strong><i /></div>
              <div><span>02</span><strong>Coordinar agentes</strong><i /></div>
              <div><span>03</span><strong>Entregar claridad</strong><i /></div>
            </div>
            <div className="nexus-showcase__bottom"><span>AGENTES COORDINADOS</span><span>03 / 03</span></div>
          </article>
          <article className="nexus-showcase__card nexus-showcase__card--right">
            <span className="nexus-showcase__small">03 / RESULTADO</span>
            <h2>Avanza con<br />confianza.</h2>
            <p>Una vista clara del trabajo, de principio a fin.</p>
            <div className="nexus-showcase__mark">N.</div>
          </article>
        </div>
      </section>

      <section className="nexus-proof" aria-label="Resumen del concepto Nexus">
        <div className="nexus-container">
          <p>UNA FORMA MÁS CLARA DE TRABAJAR CON AGENTES</p>
          <div className="nexus-proof__grid">
            <div><strong>03</strong><span>Flujos para explorar</span></div>
            <div><strong>04</strong><span>Capacidades principales</span></div>
            <div><strong>01</strong><span>Espacio de trabajo</span></div>
          </div>
        </div>
      </section>

      <section className="nexus-features" id="features">
        <div className="nexus-container">
          <div className="nexus-section-intro">
            <span>PRODUCTO / 01</span>
            <h2>Tu equipo puede<br />llegar más lejos.</h2>
            <p>Nexus reúne las piezas de un flujo de trabajo inteligente para que cada idea tenga un camino visible hacia su resultado.</p>
          </div>
          <div className="nexus-feature-index" aria-label="Capacidades de Nexus">
            {capabilities.map((item) => <a key={item.number} href={'#nexus-feature-' + item.number}>{item.label}</a>)}
          </div>
          <div className="nexus-feature-grid">
            {capabilities.map((item) => (
              <article className={'nexus-feature-card nexus-feature-card--' + item.tone} id={'nexus-feature-' + item.number} key={item.number}>
                <div className="nexus-feature-card__top"><span>{item.label}</span><span>{item.number} / 04</span></div>
                <div><h3>{item.title}</h3><p>{item.description}</p></div>
                <span className="nexus-feature-card__arrow" aria-hidden="true">↗</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="nexus-workflows" id="workflows">
        <div className="nexus-container">
          <div className="nexus-section-intro nexus-section-intro--left">
            <span>SOLUCIONES / 02</span>
            <h2>De una tarea a<br />un flujo completo.</h2>
            <p>Elige un ejemplo y observa cómo Nexus organiza la petición en pasos que puedes revisar.</p>
          </div>
          <div className="nexus-workflow-panel">
            <div className="nexus-workflow-tabs" aria-label="Ejemplos de workflow">
              {workflows.map((item, index) => (
                <button key={item.id} type="button" className={selectedWorkflow === index ? 'active' : ''} onClick={() => setSelectedWorkflow(index)} aria-pressed={selectedWorkflow === index}>{item.label}</button>
              ))}
            </div>
            <div className="nexus-workflow-panel__body">
              <div className="nexus-workflow-prompt">
                <span>INSTRUCCIÓN / {String(selectedWorkflow + 1).padStart(2, '0')}</span>
                <h3>{workflow.title}</h3>
                <p>“{workflow.input}”</p>
              </div>
              <div className="nexus-workflow-steps">
                {workflow.steps.map((step) => (
                  <div key={step.number}>
                    <span>{step.number}</span>
                    <strong>{step.title}</strong>
                    <p>{step.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="nexus-pricing" id="pricing">
        <div className="nexus-container">
          <div className="nexus-section-intro nexus-section-intro--light">
            <span>PLANES / 03</span>
            <h2>Un plan para<br />cada etapa.</h2>
            <p>Una comparación de planes para este concepto de producto.</p>
          </div>
          <div className="nexus-billing-toggle" aria-label="Periodo de facturación">
            <button type="button" className={billingCycle === 'monthly' ? 'active' : ''} onClick={() => setBillingCycle('monthly')} aria-pressed={billingCycle === 'monthly'}>MENSUAL</button>
            <button type="button" className={billingCycle === 'annual' ? 'active' : ''} onClick={() => setBillingCycle('annual')} aria-pressed={billingCycle === 'annual'}>ANUAL</button>
          </div>
          <div className="nexus-pricing-grid">
            {plans.map((plan) => (
              <article key={plan.name} className={'nexus-plan-card' + (plan.featured ? ' nexus-plan-card--featured' : '')}>
                <span className="nexus-plan-card__name">{plan.name}</span>
                <div className="nexus-plan-card__price"><strong>{plan[billingCycle]}</strong><span>/ mes</span></div>
                <p>{plan.detail}</p>
                <ul>{plan.items.map((item) => <li key={item}>{item}</li>)}</ul>
              </article>
            ))}
          </div>
          <p className="nexus-pricing__note">Precios ilustrativos para la demostración del concepto.</p>
        </div>
      </section>

      <footer className="nexus-footer">
        <div className="nexus-container nexus-footer__inner">
          <span>NEXUS®</span>
          <p>Ideas grandes. Ejecución conectada.</p>
          <button type="button" onClick={() => window.location.hash = ''}>VOLVER AL PORTAFOLIO ↗</button>
        </div>
      </footer>
    </div>
  );
}
