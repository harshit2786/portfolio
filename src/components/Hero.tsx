/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Download } from 'lucide-react';
import { PORTFOLIO, TRANSLATIONS, type Lang } from '../data';
import { lazy, Suspense } from 'react';
const Katana3D = lazy(() => import('./Katana3D'));

interface Props { lang: Lang; theme: string; }

function TokyoClock() {
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');
  useEffect(() => {
    const tick = () => {
      const now = new Date(new Date().toLocaleString('en', { timeZone: 'Asia/Tokyo' }));
      setTime(now.toTimeString().slice(0, 8));
      setDate(now.toLocaleDateString('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit' }));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div style={{ textAlign: 'right' }}>
      <div style={{
        fontFamily: 'var(--font-display)', fontSize: 'clamp(20px, 3vw, 32px)',
        letterSpacing: '0.08em', color: 'var(--secondary)',
        textShadow: '0 0 20px var(--secondary-glow)',
        fontWeight: 700,
      }}>{time}</div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-m)', letterSpacing: '0.1em', marginTop: 2 }}>
        TOKYO // 東京
      </div>
      <div style={{ fontFamily: 'var(--font-jp)', fontSize: 11, color: 'var(--text-d)', marginTop: 2 }}>{date}</div>
    </div>
  );
}

function TypedText({ text }: { text: string }) {
  const [displayed, setDisplayed] = useState('');
  useEffect(() => {
    setDisplayed('');
    let i = 0;
    const id = setInterval(() => {
      if (i <= text.length) { setDisplayed(text.slice(0, i)); i++; }
      else clearInterval(id);
    }, 50);
    return () => clearInterval(id);
  }, [text]);

  return (
    <span style={{ borderRight: '2px solid var(--primary)', paddingRight: 2, animation: 'blink 1s infinite' }}>
      {displayed}
    </span>
  );
}



