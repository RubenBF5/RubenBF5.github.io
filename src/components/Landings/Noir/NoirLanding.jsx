import { useState, useEffect } from 'react';
import LandingHeader from '../LandingHeader';
import './NoirLanding.css';

export default function NoirLanding() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [volume, setVolume] = useState(82);
  const [activeStem, setActiveStem] = useState('all');

  const tracks = [
    {
      title: 'Midnight Reverie',
      artist: 'Kroma Sound Ensemble',
      genre: 'Noir Jazz / Ambient',
      duration: '04:18',
      format: 'FLAC 24-bit / 192kHz',
      coverHue: 'linear-gradient(135deg, #1f1b2e 0%, #0d0c12 100%)'
    },
    {
      title: 'Subterranean Resonance',
      artist: 'Sector 09',
      genre: 'Deep Dub Techno',
      duration: '06:42',
      format: 'Studio Master DSD',
      coverHue: 'linear-gradient(135deg, #2a2015 0%, #0e0d0a 100%)'
    },
    {
      title: 'Neon Drift (Analog Cut)',
      artist: 'Vala & The Synthetics',
      genre: 'Retro-Electro / Modular',
      duration: '03:55',
      format: 'Direct Vinyl Rip 180g',
      coverHue: 'linear-gradient(135deg, #2d1822 0%, #100b0e 100%)'
    }
  ];

  const currentTrack = tracks[currentTrackIndex];

  const vinyls = [
    {
      title: 'Echoes of Obsidian',
      artist: 'The Tokyo Brass Collective',
      year: '2026',
      badge: 'PRENSADO 180G'
    },
    {
      title: 'Static & Velvet',
      artist: 'Elena Rostova',
      year: '2025',
      badge: 'CINTA ANALÓGICA'
    },
    {
      title: 'Binaural Drift Vol. III',
      artist: 'Noir Sound Labs',
      year: '2026',
      badge: 'AUDIO ESPACIAL'
    }
  ];

  return (
    <div className="noir-page">
      <LandingHeader
        brandName="NOIR"
        brandTag="Audio Hi-Fi"
        accentColor="#d4af37"
        navLinks={[
          { label: 'Reproductor', href: '#player' },
          { label: 'Curaduría de Vinilos', href: '#vinyls' },
          { label: 'Stems Acústicos', href: '#stems' },
          { label: 'Membresía', href: '#pricing' }
        ]}
      />

      {/* HERO SECTION */}
      <section className="noir-hero">
        <div className="noir-hero__light" aria-hidden="true" />
        <div className="noir-container">
          <div className="noir-hero__badge">
            <span className="noir-badge-star">✦</span>
            <span>ACÚSTICA SIN COMPRESIÓN // 24-BIT 192KHZ MASTER</span>
          </div>

          <h1 className="noir-hero__title">
            El sonido en su forma <br />
            <em>más pura y visceral.</em>
          </h1>

          <p className="noir-hero__lead">
            Streaming de audio sin pérdidas, archivo digital de prensados en vinilo de 180 gramos y espacialización acústica binaural para audiófilos exigentes.
          </p>

          {/* INTERACTIVE TURNTABLE & AUDIO PLAYER */}
          <div className="noir-player" id="player">
            <div className="noir-player__glass">
              <div className="noir-player__layout">
                {/* VINYL DISC */}
                <div className="noir-player__vinyl-wrapper">
                  <div className={`noir-vinyl ${isPlaying ? 'noir-vinyl--spinning' : ''}`}>
                    <div className="noir-vinyl__grooves">
                      <div className="noir-vinyl__label">
                        <span className="noir-vinyl__gold-dot" />
                        <span className="noir-vinyl__code">NOIR-04</span>
                      </div>
                    </div>
                  </div>
                  <div className={`noir-tonearm ${isPlaying ? 'noir-tonearm--active' : ''}`} />
                </div>

                {/* TRACK INFO & CONTROLS */}
                <div className="noir-player__info">
                  <div className="noir-player__top-row">
                    <span className="noir-format-tag">{currentTrack.format}</span>
                    <span className="noir-live-badge">
                      {isPlaying ? '● EN REPRODUCCIÓN' : '⏸ EN PAUSA'}
                    </span>
                  </div>

                  <h3 className="noir-player__track-title">{currentTrack.title}</h3>
                  <p className="noir-player__artist">{currentTrack.artist} — {currentTrack.genre}</p>

                  {/* EQUALIZER WAVEFORM */}
                  <div className="noir-player__wave">
                    {Array.from({ length: 28 }).map((_, i) => (
                      <span
                        key={i}
                        className={`noir-wave-bar ${isPlaying ? 'noir-wave-bar--active' : ''}`}
                        style={{
                          height: isPlaying ? `${Math.sin(i * 0.5) * 35 + 45}%` : '8%',
                          animationDelay: `${(i % 7) * 0.1}s`
                        }}
                      />
                    ))}
                  </div>

                  {/* TIMELINE */}
                  <div className="noir-player__timeline">
                    <span className="noir-time">01:42</span>
                    <div className="noir-timeline-bar">
                      <div className="noir-timeline-progress" style={{ width: '42%' }} />
                    </div>
                    <span className="noir-time">{currentTrack.duration}</span>
                  </div>

                  {/* CONTROLS */}
                  <div className="noir-player__controls">
                    <button
                      type="button"
                      className="noir-ctrl-btn"
                      onClick={() => setCurrentTrackIndex((prev) => (prev === 0 ? tracks.length - 1 : prev - 1))}
                      aria-label="Pista anterior"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <polygon points="19 20 9 12 19 4 19 20" />
                        <line x1="5" y1="19" x2="5" y2="5" stroke="currentColor" strokeWidth="2" />
                      </svg>
                    </button>

                    <button
                      type="button"
                      className="noir-ctrl-btn noir-ctrl-btn--play"
                      onClick={() => setIsPlaying(!isPlaying)}
                      aria-label={isPlaying ? 'Pausar' : 'Reproducir'}
                    >
                      {isPlaying ? (
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                          <rect x="6" y="4" width="4" height="16" />
                          <rect x="14" y="4" width="4" height="16" />
                        </svg>
                      ) : (
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                          <polygon points="5 3 19 12 5 21 5 3" />
                        </svg>
                      )}
                    </button>

                    <button
                      type="button"
                      className="noir-ctrl-btn"
                      onClick={() => setCurrentTrackIndex((prev) => (prev + 1) % tracks.length)}
                      aria-label="Pista siguiente"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <polygon points="5 4 15 12 5 20 5 4" />
                        <line x1="19" y1="5" x2="19" y2="19" stroke="currentColor" strokeWidth="2" />
                      </svg>
                    </button>

                    <div className="noir-vol-slider">
                      <span>🔈</span>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={volume}
                        onChange={(e) => setVolume(e.target.value)}
                        className="noir-range"
                      />
                      <span>{volume}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CURATED VINYL ARCHIVE */}
      <section className="noir-section" id="vinyls">
        <div className="noir-container">
          <div className="noir-section-header">
            <span className="noir-gold-tag">PRENSADOS DE ARCHIVO</span>
            <h2 className="noir-section-title">Ediciones físicas digitalizadas a 192kHz</h2>
            <p className="noir-section-sub">Cada disco se masteriza desde cintas de carrete abierto y tornamesas de referencia analógica directa.</p>
          </div>

          <div className="noir-vinyl-grid">
            {vinyls.map((vinyl, idx) => (
              <div key={idx} className="noir-vinyl-card">
                <div className="noir-sleeve">
                  <div className="noir-sleeve__cover">
                    <span className="noir-sleeve__badge">{vinyl.badge}</span>
                    <h4 className="noir-sleeve__title">{vinyl.title}</h4>
                    <p className="noir-sleeve__artist">{vinyl.artist}</p>
                    <span className="noir-sleeve__year">{vinyl.year}</span>
                  </div>
                  <div className="noir-sleeve__disc" />
                </div>
                <div className="noir-vinyl-card__meta">
                  <strong>{vinyl.title}</strong>
                  <span>{vinyl.artist}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STEMS & MULTITRACK MIXER */}
      <section className="noir-section noir-section--alt" id="stems">
        <div className="noir-container">
          <div className="noir-section-header">
            <span className="noir-gold-tag">INGENIERÍA ACÚSTICA</span>
            <h2 className="noir-section-title">Desarmado de Stems en Tiempo Real</h2>
            <p className="noir-section-sub">Aísla canales de frecuencias o escucha pistas instrumentales puras directamente en tu navegador.</p>
          </div>

          <div className="noir-stems-box">
            <div className="noir-stems-tabs">
              {[
                { id: 'all', label: 'Mezcla Maestra Completa' },
                { id: 'drums', label: 'Solo Percusión & Batería' },
                { id: 'bass', label: 'Línea de Bajo Analógico' },
                { id: 'keys', label: 'Sintetizadores & Rhodes' }
              ].map((stem) => (
                <button
                  key={stem.id}
                  type="button"
                  className={`noir-stem-btn ${activeStem === stem.id ? 'noir-stem-btn--active' : ''}`}
                  onClick={() => setActiveStem(stem.id)}
                >
                  <span className="noir-stem-indicator" />
                  <span>{stem.label}</span>
                </button>
              ))}
            </div>

            <div className="noir-stem-display">
              <div className="noir-stem-meter">
                <span>Rango Dinámico</span>
                <strong>+14.2 LUFS (True Peak)</strong>
              </div>
              <div className="noir-stem-meter">
                <span>Respuesta Frecuencia</span>
                <strong>10 Hz — 48,000 Hz</strong>
              </div>
              <div className="noir-stem-meter">
                <span>Espacialización</span>
                <strong>Dolby Atmos / Binaural HRTF</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MEMBERSHIP PRICING */}
      <section className="noir-section" id="pricing">
        <div className="noir-container">
          <div className="noir-section-header">
            <span className="noir-gold-tag">MEMBRESÍAS AUDIÓFILAS</span>
            <h2 className="noir-section-title">Accede al santuario sónico</h2>
            <p className="noir-section-sub">Planes sin anuncios, sin compresión con pérdida de calidad y con curaduría humana semanal.</p>
          </div>

          <div className="noir-pricing-grid">
            <div className="noir-pricing-card">
              <span className="noir-pricing-tier">STUDIO PASS</span>
              <div className="noir-pricing-cost">
                <strong>$12</strong>
                <span>/ mes</span>
              </div>
              <p>Ideal para melómanos que buscan calidad FLAC impecable en móvil y escritorio.</p>
              <ul className="noir-pricing-features">
                <li>✓ FLAC Lossless 16-bit / 44.1kHz</li>
                <li>✓ Catálogo ilimitado de transmisiones</li>
                <li>✓ Descarga offline cifrada</li>
                <li>✓ Soporte para DAC USB externos</li>
              </ul>
              <button type="button" className="noir-btn noir-btn--outline">
                Comenzar Prueba
              </button>
            </div>

            <div className="noir-pricing-card noir-pricing-card--highlight">
              <div className="noir-pricing-badge">EDICIÓN COLECCIONISTA</div>
              <span className="noir-pricing-tier">AUDIOPHILE ARCHIVAL</span>
              <div className="noir-pricing-cost">
                <strong>$24</strong>
                <span>/ mes</span>
              </div>
              <p>Acceso ilimitado a masters de cinta analógica de 24-bit/192kHz y vinilos exclusivos.</p>
              <ul className="noir-pricing-features">
                <li>✓ Masters 24-bit / 192kHz & DSD Studio</li>
                <li>✓ Separador de pistas & stems interactivo</li>
                <li>✓ Prioridad en prensados de vinilo físico</li>
                <li>✓ Perfiles calibrados para audífonos Sennheiser/Audeze</li>
              </ul>
              <button type="button" className="noir-btn noir-btn--gold">
                Suscribirse con Archival
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="noir-footer">
        <div className="noir-container noir-footer__content">
          <span className="noir-footer__logo">NOIR SOUND ARCHIVE</span>
          <p>Un tributo a la pureza acústica y a la preservación analógica en la era digital.</p>
          <button
            type="button"
            onClick={() => window.location.hash = ''}
            className="noir-btn noir-btn--gold"
          >
            Volver al Portafolio
          </button>
        </div>
      </footer>
    </div>
  );
}
