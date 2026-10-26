import { systemNames } from './GlassNavbar';
import { pageHref } from '../paths';
export function FooterLinks() {
  return <nav className="footer-links" aria-label="Footer navigation">
    <a href={pageHref()}>Home</a>
    {systemNames.map(name => <a href={pageHref(`#/systems/${name}`)} key={name}>{name.toUpperCase()}</a>)}
    <a href={pageHref('#/team')}>Our Team</a>
    <a href="mailto:benihime2027@gmail.com">Contact us</a>
  </nav>;
}
