import './LandingHeader.css';

export default function LandingHeader({
  brandName,
  brandTag,
  accentColor = '#6366f1',
  navLinks = [],
  showPortfolioCta = true,
  onBack
}) {
  const handleBack = (e) => {
    e.preventDefault();
    if (onBack) {
      onBack();
    } else {
      window.location.hash = '';
    }
  };

  return (
    <header className="landing-nav" style={{ '--landing-accent': accentColor }}>
      <div className="landing-nav__container">
        <div className="landing-nav__left">
          <button 
            type="button" 
            onClick={handleBack} 
            className="landing-nav__back-btn"
            aria-label="Regresar al portafolio principal"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            <span>Volver al Portafolio</span>
          </button>

          <div className="landing-nav__divider" aria-hidden="true" />

          <div className="landing-nav__brand">
            <span className="landing-nav__logo">{brandName}</span>
            {brandTag && <span className="landing-nav__tag">{brandTag}</span>}
          </div>
        </div>

        {navLinks.length > 0 && (
          <nav className="landing-nav__menu" aria-label="Navegación del producto">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="landing-nav__link">
                {link.label}
              </a>
            ))}
          </nav>
        )}

        {showPortfolioCta && (
          <div className="landing-nav__actions">
            <button
              type="button"
              onClick={handleBack}
              className="landing-nav__cta"
            >
              Ver Portafolio
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
