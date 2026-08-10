// CSS-only star field — no canvas, no WebGL context competition
export default function StarField() {
  const stars = Array.from({ length: 75 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 0.5 + Math.random() * 1.5,
    opacity: 0.2 + Math.random() * 0.7,
    duration: 3 + Math.random() * 5,
    delay: Math.random() * 5,
    parallaxClass: i % 3 === 0 ? 'star-slow' : i % 3 === 1 ? 'star-medium' : 'star-fast',
  }));

  return (
    <>
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: var(--min-op); }
          50% { opacity: var(--max-op); }
        }
        @keyframes star-drift-slow {
          0% { transform: translateY(0); }
          100% { transform: translateY(-30px); }
        }
        @keyframes star-drift-medium {
          0% { transform: translateY(0); }
          100% { transform: translateY(-60px); }
        }
        @keyframes star-drift-fast {
          0% { transform: translateY(0); }
          100% { transform: translateY(-100px); }
        }
      `}</style>
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              background: star.size > 1.2
                ? `radial-gradient(circle, rgba(200,210,255,${star.opacity}) 0%, transparent 70%)`
                : `rgba(255,255,255,${star.opacity})`,
              '--min-op': star.opacity * 0.3,
              '--max-op': star.opacity,
              animation: `twinkle ${star.duration}s ${star.delay}s ease-in-out infinite`,
            } as React.CSSProperties}
          />
        ))}
      </div>
    </>
  );
}
