import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { PORTFOLIO, TRANSLATIONS, type Lang } from '../data';

interface Props { lang: Lang; }

export default function Experience({ lang }: Props) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const t = TRANSLATIONS[lang].experience;
  const p = PORTFOLIO;

  return (
    <section id="experience" className="section" ref={ref} style={{ background: 'var(--bg-surface)' }}>
      <span className="kanji-deco" style={{ top: '10%', left: -40, animationDelay: '2s' }}>経</span>

      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: 80, textAlign: 'center' }}
        >
          <div className="section-tag" style={{ justifyContent: 'center' }}>{t.tag}</div>
          <h2 className="section-title">{t.title} <span>//</span></h2>
          <div className="section-jp">{t.titleSub}</div>
        </motion.div>

        {/* TIMELINE */}
        <div style={{ position: 'relative', maxWidth: 900, margin: '0 auto' }}>
          {/* Vertical line */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'absolute', left: '50%', top: 0, bottom: 0,
              width: 1, background: 'linear-gradient(180deg, var(--primary), var(--secondary), var(--accent))',
              transformOrigin: 'top',
              boxShadow: '0 0 12px var(--primary-glow)',
            }}
          />

          {p.experience.map((exp, i) => {
            const isLeft = i % 2 === 0;
            return (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: isLeft ? -80 : 80 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: i * 0.2, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  display: 'flex',
                  justifyContent: isLeft ? 'flex-end' : 'flex-start',
                  paddingRight: isLeft ? 'calc(50% + 40px)' : 0,
                  paddingLeft: isLeft ? 0 : 'calc(50% + 40px)',
                  marginBottom: 60,
                  position: 'relative',
                }}
              >
                {/* Dot */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={inView ? { scale: 1 } : {}}
                  transition={{ delay: i * 0.2 + 0.4, type: 'spring', stiffness: 400 }}
                  style={{
                    position: 'absolute',
                    left: 'calc(50% - 10px)',
                    top: 24,
                    width: 20, height: 20,
                    borderRadius: '50%',
                    background: exp.color,
                    border: `3px solid var(--bg-surface)`,
                    boxShadow: `0 0 20px ${exp.color}80`,
                    zIndex: 1,
                  }}
                />

                {/* Card */}
                <motion.div
                  whileHover={{ scale: 1.02, borderColor: exp.color }}
                  style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-b)',
                    borderRadius: 8,
                    padding: '28px 32px',
                    maxWidth: 400,
                    width: '100%',
                    cursor: 'default',
                    transition: 'border-color 0.3s, box-shadow 0.3s',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  {/* Accent bar */}
                  <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, height: 2,
                    background: exp.color,
                    boxShadow: `0 0 12px ${exp.color}60`,
                  }} />

                  {/* Duration badge */}
                  <div style={{
                    fontFamily: 'var(--font-mono)', fontSize: 9,
                    letterSpacing: '0.2em', color: exp.color,
                    textTransform: 'uppercase', marginBottom: 12,
                  }}>
                    {lang === 'en' ? exp.duration : exp.durationJP}
                    <span style={{ color: 'var(--text-d)', marginLeft: 8 }}>// {exp.location}</span>
                  </div>

                  {/* Company */}
                  <div
                    className="glitch"
                    data-text={exp.company}
                    style={{
                      fontFamily: 'var(--font-display)', fontSize: 15,
                      fontWeight: 700, letterSpacing: '0.1em',
                      color: 'var(--text)', marginBottom: 6,
                    }}
                  >
                    {exp.company}
                  </div>

                  {/* Role */}
                  <div style={{
                    fontFamily: 'var(--font-mono)', fontSize: 12,
                    color: 'var(--text-m)', marginBottom: 4,
                    letterSpacing: '0.08em',
                  }}>
                    {lang === 'en' ? exp.role : exp.roleJP}
                  </div>

                  <div style={{
                    fontFamily: 'var(--font-jp)', fontSize: 11,
                    color: 'var(--text-d)', marginBottom: 16,
                  }}>
                    {lang === 'en' ? exp.roleJP : exp.role}
                  </div>

                  {/* Description */}
                  <p style={{
                    fontFamily: 'var(--font-mono)', fontSize: 12,
                    lineHeight: 1.8, color: 'var(--text-m)',
                    marginBottom: 20,
                  }}>
                    {lang === 'en' ? exp.description.en : exp.description.jp}
                  </p>

                  {/* Tags */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {exp.tags.map(tag => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #experience .timeline-line { left: 20px !important; }
          #experience .timeline-item {
            padding-right: 0 !important;
            padding-left: 60px !important;
            justify-content: flex-start !important;
          }
          #experience .timeline-dot { left: 10px !important; }
        }
      `}</style>
    </section>
  );
}
