import { useRef, useMemo } from 'react';
import { motion, useInView } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { PORTFOLIO, TRANSLATIONS, type Lang, type Theme } from '../data';

interface Props { lang: Lang; theme: Theme; }

// ─── Globe scene ──────────────────────────────────────────────────────────────
function Globe({ techs, isDark }: { techs: Array<{ name: string; color: string; logo: string }>; isDark: boolean }) {
  const groupRef = useRef<THREE.Group>(null);

  // Fibonacci sphere — even distribution across surface
  const positions = useMemo(() => {
    const n = techs.length;
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));
    return Array.from({ length: n }, (_, i) => {
      const y = 1 - ((i + 0.5) / n) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = goldenAngle * i;
      return new THREE.Vector3(
        Math.cos(theta) * r * 4.0,
        y * 4.0,
        Math.sin(theta) * r * 4.0,
      );
    });
  }, [techs]);

  useFrame(() => {
    if (groupRef.current) groupRef.current.rotation.y += 0.0025;
  });

  return (
    <group ref={groupRef}>
      {/* Wireframe sphere */}
      <mesh>
        <sphereGeometry args={[3.4, 36, 22]} />
        <meshBasicMaterial color={isDark ? "#00e5ff" : "#0077aa"} wireframe transparent opacity={isDark ? 0.13 : 0.2} />
      </mesh>

      {/* Soft inner glow */}
      <mesh>
        <sphereGeometry args={[3.35, 16, 12]} />
        <meshBasicMaterial color={isDark ? "#001a2e" : "#dff0f8"} transparent opacity={isDark ? 0.45 : 0.35} side={THREE.BackSide} />
      </mesh>

      {/* Tech labels */}
      {positions.map((pos, i) => (
        <Html
          key={techs[i].name}
          position={pos}
          center
          distanceFactor={14}
        >
          <div style={{
            padding: '3px 8px 3px 5px',
            background: isDark ? 'rgba(5,5,8,0.88)' : 'rgba(255,255,255,0.92)',
            border: `1px solid ${techs[i].color}${isDark ? '65' : '99'}`,
            borderRadius: 20,
            color: isDark ? techs[i].color : techs[i].color,
            fontSize: 9,
            fontFamily: 'monospace',
            letterSpacing: '0.06em',
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
            userSelect: 'none',
            boxShadow: isDark ? `0 0 12px ${techs[i].color}25` : `0 1px 6px rgba(0,0,0,0.15)`,
            display: 'flex',
            alignItems: 'center',
            gap: 5,
          }}>
            <img
              src={`/tech-logos/${techs[i].logo}`}
              alt=""
              style={{ width: 12, height: 12, objectFit: 'contain', flexShrink: 0 }}
            />
            {techs[i].name}
          </div>
        </Html>
      ))}
    </group>
  );
}

// ─── Main section ─────────────────────────────────────────────────────────────
export default function TechStack({ lang, theme }: Props) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const t = TRANSLATIONS[lang].stack;
  const p = PORTFOLIO;

  const allTechs = [
    ...p.techStack.frontend,
    ...p.techStack.backend,
    ...p.techStack.database,
    ...p.techStack.tools,
  ];

  return (
    <section id="stack" className="section" style={{ background: 'var(--bg-surface)' }} ref={ref}>
      <div className="grid-bg" style={{ opacity: 0.08 }} />
      <span className="kanji-deco" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', opacity: 0.05, fontSize: 'clamp(160px, 28vw, 320px)', animationDelay: '0.5s' }}>技</span>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: 16, textAlign: 'center' }}
        >
          <div className="section-tag" style={{ justifyContent: 'center' }}>{t.tag}</div>
          <h2 className="section-title">{t.title} <span>//</span></h2>
          <div className="section-jp">{t.titleSub}</div>
        </motion.div>

      </div>

      {/* Globe canvas */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 0.4, duration: 0.8 }}
        style={{ height: 'clamp(500px, 65vw, 720px)', position: 'relative' }}
      >
        <Canvas
          camera={{ position: [0, 0, 10], fov: 55 }}
          gl={{ antialias: true, alpha: true }}
          style={{ background: 'transparent' }}
          dpr={[1, 1.5]}
        >
          <ambientLight intensity={0.5} />
          <Globe techs={allTechs} isDark={theme === 'dark'} />
        </Canvas>
      </motion.div>
    </section>
  );
}
