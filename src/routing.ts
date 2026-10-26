import { systemNames, SystemName } from './components/GlassNavbar';
import { systems } from './systemContent';
import { siteTitle } from './siteConfig';
import { basePath } from './paths';

export type Page = SystemName | 'team' | 'not-found' | null;
export function resolvePage(path: string, hash: string): Page {
  if (path !== basePath && path !== `${basePath}index.html`) return 'not-found';
  if (['', '#', '#hero', '#about', '#features', '#footer', '#main-content'].includes(hash)) return null;
  if (hash === '#/team') return 'team';
  const match = hash.match(/^#\/systems\/([a-z]+)\/?$/);
  return match && systemNames.includes(match[1] as SystemName) ? match[1] as SystemName : 'not-found';
}
export function pageMetadata(page: Page) {
  if (page === 'not-found') return { title: siteTitle, description: 'This chapter could not be found. Return to Benihime Studio to explore our systems, meet our team or get in touch.' };
  if (page === 'team') return { title: siteTitle, description: 'Meet the founders and team behind Benihime Studio, bringing manga, webtoons and novels into motion.' };
  if (page) return { title: siteTitle, description: systems[page].description };
  return { title: siteTitle, description: 'Benihime Studio brings finished manga, webtoons and novels to life as anime episodes. Explore KYO, JARVIS, KAGE, GUIDER and ALIGN.' };
}
