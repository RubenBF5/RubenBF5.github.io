import { useEffect, useRef } from 'react';
import './Starfield.css';

export default function Starfield() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Star structures
    const stars = [];
    const shootingStars = [];

    // Initialize background twinkling stars
    const numStars = 70;
    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 0.8 + 0.4,
        opacity: Math.random() * 0.7 + 0.1,
        twinkleSpeed: 0.005 + Math.random() * 0.01,
        direction: Math.random() > 0.5 ? 1 : -1
      });
    }

    // Initialize shooting stars
    const numShootingStars = 3;
    const createShootingStar = () => {
      // Start from top half, middle-right side to travel down-left
      return {
        x: Math.random() * width * 1.2,
        y: Math.random() * -height * 0.2,
        length: Math.random() * 70 + 50,
        speedX: -2.5 - Math.random() * 2, // Moves left
        speedY: 2.5 + Math.random() * 2,  // Moves down
        opacity: 0,
        maxOpacity: Math.random() * 0.5 + 0.3,
        state: 'hidden', // 'hidden', 'active'
        delay: Math.random() * 120, // delay frames
        life: 0,
        maxLife: Math.random() * 80 + 80
      };
    };

    for (let i = 0; i < numShootingStars; i++) {
      shootingStars.push(createShootingStar());
    }

    // Resize Handler
    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      
      // Re-distribute background stars within new screen boundary
      stars.forEach(star => {
        star.x = Math.random() * width;
        star.y = Math.random() * height;
      });
    };

    window.addEventListener('resize', handleResize);

    // Loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Draw Twinkling Background Stars
      stars.forEach((star) => {
        star.opacity += star.twinkleSpeed * star.direction;
        if (star.opacity >= 0.8) {
          star.direction = -1;
        } else if (star.opacity <= 0.1) {
          star.direction = 1;
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();
      });

      // 2. Draw Shooting Stars (Falling Stars)
      shootingStars.forEach((s, index) => {
        if (s.state === 'hidden') {
          s.delay--;
          if (s.delay <= 0) {
            s.state = 'active';
            s.x = Math.random() * width * 1.1; // reset start x
            s.y = Math.random() * -height * 0.1; // reset start y
            s.opacity = 0;
            s.life = 0;
          }
          return;
        }

        // Active state
        s.life++;
        
        // Handle fading in and out based on lifespan
        if (s.life < 20) {
          s.opacity += s.maxOpacity / 20;
        } else if (s.life > s.maxLife - 20) {
          s.opacity -= s.maxOpacity / 20;
        }

        s.opacity = Math.max(0, Math.min(s.opacity, s.maxOpacity));

        // Move coordinates
        s.x += s.speedX;
        s.y += s.speedY;

        // Draw trail
        if (s.opacity > 0) {
          ctx.beginPath();
          const gradient = ctx.createLinearGradient(
            s.x,
            s.y,
            s.x - s.speedX * (s.length / 10),
            s.y - s.speedY * (s.length / 10)
          );
          gradient.addColorStop(0, `rgba(255, 255, 255, ${s.opacity})`);
          gradient.addColorStop(0.3, `rgba(229, 231, 235, ${s.opacity * 0.6})`);
          gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

          ctx.strokeStyle = gradient;
          ctx.lineWidth = 1.2;
          ctx.moveTo(s.x, s.y);
          ctx.lineTo(s.x - s.speedX * (s.length / 5), s.y - s.speedY * (s.length / 5));
          ctx.stroke();
        }

        // Reset if offscreen or lifepan finished
        if (s.life >= s.maxLife || s.x < -100 || s.y > height + 100) {
          shootingStars[index] = createShootingStar();
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="starfield-canvas" />;
}
