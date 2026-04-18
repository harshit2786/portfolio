import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Download, MapPin, Code2, Zap } from 'lucide-react';
import { PORTFOLIO, TRANSLATIONS, type Lang } from '../data';

interface Props { lang: Lang; }

const BRAND_PATH = "M579.461548,502.453003 C558.379150,523.090515 537.500183,543.442444 516.772583,563.947449 C513.990662,566.699463 512.277222,566.798218 509.456055,564.014404 C484.547607,539.435364 459.548248,514.947998 434.502167,490.509033 C406.356415,463.045441 378.177704,435.615143 349.884216,408.304108 C346.743866,405.272766 346.521576,403.403442 349.745361,400.299438 C388.514282,362.971497 427.177887,325.534149 465.861053,288.117157 C471.250885,282.903687 476.445648,277.476105 482.024292,272.475098 C485.140045,269.681946 484.640411,267.845581 481.900574,265.248444 C461.463074,245.875412 441.123779,226.398819 420.741730,206.967270 C397.466766,184.777710 374.205627,162.573471 350.862854,140.455444 C348.077820,137.816498 347.270538,135.993652 350.472534,132.823013 C378.890839,104.682724 407.148590,76.380280 435.477997,48.150085 C436.494263,47.137417 437.297668,45.703400 439.309906,45.620243 C439.998413,47.848000 438.355865,49.323696 437.464203,50.882980 C422.167267,77.634850 406.893219,104.400764 391.371765,131.022278 C389.157166,134.820679 389.532776,137.046341 392.695709,139.886826 C418.972473,163.484772 445.133026,187.212067 471.335205,210.893082 C478.875183,217.707535 486.424744,224.511536 493.998718,231.288086 C495.327728,232.477173 496.466095,234.081741 498.675293,233.983826 C500.490417,232.079742 499.861328,229.626755 499.963104,227.385223 C501.430176,195.072891 500.518188,162.740204 500.727417,130.416824 C500.840698,112.919556 500.645264,95.419685 500.840332,77.923790 C500.935913,69.351311 499.078888,61.548965 494.611084,54.140305 C491.160248,48.417912 487.392120,42.747936 485.174805,36.375164 C485.549805,35.998169 485.924774,35.621170 486.299774,35.244175 C492.067627,39.220203 497.835510,43.196236 504.323578,47.668732 C508.163300,35.566853 508.720032,23.265684 513.022644,11.748560 C517.614868,23.028791 518.170715,35.174877 521.732239,47.235527 C528.756897,44.213421 533.832397,38.367619 541.243164,35.386215 C540.850098,39.349495 538.653076,41.883537 537.089233,44.643299 C532.424561,52.874878 526.566772,60.608337 525.767944,70.478424 C525.365784,75.447105 525.248230,80.463219 525.385315,85.447334 C526.622864,130.432343 525.679443,175.426926 526.082703,220.414780 C526.125305,225.166672 525.731628,229.978226 526.917114,235.031708 C530.921509,233.443710 533.281677,230.320984 536.035217,227.844360 C568.739014,198.429810 601.313965,168.871857 634.060974,139.505768 C637.031494,136.842010 637.268494,134.985062 635.314453,131.630020 C620.137390,105.571381 605.141479,79.407188 590.108215,53.264893 C588.648743,50.726883 587.315735,48.116119 585.681091,45.089367 C588.575806,44.837498 589.530640,46.619217 590.701355,47.787811 C619.009888,76.044930 647.232361,104.388649 675.638489,132.547134 C678.919678,135.799667 678.454102,137.620239 675.403564,140.510986 C648.682861,165.831757 622.089355,191.286652 595.434021,216.676361 C578.427673,232.875198 561.438904,249.093567 544.297974,265.149109 C541.162292,268.086212 541.493835,269.891693 544.419800,272.703033 C581.181946,308.025177 617.842957,343.452515 654.536255,378.846313 C662.091003,386.133545 669.631104,393.436951 677.265442,400.640167 C679.602478,402.845215 680.282104,404.519623 677.571350,407.144379 C644.898926,438.780182 612.317627,470.510071 579.461548,502.453003 M441.034058,361.549164 C426.509399,374.774994 412.049774,388.073517 397.412170,401.173126 C393.960968,404.261688 394.010742,406.360107 397.344116,409.548492 C430.678528,441.433655 463.890350,473.446960 497.161987,505.397858 C498.267792,506.459778 499.161163,508.184509 501.737946,507.426605 C501.737946,505.539948 501.746674,503.577118 501.736664,501.614349 C501.570496,468.978241 501.715363,436.343597 501.068359,403.706116 C500.494019,374.732941 500.772797,345.743073 500.623444,316.760864 C500.611206,314.390289 501.290283,311.731934 498.467255,309.512329 C479.493683,326.712006 460.534210,343.898895 441.034058,361.549164 M524.953735,454.497253 C525.053040,472.243896 523.323364,490.020325 524.838867,507.743896 C525.317322,507.895966 525.795776,508.048004 526.274231,508.200043 C561.728455,474.118286 597.182678,440.036560 633.265686,405.350403 C597.614746,372.965546 562.511230,341.077942 527.407715,309.190369 C526.874268,309.445953 526.340881,309.701538 525.807434,309.957123 C525.523010,357.804169 525.238647,405.651184 524.953735,454.497253 z";

