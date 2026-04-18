import { useRef, useState } from 'react';
import { motion, useInView, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { ExternalLink, ArrowRight, Play } from 'lucide-react';

function GithubIcon({ size = 12 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>;
}

import { PORTFOLIO, TRANSLATIONS, type Lang } from '../data';

interface Props { lang: Lang; }

type Category = 'ALL' | 'WEB' | 'AI' | 'SYSTEMS' | 'MOBILE';

type Project = {
  id: string;
  title: string;
  titleJP: string;
  category: string;
  description: { en: string; jp: string };
  tags: readonly string[];
  github: string;
  live: string | null;
  demo: string | null;
  color: string;
  gradient: string;
};

const PROJECT_ICONS: Record<string, string> = {
  skillbridge: '🎓',
  'order-engine': '⚙️',
  'sam2-colorization': '🎨',
  pdfchat: '🤖',
  tunestream: '🎵',
  quizly: '📱',
};

function ProjectCard({ project, lang, index }: { project: Project; lang: Lang; index: number }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 30 });
  const sy = useSpring(y, { stiffness: 300, damping: 30 });
  const rotateX = useTransform(sy, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(sx, [-0.5, 0.5], [-8, 8]);
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => { x.set(0); y.set(0); setHovered(false); };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setHovered(true)}
      style={{ perspective: 1000 }}
      className="project-card"
    >
      <motion.div
        style={{
          rotateX, rotateY, transformStyle: 'preserve-3d',
          background: 'var(--bg-card)',
          border: `1px solid ${hovered ? project.color : 'var(--border-b)'}`,
          borderRadius: 10,
          overflow: 'hidden',
          boxShadow: hovered ? `0 20px 60px ${project.color}25, 0 0 30px ${project.color}15` : 'none',
          transition: 'border-color 0.3s, box-shadow 0.3s',
          cursor: 'default',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Top gradient area */}
        <div style={{
          height: 150,
          background: project.gradient,
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}>
          <div className="grid-bg" style={{ opacity: 0.3 }} />

          {/* Category badge */}
          <div style={{
            position: 'absolute', top: 14, left: 14,
            background: project.color, color: '#000',
            padding: '3px 10px', borderRadius: 2,
            fontFamily: 'var(--font-mono)',
            fontSize: 9, letterSpacing: '0.2em',
            fontWeight: 700, textTransform: 'uppercase',
          }}>
            {project.category}
          </div>

          {/* Japanese title overlay */}
          <div style={{
            fontFamily: 'var(--font-jp)', fontSize: 44, fontWeight: 700,
            color: project.color, opacity: 0.12,
            userSelect: 'none', position: 'absolute', bottom: -8, right: 8,
          }}>
            {project.titleJP}
          </div>

          {/* Center icon */}
          <motion.div
            animate={hovered ? { scale: 1.12 } : { scale: 1 }}
            transition={{ duration: 0.3 }}
            style={{
              width: 56, height: 56, borderRadius: 12,
              background: `${project.color}20`,
              border: `1.5px solid ${project.color}60`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 24, boxShadow: `0 0 30px ${project.color}30`, zIndex: 1,
            }}
          >
            {PROJECT_ICONS[project.id] ?? '💻'}
          </motion.div>
        </div>

        {/* Content */}
        <div style={{ padding: '20px 22px 18px', display: 'flex', flexDirection: 'column', flex: 1 }}>
          <div style={{
            fontFamily: 'var(--font-jp)', fontSize: 10,
            color: 'var(--text-d)', letterSpacing: '0.15em', marginBottom: 5,
          }}>
            {project.titleJP}
          </div>

          <h3 style={{
            fontFamily: 'var(--font-display)', fontSize: 15,
            fontWeight: 700, letterSpacing: '0.08em',
            color: 'var(--text)', marginBottom: 10, textTransform: 'uppercase',
          }}>
            {project.title}
          </h3>

          <p style={{
            fontFamily: 'var(--font-mono)', fontSize: 11.5,
            lineHeight: 1.8, color: 'var(--text-m)',
            marginBottom: 16, flex: 1,
          }}>
            {lang === 'en' ? project.description.en : project.description.jp}
          </p>

          {/* Tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 16 }}>
            {project.tags.map(tag => (
              <span key={tag} className="tag" style={{ borderColor: `${project.color}40`, color: project.color }}>
                {tag}
              </span>
            ))}
          </div>

          <div className="divider" style={{ marginBottom: 14 }} />

          {/* Links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <motion.a
              href={project.github}
              target="_blank" rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                fontFamily: 'var(--font-mono)', fontSize: 10,
                letterSpacing: '0.12em', color: 'var(--text-m)',
                textTransform: 'uppercase',
              }}
            >
              <GithubIcon size={12} /> GitHub
            </motion.a>

            <div style={{ display: 'flex', gap: 12, marginLeft: 'auto' }}>
              {project.demo && (
                <motion.a
                  href={project.demo}
                  target="_blank" rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 5,
                    fontFamily: 'var(--font-mono)', fontSize: 10,
                    letterSpacing: '0.12em', color: project.color,
                    textTransform: 'uppercase',
                  }}
                >
                  <Play size={10} fill="currentColor" /> DEMO
                </motion.a>
              )}
              {project.live && (
                <motion.a
                  href={project.live}
                  target="_blank" rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 5,
                    fontFamily: 'var(--font-mono)', fontSize: 10,
                    letterSpacing: '0.12em', color: project.color,
                    textTransform: 'uppercase',
                  }}
                >
                  LIVE <ExternalLink size={10} />
                </motion.a>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects({ lang }: Props) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const t = TRANSLATIONS[lang].projects;
  const p = PORTFOLIO;
  const [filter, setFilter] = useState<Category>('ALL');

  const categories: Category[] = ['ALL', 'WEB', 'AI', 'SYSTEMS', 'MOBILE'];
  const allProjects: Project[] = p.projects as unknown as Project[];
  const filtered = filter === 'ALL' ? allProjects : allProjects.filter(pr => pr.category === filter);

  const catLabel: Record<Category, string> = {
    ALL: t.all, WEB: t.web, AI: t.ai, SYSTEMS: 'SYSTEMS', MOBILE: 'MOBILE',
  };

  return (
    <section id="projects" className="section" ref={ref}>
      <div className="grid-bg" />
      <span className="kanji-deco" style={{ bottom: '5%', right: -20, animationDelay: '1s' }}>作</span>

      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: 48 }}
        >
          <div className="section-tag">{t.tag}</div>
          <h2 className="section-title">{t.title} <span>//</span></h2>
          <div className="section-jp">{t.titleSub}</div>
        </motion.div>

        {/* Filter pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{ display: 'flex', gap: 8, marginBottom: 48, flexWrap: 'wrap' }}
        >
          {categories.map(cat => (
            <motion.button
              key={cat}
              onClick={() => setFilter(cat)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                background: filter === cat ? 'var(--primary)' : 'var(--bg-card)',
                border: `1px solid ${filter === cat ? 'var(--primary)' : 'var(--border-b)'}`,
                color: filter === cat ? '#fff' : 'var(--text-m)',
                borderRadius: 4, padding: '6px 16px',
                fontFamily: 'var(--font-mono)', fontSize: 10,
                letterSpacing: '0.15em', textTransform: 'uppercase',
                cursor: 'none', transition: 'all 0.3s',
                boxShadow: filter === cat ? '0 0 16px var(--primary-glow)' : 'none',
              }}
            >
              {catLabel[cat]}
            </motion.button>
          ))}
        </motion.div>

        {/* Grid */}
        <motion.div
          layout
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: 24,
            alignItems: 'stretch',
          }}
        >
          {filtered.map((project, i) => (
            <ProjectCard key={project.id} project={project} lang={lang} index={i} />
          ))}
        </motion.div>

        {/* View all CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          style={{ textAlign: 'center', marginTop: 64 }}
        >
          <motion.a
            href="https://github.com/harshit2786"
            target="_blank" rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              fontFamily: 'var(--font-mono)', fontSize: 11,
              letterSpacing: '0.2em', textTransform: 'uppercase',
              color: 'var(--secondary)', transition: 'gap 0.3s',
            }}
          >
            VIEW ALL ON GITHUB
            <ArrowRight size={14} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
