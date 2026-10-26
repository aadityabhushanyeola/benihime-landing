import { useEffect, useId, useRef, useState } from 'react';
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';

type Section = 'hero' | 'about' | 'features' | 'footer';

export default function KatanaProgress() {
  const reduced = !!useReducedMotion();
  const [section, setSection] = useState<Section>('hero');
  const [fast, setFast] = useState(false);
  const [percentage, setPercentage] = useState(0);
  const settleTimer = useRef<ReturnType<typeof setTimeout>>();
  const { scrollYProgress, scrollY } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 130, damping: 30 });
  const fill = reduced ? scrollYProgress : smooth;
  const featureColor = useTransform(fill, [0.4, 0.65, 0.9], ['#A42D40', '#D75258', '#F5F3E7']);
  const reflectionY = useTransform(fill, [0, 1], [105, 245]);
  const color = section === 'about' ? '#9FB3C8' : section === 'features' ? featureColor : section === 'footer' ? '#F5F3E7' : '#C8CDD0';
  // Equal and opposite travel keeps the object's bounding midpoint at SVG y=142.
  const swordY = useTransform(fill, value => reduced ? 0 : -82 * value);
  const sheathY = useTransform(fill, value => reduced ? 0 : 82 * value);
  const exposedHeight = useTransform(sheathY, value => 215 + value);
  const id = useId().replace(/:/g, '');

  useMotionValueEvent(scrollYProgress, 'change', value => setPercentage(Math.round(value * 100)));
  useMotionValueEvent(scrollY, 'change', () => {
    setFast(Math.abs(scrollY.getVelocity()) > 1200);
    clearTimeout(settleTimer.current);
    settleTimer.current = setTimeout(() => setFast(false), 160);
  });
  useEffect(() => () => clearTimeout(settleTimer.current), []);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) setSection(entry.target.id as Section);
    }, { rootMargin: '-15% 0px -40% 0px' });
    document.querySelectorAll('[data-blade-section]').forEach(element => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return <>
    <div className="katana-anchor" aria-hidden="true">
      <div className="katana-desktop h-full">
        <svg viewBox="0 -110 60 504" preserveAspectRatio="none" className="katana-art h-full w-full overflow-visible">
          <defs>
            <linearGradient id={`${id}-steel`}><stop stopColor="#29323D"/><stop offset=".2" stopColor="#7F909E"/><stop offset=".38" stopColor="#F7F7E9"/><stop offset=".47" stopColor="#ADBCC5"/><stop offset=".75" stopColor="#62717C"/><stop offset="1" stopColor="#E4E5DC"/></linearGradient>
            <linearGradient id={`${id}-saya`}><stop stopColor="#070708"/><stop offset=".22" stopColor="#29282A"/><stop offset=".38" stopColor="#55504D"/><stop offset=".46" stopColor="#262326"/><stop offset=".7" stopColor="#101013"/><stop offset="1" stopColor="#030304"/></linearGradient>
            <linearGradient id={`${id}-gold`}><stop stopColor="#6F4825"/><stop offset=".22" stopColor="#BC8C46"/><stop offset=".45" stopColor="#F3DB99"/><stop offset=".6" stopColor="#D9B569"/><stop offset="1" stopColor="#89602C"/></linearGradient>
            <linearGradient id={`${id}-glint`} x1="0" y1="0" x2="0" y2="1"><stop stopColor="#FFFFFF" stopOpacity="0"/><stop offset=".5" stopColor="#FFFFFF" stopOpacity=".9"/><stop offset="1" stopColor="#FFFFFF" stopOpacity="0"/></linearGradient>
            <filter id={`${id}-edge-glow`} x="-200%" y="-20%" width="500%" height="140%"><feGaussianBlur stdDeviation="2.5"/></filter>
            <clipPath id={`${id}-exposed`}><motion.rect x="0" y="-110" width="60" style={{ height: exposedHeight }}/></clipPath>
            <clipPath id={`${id}-blade`}><path d="M25 103 L35 103 L34 227 Q33 251 25 262 Z"/></clipPath>
          </defs>
          {!reduced && <motion.path d="M42 -30 Q51 70 42 170" fill="none" stroke={color} strokeWidth="1" initial={{ opacity: 0 }} animate={{ opacity: fast ? 0.4 : 0 }} transition={{ duration: 0.4 }}/ >}
          <g clipPath={`url(#${id}-exposed)`}>
            <motion.g style={{ y: swordY }}>
              <g>
                <path d="M25 103 L35 103 L34 227 Q33 251 25 262 Z" fill={`url(#${id}-steel)`}/>
                <g clipPath={`url(#${id}-blade)`}><motion.rect x="24" y="103" width="13" height="160" fill={color} style={{ scaleY: fill, transformOrigin: '30px 103px' }} opacity=".35"/><motion.rect x="24" width="13" height="25" fill={`url(#${id}-glint)`} style={{ y: reflectionY }}/></g>
                <path d="M28 106 Q30 119 28 132 T28 158 T28 184 T28 210 L28 250" fill="none" stroke="#F5F3E7" strokeWidth=".6" opacity=".45"/>
                <motion.path d="M25 104 L25 261 Q33 251 34 228 L35 104" fill="none" stroke={color} strokeWidth="1" animate={{ opacity: reduced ? 0.8 : [0.65, 1, 0.65] }} transition={{ duration: 5, repeat: reduced ? 0 : Infinity }}/>
                <rect x="24" y="24" width="12" height="68" rx="3" fill="#161617" stroke="#6D675B" strokeWidth=".7"/>
                {[28, 38, 48, 58, 68, 78].map(y => <g key={y} opacity=".65"><path d={`M24 ${y} L36 ${y + 8} M36 ${y} L24 ${y + 8}`} stroke="#635E54" strokeWidth=".8"/></g>)}
                {[30, 40, 50, 60, 70, 80].map(y => <path key={y} d={`M30 ${y} l4 4 -4 4 -4 -4 Z`} fill={`url(#${id}-gold)`}/ >)}
                <rect x="23" y="20" width="14" height="7" rx="2" fill={`url(#${id}-gold)`}/>
                <path d="M18 91 Q30 88 42 91 L42 96 Q30 99 18 96 Z" fill={`url(#${id}-gold)`} stroke="#F3DB99" strokeWidth=".5"/>
                <path d="M20 93 L40 93" stroke="#594022" strokeWidth=".5"/>
                <rect x="24" y="97" width="12" height="8" fill={`url(#${id}-gold)`}/>
                <path d="M29 20 Q38 6 32 -3 M32 15 L36 1 M32 16 L28 2" fill="none" stroke="#9B2B3B" strokeWidth="2" strokeLinecap="round"/>
                <path d="M24 86 Q12 83 16 94 Q22 98 25 87 Q34 94 43 86 M24 89 L17 108" fill="none" stroke="#AA3344" strokeWidth="1.6"/>
              </g>
            </motion.g>
          </g>
          <motion.g style={{ y: sheathY }}>
            <path d="M23 105 L37 105 L36 271 Q36 283 28 287 L23 283 Z" fill={`url(#${id}-saya)`} stroke="#585A58" strokeWidth=".7"/>
            <rect x="22" y="103" width="16" height="6" rx="1" fill={`url(#${id}-gold)`}/>
            <path d="M27 114 L27 276" stroke="#81817C" strokeWidth=".5" opacity=".35"/>
            <path d="M35 112 L34 265" stroke="#942B3C" strokeWidth=".8" opacity=".75"/>
            <path d="M23 272 L36 272 M23 275 L35 275" stroke={`url(#${id}-gold)`} strokeWidth="1.3"/>
            <path d="M28 154 L31 157 L28 160 L25 157 Z M28 163 L31 166 L28 169 L25 166 Z" fill="#B59153" opacity=".6"/>
          </motion.g>
          {!reduced && <motion.path key={section} d="M40 -20 Q48 72 41 160" fill="none" stroke={color} strokeWidth="1.5" initial={{ pathLength: 0, opacity: 0.5 }} animate={{ pathLength: 1, opacity: 0 }} transition={{ duration: 1.1 }}/ >}
        </svg>
      </div>
      <div className="katana-mobile"><motion.div className="h-full w-full origin-bottom" style={{ scaleY: fill, backgroundColor: color }}/></div>
    </div>
    <div className="sr-only" role="progressbar" aria-label="Page reading progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={percentage}/>
  </>;
}
