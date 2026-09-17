import { useState } from 'react';
import LandingHeader from '../LandingHeader';
import DuskGallery from './DuskGallery';
import duskLogo from '../../../assets/dusk-logo.png';
import './DuskLanding.css';

export default function DuskLanding() {
  const [activeTab, setActiveTab] = useState('running');
  const [selectedZone, setSelectedZone] = useState('zone2');

  const zones = {
    zone2: { name: 'Zona 2 (Resistencia Base)', range: '130 – 148', color: '#2d9f7b', desc: 'Máxima oxidación de grasas y construcción mitocondrial sin fatiga excesiva.' },
    zone3: { name: 'Zona 3 (Ritmo Aeróbico)', range: '149 – 162', color: '#d69a31', desc: 'Desarrollo de eficiencia cardiovascular para fondos de media y larga distancia.' },
    zone4: { name: 'Zona 4 (Umbral Lactato)', range: '163 – 176', color: '#e84c1e', desc: 'Entrenamiento de tolerancia al lactato y ritmo de carrera en 10K/21K.' },
    zone5: { name: 'Zona 5 (VO2 Máx)', range: '177+', color: '#c83d48', desc: 'Potencia neuromuscular máxima en intervalos de alta intensidad.' }
  };

  return (
    <div className="dusk-page">
      <LandingHeader
        brandName="DUSK"
        brandTag="Athletic OS"
        accentColor="#e11d48"
        showPortfolioCta={false}
      />

      {/* HERO SECTION */}
      <section className="dusk-hero">
        <div className="dusk-hero__ambient" aria-hidden="true" />
        <div className="dusk-container dusk-hero__grid">
          <div className="dusk-hero__content">
            <div className="dusk-pill">
              <span className="dusk-pulse-dot" />
              <span>Lanzamiento Diciembre 2025 — Beta Privada Activa</span>
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
                <span>Registrar en Beta — iOS</span>
              </a>
              <a href="#modes" className="dusk-btn dusk-btn--secondary">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.609 1.814L13.792 12 3.61 22.186a2.41 2.41 0 0 1-.22-.328V2.142c.07-.116.144-.227.22-.328zm11.235 11.238l2.093 2.093-11.458 6.616 9.365-8.71zm0-2.104l-9.365-8.71 11.458 6.616-2.093 2.094zm1.484 1.052l3.353 1.936c1.173.677 1.173 1.789 0 2.466l-3.353 1.936-2.296-2.296 2.296-2.042z"/>
                </svg>
                <span>Android — Próximamente</span>
              </a>
            </div>

            <div className="dusk-launch-badge">
              <span className="dusk-launch-badge__icon">📅</span>
              <div>
                <strong>Lanzamiento: Diciembre 2025</strong>
                <span>Únete a la lista de espera y obtén 3 meses gratis al lanzamiento</span>
              </div>
            </div>

            <div className="dusk-stats-strip">
              <div className="dusk-stat-item">
                <span className="dusk-stat-number">Beta</span>
                <span className="dusk-stat-label">Acceso Anticipado iOS</span>
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

          {/* Dusk splash screen */}
          <div className="dusk-hero__device-area">
            <div className="dusk-phone-wrap">
              <div className="dusk-phone-btn dusk-phone-btn--volume-up" aria-hidden="true" />
              <div className="dusk-phone-btn dusk-phone-btn--volume-down" aria-hidden="true" />
              <div className="dusk-phone-btn dusk-phone-btn--power" aria-hidden="true" />

              <div className="dusk-phone">
                <div className="dusk-phone__screen">
                  <img className="dusk-phone__logo" src={duskLogo} alt="Dusk" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <DuskGallery />

      {/* INTERACTIVE MODE PICKER */}
      <section className="dusk-section" id="modes">
        <div className="dusk-container">
          <div className="dusk-section-header">
            <span className="dusk-tag">INTERFAZ MULTI-DISCIPLINA</span>
            <h2 className="dusk-section-title">Diseñado para cada dimensión atlética</h2>
            <p className="dusk-section-sub">Explora las disciplinas de entrenamiento para las que está diseñada Dusk.</p>
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

      {/* FEATURE CARDS */}
      <section className="dusk-section dusk-section--darker" id="features">
        <div className="dusk-container">
          <div className="dusk-section-header">
            <span className="dusk-tag">INGENIERÍA MOBILE</span>
            <h2 className="dusk-section-title">Potencia técnica bajo el capó</h2>
            <p className="dusk-section-sub">Desarrollado con React Native, Expo SDK 54, Zustand y Supabase para máxima solidez en cualquier terreno.</p>
          </div>

          <div className="dusk-bento">
            <div className="dusk-bento__card">
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

            <div className="dusk-bento__card">
              <div className="dusk-bento__icon">⚡</div>
              <h3>Arquitectura Zero-Lag con Zustand & NativeWind</h3>
              <p>
                Estado global atómico desacoplado y renderizado a 120 FPS sin re-renders innecesarios durante entrenamientos exigentes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HEART RATE ZONE SELECTOR */}
      <section className="dusk-section dusk-section--zones" id="zones">
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
                  style={{ '--zone-color': zones[key].color }}
                  aria-pressed={selectedZone === key}
                  onClick={() => setSelectedZone(key)}
                >
                  <span className="dusk-zone-tab__dot" aria-hidden="true" />
                  <span className="dusk-zone-tab__title">{zones[key].name}</span>
                  <span className="dusk-zone-tab__bpm">{zones[key].range} BPM</span>
                </button>
              ))}
            </div>

            <div className="dusk-zone-display" style={{ '--zone-color': zones[selectedZone].color }} aria-live="polite">
              <div className="dusk-zone-display__top">
                <span>RANGO SELECCIONADO · Z{selectedZone.replace('zone', '')}</span>
                <span className="dusk-zone-display__heart" aria-hidden="true">♥</span>
              </div>
              <div className="dusk-zone-display__reading">
                <strong>{zones[selectedZone].range}</strong>
                <span>BPM</span>
              </div>
              <h3 className="dusk-zone-display__title">{zones[selectedZone].name}</h3>
              <p className="dusk-zone-display__desc">{zones[selectedZone].desc}</p>
              <div className="dusk-zone-display__scale" role="img" aria-label={`Escala de zonas cardíacas: ${zones[selectedZone].name} seleccionada`}>
                <span className="dusk-zone-display__scale-title">ESCALA DE ESFUERZO</span>
                <div className="dusk-zone-display__scale-track" aria-hidden="true">
                  {Object.keys(zones).map((key) => (
                    <span
                      key={key}
                      className={selectedZone === key ? 'dusk-zone-display__segment dusk-zone-display__segment--active' : 'dusk-zone-display__segment'}
                      style={{ '--segment-color': zones[key].color }}
                    />
                  ))}
                </div>
                <div className="dusk-zone-display__scale-labels" aria-hidden="true">
                  {Object.keys(zones).map((key) => <span key={key}>Z{key.replace('zone', '')}</span>)}
                </div>
              </div>
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
          <p>DUSK está en beta privada para iOS. Android llegará próximamente.</p>
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
