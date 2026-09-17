import { useEffect } from 'react';
import logo from '../../../assets/cora/logo.jpg';
import portrait from '../../../assets/cora/retrato.jpg';
import overviewImage from '../../../assets/cora/servicios.jpg';
import specialImage from '../../../assets/cora/infecciones-especiales.jpg';
import hivImage from '../../../assets/cora/vih-prevencion.jpg';
import stiImage from '../../../assets/cora/its.jpg';
import vaginalImage from '../../../assets/cora/salud-vaginal.jpg';
import diagnosisImage from '../../../assets/cora/diagnostico.jpg';
import consultationImage from '../../../assets/cora/consulta.jpg';
import './CoraLanding.css';

const whatsappUrl = 'https://wa.me/525564613261';

const services = [
  {
    number: '01',
    title: 'Infectología',
    description: 'Atención de infecciones por hongos, tropicales, en personas inmunosuprimidas y por bacterias resistentes.'
  },
  {
    number: '02',
    title: 'VIH y prevención',
    description: 'Diagnóstico, seguimiento continuo, revisión del tratamiento y orientación sobre PrEP y PEP.'
  },
  {
    number: '03',
    title: 'Salud sexual',
    description: 'Diagnóstico y tratamiento de infecciones de transmisión sexual con atención confidencial.'
  },
  {
    number: '04',
    title: 'Salud vaginal y genital',
    description: 'Valoración de síntomas persistentes, vaginitis, disbiosis e infecciones urinarias recurrentes.'
  },
  {
    number: '05',
    title: 'Diagnóstico especializado',
    description: 'Interpretación de pruebas microbiológicas, cultivos, antibiogramas y segunda opinión de resultados.'
  },
  {
    number: '06',
    title: 'Medicina interna',
    description: 'Consulta médica, seguimiento y atención presencial o en línea según tus necesidades.'
  }
];

const diagnostics = [
  {
    title: 'PCR y paneles microbiológicos',
    text: 'Interpretación de pruebas moleculares para identificar patógenos.'
  },
  {
    title: 'Cultivos y antibiogramas',
    text: 'Revisión de resultados de sensibilidad a antibióticos.'
  },
  {
    title: 'Asesoría en estudios',
    text: 'Orientación sobre las pruebas adecuadas para cada caso clínico.'
  },
  {
    title: 'Segunda opinión',
    text: 'Revisión de estudios previos y recomendaciones de seguimiento.'
  }
];

const posters = [
  { src: overviewImage, title: 'Servicios de medicina especializada' },
  { src: specialImage, title: 'Infecciones especiales' },
  { src: hivImage, title: 'VIH y prevención' },
  { src: stiImage, title: 'Infecciones de transmisión sexual' },
  { src: vaginalImage, title: 'Salud vaginal y genital' },
  { src: diagnosisImage, title: 'Estudios y pruebas diagnósticas' },
  { src: consultationImage, title: 'Modalidades de consulta' }
];

const consultationTypes = [
  { number: '01', title: 'Presencial', description: 'Atención personalizada en consultorio.' },
  { number: '02', title: 'En línea', description: 'Consulta por videollamada desde donde estés.' },
  { number: '03', title: 'Segunda opinión', description: 'Revisión de diagnósticos, estudios y tratamientos.' }
];

