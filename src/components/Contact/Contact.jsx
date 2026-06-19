import { useState } from 'react';
import './Contact.css';

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const emailAddress = 'rubenbarrientos33@gmail.com';
  const phoneNumber = '+52 781 107 9966';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="contact" id="contact">
      <div className="contact__container container">
        <div className="section-header" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h2 className="section-title" style={{ justifyContent: 'center' }}>Contacto</h2>
          <p className="section-subtitle">¿Tienes una gran idea o necesitas un desarrollador en tu equipo?</p>
        </div>

        <div className="glass-card contact__box">
          <h3 className="contact__title display-text">¡Hablemos de tu próximo proyecto!</h3>
          <p className="contact__desc">
            Actualmente estoy abierto a oportunidades como desarrollador Front-End, React Native y diseñador UX/UI. Si necesitas convertir una idea en una interfaz clara, accesible y bien construida, podemos hablar.
          </p>

          <div className="contact__email-wrapper">
            <span className="contact__email-label mono-text">Escríbeme a:</span>
            <div className="contact__email-action">
              <a href={`mailto:${emailAddress}`} className="contact__email display-text">
                {emailAddress}
              </a>
              <button 
                onClick={handleCopyEmail} 
                className="contact__copy-btn mono-text"
                aria-label="Copiar correo"
              >
                {copied ? '¡Copiado!' : 'Copiar'}
              </button>
            </div>
          </div>

          <a href="tel:+527811079966" className="contact__phone mono-text">
            {phoneNumber}
          </a>

          <div className="contact__actions">
            <a href={`mailto:${emailAddress}`} className="btn btn-primary">
              Enviar Correo Directo
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
              </svg>
            </a>
            <div className="contact__cv-downloads" aria-label="Descargar currículum">
              <a
                href="/cv-ruben-barrientos-es.pdf"
                className="btn btn-secondary"
                download="Ruben-Barrientos-CV-ES.pdf"
              >
                CV Español
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>
                </svg>
              </a>
              <a
                href="/cv-ruben-barrientos-en.pdf"
                className="btn btn-secondary"
                download="Ruben-Barrientos-CV-EN.pdf"
              >
                CV English
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <footer className="contact__footer">
          <p className="contact__copy mono-text">
            © {new Date().getFullYear()} · Diseñado y Desarrollado por Rubén Barrientos
          </p>
        </footer>
      </div>
    </section>
  );
}
