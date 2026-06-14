import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Matrix Rain Background ---
const MatrixRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*(){}[]<>/\\|+=~".split("");
    const fontSize = 14;
    const columns = Math.floor(width / fontSize);
    const drops: number[] = Array(columns).fill(1);

    let animationId: number;

    const draw = () => {
      // Create trailing effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, width, height);

      const style = getComputedStyle(document.documentElement);
      const primaryHSL = style.getPropertyValue('--primary').trim() || "260 84% 65%";
      
      ctx.fillStyle = `hsl(${primaryHSL} / 0.6)`;
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      animationId = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 pointer-events-none opacity-40 -z-10" 
    />
  );
};

// --- Boot Sequence Component ---
const BootSequence = ({ onComplete }: { onComplete: () => void }) => {
  const [lines, setLines] = useState<string[]>([]);
  const bootText = [
    "> initializing neural_core...",
    "> loading knowledge_base [██████████] 100%",
    "> calibrating creativity_engine...",
    "> system.ready()"
  ];

  useEffect(() => {
    let currentLine = 0;
    const interval = setInterval(() => {
      if (currentLine < bootText.length) {
        setLines(prev => [...prev, bootText[currentLine]]);
        currentLine++;
      } else {
        clearInterval(interval);
        setTimeout(onComplete, 600); // Brief pause before reveal
      }
    }, 350);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="font-mono text-sm sm:text-base text-primary/80 text-left w-full max-w-md mx-auto space-y-2 mt-8">
      {lines.map((line, i) => (
        <motion.div 
          key={i}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2 }}
        >
          {line}
        </motion.div>
      ))}
      <motion.div
        animate={{ opacity: [1, 0] }}
        transition={{ repeat: Infinity, duration: 0.8 }}
        className="inline-block w-2 h-4 bg-primary/80 mt-2"
      />
    </div>
  );
};

// --- Neural SVG Animation ---
const NeuralSvg = () => (
  <motion.svg 
    width="120" height="120" 
    viewBox="0 0 100 100" 
    className="mx-auto mb-8 drop-shadow-[0_0_15px_hsl(var(--primary)/0.5)] overflow-visible"
  >
    {/* Outer connections */}
    <motion.path
      d="M30 30 L50 20 L70 30 L80 50 L70 70 L50 80 L30 70 L20 50 Z"
      fill="none"
      stroke="hsl(var(--primary))"
      strokeWidth="2"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
    />
    {/* Inner dashed connections */}
    <motion.path
      d="M50 20 L50 50 M20 50 L50 50 M80 50 L50 50 M50 80 L50 50 M30 30 L50 50 M70 30 L50 50 M70 70 L50 50 M30 70 L50 50"
      fill="none"
      stroke="hsl(var(--accent))"
      strokeWidth="1.5"
      strokeDasharray="4 4"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 0.7 }}
      transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
    />
    {/* Center Node */}
    <motion.circle cx="50" cy="50" r="6" fill="hsl(var(--primary))" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.5 }} />
    
    {/* Perimeter Nodes */}
    {[
      {x:30,y:30}, {x:50,y:20}, {x:70,y:30}, {x:80,y:50},
      {x:70,y:70}, {x:50,y:80}, {x:30,y:70}, {x:20,y:50}
    ].map((pos, i) => (
      <motion.circle 
        key={i} cx={pos.x} cy={pos.y} r="3" 
        fill="hsl(var(--accent))" 
        initial={{ scale: 0 }} 
        animate={{ scale: 1 }} 
        transition={{ delay: 1.5 + i * 0.1 }} 
      />
    ))}
  </motion.svg>
);

// --- Main Welcome Screen ---
interface WelcomeScreenProps {
  onLoadingComplete?: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onLoadingComplete }) => {
  const [phase, setPhase] = useState<'boot' | 'reveal' | 'done'>('boot');

  useEffect(() => {
    if (phase === 'reveal') {
      const timer = setTimeout(() => {
        setPhase('done');
        setTimeout(() => onLoadingComplete?.(), 1000);
      }, 3500); // Wait 3.5 seconds before hiding reveal
      return () => clearTimeout(timer);
    }
  }, [phase, onLoadingComplete]);

  const containerVariants = {
    exit: {
      opacity: 0,
      scale: 1.1,
      filter: "blur(10px)",
      transition: {
        duration: 0.8,
        ease: "easeInOut"
      }
    }
  };

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          className="fixed inset-0 bg-background z-[100] flex items-center justify-center overflow-hidden"
          initial={{ opacity: 1 }}
          exit="exit"
          variants={containerVariants}
        >
          <MatrixRain />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/80 to-background z-0" />
          
          <div className="relative z-10 w-full max-w-4xl mx-auto px-4 text-center">
            {phase === 'boot' ? (
              <BootSequence onComplete={() => setPhase('reveal')} />
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <NeuralSvg />
                <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold space-y-4">
                  <div>
                    <span className="inline-block gradient-text">Welcome</span>{' '}
                    <span className="inline-block gradient-text">To</span>{' '}
                    <span className="inline-block gradient-text">My</span>
                  </div>
                  <div className="mt-2 sm:mt-4">
                    <span 
                      className="inline-block glitch text-primary font-bold tracking-tight" 
                      data-text="Portfolio Website"
                    >
                      Portfolio Website
                    </span>
                  </div>
                </h1>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeScreen;
