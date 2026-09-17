import { useState } from 'react';
import './NoirLanding.css';

const tracks = [
  { title: 'Midnight Reverie', artist: 'Kroma Sound Ensemble', duration: '4:18', art: 'midnight' },
  { title: 'Subterranean Resonance', artist: 'Sector 09', duration: '6:42', art: 'subterranean' },
  { title: 'Neon Drift', artist: 'Vala & The Synthetics', duration: '3:55', art: 'neon' },
  { title: 'Static & Velvet', artist: 'Elena Rostova', duration: '4:08', art: 'velvet' }
];

export default function NoirLanding() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const currentTrack = tracks[currentTrackIndex];

  const selectTrack = (index) => {
    setCurrentTrackIndex(index);
    setIsPlaying(false);
  };

  return (
    <div className="noir-page">
      <header className="noir-site-header">
        <button type="button" className="noir-back" onClick={() => window.location.hash = ''} aria-label="Volver al portafolio">
          <span aria-hidden="true">←</span><span>PORTAFOLIO</span>
        </button>
        <div className="noir-site-header__brand" aria-label="NOIR, archivo de música">
          <strong>NOIR</strong>
          <span>MUSIC ARCHIVE</span>
        </div>
        <span className="noir-site-header__edition">VOL. 001 / 2026</span>
      </header>

      <main>
        <section className="noir-featured" id="player" aria-labelledby="noir-featured-title">
          <div className="noir-featured__topline">
            <span className="noir-featured__monogram">N/R</span>
            <nav aria-label="Navegación de Noir">
              <a href="#artist">ARTISTA</a>
              <a href="#tracks">PISTAS</a>
              <a href="#archive">ARCHIVO</a>
            </nav>
          </div>

          <div className="noir-featured__body">
            <div className="noir-record-stage" aria-label="Vinilo del archivo Noir">
              <div className="noir-record-position" aria-hidden="true">
                <div className={'noir-record' + (isPlaying ? ' noir-record--playing' : '')}>
                  <div className="noir-record__label"><span className="noir-record__equalizer">▂▅▇▃</span></div>
                </div>
              </div>
              <div className="noir-record-stage__track"><span>{String(currentTrackIndex + 1).padStart(2, '0')}. {currentTrack.title}</span></div>
            </div>

            <div className="noir-featured__content" id="artist">
              <div className="noir-featured__eyebrow">ARTISTA DESTACADO / 001</div>
              <h1 id="noir-featured-title">KROMA<br />SOUND</h1>
              <p className="noir-featured__genre">NOIR JAZZ, AMBIENT, ELECTRÓNICA ANALÓGICA</p>

              <div className="noir-tracklist" id="tracks">
                <div className="noir-tracklist__heading"><span>POPULAR EN EL ARCHIVO</span><span>04 PISTAS</span></div>
                {tracks.map((track, index) => (
                  <button
                    key={track.title}
                    type="button"
                    className={'noir-track' + (currentTrackIndex === index ? ' noir-track--active' : '')}
                    onClick={() => selectTrack(index)}
                    aria-pressed={currentTrackIndex === index}
                    aria-label={'Seleccionar ' + track.title + ' de ' + track.artist}
                  >
                    <span className="noir-track__number">{String(index + 1).padStart(2, '0')}</span>
                    <span className={'noir-track__art noir-track__art--' + track.art} aria-hidden="true"><i /></span>
                    <span className="noir-track__copy"><strong>{track.title}</strong><small>{track.artist}</small></span>
                    <span className="noir-track__duration">{track.duration}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="noir-featured__bottomline">
            <div className="noir-playback">
              <button type="button" className="noir-playback__button" onClick={() => setIsPlaying(!isPlaying)} aria-pressed={isPlaying} aria-label={isPlaying ? 'Pausar animación del vinilo' : 'Girar vinilo'}>
                {isPlaying ? 'Ⅱ' : '▶'}
              </button>
              <span>{currentTrack.title}</span>
              <span className="noir-playback__duration">{currentTrack.duration}</span>
            </div>
            <span className="noir-featured__demo">REPRODUCTOR CONCEPTUAL · DEMO VISUAL</span>
          </div>
        </section>

        <div className="noir-trends" id="archive"><span>BEST TRENDS</span><small>2025 / 2026</small></div>
      </main>
    </div>
  );
}
