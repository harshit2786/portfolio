import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { TRANSLATIONS, type Lang } from '../data';

interface Props { lang: Lang; }

export default function Footer({ lang }: Props) {
  const t = TRANSLATIONS[lang].footer;

  return (
    <footer style={{
      background: 'var(--bg-surface)',
      borderTop: '1px solid var(--border)',
      padding: '32px 48px',
    }}>
      <div style={{
        maxWidth: 1200, margin: '0 auto',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexWrap: 'wrap', gap: 16,
      }}>
        {/* Left */}
        <div>
          <div style={{
            fontFamily: 'var(--font-display)', fontSize: 12,
            letterSpacing: '0.12em', color: 'var(--text-m)',
            textTransform: 'uppercase',
          }}>
            © {new Date().getFullYear()} {t.copy}
          </div>
        </div>

        {/* Center */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6,
          fontFamily: 'var(--font-mono)', fontSize: 11,
          color: 'var(--text-d)',
          letterSpacing: '0.1em',
        }}>
          {t.made}
          <motion.span
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          >
            <Heart size={12} style={{ color: 'var(--primary)', fill: 'var(--primary)' }} />
          </motion.span>
          {t.in}
        </div>

        {/* Right — back to top */}
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          whileHover={{ scale: 1.05, borderColor: 'var(--primary)', color: 'var(--primary)' }}
          whileTap={{ scale: 0.95 }}
          style={{
            background: 'none',
            border: '1px solid var(--border-b)',
            borderRadius: 4, padding: '7px 16px',
            fontFamily: 'var(--font-mono)', fontSize: 10,
            letterSpacing: '0.15em', textTransform: 'uppercase',
            color: 'var(--text-m)', cursor: 'none',
            transition: 'all 0.3s',
          }}
        >
          ↑ BACK TO TOP
        </motion.button>
      </div>
    </footer>
  );
}
