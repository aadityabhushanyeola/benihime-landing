import { ContactDetails } from '../components/ContactDetails';
import { FooterLinks } from '../components/FooterLinks';
import { copyrightYear } from '../siteConfig';
import { BrandLink } from '../components/BrandLogo';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { pageHref } from '../paths';

const team = [
  { name: 'Shaurya Sharma', role: 'Founder' },
  { name: 'Milind Koul', role: 'Co-founder' },
  { name: 'Shashank Pandurang Kamat', role: 'Co-founder' },
  { name: 'Jaivardhan Singh Chauhan', role: 'Director & Co-founder' },
  { name: 'Aaditya Bhushan Yeola', role: 'Director & Co-founder' },
  { name: 'Keshav J.', role: 'Team Lead & Co-founder' },
];

export default function TeamPage() {
  return <main id="main-content" tabIndex={-1} className="system-page team-page">
    <section id="hero" data-blade-section className="system-hero">
      <a href={pageHref()} className="system-back"><ArrowLeft size={14}/>Back to the studio</a>
      <div className="system-eyebrow">THE PEOPLE BEHIND BENIHIME</div>
      <div className="system-heading-row"><h1>Our Team</h1></div>
      <h2>One studio. A shared vision.</h2>
      <p className="system-intro">Meet the team bringing Benihime Studio to life.</p>
    </section>
    <section id="about" data-blade-section className="team-grid" aria-label="Benihime founders and team">
      {team.map((person, index) => <article className="team-card" key={person.name}>
        <span className="system-eyebrow">0{index + 1}</span>
        <p className="team-role">{person.role}</p>
        <h2>{person.name}</h2>
      </article>)}
    </section>
    <footer id="footer" data-blade-section className="system-footer">
      <div><span className="system-eyebrow">START A CONVERSATION</span><h2>Let’s make your<br/>next chapter.</h2><a href="mailto:benihime2027@gmail.com">Contact us <ArrowUpRight size={19}/></a></div>
      <ContactDetails/><FooterLinks/><div className="system-footer-bottom"><BrandLink className="system-footer-brand"/><span>© {copyrightYear} Benihime Studio.</span></div>
    </footer>
  </main>;
}
