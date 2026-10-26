import { ArrowLeft, ArrowRight } from 'lucide-react';
import { ContactDetails } from '../components/ContactDetails';
import { FooterLinks } from '../components/FooterLinks';
import { copyrightYear } from '../siteConfig';
import { BrandLink } from '../components/BrandLogo';
import { pageHref } from '../paths';
export default function NotFoundPage() {
  return <main id="main-content" tabIndex={-1} className="system-page not-found-page">
    <section id="hero" data-blade-section className="system-hero">
      <div className="system-eyebrow">A CHAPTER WE COULDN’T FIND</div>
      <div className="system-heading-row"><h1>404</h1></div>
      <h2>This page has wandered off.</h2>
      <p className="system-intro">The link may be outdated or the address may be incomplete. Your next chapter is still waiting at the studio.</p>
      <div className="not-found-actions"><a href={pageHref()}><ArrowLeft size={15}/>Return to the studio</a><a href={pageHref('#/systems/kyo')}>Explore KYO<ArrowRight size={15}/></a></div>
    </section>
    <footer id="footer" data-blade-section className="system-footer"><ContactDetails/><FooterLinks/><div className="system-footer-bottom"><BrandLink className="system-footer-brand"/><span>© {copyrightYear} Benihime Studio.</span></div></footer>
  </main>;
}
