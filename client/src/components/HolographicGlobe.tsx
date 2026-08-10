import { useEffect, useRef } from 'react';

export default function HolographicGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = canvas.width;
    let height = canvas.height;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      width = canvas.width;
      height = canvas.height;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resize();
    window.addEventListener('resize', resize);

    // Particle structure
    const particleCount = 180;
    const particles: { x: number; y: number; z: number; color: string }[] = [];
    const radius = 100;

    // Generate particles on a sphere using Fibonacci spiral
    for (let i = 0; i < particleCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / particleCount);
      const theta = Math.sqrt(particleCount * Math.PI) * phi;

      const x = Math.sin(phi) * Math.cos(theta) * radius;
      const y = Math.sin(phi) * Math.sin(theta) * radius;
      const z = Math.cos(phi) * radius;

      // Gradient colors from cyan to violet
      const color = i % 2 === 0 ? '#6C63FF' : '#00E5B3';
      particles.push({ x, y, z, color });
    }

    let angleX = 0.003;
    let angleY = 0.005;

    // Projection calculation
    const project = (x: number, y: number, z: number, scale: number) => {
      const cx = scale / 2;
      const cy = scale / 2;
      const depth = 250;
      const factor = depth / (depth + z);
      return {
        x: x * factor + cx,
        y: y * factor + cy,
        visible: z > -depth,
      };
    };

    const draw = () => {
      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      const displayScale = Math.min(width, height) / window.devicePixelRatio;

      // Draw holographic platform projection light rays
      const cx = displayScale / 2;
      const cy = displayScale / 2;

      ctx.save();
      const grad = ctx.createLinearGradient(cx, cy - 20, cx, cy + 120);
      grad.addColorStop(0, 'rgba(108, 99, 255, 0.05)');
      grad.addColorStop(1, 'rgba(0, 229, 179, 0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.moveTo(cx - 80, cy + 125);
      ctx.lineTo(cx, cy - 20);
      ctx.lineTo(cx + 80, cy + 125);
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      // Rotate coordinates
      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);

      // Draw wireframe latitude and longitude lines (simulated rotating rings)
      ctx.strokeStyle = 'rgba(108, 99, 255, 0.12)';
      ctx.lineWidth = 1.2;

      // Draw 3 orthogonal rings
      for (let r = 0; r < 3; r++) {
        ctx.beginPath();
        const steps = 60;
        for (let i = 0; i <= steps; i++) {
          const t = (i / steps) * Math.PI * 2;
          let rx = 0, ry = 0, rz = 0;

          if (r === 0) {
            rx = Math.cos(t) * radius;
            ry = Math.sin(t) * radius;
          } else if (r === 1) {
            rx = Math.cos(t) * radius;
            rz = Math.sin(t) * radius;
          } else {
            ry = Math.cos(t) * radius;
            rz = Math.sin(t) * radius;
          }

          // Apply Y rotation
          let x1 = rx * cosY - rz * sinY;
          let z1 = rx * sinY + rz * cosY;

          // Apply X rotation
          let y2 = ry * cosX - z1 * sinX;
          let z2 = ry * sinX + z1 * cosX;

          const pt = project(x1, y2, z2, displayScale);
          if (i === 0) {
            ctx.moveTo(pt.x, pt.y);
          } else {
            ctx.lineTo(pt.x, pt.y);
          }
        }
        ctx.stroke();
      }

      // Draw and project particles
      particles.forEach((p) => {
        // Rotate Y
        const x1 = p.x * cosY - p.z * sinY;
        const z1 = p.x * sinY + p.z * cosY;

        // Rotate X
        const y2 = p.y * cosX - z1 * sinX;
        const z2 = p.y * sinX + z1 * cosX;

        // Update back to particle state for continuous rotation
        p.x = x1;
        p.y = y2;
        p.z = z2;

        const pt = project(p.x, p.y, p.z, displayScale);

        if (pt.visible) {
          // Glow intensity based on depth (z)
          const size = Math.max(1.2, ((radius + p.z) / (2 * radius)) * 3 + 1);
          const opacity = Math.max(0.15, (radius + p.z) / (2 * radius));

          ctx.beginPath();
          ctx.arc(pt.x, pt.y, size, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = opacity;
          ctx.fill();

          // Particle outer glow for closer ones
          if (p.z > 20) {
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, size * 2.2, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.globalAlpha = opacity * 0.25;
            ctx.fill();
          }
        }
      });

      ctx.globalAlpha = 1.0;

      // Slow drift rotation speeds
      angleX = 0.0015;
      angleY = 0.003;

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Glow Behind the Globe */}
      <div className="absolute inset-0 bg-radial from-[#6C63FF]/8 via-transparent to-transparent blur-3xl pointer-events-none" />

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        className="w-[280px] h-[280px] md:w-[350px] md:h-[350px] relative z-10 pointer-events-none"
      />
    </div>
  );
}
