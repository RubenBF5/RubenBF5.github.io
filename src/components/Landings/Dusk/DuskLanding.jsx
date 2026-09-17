import { useState } from 'react';
import LandingHeader from '../LandingHeader';
import './DuskLanding.css';

export default function DuskLanding() {
  const [activeTab, setActiveTab] = useState('running');
  const [selectedZone, setSelectedZone] = useState('zone2');

  const modes = {
    running: {
      title: 'Modo Running & Trail',
      stat1: { label: 'Distancia', value: '7.82 km' },
      stat2: { label: 'Ritmo Medio', value: '4:24 /km' },
      stat3: { label: 'Frecuencia', value: '158 bpm' },
      stat4: { label: 'Cadencia', value: '172 spm' },
      activityText: 'Paseo de la Reforma — 12 km Tempo Run',
      badge: 'GPS ACTIVO'
    },
    strength: {
      title: 'Modo Hipertrofia & Gym',
      stat1: { label: 'Volumen', value: '14,280 kg' },
      stat2: { label: 'Series Totales', value: '18 sets' },
      stat3: { label: 'RPE Promedio', value: '8.5' },
      stat4: { label: 'Descanso Rest.', value: '01:15' },
      activityText: 'Día de Pierna — Sentadilla Pesada 4x6',
      badge: 'TIMER REPOSO'
    },
    nutrition: {
      title: 'Módulo Nutrición & Macros',
      stat1: { label: 'Calorías', value: '2,420 kcal' },
      stat2: { label: 'Proteína', value: '185 g' },
      stat3: { label: 'Carbohidratos', value: '260 g' },
      stat4: { label: 'Grasas', value: '62 g' },
      activityText: 'Comida Post-Entreno • 680 kcal sincronizadas',
      badge: 'USDA SYNC'
    }
  };

  const zones = {
    zone2: { name: 'Zona 2 (Resistencia Base)', bpm: '130 - 148 BPM', desc: 'Máxima oxidación de grasas y construcción mitocondrial sin fatiga excesiva.' },
    zone3: { name: 'Zona 3 (Ritmo Aeróbico)', bpm: '149 - 162 BPM', desc: 'Desarrollo de eficiencia cardiovascular para fondos de media y larga distancia.' },
    zone4: { name: 'Zona 4 (Umbral Lactato)', bpm: '163 - 176 BPM', desc: 'Entrenamiento de tolerancia al lactato y ritmo de carrera en 10K/21K.' },
    zone5: { name: 'Zona 5 (VO2 Máx)', bpm: '177+ BPM', desc: 'Potencia neuromuscular máxima en intervalos de alta intensidad.' }
  };

  const currentMode = modes[activeTab];

  return (
    <div className="dusk-page">
      <LandingHeader
        brandName="DUSK"
        brandTag="Athletic OS"
        accentColor="#00f0ff"
        navLinks={[
          { label: 'Características', href: '#features' },
          { label: 'Modos de Rendimiento', href: '#modes' },
          { label: 'Zonas Cardíacas', href: '#zones' },
          { label: 'Arquitectura', href: '#architecture' }
        ]}
      />

      {/* HERO SECTION */}
      <section className="dusk-hero">
        <div className="dusk-hero__ambient" aria-hidden="true" />
        <div className="dusk-container dusk-hero__grid">
          <div className="dusk-hero__content">
            <div className="dusk-pill">
              <span className="dusk-pill__dot" />
              <span>Offline-First Mobile Architecture • v1.4</span>
            </div>
            
            <h1 className="dusk-hero__title">
              Entrena sin límites.<br />
              <span className="dusk-text-gradient">Registra en tiempo real.</span>
            </h1>

            <p className="dusk-hero__lead">
              La plataforma móvil definitiva para atletas de alto impacto. Telemetría GPS precisa en segundo plano, Live Activities en iOS y sincronización bidireccional local con Supabase para cero pérdidas de datos.
            </p>

            <div className="dusk-hero__actions">
              <a href="#modes" className="dusk-btn dusk-btn--primary">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.92-2.85-.9.04-2 .6-2.65 1.36-.58.66-1.08 1.73-.95 2.76 1.01.08 2.05-.52 2.68-1.27z"/>
                </svg>
                <span>Descargar en App Store</span>
              </a>
              <a href="#modes" className="dusk-btn dusk-btn--secondary">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.609 1.814L13.792 12 3.61 22.186a2.41 2.41 0 0 1-.22-.328V2.142c.07-.116.144-.227.22-.328zm11.235 11.238l2.093 2.093-11.458 6.616 9.365-8.71zm0-2.104l-9.365-8.71 11.458 6.616-2.093 2.094zm1.484 1.052l3.353 1.936c1.173.677 1.173 1.789 0 2.466l-3.353 1.936-2.296-2.296 2.296-2.042z"/>
                </svg>
                <span>Google Play</span>
              </a>
            </div>

            <div className="dusk-stats-strip">
              <div className="dusk-stat-item">
                <span className="dusk-stat-number">4.9 ★</span>
                <span className="dusk-stat-label">Calificación iOS</span>
              </div>
              <div className="dusk-stat-item">
                <span className="dusk-stat-number">&lt; 15ms</span>
                <span className="dusk-stat-label">Latencia Local</span>
              </div>
              <div className="dusk-stat-item">
                <span className="dusk-stat-number">100%</span>
                <span className="dusk-stat-label">Offline-Capable</span>
              </div>
            </div>
          </div>

          {/* PHONE MOCKUP INTERACTIVE */}
          <div className="dusk-hero__device-area">
            <div className="dusk-phone">
              <div className="dusk-phone__island">
                <div className="dusk-phone__camera" />
                <div className="dusk-phone__island-live">
                  <span className="dusk-pulse-dot" />
                  <span>Dusk Live • {currentMode.stat1.value}</span>
                </div>
              </div>

              <div className="dusk-phone__screen">
                <div className="dusk-phone__header">
                  <div>
                    <span className="dusk-phone__sub">SESIÓN ACTIVA</span>
                    <h3 className="dusk-phone__title">{currentMode.title}</h3>
                  </div>
                  <span className="dusk-phone__badge">{currentMode.badge}</span>
                </div>

                <div className="dusk-phone__activity-box">
                  <span className="dusk-phone__activity-icon">⚡</span>
                  <p>{currentMode.activityText}</p>
                </div>

                <div className="dusk-phone__metrics-grid">
                  <div className="dusk-phone__metric-card">
                    <span className="dusk-phone__m-lbl">{currentMode.stat1.label}</span>
                    <span className="dusk-phone__m-val">{currentMode.stat1.value}</span>
                  </div>
                  <div className="dusk-phone__metric-card">
                    <span className="dusk-phone__m-lbl">{currentMode.stat2.label}</span>
                    <span className="dusk-phone__m-val">{currentMode.stat2.value}</span>
                  </div>
                  <div className="dusk-phone__metric-card">
                    <span className="dusk-phone__m-lbl">{currentMode.stat3.label}</span>
                    <span className="dusk-phone__m-val dusk-phone__m-val--accent">{currentMode.stat3.value}</span>
                  </div>
                  <div className="dusk-phone__metric-card">
                    <span className="dusk-phone__m-lbl">{currentMode.stat4.label}</span>
                    <span className="dusk-phone__m-val">{currentMode.stat4.value}</span>
                  </div>
                </div>

                {/* Animated heart rate wave */}
                <div className="dusk-phone__telemetry">
                  <div className="dusk-phone__wave-header">
                    <span>Telemetría en Vivo</span>
                    <span className="dusk-phone__live-tag">PULSO ESTABLE</span>
                  </div>
                  <div className="dusk-phone__wave-bars">
                    <span style={{ height: '40%' }} />
                    <span style={{ height: '65%' }} />
                    <span style={{ height: '85%' }} />
                    <span style={{ height: '50%' }} />
                    <span style={{ height: '95%' }} />
                    <span style={{ height: '70%' }} />
                    <span style={{ height: '60%' }} />
                    <span style={{ height: '80%' }} />
                    <span style={{ height: '90%' }} />
                    <span style={{ height: '45%' }} />
                  </div>
                </div>

                <div className="dusk-phone__nav-bar">
                  <span className="dusk-phone__nav-item dusk-phone__nav-item--active">Running</span>
                  <span className="dusk-phone__nav-item">Fuerza</span>
                  <span className="dusk-phone__nav-item">Nutrición</span>
                  <span className="dusk-phone__nav-item">Ajustes</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INTERACTIVE MODE PICKER */}
      <section className="dusk-section" id="modes">
        <div className="dusk-container">
          <div className="dusk-section-header">
            <span className="dusk-tag">INTERFAZ MULTI-DISCIPLINA</span>
            <h2 className="dusk-section-title">Diseñado para cada dimensión atlética</h2>
            <p className="dusk-section-sub">Cambia entre disciplinas y experimenta cómo la UI se adapta a las necesidades biomecánicas de cada sesión.</p>
          </div>

          <div className="dusk-mode-selector">
            <button
              type="button"
              className={`dusk-mode-btn ${activeTab === 'running' ? 'dusk-mode-btn--active' : ''}`}
              onClick={() => setActiveTab('running')}
            >
              <span className="dusk-mode-icon">🏃‍♂️</span>
              <div>
                <strong>Running & Fondo</strong>
                <span>Pace, cadencia, elevación y ruta</span>
              </div>
            </button>

            <button
              type="button"
              className={`dusk-mode-btn ${activeTab === 'strength' ? 'dusk-mode-btn--active' : ''}`}
              onClick={() => setActiveTab('strength')}
            >
              <span className="dusk-mode-icon">🏋️</span>
              <div>
                <strong>Fuerza & Hipertrofia</strong>
                <span>RPE, sobrecarga progresiva y descansos</span>
              </div>
            </button>

            <button
              type="button"
              className={`dusk-mode-btn ${activeTab === 'nutrition' ? 'dusk-mode-btn--active' : ''}`}
              onClick={() => setActiveTab('nutrition')}
            >
              <span className="dusk-mode-icon">🥗</span>
              <div>
                <strong>Macros & Nutrición</strong>
                <span>Escáner de código de barras y base USDA</span>
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* BENTO GRID FEATURES */}
      <section className="dusk-section dusk-section--darker" id="features">
        <div className="dusk-container">
          <div className="dusk-section-header">
            <span className="dusk-tag">INGENIERÍA MOBILE</span>
            <h2 className="dusk-section-title">Potencia técnica bajo el capó</h2>
            <p className="dusk-section-sub">Desarrollado con React Native, Expo SDK 54, Zustand y Supabase para máxima solidez en cualquier terreno.</p>
          </div>

          <div className="dusk-bento">
            <div className="dusk-bento__card dusk-bento__card--large">
              <div className="dusk-bento__icon">📡</div>
              <h3>Offline-First con Sincronización Silenciosa</h3>
              <p>
                La persistencia local mediante SQLite almacena cada segundo de GPS y repetición. Cuando recuperas señal, el motor de sincronización de Supabase resuelve conflictos en cola sin bloquear la interfaz.
              </p>
              <div className="dusk-bento__sync-demo">
                <div className="dusk-sync-pill">
                  <span className="dusk-pulse-dot" />
                  <span>Sin conexión de red</span>
                </div>
                <div className="dusk-sync-arrow">→</div>
                <div className="dusk-sync-pill dusk-sync-pill--success">
                  <span>Datos persistidos en caché local</span>
                </div>
              </div>
            </div>

            <div className="dusk-bento__card">
              <div className="dusk-bento__icon">🏝️</div>
              <h3>Live Activities & Dynamic Island</h3>
              <p>
                Monitorea tu ritmo cardíaco, división por kilómetro y cronómetro de descanso directamente desde la pantalla de bloqueo de iOS.
              </p>
            </div>

            <div className="dusk-bento__card">
              <div className="dusk-bento__icon">🥗</div>
              <h3>Escaneo Rápido de Macronutrientes</h3>
              <p>
                Reconocimiento de códigos de barras mediante APIs abiertas de USDA y Open Food Facts. Calcula proteínas y calorías en segundos.
              </p>
            </div>

            <div className="dusk-bento__card dusk-bento__card--wide">
              <div className="dusk-bento__icon">⚡</div>
              <div>
                <h3>Arquitectura Zero-Lag con Zustand & NativeWind</h3>
                <p>
                  Estado global atómico desacoplado y renderizado a 120 FPS sin re-renders innecesarios durante entrenamientos exigentes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HEART RATE ZONE SELECTOR */}
      <section className="dusk-section" id="zones">
        <div className="dusk-container">
          <div className="dusk-section-header">
            <span className="dusk-tag">TELEMETRÍA CARDIOVASCULAR</span>
            <h2 className="dusk-section-title">Zonas de esfuerzo en tiempo real</h2>
            <p className="dusk-section-sub">Selecciona una zona cardíaca para conocer cómo DUSK calibra las alertas hápticas de tu reloj y teléfono.</p>
          </div>

          <div className="dusk-zones-grid">
            <div className="dusk-zones-nav">
              {Object.keys(zones).map((key) => (
                <button
                  key={key}
                  type="button"
                  className={`dusk-zone-tab ${selectedZone === key ? 'dusk-zone-tab--active' : ''}`}
                  onClick={() => setSelectedZone(key)}
                >
                  <span className="dusk-zone-tab__title">{zones[key].name}</span>
                  <span className="dusk-zone-tab__bpm">{zones[key].bpm}</span>
                </button>
              ))}
            </div>

            <div className="dusk-zone-display">
              <span className="dusk-zone-display__bpm">{zones[selectedZone].bpm}</span>
              <h3 className="dusk-zone-display__title">{zones[selectedZone].name}</h3>
              <p className="dusk-zone-display__desc">{zones[selectedZone].desc}</p>
              <div className="dusk-zone-display__status">
                <span className="dusk-pulse-dot" />
                <span>Monitoreo continuo por sensores Bluetooth LE & HealthKit</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER CTA */}
      <footer className="dusk-footer">
        <div className="dusk-container dusk-footer__box">
          <h2>Construye la mejor versión de tu disciplina.</h2>
          <p>DUSK está disponible en fase beta privada para iOS y Android.</p>
          <div className="dusk-hero__actions">
            <button 
              type="button" 
              onClick={() => window.location.hash = ''} 
              className="dusk-btn dusk-btn--primary"
            >
              Volver al Portafolio
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
