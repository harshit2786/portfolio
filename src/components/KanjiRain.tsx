import { useEffect, useRef } from 'react';

const CHARS = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン龍剣侍道魂技刀炎水風雷天地闇光忍者武士将軍';

interface Props {
  theme: string;
}

export default function KanjiRain({ theme }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const fontSize = 16;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = Array.from({ length: columns }, () => Math.random() * -50);

    const isDark = theme === 'dark';
    const bgAlpha = isDark ? 'rgba(5, 5, 8, 0.08)' : 'rgba(242, 238, 248, 0.12)';
    const charAlpha = isDark ? 'rgba(255, 45, 107, 0.13)' : 'rgba(201, 0, 63, 0.10)';
    const charBright = isDark ? 'rgba(255, 45, 107, 0.40)' : 'rgba(201, 0, 63, 0.35)';

    const draw = () => {
      ctx.fillStyle = bgAlpha;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${fontSize}px "Noto Sans JP", monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = CHARS[Math.floor(Math.random() * CHARS.length)];
        const yPos = drops[i] * fontSize;

        // brightest char at the head
        ctx.fillStyle = Math.random() > 0.96 ? 'rgba(255, 180, 200, 0.7)' : drops[i] === Math.floor(drops[i]) ? charBright : charAlpha;
        ctx.fillText(char, i * fontSize, yPos);

        if (yPos > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i] += 0.4 + Math.random() * 0.3;
      }
      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
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
