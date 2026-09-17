import { useRef } from 'react';
import './DuskGallery.css';

const screenshotTitles = {
  '01-peso-y-progreso': 'Peso y progreso',
  '02-buscar-alimento': 'Buscar alimento',
  '03-perfil': 'Perfil',
  '04-nutricion': 'Nutrición',
  '05-carrera-y-actividad': 'Carrera y actividad',
};

const screenshotFiles = import.meta.glob(
  '../../../assets/dusk/screenshots/*.{png,jpg,jpeg,webp,avif}',
  { eager: true, query: '?url', import: 'default' }
);

const screenshots = Object.entries(screenshotFiles)
  .sort(([first], [second]) => first.localeCompare(second, 'es', { numeric: true }))
  .map(([path, src], index) => {
    const filename = path.split('/').pop().replace(/\.[^.]+$/, '');
    const label = filename.replace(/^[\d\s._-]+/, '').replace(/[-_]+/g, ' ').trim();

    return {
      src,
      title: screenshotTitles[filename] ?? (label ? label[0].toUpperCase() + label.slice(1) : `Pantalla ${index + 1}`),
    };
  });

const galleryItems = screenshots.length
  ? screenshots
  : Array.from({ length: 4 }, (_, index) => ({ title: `Pantalla ${index + 1}` }));

export default function DuskGallery() {
  const railRef = useRef(null);

  const scrollGallery = (direction) => {
    const rail = railRef.current;
    if (rail) {
      rail.scrollBy({ left: direction * rail.clientWidth * 0.8, behavior: 'smooth' });
    }
  };

  return (
    <section className="dusk-gallery" id="gallery" aria-labelledby="dusk-gallery-title">
      <div className="dusk-container">
        <div className="dusk-gallery__intro">
          <div>
            <span className="dusk-tag">LA APP POR DENTRO</span>
            <h2 className="dusk-section-title" id="dusk-gallery-title">Dusk en cada pantalla</h2>
          </div>
          <div className="dusk-gallery__aside">
            <p>
              {screenshots.length
                ? 'Explora las pantallas de la app y descubre cómo se vive cada entrenamiento.'
                : 'Muy pronto podrás explorar aquí las pantallas de la app.'}
            </p>
            {screenshots.length > 4 && (
              <div className="dusk-gallery__controls" role="group" aria-label="Controles de la galería">
                <button type="button" onClick={() => scrollGallery(-1)} aria-label="Ver capturas anteriores">←</button>
                <button type="button" onClick={() => scrollGallery(1)} aria-label="Ver capturas siguientes">→</button>
              </div>
            )}
          </div>
        </div>

        <ul className="dusk-gallery__rail" ref={railRef} aria-label="Galería de pantallas de Dusk" tabIndex={0}>
          {galleryItems.map((item, index) => (
            <li className="dusk-gallery__item" key={item.src ?? item.title}>
              <figure>
                <div className="dusk-gallery__device">
                  {item.src ? (
                    <a className="dusk-gallery__link" href={item.src} target="_blank" rel="noopener noreferrer" aria-label={`Ver ${item.title} en tamaño completo`}>
                      <img src={item.src} alt={`Pantalla ${item.title} de Dusk`} loading="lazy" />
                    </a>
                  ) : (
                    <div className="dusk-gallery__placeholder" aria-hidden="true">
                      <span className="dusk-gallery__placeholder-number">{String(index + 1).padStart(2, '0')}</span>
                      <span>Captura próximamente</span>
                    </div>
                  )}
                </div>
                <figcaption>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <strong>{item.title}</strong>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
