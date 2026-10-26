import { useEffect, useRef, useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { BrandLink } from './BrandLogo';
import { pageHref } from '../paths';

export const systemNames = ['kyo', 'jarvis', 'kage', 'guider', 'align'] as const;
export type SystemName = typeof systemNames[number];
export function GlassNavbar({ current }: { current?: SystemName | 'team' }) {
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const dismiss = (event: PointerEvent) => { if (!navRef.current?.contains(event.target as Node)) setOpen(false); };
    const escape = (event: KeyboardEvent) => { if (event.key === 'Escape') { setOpen(false); buttonRef.current?.focus(); } };
    const resize = () => { if (window.innerWidth > 760) setOpen(false); };
    document.addEventListener('pointerdown', dismiss);
    document.addEventListener('keydown', escape);
    window.addEventListener('resize', resize);
    return () => { document.removeEventListener('pointerdown', dismiss); document.removeEventListener('keydown', escape); window.removeEventListener('resize', resize); };
  }, [open]);
  return <nav ref={navRef} className="glass-nav" aria-label="Main navigation">
    <BrandLink className="glass-brand" onClick={() => setOpen(false)}/>
    <div className="glass-links">{systemNames.map(name => <a key={name} href={pageHref(`#/systems/${name}`)} aria-current={current === name ? 'page' : undefined}>{name.toUpperCase()}</a>)}</div>
    <a className="glass-team" href={pageHref('#/team')} aria-current={current === 'team' ? 'page' : undefined}>Our Team</a>
    <a className="glass-contact" href="mailto:benihime2027@gmail.com">Contact us <ArrowUpRight size={14}/></a>
    <button ref={buttonRef} type="button" className="glass-menu" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}>{open ? <X size={19}/> : <Menu size={19}/>}</button>
    {open && <motion.div id="mobile-navigation" className="glass-mobile" initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}>{systemNames.map(name => <a key={name} href={pageHref(`#/systems/${name}`)} aria-current={current === name ? 'page' : undefined} onClick={() => setOpen(false)}>{name.toUpperCase()}<ArrowUpRight size={16}/></a>)}<a className="glass-mobile-team" href={pageHref('#/team')} aria-current={current === 'team' ? 'page' : undefined} onClick={() => setOpen(false)}>Our Team<ArrowUpRight size={16}/></a></motion.div>}
  </nav>;
}
