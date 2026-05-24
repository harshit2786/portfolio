import { useEffect, useRef } from 'react';

const CHARS = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン龍剣侍道魂技刀炎水風雷天地闇光忍者武士将軍';

interface Props { theme: string; }

export default function KanjiRain({ theme }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Respect reduced-motion preference — skip the canvas entirely
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const isMobile = window.innerWidth <= 768;
    // Larger font = fewer columns = less GPU work on mobile
    const fontSize = isMobile ? 28 : 16;

    let animId: number;
    let frameCount = 0;
    // Draw only every other frame → ~30 fps instead of 60
    const frameSkip = 2;

    let drops: number[] = [];

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const columns = Math.floor(canvas.width / fontSize);
      drops = Array.from({ length: columns }, () => Math.random() * -50);
    };
    init();

    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(init, 150);
    };
    window.addEventListener('resize', onResize, { passive: true });

    const isDark = theme === 'dark';
    const bgAlpha    = isDark ? 'rgba(5, 5, 8, 0.08)'     : 'rgba(242, 238, 248, 0.12)';
    const charAlpha  = isDark ? 'rgba(255, 45, 107, 0.13)' : 'rgba(201, 0, 63, 0.10)';
    const charBright = isDark ? 'rgba(255, 45, 107, 0.40)' : 'rgba(201, 0, 63, 0.35)';

    const draw = () => {
      animId = requestAnimationFrame(draw);

      // Skip frames to stay near 30 fps
      frameCount++;
      if (frameCount % frameSkip !== 0) return;

      ctx.fillStyle = bgAlpha;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${fontSize}px "Noto Sans JP", monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = CHARS[Math.floor(Math.random() * CHARS.length)];
        const yPos = drops[i] * fontSize;

        ctx.fillStyle =
          Math.random() > 0.96
            ? 'rgba(255, 180, 200, 0.7)'
            : drops[i] === Math.floor(drops[i])
              ? charBright
              : charAlpha;
        ctx.fillText(char, i * fontSize, yPos);

        if (yPos > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i] += 0.4 + Math.random() * 0.3;
      }
    };

    // Pause animation when the tab is hidden to save CPU/GPU
    const onVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(animId);
      } else {
        frameCount = 0;
        animId = requestAnimationFrame(draw);
      }
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
        zIndex: 0, pointerEvents: 'none',
      }}
    />
  );
}
