import { useEffect, useRef } from 'react';
import './InteractiveGlobe.css';

// Coordinates of Queretaro, Mexico
const LOC_LAT = (20.59 * Math.PI) / 180;
const LOC_LON = (-100.39 * Math.PI) / 180;
const LOCATION_LABEL = 'Querétaro';

// Landmass definition to shape Americas, Europe/Africa, Asia/Australia
const isLand = (lat, lon) => {
  // America
  if (lon > -2.8 && lon < -0.5) {
    return lat > -0.9 && lat < 1.1 && (Math.sin(lat * 2.5) * Math.cos(lon * 2) > -0.15);
  }
  // Europe & Africa
  if (lon > -0.4 && lon < 0.9) {
    return lat > -0.8 && lat < 1.2 && (Math.sin(lat * 2.2) * Math.cos(lon * 2) > -0.2);
  }
  // Asia & Australia
  if (lon > 0.9 && lon < 2.9) {
    if (lat > -0.1 && lat < 1.3) return true; // Asia
    if (lat > -0.85 && lat < -0.1 && lon > 1.8 && lon < 2.75) return true; // Australia
  }
  // Antarctica
  if (lat < -1.15) return true;
  
  return false;
};

export default function InteractiveGlobe() {
  const canvasRef = useRef(null);
  const pointerState = useRef({
    isDragging: false,
    startX: 0,
    startY: 0,
    rotX: 0.3,  // Initial vertical rotation tilt
    rotY: -1.2, // Initial horizontal rotation spin (points America towards front)
    velX: 0,
    velY: 0,
    lastTime: 0
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;
    let size = canvas.offsetWidth;

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      size = canvas.offsetWidth;
      canvas.width = size * dpr;
      canvas.height = size * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resizeCanvas();

    const state = pointerState.current;

    // Generate globe points (Fibonacci sphere distribution for uniform layout)
    const points = [];
    const numPoints = 850;
    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden ratio angle

    for (let i = 0; i < numPoints; i++) {
      const y = 1 - (i / (numPoints - 1)) * 2; // y goes from 1 to -1
      const radius = Math.sqrt(1 - y * y); // radius at y
      const theta = phi * i; // golden angle increment

      const x = Math.cos(theta) * radius;
      const z = Math.sin(theta) * radius;

      // Convert spherical back to lat/lon for land mapping
      const lat = Math.asin(y);
      const lon = Math.atan2(z, x);

      points.push({
        x, y, z,
        land: isLand(lat, lon)
      });
    }

    // Main animation loop
    const render = () => {
      // Clear
      ctx.clearRect(0, 0, size, size);

      const r = size * 0.4; // Globe radius on screen
      const cx = size / 2;
      const cy = size * 0.48;

      // Handle inertia/velocity
      if (!state.isDragging) {
        state.rotY += 0.003 + state.velY; // auto-spin Y
        state.rotX += state.velX;        // apply vertical momentum
        state.velX *= 0.95;              // friction X
        state.velY *= 0.95;              // friction Y
      } else {
        state.velX *= 0.8;
        state.velY *= 0.8;
      }

      // Keep X rotation (latitudinal tilt) bounded so we don't invert the poles
      state.rotX = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, state.rotX));

      // Draw faint background sphere/atmosphere glow
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.015)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Latitude and longitude guides make the sphere read more clearly.
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.045)';
      ctx.lineWidth = 0.8;
      for (let i = -2; i <= 2; i++) {
        ctx.beginPath();
        ctx.ellipse(cx, cy + i * r * 0.18, r * 0.92, r * 0.12, 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      for (let i = -2; i <= 2; i++) {
        ctx.beginPath();
        ctx.ellipse(cx + i * r * 0.1, cy, r * 0.16, r * 0.92, 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Render dots
      points.forEach((p) => {
        // Rotate point in 3D Space
        // Rotate around Y-axis (horizontal spin)
        let x1 = p.x * Math.cos(state.rotY) - p.z * Math.sin(state.rotY);
        let z1 = p.x * Math.sin(state.rotY) + p.z * Math.cos(state.rotY);

        // Rotate around X-axis (vertical tilt)
        let y2 = p.y * Math.cos(state.rotX) - z1 * Math.sin(state.rotX);
        let z2 = p.y * Math.sin(state.rotX) + z1 * Math.cos(state.rotX);

        // Only draw points on the front hemisphere facing user (z2 > 0)
        if (z2 > 0) {
          const px = cx + x1 * r;
          const py = cy + y2 * r;

          // Project dot size and opacity based on depth coordinate z2
          const sizeMultiplier = 0.5 + z2 * 0.8; 
          const baseOpacity = p.land ? 0.6 : 0.08;
          const opacity = baseOpacity * z2;

          ctx.beginPath();
          ctx.arc(px, py, 1.2 * sizeMultiplier, 0, Math.PI * 2);
          ctx.fillStyle = p.land 
            ? `rgba(255, 255, 255, ${opacity})` 
            : `rgba(255, 255, 255, ${opacity})`;
          ctx.fill();
        }
      });

      // Render current location marker
      // Convert loc lat/lon to 3D sphere coordinate
      const lx = Math.cos(LOC_LAT) * Math.cos(LOC_LON);
      const ly = Math.sin(LOC_LAT);
      const lz = Math.cos(LOC_LAT) * Math.sin(LOC_LON);

      // Rotate current location point
      let rx = lx * Math.cos(state.rotY) - lz * Math.sin(state.rotY);
      let rz = lx * Math.sin(state.rotY) + lz * Math.cos(state.rotY);
      let ry = ly * Math.cos(state.rotX) - rz * Math.sin(state.rotX);
      let rzFinal = ly * Math.sin(state.rotX) + rz * Math.cos(state.rotX);

      // If marker is on the front side of the globe
      if (rzFinal > 0.15) {
        const mx = cx + rx * r;
        const my = cy + ry * r;

        // Draw locator pulse ring
        const time = Date.now();
        const pulse = 1 + (time % 1500) / 300; // Pulsing scale
        ctx.beginPath();
        ctx.arc(mx, my, 4 * pulse, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.4 * (1 - (pulse - 1) / 4)})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Draw marker dot
        ctx.beginPath();
        ctx.arc(mx, my, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
        ctx.strokeStyle = 'rgba(3, 7, 18, 0.8)';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Draw locator label without letting it run outside the canvas.
        ctx.font = '600 9px "JetBrains Mono", monospace';
        const label = LOCATION_LABEL;
        const labelWidth = ctx.measureText(label).width;
        const labelX = Math.min(size - labelWidth - 10, Math.max(10, mx + 8));
        const labelY = Math.min(size - 26, Math.max(16, my + 3));
        ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
        ctx.textAlign = 'left';
        ctx.fillText(label, labelX, labelY);
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    // Resize handlers
    const resizeObserver = new ResizeObserver(() => {
      resizeCanvas();
    });
    resizeObserver.observe(canvas);

    return () => {
      cancelAnimationFrame(animationId);
      resizeObserver.disconnect();
    };
  }, []);

  // Event handlers for dragging
  const handlePointerDown = (e) => {
    const state = pointerState.current;
    state.isDragging = true;
    state.startX = e.clientX || (e.touches && e.touches[0].clientX);
    state.startY = e.clientY || (e.touches && e.touches[0].clientY);
    state.lastTime = Date.now();
    state.velX = 0;
    state.velY = 0;
  };

  const handlePointerMove = (e) => {
    const state = pointerState.current;
    if (!state.isDragging) return;

    const x = e.clientX || (e.touches && e.touches[0].clientX);
    const y = e.clientY || (e.touches && e.touches[0].clientY);
    const time = Date.now();
    const dt = time - state.lastTime;

    const dx = x - state.startX;
    const dy = y - state.startY;

    // Adjust spin speed based on screen scaling
    const speedFactor = 0.005;
    state.rotY -= dx * speedFactor;
    state.rotX -= dy * speedFactor;

    if (dt > 0) {
      state.velY = (-dx * speedFactor) / 2;
      state.velX = (-dy * speedFactor) / 2;
    }

    state.startX = x;
    state.startY = y;
    state.lastTime = time;
  };

  const handlePointerUp = () => {
    pointerState.current.isDragging = false;
  };

  return (
    <div className="globe-container">
      <div className="globe-copy">
        <span className="globe-kicker mono-text">Ubicación base</span>
        <strong>Querétaro, México</strong>
      </div>
      <canvas
        ref={canvasRef}
        className="globe-canvas"
        onMouseDown={handlePointerDown}
        onMouseMove={handlePointerMove}
        onMouseUp={handlePointerUp}
        onMouseLeave={handlePointerUp}
        onTouchStart={handlePointerDown}
        onTouchMove={handlePointerMove}
        onTouchEnd={handlePointerUp}
      />
      <div className="globe-overlay mono-text">Arrastra para rotar la Tierra</div>
    </div>
  );
}
