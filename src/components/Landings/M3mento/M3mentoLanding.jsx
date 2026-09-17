import { useState } from 'react';
import LandingHeader from '../LandingHeader';
import blackSleeveless from '../../../assets/m3mento/products/01-black-sleeveless.png';
import redTee from '../../../assets/m3mento/products/02-red-tee.png';
import whiteSleeveless from '../../../assets/m3mento/products/03-white-sleeveless.png';
import navyTee from '../../../assets/m3mento/products/04-navy-tee.png';
import blackHoodie from '../../../assets/m3mento/products/05-black-hoodie.png';
import './M3mentoLanding.css';

const products = [
  {
    id: 'mm-01', code: 'MM-01 // SLEEVELESS', name: 'Type 03 — Negro',
    type: 'Playera sin mangas', color: 'Negro lavado', colorHex: '#242426', view: 'Frente', image: blackSleeveless,
    desc: 'Silueta sin mangas en negro lavado. El gráfico frontal combina el emblema Type 03 con la identidad de M3MENTOSTUDIOS en rojo y gris.',
    graphic: 'Type 03 / M3MENTOSTUDIOS'
  },
  {
    id: 'mm-02', code: 'MM-02 // TEE', name: 'Holy Local — Rojo',
    type: 'Playera de manga corta', color: 'Rojo desgastado', colorHex: '#982b30', view: 'Espalda', image: redTee,
    desc: 'Playera roja de acabado desgastado con una ilustración ovalada de inspiración devocional y firma M3MENTOSTUDIOS en la espalda.',
    graphic: 'Holy Local Brand / ilustración ovalada'
  },
  {
    id: 'mm-03', code: 'MM-03 // SLEEVELESS', name: 'Holy Local — Blanco',
    type: 'Playera sin mangas', color: 'Blanco', colorHex: '#e9e9e6', view: 'Espalda', image: whiteSleeveless,
    desc: 'Versión blanca sin mangas. El arte de la espalda mezcla una composición gris tenue con la firma M3MENTOSTUDIOS en rojo oscuro.',
    graphic: 'Holy Local Brand / composición gris'
  },
  {
    id: 'mm-04', code: 'MM-04 // TEE', name: 'True Colors — Azul',
    type: 'Playera de manga corta', color: 'Azul marino', colorHex: '#20344e', view: 'Espalda', image: navyTee,
    desc: 'Playera azul marino con tres figuras aladas en gris y la gráfica True Colors de M3MENTOSTUDIOS en la espalda.',
    graphic: 'True Colors / tres figuras aladas'
  },
  {
    id: 'mm-05', code: 'MM-05 // HOODIE', name: 'Cloud — Negro',
    type: 'Sudadera con capucha', color: 'Negro', colorHex: '#151516', view: 'Espalda', image: blackHoodie,
    desc: 'Sudadera negra con capucha y un gráfico de nubes en tono sobre tono. El logotipo M3MENTO aparece integrado en la composición posterior.',
    graphic: 'M3MENTO / nubes en tono sobre tono'
  }
];

