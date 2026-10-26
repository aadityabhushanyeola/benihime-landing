import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
const ease = [0.16, 1, 0.3, 1] as const;
export function WordsPullUp({ text, className = '', showAsterisk = false, enabled = true }: { text: string; className?: string; showAsterisk?: boolean; enabled?: boolean }) {
  return <WordsPullUpMultiStyle segments={[{ text, className }]} showAsterisk={showAsterisk} enabled={enabled} />;
}
export function WordsPullUpMultiStyle({ segments, showAsterisk = false, enabled = true }: { segments: { text: string; className?: string }[]; showAsterisk?: boolean; enabled?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduced = useReducedMotion();
  const words = segments.flatMap(segment => segment.text.split(' ').map(text => ({ text, className: segment.className })));
  return <span ref={ref} className="inline-flex flex-wrap justify-center gap-x-[0.23em]" aria-label={segments.map(s => s.text).join(' ')}>{words.map((word, i) => <motion.span aria-hidden="true" key={i} className={`relative inline-block ${word.className || ''}`} initial={reduced ? false : { opacity: 0, y: 20 }} animate={inView && enabled ? { opacity: 1, y: 0 } : undefined} transition={{ duration: 0.7, delay: reduced ? 0 : i * 0.08, ease }}>{word.text}{showAsterisk && i === words.length - 1 && <span className="absolute top-[0.65em] -right-[0.3em] text-[0.31em]">*</span>}</motion.span>)}</span>;
}