export default function Hero({ lang, theme }: Props) {
  const t = TRANSLATIONS[lang].hero;
  const p = PORTFOLIO;

  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh', display: 'flex', flexDirection: 'column',
        justifyContent: 'center', position: 'relative', overflow: 'hidden',
        paddingTop: 64,
      }}
    >
      {/* 3-D katana scene — lazy loaded so Three.js doesn't block first paint */}
      <Suspense fallback={null}>
        <Katana3D theme={theme} />
      </Suspense>

      {/* Grid bg */}
      <div className="grid-bg" />
      {/* Top bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        style={{
          position: 'absolute', top: 80, left: 0, right: 0,
          padding: '0 48px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
          zIndex: 2,
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            <span className="status-dot" />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.2em', color: 'var(--text-m)', textTransform: 'uppercase' }}>
              {t.status}
            </span>
          </div>
          <div style={{ fontFamily: 'var(--font-jp)', fontSize: 11, color: 'var(--text-d)', letterSpacing: '0.1em' }}>
            {p.nameJP} — {p.roleJP}
          </div>
        </div>
        <TokyoClock />
      </motion.div>

      {/* MAIN CONTENT */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 48px', width: '100%', zIndex: 2, position: 'relative' }}>

        {/* Pre-title */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          style={{
            fontFamily: 'var(--font-mono)', fontSize: 11,
            letterSpacing: '0.25em', color: 'var(--primary)',
            textTransform: 'uppercase', marginBottom: 20,
            display: 'flex', alignItems: 'center', gap: 10,
          }}
        >
          <span style={{ width: 24, height: 1, background: 'var(--primary)', display: 'inline-block' }} />
          FULL STACK DEVELOPER
        </motion.div>

        {/* NAME — BIG GLITCH */}
        <div style={{ overflow: 'hidden' }}>
          <motion.h1
            initial={{ y: 120, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(56px, 11vw, 130px)',
              fontWeight: 900,
              lineHeight: 0.9,
              letterSpacing: '-0.02em',
              color: 'var(--text)',
              textTransform: 'uppercase',
              marginBottom: 0,
            }}
          >
            <span
              className="glitch"
              data-text="HARSHIT"
              style={{ display: 'block', color: 'var(--text)' }}
            >HARSHIT</span>
            <span
              className="glitch"
              data-text="SINGH"
              style={{
                display: 'block',
                color: 'transparent',
                WebkitTextStroke: '2px var(--primary)',
                textShadow: 'none',
                marginTop: 4,
              }}
            >SINGH</span>
          </motion.h1>
        </div>

        {/* Japanese name */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.0, duration: 0.6 }}
          style={{
            fontFamily: 'var(--font-jp)', fontSize: 'clamp(14px, 2vw, 20px)',
            color: 'var(--text-m)', letterSpacing: '0.3em',
            marginTop: 16, marginBottom: 28,
          }}
        >
          {p.nameJP} // {p.roleJP}
        </motion.div>

        {/* Role bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.5 }}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 12,
            padding: '8px 16px',
            background: 'var(--primary-dim)',
            border: '1px solid var(--primary)',
            borderRadius: 'var(--radius)',
            marginBottom: 24,
          }}
        >
          <span style={{
            fontFamily: 'var(--font-display)', fontSize: 11,
            letterSpacing: '0.2em', color: 'var(--primary)',
            textTransform: 'uppercase',
          }}>
            {p.role}
          </span>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          style={{
            fontFamily: 'var(--font-mono)', fontSize: 14,
            color: 'var(--text-m)', maxWidth: 500,
            lineHeight: 1.7, marginBottom: 40,
          }}
        >
          <TypedText text={lang === 'en' ? p.tagline : p.taglineJP} />
        </motion.p>

        {/* STATS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3 }}
          style={{ display: 'flex', gap: 32, marginBottom: 48, flexWrap: 'wrap' }}
        >
          {p.stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3 + i * 0.1 }}
              style={{ textAlign: 'center' }}
            >
              <div style={{
                fontFamily: 'var(--font-display)', fontSize: 'clamp(24px, 4vw, 36px)',
                fontWeight: 800, color: 'var(--primary)',
                textShadow: '0 0 20px var(--primary-glow)',
              }}>{stat.value}</div>
              <div style={{
                fontFamily: 'var(--font-mono)', fontSize: 10,
                color: 'var(--text-m)', letterSpacing: '0.15em',
                textTransform: 'uppercase', marginTop: 4,
              }}>
                {lang === 'en' ? stat.label : stat.labelJP}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}
        >
          <motion.button
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn btn-primary"
          >
            {t.cta1}
            <span style={{ transform: 'rotate(-45deg)', display: 'inline-block' }}>→</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => window.open(PORTFOLIO.resumeLink, '_blank')}
            className="btn btn-outline"
          >
            <Download size={13} />
            {t.cta2}
          </motion.button>
        </motion.div>
      </div>

      {/* SCROLL INDICATOR */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        style={{
          position: 'absolute', bottom: 40, left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
          zIndex: 2,
        }}
      >
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: 9,
          letterSpacing: '0.25em', color: 'var(--text-d)',
          textTransform: 'uppercase',
        }}>{t.scroll}</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          style={{ color: 'var(--primary)' }}
        >
          <ArrowDown size={16} />
        </motion.div>
      </motion.div>

      {/* VERTICAL LABEL */}
      <div style={{
        position: 'absolute', right: 48, top: '50%',
        transform: 'translateY(-50%) rotate(90deg)',
        transformOrigin: 'center',
        fontFamily: 'var(--font-jp)', fontSize: 11,
        letterSpacing: '0.3em', color: 'var(--text-d)',
        zIndex: 2, whiteSpace: 'nowrap',
        display: 'flex', alignItems: 'center', gap: 8,
      }}>
        <span style={{ width: 20, height: 1, background: 'var(--text-d)', display: 'inline-block' }}/>
        ハーシット・クマール・シン
        <span style={{ width: 20, height: 1, background: 'var(--text-d)', display: 'inline-block' }}/>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #hero { padding: 80px 0 60px; }
          #hero .top-bar { padding: 0 20px !important; }
          #hero .main-content { padding: 0 20px !important; }
          .vertical-label { display: none !important; }
        }
      `}</style>
    </section>
  );
}