export default function CoraLanding() {
  const scrollToSection = (event) => {
    event.preventDefault();
    const sectionId = event.currentTarget.getAttribute('href').slice(1);
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const previousTitle = document.title;
    document.title = 'Dra. Cora Barrientos | Medicina Interna e Infectología';
    return () => { document.title = previousTitle; };
  }, []);

  return (
    <div className="cora-page">
      <header className="cora-header">
        <div className="cora-container cora-header__inner">
          <a className="cora-header__brand" href="#cora-inicio" onClick={scrollToSection} aria-label="Dra. Cora Barrientos, ir al inicio">
            <span className="cora-header__mark" aria-hidden="true">C</span>
            <span><strong>Dra. Cora Barrientos</strong><small>Medicina Interna · Infectología</small></span>
          </a>
          <nav className="cora-header__nav" aria-label="Secciones de la landing">
            <a href="#cora-servicios" onClick={scrollToSection}>Servicios</a>
            <a href="#cora-diagnostico" onClick={scrollToSection}>Diagnóstico</a>
            <a href="#cora-consulta" onClick={scrollToSection}>Consulta</a>
          </nav>
          <a className="cora-header__contact" href={whatsappUrl} target="_blank" rel="noopener noreferrer">Agendar cita <span aria-hidden="true">↗</span></a>
        </div>
      </header>

      <main>
        <section className="cora-hero" id="cora-inicio" aria-labelledby="cora-hero-title">
          <div className="cora-container cora-hero__grid">
            <div className="cora-hero__content">
              <span className="cora-eyebrow cora-eyebrow--light"><span aria-hidden="true" /> Atención médica especializada</span>
              <h1 id="cora-hero-title">Un espacio para cuidar de ti con <em>claridad y confianza.</em></h1>
              <p>Dra. Corazón de Jesús Barrientos Flores<br />Medicina Interna · Infectología · VIH</p>
              <div className="cora-hero__actions">
                <a className="cora-button cora-button--light" href={whatsappUrl} target="_blank" rel="noopener noreferrer">Agenda tu consulta <span aria-hidden="true">↗</span></a>
                <a className="cora-text-link" href="#cora-servicios" onClick={scrollToSection}>Conoce los servicios <span aria-hidden="true">↓</span></a>
              </div>
              <div className="cora-hero__note">Atención presencial y en línea <span aria-hidden="true">·</span> Agenda por WhatsApp</div>
            </div>
            <div className="cora-hero__visual">
              <img src={portrait} alt="Retrato de la Dra. Corazón de Jesús Barrientos Flores" fetchPriority="high" />
              <div className="cora-hero__visual-label"><span>DRA. CORA</span><span>Una atención cercana, para cada persona.</span></div>
            </div>
          </div>
        </section>

        <section className="cora-intro" aria-label="Especialidades principales">
          <div className="cora-container cora-intro__inner">
            <span>Medicina Interna</span><span aria-hidden="true">✳</span>
            <span>Infectología</span><span aria-hidden="true">✳</span>
            <span>VIH y Prevención</span><span aria-hidden="true">✳</span>
            <span>Salud Sexual</span>
          </div>
        </section>

        <section className="cora-services cora-section" id="cora-servicios" aria-labelledby="cora-services-title">
          <div className="cora-container">
            <div className="cora-section__heading cora-services__heading">
              <div>
                <span className="cora-eyebrow">01 / Áreas de atención</span>
                <h2 id="cora-services-title">Cuidado especializado<br /><span>para lo que necesitas.</span></h2>
              </div>
              <p>Cada consulta empieza por escucharte. Explora las áreas de atención y encuentra la orientación adecuada para tu caso.</p>
            </div>
            <div className="cora-services__grid">
              {services.map((service) => (
                <article className="cora-service-card" key={service.number}>
                  <span className="cora-service-card__number">{service.number} / 06</span>
                  <div>
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                  </div>
                  <span className="cora-service-card__arrow" aria-hidden="true">↗</span>
                </article>
              ))}
            </div>
            <p className="cora-services__extra">También se ofrece orientación en <strong>medicina del viajero</strong> e infecciones especiales.</p>
          </div>
        </section>

        <section className="cora-care cora-section" aria-labelledby="cora-care-title">
          <div className="cora-container cora-care__grid">
            <div className="cora-care__intro">
              <span className="cora-eyebrow cora-eyebrow--light">02 / Cuidado continuo</span>
              <h2 id="cora-care-title">VIH y prevención,<br /><em>sin juicio.</em></h2>
              <p>Un espacio confidencial para resolver dudas, iniciar un diagnóstico o dar continuidad a tu atención.</p>
              <a className="cora-button cora-button--outline" href={whatsappUrl} target="_blank" rel="noopener noreferrer">Hablar por WhatsApp <span aria-hidden="true">↗</span></a>
            </div>
            <div className="cora-care__list">
              {[
                ['01', 'Diagnóstico y tratamiento', 'Detección y manejo especializado del VIH.'],
                ['02', 'Seguimiento continuo', 'Atención para personas que viven con VIH.'],
                ['03', 'Revisión del tratamiento', 'Valoración y ajuste de la terapia antirretroviral.'],
                ['04', 'PrEP y PEP', 'Orientación para prevención antes y después de una exposición.']
              ].map(([number, title, description]) => (
                <article className="cora-care__item" key={number}>
                  <span>{number}</span><div><h3>{title}</h3><p>{description}</p></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="cora-diagnostics cora-section" id="cora-diagnostico" aria-labelledby="cora-diagnostics-title">
          <div className="cora-container cora-diagnostics__grid">
            <div className="cora-diagnostics__intro">
              <span className="cora-eyebrow">03 / Diagnóstico especializado</span>
              <h2 id="cora-diagnostics-title">Entender los resultados también es parte del cuidado.</h2>
              <p>Interpretación de pruebas microbiológicas y orientación para los siguientes pasos de tu atención.</p>
            </div>
            <div className="cora-diagnostics__list">
              {diagnostics.map((item, index) => (
                <article className="cora-diagnostics__item" key={item.title}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <div><h3>{item.title}</h3><p>{item.text}</p></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="cora-gallery cora-section" aria-labelledby="cora-gallery-title">
          <div className="cora-container">
            <div className="cora-section__heading">
              <div><span className="cora-eyebrow">04 / Archivo de servicios</span><h2 id="cora-gallery-title">Conoce cada servicio<br /><span>más de cerca.</span></h2></div>
              <p>Desliza para ver las piezas informativas originales de la doctora. Selecciona una para abrirla en tamaño completo.</p>
            </div>
            <div className="cora-gallery__rail" aria-label="Imágenes informativas de servicios">
              {posters.map((poster, index) => (
                <a className="cora-gallery__card" key={poster.title} href={poster.src} target="_blank" rel="noopener noreferrer" aria-label={`Abrir imagen: ${poster.title}`}>
                  <div className="cora-gallery__image"><img src={poster.src} alt={poster.title} loading="lazy" /></div>
                  <div className="cora-gallery__caption"><span>{String(index + 1).padStart(2, '0')}</span><strong>{poster.title}</strong><span aria-hidden="true">↗</span></div>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="cora-appointment cora-section" id="cora-consulta" aria-labelledby="cora-appointment-title">
          <div className="cora-container">
            <div className="cora-section__heading cora-appointment__heading">
              <div><span className="cora-eyebrow cora-eyebrow--light">05 / Agenda tu cita</span><h2 id="cora-appointment-title">¿Cómo te puedo atender?</h2></div>
              <p>Elige la modalidad que mejor se adapte a ti.</p>
            </div>
            <div className="cora-appointment__grid">
              {consultationTypes.map((type) => (
                <article className="cora-appointment__card" key={type.number}>
                  <span>{type.number} / 03</span><h3>{type.title}</h3><p>{type.description}</p>
                </article>
              ))}
            </div>
            <div className="cora-appointment__contact">
              <div><span>Comunícate directamente</span><strong>55 64 61 32 61</strong></div>
              <a className="cora-button cora-button--dark" href={whatsappUrl} target="_blank" rel="noopener noreferrer">Agendar por WhatsApp <span aria-hidden="true">↗</span></a>
            </div>
          </div>
        </section>
      </main>

      <footer className="cora-footer">
        <div className="cora-container cora-footer__inner">
          <div className="cora-footer__logo"><img src={logo} alt="Logo de la Dra. Cora Barrientos, Medicina Interna, Infectología y VIH" loading="lazy" /></div>
          <div className="cora-footer__info"><strong>Dra. Corazón de Jesús Barrientos Flores</strong><span>Medicina Interna · Infectología · VIH</span><a href="tel:+525564613261">55 64 61 32 61</a></div>
          <a className="cora-footer__back" href="#/">Volver al portafolio <span aria-hidden="true">↗</span></a>
        </div>
      </footer>
    </div>
  );
}