export default function M3mentoLanding() {
  const [selectedProduct, setSelectedProduct] = useState(0);
  const product = products[selectedProduct];
  const position = String(selectedProduct + 1).padStart(2, '0');

  return (
    <div className="m3-page">
      <LandingHeader brandName="M3MENTO" brandTag="Digital Atelier" accentColor="#f5f5f5" showPortfolioCta={false} />

      <div className="m3-status-bar">
        <div className="m3-container m3-status-bar__inner m3-mono">
          <span>[ARCHIVO_DIGITAL // DROP 001]</span>
          <span>M3MENTOSTUDIOS · CIUDAD DE MÉXICO</span>
          <span>05 PIEZAS</span>
        </div>
      </div>

      <section className="m3-hero" id="manifesto">
        <div className="m3-container">
          <div className="m3-hero__meta m3-mono">
            <span>DROP 001 — ARCHIVO DE PRENDAS</span>
            <span>ESTUDIO DE IDENTIDAD Y MODA URBANA</span>
          </div>
          <h1 className="m3-hero__title">MARCA DE ROPA <br />STREETWEAR MEXICANA</h1>
          <div className="m3-hero__grid">
            <p className="m3-hero__desc">Cinco piezas de M3mento reunidas en un archivo visual. Explora cada prenda, sus colores y los gráficos que construyen la identidad de la colección.</p>
            <div className="m3-hero__specs-list m3-mono">
              <div><span>ORIGEN:</span> CIUDAD DE MÉXICO</div>
              <div><span>ARCHIVO:</span> 05 PRENDAS</div>
              <div><span>ENFOQUE:</span> DISEÑO GRÁFICO + STREETWEAR</div>
            </div>
          </div>
        </div>
      </section>

      <section className="m3-section" id="collection" aria-labelledby="m3-catalog-title">
        <div className="m3-container">
          <div className="m3-atelier">
            <div className="m3-atelier__sidebar">
              <h2 className="m3-mono m3-sidebar-tag" id="m3-catalog-title">CATÁLOGO DE ARCHIVO</h2>
              <div className="m3-prod-tabs" aria-label="Prendas de la colección">
                {products.map((item, index) => (
                  <button
                    key={item.id}
                    type="button"
                    className={'m3-prod-tab' + (selectedProduct === index ? ' m3-prod-tab--active' : '')}
                    onClick={() => setSelectedProduct(index)}
                    aria-pressed={selectedProduct === index}
                    aria-controls="m3-product-details"
                  >
                    <span className="m3-prod-tab__thumb"><img src={item.image} alt="" loading="lazy" /></span>
                    <span className="m3-prod-tab__copy">
                      <span className="m3-prod-tab__code m3-mono">{item.code}</span>
                      <strong>{item.name}</strong>
                      <span className="m3-prod-tab__type">{item.type}</span>
                    </span>
                    <span className="m3-prod-tab__arrow" aria-hidden="true">↗</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="m3-atelier__stage">
              <div className="m3-stage-header m3-mono"><span>VISTA DE ARCHIVO</span><span>{position} / 05</span></div>
              <div className="m3-garment-canvas">
                <img key={product.id} className="m3-garment-image" src={product.image} alt={product.name + ', vista de ' + product.view.toLowerCase()} />
              </div>
              <div className="m3-stage-footer m3-mono"><span>VISTA: {product.view.toUpperCase()}</span><span>M3MENTO / DROP 001</span></div>
            </div>

            <div className="m3-atelier__details" id="m3-product-details" aria-live="polite">
              <span className="m3-mono m3-item-code">{product.code}</span>
              <span className="m3-item-number m3-mono" aria-hidden="true">{position}</span>
              <h2 className="m3-item-title">{product.name}</h2>
              <p className="m3-item-type m3-mono">{product.type}</p>
              <p className="m3-item-desc">{product.desc}</p>
              <div className="m3-item-facts">
                <div><span className="m3-mono">COLOR</span><strong><i style={{ backgroundColor: product.colorHex }} />{product.color}</strong></div>
                <div><span className="m3-mono">VISTA</span><strong>{product.view}</strong></div>
                <div><span className="m3-mono">GRÁFICO</span><strong>{product.graphic}</strong></div>
              </div>
              <button type="button" className="m3-next-product m3-mono" onClick={() => setSelectedProduct((selectedProduct + 1) % products.length)}>
                SIGUIENTE PRENDA <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="m3-section m3-section--bordered" id="specs">
        <div className="m3-container">
          <div className="m3-section-title-wrap"><span className="m3-mono">FICHA {position} / 05</span><h2>Detalles de la prenda</h2></div>
          <div className="m3-specs-table">
            {[
              ['Pieza', product.type], ['Color', product.color], ['Vista fotografiada', product.view], ['Gráfica', product.graphic]
            ].map(([label, value]) => (
              <div key={label} className="m3-spec-row"><span className="m3-mono m3-spec-key">{label}</span><span className="m3-spec-val">{value}</span></div>
            ))}
          </div>
        </div>
      </section>

      <footer className="m3-footer">
        <div className="m3-container m3-footer__inner">
          <div className="m3-footer__brand"><span className="m3-footer__title">M3MENTO</span><p className="m3-mono">ATELIER DIGITAL Y EXPLORACIÓN TEXTIL // RUBÉN BARRIENTOS</p></div>
          <button type="button" onClick={() => window.location.hash = ''} className="m3-btn m3-btn--outline m3-mono">← VOLVER AL PORTAFOLIO</button>
        </div>
      </footer>
    </div>
  );
}
