import { useEffect, useRef } from 'react';
import './CursorGlow.css';

const REACTIVE_SELECTOR = [
  '.glass-card',
  '.projects__library',
  '.project-book',
  '.btn',
  '.navbar',
  '.navbar__link',
  '.navbar__cta',
  '.hero__social-link',
  '.hire-ctrl-btn',
  '.project-detail__link',
  '.contact__copy-btn',
  '.about__carousel-button',
  '.about__carousel-dot'
].join(',');

export default function CursorGlow() {
  const glowRef = useRef(null);
  const coreRef = useRef(null);

  useEffect(() => {
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (!finePointer.matches || reducedMotion.matches) return undefined;

    const glow = glowRef.current;
    const core = coreRef.current;
    if (!glow || !core) return undefined;

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const current = { x: target.x, y: target.y };
    let activeElement = null;
    let animationFrame;

    const updateReactiveElement = (element, clientX, clientY) => {
      const nextElement = element?.closest?.(REACTIVE_SELECTOR) || null;

      if (nextElement !== activeElement) {
        activeElement?.classList.remove('is-cursor-lit');
        activeElement = nextElement;
        activeElement?.classList.add('is-cursor-lit');
        document.body.classList.toggle('cursor-over-interactive', Boolean(activeElement));
      }

      if (activeElement) {
        const rect = activeElement.getBoundingClientRect();
        activeElement.style.setProperty('--cursor-local-x', `${clientX - rect.left}px`);
        activeElement.style.setProperty('--cursor-local-y', `${clientY - rect.top}px`);
      }
    };

    const handlePointerMove = (event) => {
      target.x = event.clientX;
      target.y = event.clientY;
      document.body.classList.add('cursor-glow-visible');
      updateReactiveElement(event.target, event.clientX, event.clientY);
    };

    const handlePointerLeave = () => {
      document.body.classList.remove('cursor-glow-visible', 'cursor-over-interactive');
      activeElement?.classList.remove('is-cursor-lit');
      activeElement = null;
    };

    const render = () => {
      current.x += (target.x - current.x) * 0.16;
      current.y += (target.y - current.y) * 0.16;

      glow.style.transform = `translate3d(${current.x}px, ${current.y}px, 0) translate(-50%, -50%)`;
      core.style.transform = `translate3d(${target.x}px, ${target.y}px, 0) translate(-50%, -50%)`;
      animationFrame = requestAnimationFrame(render);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    document.documentElement.addEventListener('mouseleave', handlePointerLeave);
    animationFrame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('pointermove', handlePointerMove);
      document.documentElement.removeEventListener('mouseleave', handlePointerLeave);
      document.body.classList.remove('cursor-glow-visible', 'cursor-over-interactive');
      activeElement?.classList.remove('is-cursor-lit');
    };
  }, []);

  return (
    <div className="cursor-glow-layer" aria-hidden="true">
      <div ref={glowRef} className="cursor-glow" />
      <div ref={coreRef} className="cursor-glow__core" />
    </div>
  );
}
