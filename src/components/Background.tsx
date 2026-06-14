import React, { useEffect, useRef } from "react";

// --- Types ---
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseOpacity: number;
  phase: number; // for pulse offset
}

interface ShootingStar {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  trail: { x: number; y: number }[];
}

// --- Helpers ---
const createParticles = (count: number, width: number, height: number): Particle[] =>
  Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.35,
    vy: (Math.random() - 0.5) * 0.35,
    radius: Math.random() * 2 + 1,
    baseOpacity: Math.random() * 0.5 + 0.4,
    phase: Math.random() * Math.PI * 2,
  }));

const spawnShootingStar = (width: number, height: number): ShootingStar => {
  const fromTop = Math.random() < 0.6;
  return {
    x: fromTop ? Math.random() * width : -10,
    y: fromTop ? -10 : Math.random() * height * 0.4,
    vx: fromTop ? (Math.random() - 0.5) * 3 : Math.random() * 2.5 + 1.5,
    vy: fromTop ? Math.random() * 2.5 + 1.5 : Math.random() * 1.5 + 0.5,
    life: 0,
    maxLife: 45 + Math.random() * 35,
    trail: [],
  };
};

// --- Component ---
const Background: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const blobRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Neural Constellation Canvas Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let particles: Particle[] = [];
    let shootingStars: ShootingStar[] = [];
    let nextShootingStarTime = 0;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      const count = width < 768 ? 40 : 65;
      particles = createParticles(count, width, height);
    };

    // Read palette colors from CSS custom properties
    let cachedPrimary = "260 84% 65%";
    let cachedAccent = "200 84% 60%";
    let lastColorCheck = 0;

    const refreshColors = () => {
      const style = getComputedStyle(document.documentElement);
      cachedPrimary = style.getPropertyValue("--primary").trim() || "260 84% 65%";
      cachedAccent = style.getPropertyValue("--accent").trim() || "200 84% 60%";
    };

    const connectionDist = () => (width < 768 ? 100 : 140);

    // --- Main animation loop ---
    const animate = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      // Refresh colors every 400ms (cheap palette-change detection)
      if (time - lastColorCheck > 400) {
        refreshColors();
        lastColorCheck = time;
      }

      const connDist = connectionDist();
      const connDistSq = connDist * connDist;

      // --- Update & draw particles ---
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around edges
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        // Subtle breathing pulse
        const pulse = Math.sin(time * 0.0008 + p.phase) * 0.2 + 0.8;
        const opacity = p.baseOpacity * pulse;

        // Draw particle with subtle glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius + 2, 0, Math.PI * 2);
        ctx.fillStyle = `hsl(${cachedPrimary} / ${opacity * 0.3})`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `hsl(${cachedPrimary} / ${opacity})`;
        ctx.fill();
      }

      // --- Draw connections ---
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distSq = dx * dx + dy * dy;

          if (distSq < connDistSq) {
            const dist = Math.sqrt(distSq);
            const opacity = (1 - dist / connDist) * 0.35; // increased line opacity
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `hsl(${cachedPrimary} / ${opacity})`;
            ctx.stroke();
          }
        }
      }

      // --- Shooting stars ---
      if (time > nextShootingStarTime) {
        shootingStars.push(spawnShootingStar(width, height));
        nextShootingStarTime = time + 3500 + Math.random() * 5500;
      }

      shootingStars = shootingStars.filter((star) => {
        star.trail.push({ x: star.x, y: star.y });
        if (star.trail.length > 18) star.trail.shift();

        star.x += star.vx;
        star.y += star.vy;
        star.life++;

        const lifeRatio = 1 - star.life / star.maxLife;

        // Draw trail
        for (let i = 0; i < star.trail.length; i++) {
          const t = i / star.trail.length;
          const alpha = t * lifeRatio * 0.8; // brighter trail
          const r = 0.5 + t * 2;
          ctx.beginPath();
          ctx.arc(star.trail[i].x, star.trail[i].y, r, 0, Math.PI * 2);
          ctx.fillStyle = `hsl(${cachedAccent} / ${alpha})`;
          ctx.fill();
        }

        // Draw head with glow
        ctx.beginPath();
        ctx.arc(star.x, star.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = `hsl(${cachedAccent} / ${lifeRatio * 0.3})`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(star.x, star.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = `hsl(${cachedAccent} / ${lifeRatio})`;
        ctx.fill();

        return star.life < star.maxLife;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    // Pause animation when tab is hidden
    const handleVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(animationRef.current);
      } else {
        animationRef.current = requestAnimationFrame(animate);
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);

    resize();
    window.addEventListener("resize", resize);
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  // Gradient blob parallax on scroll
  useEffect(() => {
    const initialPositions = [
      { x: -4, y: 0 },
      { x: -4, y: 0 },
      { x: 20, y: -8 },
      { x: 20, y: -8 },
    ];

    const handleScroll = () => {
      const scrollY = window.scrollY;
      blobRefs.current.forEach((blob, index) => {
        if (!blob) return;
        const pos = initialPositions[index];
        const xOffset = Math.sin(scrollY / 100 + index * 0.5) * 340;
        const yOffset = Math.cos(scrollY / 100 + index * 0.5) * 40;
        blob.style.transform = `translate(${pos.x + xOffset}px, ${pos.y + yOffset}px)`;
        blob.style.transition = "transform 1.4s ease-out";
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none -z-10">
      {/* Neural Constellation Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 1 }}
      />

      {/* Gradient Blobs (parallax) */}
      <div className="absolute inset-0">
        <div
          ref={(ref) => (blobRefs.current[0] = ref)}
          className="absolute top-0 -left-4 md:w-96 md:h-96 w-72 h-72 bg-primary rounded-full mix-blend-multiply filter blur-[128px] opacity-60 md:opacity-40"
        />
        <div
          ref={(ref) => (blobRefs.current[1] = ref)}
          className="absolute top-0 -right-4 w-96 h-96 bg-accent rounded-full mix-blend-multiply filter blur-[128px] opacity-60 md:opacity-40 hidden sm:block"
        />
        <div
          ref={(ref) => (blobRefs.current[2] = ref)}
          className="absolute -bottom-8 left-[-40%] md:left-20 w-96 h-96 bg-primary rounded-full mix-blend-multiply filter blur-[128px] opacity-60 md:opacity-40"
        />
        <div
          ref={(ref) => (blobRefs.current[3] = ref)}
          className="absolute -bottom-10 right-20 w-96 h-96 bg-accent rounded-full mix-blend-multiply filter blur-[128px] opacity-40 md:opacity-30 hidden sm:block"
        />
      </div>
    </div>
  );
};

export default Background;
