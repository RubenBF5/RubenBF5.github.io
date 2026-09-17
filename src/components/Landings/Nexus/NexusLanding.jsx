import { useState } from 'react';
import LandingHeader from '../LandingHeader';
import './NexusLanding.css';

export default function NexusLanding() {
  const [selectedWorkflow, setSelectedWorkflow] = useState(0);
  const [billingCycle, setBillingCycle] = useState('annual'); // 'monthly' | 'annual'

  const workflows = [
    {
      id: 'refactor',
      name: 'Refactorización & Microservicios',
      input: 'Migrar servicio de autenticación de Node.js a Go manteniendo contratos gRPC',
      steps: [
        { title: 'Análisis AST & Dependencias', status: 'COMPLETADO', latency: '12ms', model: 'Nexus Inspector' },
        { title: 'Generación Concurrente Go', status: 'COMPLETADO', latency: '28ms', model: 'DeepSeek R1 / Claude 3.7' },
        { title: 'Sandbox de Tests Unitarios', status: '100% PASADO', latency: '14ms', model: 'Docker MicroVM' }
      ]
    },
    {
      id: 'triage',
      name: 'Triage de Incidencias Críticas',
      input: 'Correlacionar picos de latencia en Datadog con últimos 3 despliegues en Kubernetes',
      steps: [
        { title: 'Ingesta de Logs & Métricas', status: 'COMPLETADO', latency: '9ms', model: 'Vector Pipeline' },
        { title: 'Aislamiento de Causa Raíz', status: 'IDENTIFICADO', latency: '34ms', model: 'Nexus Reasoning Engine' },
        { title: 'Generación de Rollback PR', status: 'ENVIADO A GITHUB', latency: '18ms', model: 'Git Automation Tool' }
      ]
    },
    {
      id: 'compliance',
      name: 'Auditoría de Seguridad & SOC2',
      input: 'Verificar retención de datos sensibles (PII) en endpoints de API pública',
      steps: [
        { title: 'Escaneo Heurístico de Tráfico', status: 'COMPLETADO', latency: '15ms', model: 'Nexus DLP Sentinel' },
        { title: 'Validación de Políticas SOC2', status: 'CUMPLIDO', latency: '22ms', model: 'Compliance Guard' },
        { title: 'Reporte Cifrado SHA-256', status: 'CERTIFICADO', latency: '8ms', model: 'Security Vault' }
      ]
    }
  ];

  const currentWf = workflows[selectedWorkflow];

  return (
    <div className="nexus-page">
      <LandingHeader
        brandName="NEXUS"
        brandTag="Agentic Cloud"
        accentColor="#818cf8"
        navLinks={[
          { label: 'Workflows', href: '#workflows' },
          { label: 'Capacidades', href: '#features' },
          { label: 'Arquitectura', href: '#architecture' },
          { label: 'Precios', href: '#pricing' }
        ]}
      />

      {/* HERO SECTION */}
      <section className="nexus-hero">
        <div className="nexus-hero__radial" aria-hidden="true" />
        <div className="nexus-container">
          <div className="nexus-pill">
            <span className="nexus-pulse" />
            <span>NEXUS ENGINE v3.2 • ENTERPRISE READY</span>
          </div>

          <h1 className="nexus-hero__title">
            Orquesta agentes autónomos <br />
            <span className="nexus-gradient-text">a escala de producción.</span>
          </h1>

          <p className="nexus-hero__lead">
            Despliega pipelines de razonamiento multi-modelo, ejecución en microVMs aisladas y observabilidad en tiempo real con latencia sub-45ms y certificación SOC2 Type II.
          </p>

          <div className="nexus-hero__actions">
            <a href="#pricing" className="nexus-btn nexus-btn--primary">
              Iniciar Prueba de 14 Días
            </a>
            <a href="#workflows" className="nexus-btn nexus-btn--secondary">
              Ver Demo Interactiva ↓
            </a>
          </div>

          {/* INTERACTIVE WORKFLOW PIPELINE SIMULATOR */}
          <div className="nexus-console" id="workflows">
            <div className="nexus-console__header">
              <div className="nexus-console__dots">
                <span />
                <span />
                <span />
              </div>
              <span className="nexus-console__title">nexus-orchestrator :: live-agent-pipeline</span>
              <span className="nexus-console__status">● ONLINE</span>
            </div>

            <div className="nexus-console__body">
              <div className="nexus-workflow-nav">
                {workflows.map((wf, idx) => (
                  <button
                    key={wf.id}
                    type="button"
                    className={`nexus-wf-btn ${selectedWorkflow === idx ? 'nexus-wf-btn--active' : ''}`}
                    onClick={() => setSelectedWorkflow(idx)}
                  >
                    {wf.name}
                  </button>
                ))}
              </div>

              <div className="nexus-input-box">
                <span className="nexus-input-lbl">PROMPT DISPARADOR:</span>
                <p>"{currentWf.input}"</p>
              </div>

              <div className="nexus-steps-pipeline">
                {currentWf.steps.map((step, idx) => (
                  <div key={idx} className="nexus-step-card">
                    <div className="nexus-step-card__top">
                      <span className="nexus-step-num">0{idx + 1}</span>
                      <span className="nexus-step-latency">{step.latency}</span>
                    </div>
                    <h4 className="nexus-step-title">{step.title}</h4>
                    <div className="nexus-step-footer">
                      <span className="nexus-step-model">{step.model}</span>
                      <span className="nexus-step-status">{step.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SOCIAL PROOF METRICS */}
          <div className="nexus-metrics-strip">
            <div className="nexus-metric-box">
              <strong>&lt; 45ms</strong>
              <span>Latencia Promedio en Edge</span>
            </div>
            <div className="nexus-metric-box">
              <strong>99.99%</strong>
              <span>Uptime SLA Garantizado</span>
            </div>
            <div className="nexus-metric-box">
              <strong>1.2B</strong>
              <span>Tokens Orquestados / Día</span>
            </div>
            <div className="nexus-metric-box">
              <strong>SOC2 + HIPAA</strong>
              <span>Cifrado Militar de Extremo a Extremo</span>
            </div>
          </div>
        </div>
      </section>

      {/* BENTO GRID CAPABILITIES */}
      <section className="nexus-section" id="features">
        <div className="nexus-container">
          <div className="nexus-section-header">
            <span className="nexus-tag">CAPACIDADES DE PLATAFORMA</span>
            <h2 className="nexus-section-title">Infraestructura diseñada para fiabilidad extrema</h2>
            <p className="nexus-section-sub">Elimina alucinaciones, controla costos de API y orquesta agentes que interactúan con tus bases de datos y repositorios de forma segura.</p>
          </div>

          <div className="nexus-bento">
            <div className="nexus-bento__item nexus-bento__item--span2">
              <div className="nexus-bento__icon">⚡</div>
              <h3>Enrutamiento Inteligente Multi-Modelo</h3>
              <p>
                Analiza la complejidad semántica de cada instrucción entrante y la despacha al LLM idóneo (Claude 3.7, DeepSeek R1, GPT-4o o modelos locales open-source), reduciendo el costo operativo hasta en un 68%.
              </p>
            </div>

            <div className="nexus-bento__item">
              <div className="nexus-bento__icon">🛡️</div>
              <h3>Sandboxes Efímeros MicroVM</h3>
              <p>
                Cada ejecución de código generada por la IA corre en contenedores Firecracker desechables aislados a nivel de kernel.
              </p>
            </div>

            <div className="nexus-bento__item">
              <div className="nexus-bento__icon">📊</div>
              <h3>Observabilidad & Trazabilidad de Tokens</h3>
              <p>
                Replay paso a paso de árboles de pensamiento (Chain-of-Thought) con inspección de prompts y auditoría de llamadas a funciones.
              </p>
            </div>

            <div className="nexus-bento__item nexus-bento__item--span2">
              <div className="nexus-bento__icon">🔄</div>
              <h3>CI/CD Autónomo con Self-Healing</h3>
              <p>
                Conecta Nexus a tus flujos de GitHub Actions. Si un test unitario o build falla en staging, el agente genera un patch correctivo y abre un Pull Request documentado automáticamente.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* INTERACTIVE PRICING */}
      <section className="nexus-section nexus-section--alt" id="pricing">
        <div className="nexus-container">
          <div className="nexus-section-header">
            <span className="nexus-tag">PLANES & ESCALABILIDAD</span>
            <h2 className="nexus-section-title">Precios transparentes y sin sorpresas</h2>
            <p className="nexus-section-sub">Comienza gratis en tus proyectos personales y escala a millones de llamadas cuando tu equipo esté listo.</p>

            <div className="nexus-billing-toggle">
              <button
                type="button"
                className={billingCycle === 'monthly' ? 'active' : ''}
                onClick={() => setBillingCycle('monthly')}
              >
                Mensual
              </button>
              <button
                type="button"
                className={billingCycle === 'annual' ? 'active' : ''}
                onClick={() => setBillingCycle('annual')}
              >
                Anual <span className="nexus-save-badge">Ahorra 20%</span>
              </button>
            </div>
          </div>

          <div className="nexus-pricing-grid">
            {/* TIER 1 */}
            <div className="nexus-plan-card">
              <span className="nexus-plan-name">DEVELOPER</span>
              <div className="nexus-plan-price">
                <strong>$0</strong>
                <span>/ siempre</span>
              </div>
              <p>Para prototipar y explorar agentes en proyectos individuales.</p>
              <ul className="nexus-plan-list">
                <li>✓ Hasta 5 agentes concurrentes</li>
                <li>✓ 50,000 ejecuciones / mes</li>
                <li>✓ MicroVMs con 512MB RAM</li>
                <li>✓ Comunidad en Discord</li>
              </ul>
              <button type="button" className="nexus-btn nexus-btn--secondary">
                Comenzar Gratis
              </button>
            </div>

            {/* TIER 2 - POPULAR */}
            <div className="nexus-plan-card nexus-plan-card--featured">
              <div className="nexus-featured-pill">RECOMENDADO</div>
              <span className="nexus-plan-name">SCALE TEAM</span>
              <div className="nexus-plan-price">
                <strong>{billingCycle === 'annual' ? '$39' : '$49'}</strong>
                <span>/ mes</span>
              </div>
              <p>Para startups y equipos de ingeniería en crecimiento activo.</p>
              <ul className="nexus-plan-list">
                <li>✓ Agentes ilimitados</li>
                <li>✓ 1,000,000 ejecuciones / mes</li>
                <li>✓ Multi-Model Smart Router</li>
                <li>✓ MicroVMs aceleradas de 2GB RAM</li>
                <li>✓ Soporte prioritario 24/7</li>
              </ul>
              <button type="button" className="nexus-btn nexus-btn--primary">
                Iniciar Prueba Pro
              </button>
            </div>

            {/* TIER 3 */}
            <div className="nexus-plan-card">
              <span className="nexus-plan-name">ENTERPRISE</span>
              <div className="nexus-plan-price">
                <strong>{billingCycle === 'annual' ? '$159' : '$199'}</strong>
                <span>/ mes</span>
              </div>
              <p>Máxima gobernanza, despliegue VPC dedicado y SLA del 99.99%.</p>
              <ul className="nexus-plan-list">
                <li>✓ Despliegue en tu propia VPC (AWS/GCP)</li>
                <li>✓ Zero Data Retention contractual</li>
                <li>✓ Auditoría SOC2 Type II & HIPAA</li>
                <li>✓ Ingeniero de soluciones dedicado</li>
              </ul>
              <button type="button" className="nexus-btn nexus-btn--secondary">
                Contactar Ventas
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="nexus-footer">
        <div className="nexus-container nexus-footer__box">
          <span className="nexus-footer__brand">NEXUS AI SYSTEMS</span>
          <p>Orquestación de infraestructura inteligente para la próxima era de software autónomo.</p>
          <button
            type="button"
            onClick={() => window.location.hash = ''}
            className="nexus-btn nexus-btn--primary"
          >
            ← Volver al Portafolio
          </button>
        </div>
      </footer>
    </div>
  );
}
