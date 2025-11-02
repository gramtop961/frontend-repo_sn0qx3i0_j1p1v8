import React, { useEffect, useRef } from 'react';

// Simple particle system that forms the word "ArtSea" as progress approaches 30%
const ParticleWordmark = ({ progress = 0 }) => {
  const canvasRef = useRef(null);
  const bufferRef = useRef(null);
  const pointsRef = useRef([]);
  const particlesRef = useRef([]);
  const rafRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const buffer = bufferRef.current || document.createElement('canvas');
    buffer.width = width;
    buffer.height = height;
    bufferRef.current = buffer;
    const bctx = buffer.getContext('2d');

    const buildPoints = () => {
      pointsRef.current = [];
      bctx.clearRect(0, 0, width, height);
      // Render the word in the middle
      const fontSize = Math.min(width * 0.16, 160);
      bctx.font = `900 ${fontSize}px Inter, system-ui, -apple-system, Segoe UI, Roboto`;
      bctx.textAlign = 'center';
      bctx.textBaseline = 'middle';
      const gradient = bctx.createLinearGradient(width * 0.3, 0, width * 0.7, 0);
      gradient.addColorStop(0, '#b794f4');
      gradient.addColorStop(1, '#f472b6');
      bctx.fillStyle = gradient;
      bctx.fillText('ArtSea', width / 2, height / 2);

      const imageData = bctx.getImageData(0, 0, width, height).data;
      const gap = Math.max(4, Math.round(width / 200));
      for (let y = 0; y < height; y += gap) {
        for (let x = 0; x < width; x += gap) {
          const idx = (y * width + x) * 4;
          const alpha = imageData[idx + 3];
          if (alpha > 64) {
            pointsRef.current.push({ x, y });
          }
        }
      }

      // Initialize particles from edges
      particlesRef.current = pointsRef.current.map((p) => {
        const side = Math.floor(Math.random() * 4);
        let sx = 0, sy = 0;
        if (side === 0) { sx = Math.random() * width; sy = -20; }
        if (side === 1) { sx = width + 20; sy = Math.random() * height; }
        if (side === 2) { sx = Math.random() * width; sy = height + 20; }
        if (side === 3) { sx = -20; sy = Math.random() * height; }
        return { x: sx, y: sy, tx: p.x, ty: p.y };
      });
    };

    const resize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
      buffer.width = width;
      buffer.height = height;
      buildPoints();
    };

    buildPoints();
    window.addEventListener('resize', resize);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      // Map progress [0,30] -> t [0,1]
      const t = Math.min(1, Math.max(0, progress / 30));
      // Easing for smoother arrival
      const ease = (n) => 1 - Math.pow(1 - n, 3);
      const et = ease(t);

      ctx.fillStyle = 'rgba(255,255,255,0.9)';
      for (let i = 0; i < particlesRef.current.length; i++) {
        const part = particlesRef.current[i];
        const x = part.x + (part.tx - part.x) * et;
        const y = part.y + (part.ty - part.y) * et;
        ctx.beginPath();
        ctx.arc(x, y, 1.2, 0, Math.PI * 2);
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [progress]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      aria-hidden
    />
  );
};

export default ParticleWordmark;
