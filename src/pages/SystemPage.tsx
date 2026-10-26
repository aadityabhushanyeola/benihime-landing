import { ContactDetails } from '../components/ContactDetails';
import { FooterLinks } from '../components/FooterLinks';
import { copyrightYear } from '../siteConfig';
import { BrandLink } from '../components/BrandLogo';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { SystemName } from '../components/GlassNavbar';
import { SystemDemo } from '../components/SystemDemos';
import { systems } from '../systemContent';
import { pageHref } from '../paths';

export default function SystemPage({ system }: { system: SystemName }) {
  const data = systems[system];
  const reduced = useReducedMotion();
  return <main id="main-content" tabIndex={-1} className="system-page">
    <section id="hero" data-blade-section className="system-hero">
      <a href={pageHref()} className="system-back"><ArrowLeft size={14}/>Back to the studio</a>
      <motion.div initial={reduced ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6 }}>
        <div className="system-eyebrow"><span>BENIHIME / {data.number}</span><span>{data.role}</span></div>
        <div className="system-heading-row"><h1>{system.toUpperCase()}</h1><span className="system-number">{data.number}</span></div>
        <h2>{data.headline}</h2><p className="system-intro">{data.description}</p>
        <a href={pageHref(`#/systems/${system}`)} onClick={event => { event.preventDefault(); document.getElementById('preview')?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' }); }} className="system-preview-link">See it in action <ArrowRight size={16}/></a>
      </motion.div>
    </section>
    <section id="about" data-blade-section className="system-demo-section">
      <div id="preview" className="system-demo-heading"><div><span className="system-eyebrow">A SMALL STORY, A CLEAR PICTURE</span><h2>{data.demoTitle}</h2><p>{data.demoText}</p></div><span className="concept-label">Illustrative preview</span></div>
      <div className="system-demo-card"><SystemDemo system={system}/></div>
    </section>
    <section id="features" data-blade-section className="system-benefits"><p className="system-eyebrow">WHAT {system.toUpperCase()} HELPS YOU MAKE</p><div>{data.benefits.map((benefit, index) => <article key={benefit.title}><span>0{index + 1}</span><h3>{benefit.title}</h3><p>{benefit.text}</p></article>)}</div></section>
    <footer id="footer" data-blade-section className="system-footer"><div><span className="system-eyebrow">YOUR NEXT CHAPTER</span><h2>Bring your story.<br/>Let’s give it life.</h2><a href={`mailto:benihime2027@gmail.com?subject=${system.toUpperCase()}%20inquiry`}>Talk to Benihime <ArrowUpRight size={19}/></a></div><a className="next-system" href={pageHref(`#/systems/${data.next}`)}><span>Meet the next system</span><strong>{data.next.toUpperCase()}</strong><ArrowRight size={24}/></a><ContactDetails/><FooterLinks/><div className="system-footer-bottom"><BrandLink className="system-footer-brand"/><span>© {copyrightYear} Benihime Studio.</span></div></footer>
  </main>;
}
