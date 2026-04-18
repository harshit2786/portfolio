import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { PORTFOLIO, TRANSLATIONS, type Lang } from '../data';

interface Props { lang: Lang; }

type Category = keyof typeof PORTFOLIO.techStack;

function TechChip({ name, color, delay }: { name: string; color: string; delay: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.4, type: 'spring', stiffness: 300 }}
      whileHover={{ scale: 1.08, y: -4 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="tech-chip"
      style={{
        padding: '10px 16px',
        background: hovered ? `${color}15` : 'var(--bg-card)',
        border: `1px solid ${hovered ? color : 'var(--border-b)'}`,
        borderRadius: 6,
        display: 'flex', alignItems: 'center', gap: 10,
        cursor: 'default',
        transition: 'all 0.3s',
        boxShadow: hovered ? `0 0 20px ${color}30, 0 4px 20px rgba(0,0,0,0.3)` : 'none',
        position: 'relative', overflow: 'hidden',
      }}
    >
      {/* Colored indicator dot */}
      <span style={{
        width: 8, height: 8,
        borderRadius: '50%',
        background: color,
        boxShadow: hovered ? `0 0 10px ${color}` : 'none',
        transition: 'box-shadow 0.3s',
        flexShrink: 0,
      }} />
      <span style={{
        fontFamily: 'var(--font-mono)', fontSize: 12,
        letterSpacing: '0.08em',
        color: hovered ? color : 'var(--text-m)',
        transition: 'color 0.3s',
        whiteSpace: 'nowrap',
      }}>
        {name}
      </span>
      {/* Shimmer on hover */}
      {hovered && (
        <motion.div
          initial={{ x: '-100%' }}
          animate={{ x: '200%' }}
          transition={{ duration: 0.6, ease: 'linear' }}
          style={{
            position: 'absolute', inset: 0,
            background: `linear-gradient(90deg, transparent, ${color}20, transparent)`,
            pointerEvents: 'none',
          }}
        />
      )}
    </motion.div>
  );
}

export default function TechStack({ lang }: Props) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const t = TRANSLATIONS[lang].stack;
  const p = PORTFOLIO;

  const categories: { key: Category; label: string; color: string }[] = [
    { key: 'frontend', label: t.frontend, color: 'var(--primary)' },
    { key: 'backend',  label: t.backend,  color: 'var(--secondary)' },
    { key: 'database', label: t.database, color: 'var(--accent)' },
    { key: 'tools',    label: t.tools,    color: '#ffd700' },
  ];

  let chipCounter = 0;

  return (
    <section id="stack" className="section" style={{ background: 'var(--bg-surface)' }} ref={ref}>
      <div className="grid-bg" style={{ opacity: 0.08 }} />
      <span className="kanji-deco" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', opacity: 0.06, fontSize: 'clamp(160px, 28vw, 320px)', animationDelay: '0.5s' }}>技</span>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: 64, textAlign: 'center' }}
        >
          <div className="section-tag" style={{ justifyContent: 'center' }}>{t.tag}</div>
          <h2 className="section-title">{t.title} <span>//</span></h2>
          <div className="section-jp">{t.titleSub}</div>
        </motion.div>

        {/* Capacity bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
          style={{
            display: 'flex', justifyContent: 'flex-end',
            marginBottom: 40,
            fontFamily: 'var(--font-mono)', fontSize: 10,
            letterSpacing: '0.15em', color: 'var(--secondary)',
            textTransform: 'uppercase',
          }}
        >
          SYSTEM_CAPACITY: {Object.values(p.techStack).flat().length} MODULES
        </motion.div>

        {/* Category grids */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
          {categories.map((cat, ci) => (
            <motion.div
              key={cat.key}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: ci * 0.15 }}
            >
              {/* Category header */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: 16,
                marginBottom: 20,
              }}>
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: 10,
                  letterSpacing: '0.2em', textTransform: 'uppercase',
                  color: cat.color,
                }}>
                  {`0${ci + 1}`}
                </span>
                <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, ${cat.color}60, transparent)` }} />
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: 11,
                  letterSpacing: '0.15em', textTransform: 'uppercase',
                  color: cat.color,
                }}>
                  {cat.label}
                </span>
              </div>

              {/* Chips */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                {p.techStack[cat.key].map((tech) => {
                  const delay = inView ? 0.1 + chipCounter++ * 0.04 : 0;
                  return (
                    <TechChip key={tech.name} name={tech.name} color={tech.color} delay={delay} />
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
