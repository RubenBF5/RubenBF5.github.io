import { useState } from 'react';
import LandingHeader from '../LandingHeader';
import './M3mentoLanding.css';

export default function M3mentoLanding() {
  const [selectedProduct, setSelectedProduct] = useState(0);
  const [selectedColor, setSelectedColor] = useState('onyx');
  const [selectedSize, setSelectedSize] = useState('L');
  const [viewMode, setViewMode] = useState('render'); // 'render' | 'technical'
  const [cartCount, setCartCount] = useState(0);
  const [addedAlert, setAddedAlert] = useState(false);

  const products = [
    {
      id: 'mm-01',
      code: 'MM-01 // HOODIE',
      name: 'Heavyweight Architectural Hoodie',
      weight: '480 GSM French Terry',
      price: '$1,850 MXN',
      colors: [
        { id: 'onyx', name: 'Onyx Black', hex: '#111113' },
        { id: 'slate', name: 'Acid Slate', hex: '#373d47' },
        { id: 'bone', name: 'Raw Bone', hex: '#dcd8cf' }
      ],
      desc: 'Silueta oversized con hombros caídos y capucha de doble forro sin cordones. Confeccionada con algodón pesado cepillado para estructura volumétrica rígida.',
      techSpecs: [
        'Construcción: Costuras planas con remate bartack reforzado',
        'Gramaje: 480 GSM 100% algodón preencogido',
        'Corte: Boxy fit con dobladillo elástico de alta densidad',
        'Modelado: Prototipado 3D de patrones en Blender'
      ]
    },
    {
      id: 'mm-02',
      code: 'MM-02 // CARGO',
      name: 'Modular Tactical Pant',
      weight: 'Cordura & Ripstop 320g',
      price: '$2,100 MXN',
      colors: [
        { id: 'onyx', name: 'Onyx Black', hex: '#111113' },
        { id: 'slate', name: 'Olive Drab', hex: '#2e3328' }
      ],
      desc: 'Pantalón utilitario con rodillas articuladas y 6 bolsillos técnicos con cierre impermeable. Hebilla magnética Fidlock para ajuste rápido de cintura.',
      techSpecs: [
        'Material: Ripstop antidesgarro con acabado repelente al agua',
        'Herrajes: Hebilla magnética Fidlock V-Buckle & YKK AquaGuard',
        'Silueta: Ajuste cónico en tobillos mediante cinchas de velcro',
        'Modelado: Simulación de caída textil en Blender Cloth Physics'
      ]
    },
    {
      id: 'mm-03',
      code: 'MM-03 // TEE',
      name: 'Boxy Heavyweight Tee',
      weight: '280 GSM Combed Cotton',
      price: '$850 MXN',
      colors: [
        { id: 'onyx', name: 'Onyx Black', hex: '#111113' },
        { id: 'bone', name: 'Raw Bone', hex: '#dcd8cf' }
      ],
      desc: 'Camiseta de corte cuadrado amplio con cuello cerrado de ribete grueso 1x1. Serigrafía de alta densidad con el manifiesto tipográfico de M3mento.',
      techSpecs: [
        'Tejido: Punto jersey de algodón peinado 280 GSM',
        'Cuello: Ribete tubular reforzado de 3 cm sin deformación',
        'Estampado: Tinta plastisol al tacto cero curada a 180°C',
        'Modelado: Render interactivo con shaders procedurales'
      ]
    }
  ];

  const currentProduct = products[selectedProduct];

  const handleAddToCart = () => {
    setCartCount((prev) => prev + 1);
    setAddedAlert(true);
    setTimeout(() => setAddedAlert(false), 2500);
  };

  return (
    <div className="m3-page">
      <LandingHeader
        brandName="M3MENTO"
        brandTag="Digital Atelier"
        accentColor="#f5f5f5"
        navLinks={[
          { label: 'Colección', href: '#collection' },
          { label: 'Configurador 3D', href: '#configurator' },
          { label: 'Manifiesto', href: '#manifesto' },
          { label: 'Especificaciones', href: '#specs' }
        ]}
      />

      {/* TOP STATUS BAR */}
      <div className="m3-status-bar">
        <div className="m3-container m3-status-bar__inner">
          <span className="m3-mono">[ARCHIVO_DIGITAL // CONCEPTO ACTIVO]</span>
          <span className="m3-mono">EDICIÓN EXPERIMENTAL: CDMX // MODA + UX FRONTEND</span>
          <div className="m3-cart-pill">
            <span className="m3-mono">BOLSA:</span>
            <strong>{cartCount}</strong>
          </div>
        </div>
      </div>

      {/* HERO / MANIFESTO */}
      <section className="m3-hero" id="manifesto">
        <div className="m3-container">
          <div className="m3-hero__meta m3-mono">
            <span>DROP 001 — RECONSTRUCTED VOLUME</span>
            <span>BLENDER 3D • REACT • BRUTALIST UI</span>
          </div>

          <h1 className="m3-hero__title">
            SILUETAS ARQUITECTÓNICAS. <br />
            INGENIERÍA URBANA.
          </h1>

          <div className="m3-hero__grid">
            <p className="m3-hero__desc">
              M3mento fusiona el streetwear contemporáneo de alto gramaje con el diseño digital tridimensional. Una exploración de proporciones sobredimensionadas, durabilidad técnica y estética monocromática concebida desde el código y el lienzo 3D.
            </p>
            <div className="m3-hero__specs-list m3-mono">
              <div><span>ORIGEN:</span> CIUDAD DE MÉXICO</div>
              <div><span>TEJIDO:</span> 480 GSM HEAVYWEIGHT</div>
              <div><span>ENFOQUE:</span> CASE STUDY & E-COMMERCE UX</div>
            </div>
          </div>
        </div>
      </section>

      {/* INTERACTIVE PRODUCT ATELIER */}
      <section className="m3-section" id="configurator">
        <div className="m3-container">
          <div className="m3-atelier">
            {/* LEFT: PRODUCT SELECTOR TABS */}
            <div className="m3-atelier__sidebar">
              <span className="m3-mono m3-sidebar-tag">CATÁLOGO DE ARCHIVO</span>
              <div className="m3-prod-tabs">
                {products.map((prod, idx) => (
                  <button
                    key={prod.id}
                    type="button"
                    className={`m3-prod-tab ${selectedProduct === idx ? 'm3-prod-tab--active' : ''}`}
                    onClick={() => {
                      setSelectedProduct(idx);
                      setSelectedColor(prod.colors[0].id);
                    }}
                  >
                    <span className="m3-mono">{prod.code}</span>
                    <strong>{prod.name}</strong>
                    <span className="m3-prod-tab__price">{prod.price}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* CENTER: PRODUCT VISUAL STAGE */}
            <div className="m3-atelier__stage">
              <div className="m3-stage-header">
                <div className="m3-mode-toggle m3-mono">
                  <button
                    type="button"
                    className={viewMode === 'render' ? 'active' : ''}
                    onClick={() => setViewMode('render')}
                  >
                    VISTA PRENDA
                  </button>
                  <button
                    type="button"
                    className={viewMode === 'technical' ? 'active' : ''}
                    onClick={() => setViewMode('technical')}
                  >
                    PLANO TÉCNICO
                  </button>
                </div>

                <span className="m3-mono m3-zoom-tag">3D ASSET INSPECT</span>
              </div>

              {/* GARMENT PREVIEW CARD */}
              <div className="m3-garment-canvas">
                {viewMode === 'render' ? (
                  <div className="m3-garment-render">
                    <div
                      className="m3-garment-silhouette"
                      style={{
                        backgroundColor: currentProduct.colors.find((c) => c.id === selectedColor)?.hex || '#111'
                      }}
                    >
                      <div className="m3-garment-seams" />
                      <div className="m3-garment-label m3-mono">
                        <span>M3MENTO</span>
                        <span>{selectedSize}</span>
                      </div>
                    </div>
                    <div className="m3-garment-shadow" />
                  </div>
                ) : (
                  <div className="m3-garment-technical m3-mono">
                    <div className="m3-tech-wireframe">
                      <div className="m3-grid-lines" />
                      <div className="m3-tech-node m3-tech-node--1">
                        <span>[A] DOBLE FORRO 480 GSM</span>
                      </div>
                      <div className="m3-tech-node m3-tech-node--2">
                        <span>[B] HOMBRO CAÍDO ARTICULADO</span>
                      </div>
                      <div className="m3-tech-node m3-tech-node--3">
                        <span>[C] PUNTADA INTERLOCK DOBLE</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="m3-stage-footer m3-mono">
                <span>ESTADO: PROTOTIPO LISTO</span>
                <span>PESO: {currentProduct.weight}</span>
              </div>
            </div>

            {/* RIGHT: CONFIGURATION & BUY DETAILS */}
            <div className="m3-atelier__details">
              <span className="m3-mono m3-item-code">{currentProduct.code}</span>
              <h2 className="m3-item-title">{currentProduct.name}</h2>
              <div className="m3-item-price">{currentProduct.price}</div>
              <p className="m3-item-desc">{currentProduct.desc}</p>

              {/* COLOR SELECTION */}
              <div className="m3-option-group">
                <label className="m3-mono">COLORWAY:</label>
                <div className="m3-color-swatches">
                  {currentProduct.colors.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      className={`m3-swatch ${selectedColor === c.id ? 'm3-swatch--active' : ''}`}
                      onClick={() => setSelectedColor(c.id)}
                      title={c.name}
                    >
                      <span style={{ backgroundColor: c.hex }} />
                      <span className="m3-mono">{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* SIZE SELECTION */}
              <div className="m3-option-group">
                <div className="m3-size-header m3-mono">
                  <label>TALLA (OVERSIZED FIT):</label>
                  <span>TABLA DE MEDIDAS</span>
                </div>
                <div className="m3-size-selector m3-mono">
                  {['S', 'M', 'L', 'XL'].map((size) => (
                    <button
                      key={size}
                      type="button"
                      className={`m3-size-btn ${selectedSize === size ? 'm3-size-btn--active' : ''}`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* ADD TO BAG ACTION */}
              <div className="m3-actions-area">
                <button
                  type="button"
                  className="m3-btn m3-btn--primary"
                  onClick={handleAddToCart}
                >
                  AÑADIR AL CARRITO CONCEPTUAL
                </button>

                {addedAlert && (
                  <div className="m3-alert m3-mono">
                    ✓ {currentProduct.name} ({selectedSize}) añadido a la orden.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TECHNICAL SPECIFICATIONS GRID */}
      <section className="m3-section m3-section--bordered" id="specs">
        <div className="m3-container">
          <div className="m3-section-title-wrap">
            <span className="m3-mono">MATRIZ DE CONFECCIÓN</span>
            <h2>Especificaciones de Taller</h2>
          </div>

          <div className="m3-specs-table">
            {currentProduct.techSpecs.map((spec, i) => {
              const [key, val] = spec.split(': ');
              return (
                <div key={i} className="m3-spec-row">
                  <span className="m3-mono m3-spec-key">{key}</span>
                  <span className="m3-spec-val">{val}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="m3-footer">
        <div className="m3-container m3-footer__inner">
          <div className="m3-footer__brand">
            <span className="m3-footer__title">M3MENTO</span>
            <p className="m3-mono">ATELIER DIGITAL Y EXPLORACIÓN TEXTIL // RUBÉN BARRIENTOS</p>
          </div>
          <button
            type="button"
            onClick={() => window.location.hash = ''}
            className="m3-btn m3-btn--outline m3-mono"
          >
            ← VOLVER AL PORTAFOLIO
          </button>
        </div>
      </footer>
    </div>
  );
}
