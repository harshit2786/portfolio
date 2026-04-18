import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, ArrowUpRight, Download } from 'lucide-react';
import { PORTFOLIO, TRANSLATIONS, type Lang } from '../data';

interface Props { lang: Lang; }

function GithubIcon({ size = 20 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>;
}

function LinkedinIcon({ size = 20 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>;
}

function TwitterIcon({ size = 20 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.259 5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>;
}

const ICON_MAP = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  twitter: TwitterIcon,
  mail: ({ size = 20 }: { size?: number }) => <Mail size={size} />,
};

function ToriiGate() {
  return (
    <svg
      viewBox="0 0 600 400"
      style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 'min(700px, 90vw)', opacity: 0.18,
        pointerEvents: 'none', zIndex: 0,
      }}
    >
      <rect x="180" y="380" width="40" height="20" fill="currentColor"/>
      <rect x="380" y="380" width="40" height="20" fill="currentColor"/>
      <rect x="190" y="140" width="28" height="240" fill="currentColor"/>
      <rect x="382" y="140" width="28" height="240" fill="currentColor"/>
      <path d="M120 100 Q300 60 480 100 L490 125 Q300 85 110 125 Z" fill="currentColor"/>
      <rect x="170" y="180" width="260" height="20" fill="currentColor" rx="2"/>
      <rect x="175" y="145" width="250" height="14" fill="currentColor" rx="2"/>
      <line x1="204" y1="155" x2="204" y2="190" stroke="currentColor" strokeWidth="4"/>
      <line x1="396" y1="155" x2="396" y2="190" stroke="currentColor" strokeWidth="4"/>
    </svg>
  );
}

export default function Contact({ lang }: Props) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const t = TRANSLATIONS[lang].contact;
  const p = PORTFOLIO;

  const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1 } },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
  };

  return (
    <section id="contact" className="section" ref={ref}>
      <div className="grid-bg" />
      <ToriiGate />
      <span className="kanji-deco" style={{ top: '50%', right: -40, transform: 'translateY(-50%)', animationDelay: '3s' }}>絆</span>

      <div className="container">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center' }}
        >
          {/* Tag */}
          <motion.div variants={fadeUp}>
            <div className="section-tag" style={{ justifyContent: 'center' }}>{t.tag}</div>
          </motion.div>

          {/* BIG TITLE */}
          <motion.h2
            variants={fadeUp}
            style={{
              fontFamily: lang === 'en' ? 'var(--font-display)' : 'var(--font-jp)',
              fontSize: lang === 'en' ? 'clamp(2.5rem, 8vw, 5.5rem)' : 'clamp(2rem, 7vw, 4.5rem)',
              fontWeight: 900, textTransform: lang === 'en' ? 'uppercase' : 'none',
              lineHeight: 1.1, letterSpacing: lang === 'en' ? '-0.02em' : '0.05em',
              marginBottom: 8,
            }}
          >
            {lang === 'en' ? (
              <>
                <span className="glitch" data-text="READY_TO">
                  <span style={{ color: 'var(--text)' }}>READY_TO</span>
                </span>
                <br />
                <span
                  className="glitch"
                  data-text="CONNECT?"
                  style={{ color: 'var(--primary)', textShadow: '0 0 40px var(--primary-glow)' }}
                >
                  CONNECT?
                </span>
              </>
            ) : (
              <>
                <span style={{ color: 'var(--text)', display: 'block' }}>接続準備</span>
                <span style={{ color: 'var(--primary)', textShadow: '0 0 40px var(--primary-glow)', display: 'block' }}>完了？</span>
              </>
            )}
          </motion.h2>

          <motion.div variants={fadeUp} className="section-jp" style={{ marginBottom: 16 }}>
            {t.titleSub} // 接続準備完了
          </motion.div>

          <motion.p
            variants={fadeUp}
            style={{
              fontFamily: 'var(--font-mono)', fontSize: 13,
              color: 'var(--text-m)', lineHeight: 1.8,
              marginBottom: 56,
            }}
          >
            {t.sub}
          </motion.p>

          {/* EMAIL */}
          <motion.div variants={fadeUp} style={{ marginBottom: 48 }}>
            <motion.a
              href={`mailto:${p.email}`}
              whileHover={{ scale: 1.02, borderColor: 'var(--primary)' }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 12,
                padding: '18px 32px',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-b)',
                borderRadius: 8,
                fontFamily: 'var(--font-mono)', fontSize: 14,
                color: 'var(--text)', letterSpacing: '0.06em',
                transition: 'all 0.3s',
                cursor: 'none',
              }}
            >
              <Mail size={16} style={{ color: 'var(--primary)' }} />
              {p.email}
              <ArrowUpRight size={14} style={{ color: 'var(--text-m)' }} />
            </motion.a>
          </motion.div>

          {/* SOCIALS */}
          <motion.div
            variants={fadeUp}
            style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap', marginBottom: 48 }}
          >
            {p.socials.map((social) => {
              const Icon = ICON_MAP[social.icon as keyof typeof ICON_MAP];
              return (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.08, y: -4 }}
                  whileTap={{ scale: 0.95 }}
                  className="social-btn"
                  style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
                    padding: '20px 24px',
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-b)',
                    borderRadius: 8, width: 100,
                    color: 'var(--text-m)',
                    cursor: 'none',
                    transition: 'all 0.3s',
                    textDecoration: 'none',
                  }}
                >
                  <span style={{ color: 'var(--primary)' }}><Icon size={20} /></span>
                  <span style={{
                    fontFamily: 'var(--font-mono)', fontSize: 9,
                    letterSpacing: '0.15em', textTransform: 'uppercase',
                    color: 'var(--text-m)',
                  }}>
                    {lang === 'en' ? social.label : social.labelJP}
                  </span>
                </motion.a>
              );
            })}
          </motion.div>

          {/* RESUME DOWNLOAD */}
          <motion.div variants={fadeUp}>
            <motion.button
              whileHover={{ scale: 1.04, y: -3 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => window.open(PORTFOLIO.resumeLink, '_blank')}
              className="btn btn-primary"
              style={{ margin: '0 auto' }}
            >
              <Download size={14} />
              {lang === 'en' ? 'DOWNLOAD RESUME' : '履歴書をダウンロード'}
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
