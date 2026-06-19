import { useEffect, useRef, useState } from 'react';
import './ScrollReveal.css';

export default function ScrollReveal({ children, threshold = 0.12 }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target); // Unobserve to play animation only once
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -50px 0px' // Triggers slightly before it enters the viewport full size
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold]);

  return (
    <div
      ref={ref}
      className={`scroll-reveal ${isVisible ? 'scroll-reveal--visible' : ''}`}
    >
      {children}
    </div>
  );
}