export default function About({ lang }: Props) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const t = TRANSLATIONS[lang].about;
  const p = PORTFOLIO;

  const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12 } },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
  };

  const slideLeft = {
    hidden: { opacity: 0, x: -60 },
    show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" as const } },
  };

  const slideRight = {
    hidden: { opacity: 0, x: 60 },
    show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" as const } },
  };

  return (
    <section id="about" className="section" ref={ref}>
      <div className="grid-bg" style={{ opacity: 0.12 }} />
      <svg viewBox="0 0 1024 576" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 'min(820px, 85vw)', opacity: 0.1, pointerEvents: 'none', zIndex: 0 }}>
        <path fill="currentColor" d={BRAND_PATH} />
      </svg>

      {/* BIG KANJI DECO */}
      <span className="kanji-deco" style={{ top: '50%', right: -40, transform: 'translateY(-50%)', fontSize: 'clamp(120px, 20vw, 260px)' }}>
        概
      </span>

      <div className="container">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
        >
          {/* Header */}
          <motion.div variants={fadeUp} style={{ marginBottom: 64 }}>
            <div className="section-tag">{t.tag}</div>
            <h2 className="section-title">
              {t.title} <span>//</span>
            </h2>
            <div className="section-jp">{t.titleSub}</div>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>

            {/* LEFT — TEXT */}
            <motion.div variants={slideLeft}>
              <p style={{
                fontFamily: 'var(--font-mono)', fontSize: 14,
                lineHeight: 1.9, color: 'var(--text-m)',
                marginBottom: 24,
              }}>
                {lang === 'en' ? p.bio.en : p.bio.jp}
              </p>

              {/* Japanese quote */}
              <div style={{
                borderLeft: '3px solid var(--primary)',
                paddingLeft: 20, marginBottom: 36,
              }}>
                <p style={{
                  fontFamily: 'var(--font-jp)', fontSize: 13,
                  color: 'var(--text-d)', lineHeight: 1.8,
                  letterSpacing: '0.08em',
                }}>
                  {lang === 'en' ? p.bio.jp : p.bio.en}
                </p>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginBottom: 36 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-m)', fontSize: 12 }}>
                  <MapPin size={13} style={{ color: 'var(--primary)' }} />
                  India // インド
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-m)', fontSize: 12 }}>
                  <span className="status-dot" style={{ width: 6, height: 6 }} />
                  Available for work
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-m)', fontSize: 12 }}>
                  <Code2 size={13} style={{ color: 'var(--secondary)' }} />
                  Open to collaborate
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.03, x: 4 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => window.open(PORTFOLIO.resumeLink, '_blank')}
                className="btn btn-outline"
              >
                <Download size={13} />
                {t.download}
              </motion.button>
            </motion.div>

            {/* RIGHT — VISUAL */}
            <motion.div variants={slideRight}>
              {/* Stat cards grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
                {p.stats.map((stat, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.04, borderColor: 'var(--primary)' }}
                    style={{
                      background: 'var(--bg-card)',
                      border: '1px solid var(--border-b)',
                      borderRadius: 8,
                      padding: '24px 20px',
                      textAlign: 'center',
                      transition: 'all 0.3s',
                      cursor: 'default',
                      gridColumn: i === 0 ? 'span 2' : 'span 1',
                    }}
                  >
                    <div style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: i === 0 ? 48 : 36,
                      fontWeight: 800,
                      color: 'var(--primary)',
                      textShadow: '0 0 30px var(--primary-glow)',
                      lineHeight: 1,
                      marginBottom: 8,
                    }}>{stat.value}</div>
                    <div style={{
                      fontFamily: 'var(--font-mono)', fontSize: 10,
                      letterSpacing: '0.15em', textTransform: 'uppercase',
                      color: 'var(--text-m)',
                    }}>
                      {lang === 'en' ? stat.label : stat.labelJP}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Decorative terminal */}
              <motion.div
                whileHover={{ borderColor: 'var(--secondary)' }}
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-b)',
                  borderRadius: 8,
                  padding: '16px 20px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 12,
                  transition: 'border-color 0.3s',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                className="scan-lines"
              >
                <div style={{ display: 'flex', gap: 6, marginBottom: 12 }}>
                  {['#ff5f56', '#ffbd2e', '#27c93f'].map(c => (
                    <span key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />
                  ))}
                </div>
                <div style={{ color: 'var(--text-d)', lineHeight: 2 }}>
                  <span style={{ color: 'var(--primary)' }}>harshit@neo-tokyo</span>
                  <span style={{ color: 'var(--text-d)' }}> ~ % </span>
                  <span style={{ color: 'var(--secondary)' }}>whoami</span>
                  <br />
                  <span style={{ color: '#00ff88' }}>→ Full Stack Developer</span>
                  <br />
                  <span style={{ color: 'var(--primary)' }}>harshit@neo-tokyo</span>
                  <span style={{ color: 'var(--text-d)' }}> ~ % </span>
                  <span style={{ color: 'var(--secondary)' }}>status</span>
                  <br />
                  <span style={{ color: '#00ff88' }}>→ Online & Building</span>
                  <span style={{ animation: 'blink 1s infinite', color: 'var(--primary)' }}>_</span>
                </div>
                <Zap
                  size={80}
                  style={{
                    position: 'absolute', right: -20, bottom: -20,
                    color: 'var(--primary)', opacity: 0.04,
                  }}
                />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #about .grid-cols { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </section>
  );
}
