import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [clicking, setClicking] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 500, damping: 30 });
  const springY = useSpring(y, { stiffness: 500, damping: 30 });

  useEffect(() => {
    const move = (e: MouseEvent) => { x.set(e.clientX); y.set(e.clientY); };

    const enter = () => setHovered(true);
    const leave = () => setHovered(false);
    const down = () => setClicking(true);
    const up = () => setClicking(false);

    window.addEventListener('mousemove', move);
    window.addEventListener('mousedown', down);
    window.addEventListener('mouseup', up);

    const interactives = document.querySelectorAll<HTMLElement>(
      'a, button, [role="button"], input, textarea, .btn, .project-card, .tech-chip, .nav-link, .social-btn'
    );
    interactives.forEach(el => {
      el.addEventListener('mouseenter', enter);
      el.addEventListener('mouseleave', leave);
    });

    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mousedown', down);
      window.removeEventListener('mouseup', up);
      interactives.forEach(el => {
        el.removeEventListener('mouseenter', enter);
        el.removeEventListener('mouseleave', leave);
      });
    };
  }, [x, y]);

  return (
    <>
      {/* outer ring */}
      <motion.div
        ref={cursorRef}
        style={{ left: springX, top: springY }}
        animate={{
          width: hovered ? 48 : clicking ? 20 : 32,
          height: hovered ? 48 : clicking ? 20 : 32,
          opacity: 1,
          borderColor: hovered ? 'var(--secondary)' : 'var(--primary)',
          backgroundColor: hovered ? 'var(--primary-dim)' : 'transparent',
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        className="cursor-ring"
      />
      {/* inner dot */}
      <motion.div
        ref={dotRef}
        style={{ left: x, top: y }}
        animate={{
          scale: clicking ? 0.5 : 1,
          backgroundColor: hovered ? 'var(--secondary)' : 'var(--primary)',
        }}
        transition={{ type: 'spring', stiffness: 800, damping: 35 }}
        className="cursor-dot"
      />
      <style>{`
        .cursor-ring {
          position: fixed;
          border-radius: 50%;
          border: 1.5px solid var(--primary);
          pointer-events: none;
          z-index: 99999;
          transform: translate(-50%, -50%);
          mix-blend-mode: difference;
        }
        .cursor-dot {
          position: fixed;
          width: 5px; height: 5px;
          border-radius: 50%;
          background: var(--primary);
          pointer-events: none;
          z-index: 99999;
          transform: translate(-50%, -50%);
        }
        @media (max-width: 768px) {
          .cursor-ring, .cursor-dot { display: none; }
        }
      `}</style>
    </>
  );
}
