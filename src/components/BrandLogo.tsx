import { assetPath, pageHref } from '../paths';

const logo = assetPath('media/benihime-logo.png');

export function BrandMark() {
  return <span className="brand-mark" aria-hidden="true"><img src={logo} alt="" decoding="async"/></span>;
}

export function BrandLink({ className = '', onClick }: { className?: string; onClick?: () => void }) {
  return <a className={`brand-link ${className}`} href={pageHref()} aria-label="Benihime Studio home" onClick={onClick}><BrandMark/><span>Benihime</span></a>;
}

export function BrandSeal() {
  return <img className="brand-seal" src={logo} alt="Benihime Studio — Same stories. More worlds." loading="lazy" decoding="async"/>;
}
