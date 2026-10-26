import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { ArrowRight, Check, X, Film, Brush, Layers } from 'lucide-react';
import { WordsPullUp, WordsPullUpMultiStyle } from './components/WordsPullUp';
import KatanaProgress from './components/KatanaProgress';
import { GlassNavbar } from './components/GlassNavbar';
import SystemPage from './pages/SystemPage';
import TeamPage from './pages/TeamPage';
import VideoLoadingScreen from './components/VideoLoadingScreen';
import NotFoundPage from './pages/NotFoundPage';
import { ContactDetails } from './components/ContactDetails';
import { FooterLinks } from './components/FooterLinks';
import { BrandLink, BrandSeal } from './components/BrandLogo';
import { copyrightYear } from './siteConfig';
import { resolvePage, pageMetadata } from './routing';
import { assetPath, pageHref } from './paths';
import './systems.css';
const cream = '#E1E0CC';
const ease = [0.16, 1, 0.3, 1] as const;
const video = assetPath('media/benihime-feature.mp4');
const email = 'mailto:benihime2027@gmail.com';
const deck = email + '?subject=Investor%20deck%20request';
const features = [
  { title: 'KYO.', number: '01', items: ['The adaptation director', 'Plans each episode and asks the creator', 'Routes production, grades and repairs', 'Locks approved decisions into canon'], detail: 'Before anything is generated, our adaptation director KYO asks the decisions that matter. Make them yourself, or let KYO propose and label its choice for your approval. Season, episode runtime, genre, pacing, and where episode 1 ends are yours to direct. Every inferred choice waits for your approval; anything you lock is never silently changed. A manga panel captures one frozen instant. Animation needs everything around it. KYO breaks the moment into eight beats: wind-up, foot plant, blade path, impact, reaction, debris, camera, and recovery. The source hit stays the canonical event.' },
  { title: 'Specialist engines.', number: '02', items: ['GUIDER understands the story and keeps it straight', 'KAGE keeps every character looking like themselves', 'JARVIS animates alongside the best external models'], detail: 'Five systems, one shared story memory. KYO decides what gets made and checks it; specialist engines make it. GUIDER understands the story and keeps it straight. KAGE keeps every character looking like themselves. JARVIS animates, alongside the best external models. A finished manga, webtoon or novel is read page by page into traceable evidence. The episode is voiced, scored and locked into season memory.' },
  { title: 'ALIGN.', number: '03', items: ['Coordinates the whole studio underneath', 'One shared story memory', 'It remembers. Every episode.'], detail: 'Most AI tools generate one clip at a time and forget the rest. A typical generator starts each clip from scratch: the scarf changes colour, the scar comes and goes, and an injury from the fight in episode 7 is forgotten. With Benihime, the character\'s approved look is locked in shared story memory. She is wounded in episode 7, so the bandage carries into every later episode until the story says it heals. ALIGN coordinates the whole studio underneath.' }
];
const investorText = 'A wedge studios pay for first. KAGE keeps approved characters and style consistent while making revisions faster. Paid pilots come before scale. A market sized from buyers: $142.5M base serviceable market today, built bottom-up, with a $0.3B–$3.0B opportunity as the category expands. Deep tech, not a wrapper: structured story state, selective repair and model-agnostic routing — the layer above video models, not another one. Built with the community: rights-cleared data, opt-in training, and humans approve everything that becomes canon. Seed round open. The full deck, financial scenarios and our private architecture repository are available on request. Market figure: Benihime bottom-up planning model, not an industry estimate. Demos on the reference site are illustrations of how the product works.';
function About() {
  return <section id="about" data-blade-section className="bg-black px-4 py-20 md:px-10 md:py-28"><div className="mx-auto max-w-6xl bg-[#101010] px-5 py-16 text-center sm:px-12 md:py-24"><BrandSeal/><h2 className="mx-auto max-w-3xl text-3xl leading-[0.95] sm:text-4xl sm:leading-[0.9] md:text-5xl lg:text-6xl xl:text-7xl" style={{ color: cream }}><WordsPullUpMultiStyle segments={[{ text: 'Every manga is a', className: 'font-normal' }, { text: 'series waiting to happen.', className: 'font-serif italic' }, { text: 'Same story, now in motion.', className: 'font-normal' }]}/></h2><p className="mx-auto mt-10 max-w-xl text-xs leading-relaxed text-primary sm:text-sm md:text-base">Benihime Studio adapts finished manga, webtoons and novels into anime episodes, without losing a single character, scar or plot thread along the way.</p><a href={pageHref('#/team')} className="about-team-link">Meet the people behind Benihime <ArrowRight size={15}/></a><div className="mt-12 flex items-center justify-center gap-3 text-[10px] uppercase tracking-[0.18em] text-gray-500"><span className="h-px w-8 bg-primary/20"/>Read it. Then watch it.<span className="h-px w-8 bg-primary/20"/></div></div></section>;
}
function FeatureCard({ index, onLearn }: { index: number; onLearn: (index: number) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { once: true, margin: '-100px' });
  const reduced = useReducedMotion();
  const data = features[index - 1];
  return <motion.div ref={ref} initial={reduced ? false : { opacity: 0, scale: 0.95 }} animate={visible ? { opacity: 1, scale: 1 } : undefined} transition={{ duration: 0.65, delay: reduced ? 0 : index * 0.15, ease: [0.22, 1, 0.36, 1] }} className={`feature-card ${index === 0 ? 'video-card' : ''}`}>
    {index === 0 ? <><video autoPlay={!reduced} loop muted playsInline preload="none" src={visible && !reduced ? video : undefined} className="absolute inset-0 h-full w-full object-cover"/><div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent"/><span className="relative text-[10px] uppercase tracking-[0.16em] text-primary/70">Chapter 1 → Episode 1</span><h3 className="relative mt-auto text-2xl" style={{ color: cream }}>Your manga.<br/>Brought to life.</h3></> : <><span className="feature-icon" aria-hidden="true">{index === 1 ? <Film/> : index === 2 ? <Brush/> : <Layers/>}</span><div className="mt-9 flex items-start justify-between gap-2"><h3 className="text-lg sm:text-xl" style={{ color: cream }}>{data.title}</h3><span className="pt-1 text-[10px] text-gray-500">{data.number}</span></div><ul className="mt-7 space-y-4">{data.items.map(item => <li key={item} className="flex items-start gap-2.5 text-xs leading-relaxed text-gray-400"><Check size={13} className="mt-0.5 shrink-0 text-primary" strokeWidth={1.5}/>{item}</li>)}</ul><button onClick={() => { if (index === 1) window.location.hash = '/systems/kyo'; else if (index === 3) window.location.hash = '/systems/align'; else onLearn(index - 1); }} className="mt-auto flex w-full items-center justify-between border-t border-primary/10 pt-5 text-xs text-primary hover:text-white">Learn more <ArrowRight size={17} className="-rotate-45"/></button></>}
  </motion.div>;
}
function HomePage() {
  const [detail, setDetail] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const reduced = useReducedMotion();
  const openDetail = (index: number) => { setDetail(index); dialogRef.current?.showModal(); };
  return <>
    <a className="skip-link" href={pageHref('#about')}>Skip to content</a>
    <main id="main-content" tabIndex={-1}>
      <section id="hero" data-blade-section className="h-screen min-h-[620px] p-4 md:p-6"><div className="hero-frame relative h-full overflow-hidden rounded-2xl md:rounded-[2rem]">
        <video src={reduced ? undefined : assetPath('media/samurai.mp4')} poster={assetPath('media/samurai-poster.jpg')} autoPlay={!reduced} loop muted playsInline preload={reduced ? 'none' : 'auto'} className="absolute inset-0 h-full w-full object-cover"/>
        <div className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.7] mix-blend-overlay"/><div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60"/>
        <div className="absolute left-7 top-28 text-[10px] uppercase tracking-[0.2em] text-primary/70 md:left-10"><span className="mr-2 inline-block h-1 w-1 rounded-full bg-primary"/>Every manga is a series waiting to happen.</div>
        <div className="hero-content absolute bottom-0 left-0 right-0 grid grid-cols-12 items-end gap-5 px-5 pb-8 sm:px-8 md:px-10 md:pb-10">
          <h1 className="col-span-12 font-medium leading-[0.85] tracking-[-0.07em] md:col-span-8 text-[20vw] sm:text-[19vw] md:text-[17vw] lg:text-[16vw] xl:text-[15vw] 2xl:text-[16vw]" style={{ color: cream }}><WordsPullUp text="Benihime"/></h1>
          <div className="col-span-12 max-w-sm md:col-span-4 md:pl-6 lg:pb-1">
            <motion.p initial={reduced ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.5, ease }} className="text-xs leading-[1.2] text-primary/70 sm:text-sm md:text-base">Benihime Studio adapts finished manga, webtoons and novels into anime episodes, without losing a single character, scar or plot thread along the way.</motion.p>
            <motion.a href={pageHref('#features')} initial={reduced ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} whileHover={reduced ? undefined : { gap: 38 }} transition={{ duration: 0.7, delay: 0.7, ease }} className="group mt-5 inline-flex items-center gap-8 rounded-full bg-primary py-1.5 pl-6 pr-1.5 text-sm font-medium text-black sm:text-base"><span>Direct an episode</span><motion.span whileHover={reduced ? undefined : { scale: 1.1 }} className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-primary sm:h-10 sm:w-10"><ArrowRight size={19}/></motion.span></motion.a>
          </div>
        </div>
      </div></section>
      <About/>
      <section id="features" data-blade-section className="relative min-h-screen bg-black px-4 pb-20 pt-6 md:px-10 md:pb-28"><div className="bg-noise pointer-events-none absolute inset-0 opacity-[0.15]"/><div className="relative mx-auto max-w-7xl"><div className="mb-10 flex items-center gap-3 text-[10px] uppercase tracking-[0.18em] text-gray-500"><span className="h-1 w-1 rounded-full bg-primary"/>The studio behind it<span className="ml-auto">Five systems. One shared story memory.</span></div><h2 className="mb-12 text-xl font-normal sm:text-2xl md:text-3xl lg:text-4xl"><span className="block text-primary"><WordsPullUpMultiStyle segments={[{ text: 'KYO decides what gets made and checks it.' }]}/></span><span className="mt-2 block text-gray-500"><WordsPullUpMultiStyle segments={[{ text: 'Specialist engines make it.' }]}/></span></h2><div id="feature-grid" className="grid grid-cols-1 gap-3 sm:gap-2 md:grid-cols-2 md:gap-1 lg:h-[480px] lg:grid-cols-4">{[0, 1, 2, 3].map(index => <FeatureCard key={index} index={index} onLearn={openDetail}/>)}</div></div></section>
    </main>
    <footer id="footer" data-blade-section className="mx-4 border-t border-primary/15 px-2 pb-10 pt-12 md:mx-10"><div className="flex flex-wrap items-center justify-between gap-8"><BrandLink className="footer-brand"/><button onClick={() => openDetail(3)} className="text-xs text-gray-500 hover:text-primary">For investors · Seed round open</button><ContactDetails/></div><FooterLinks/><div className="mt-10 flex flex-wrap justify-between gap-4 text-[10px] text-gray-500"><span>© {copyrightYear} Benihime Studio. All rights reserved.</span><a href={pageHref('#/team')}>Our Team</a></div></footer>
    <dialog ref={dialogRef} onClick={event => { if (event.target === event.currentTarget) dialogRef.current?.close(); }} className="feature-dialog rounded-2xl border border-primary/20 bg-[#101010] p-8 text-primary"><button onClick={() => dialogRef.current?.close()} aria-label="Close details" className="absolute right-5 top-5"><X size={20}/></button>{detail !== null && <><p className="text-xs text-gray-500">BENIHIME STUDIO / {detail < 3 ? features[detail].number : 'INVESTORS'}</p><h2 className="mt-8 text-3xl">{detail < 3 ? features[detail].title : 'Seed round open.'}</h2><p className="mt-5 text-sm leading-relaxed text-primary/70">{detail < 3 ? features[detail].detail : investorText}</p><div className="mt-6 flex flex-wrap gap-3">{detail === 1 && (["jarvis", "kage", "guider"] as const).map(name => <a key={name} href={pageHref(`#/systems/${name}`)} className="rounded-full border border-primary/20 px-4 py-2 text-xs text-primary">Explore {name.toUpperCase()} ↗</a>)}</div><a href={detail < 3 ? email : deck} className="mt-8 inline-flex items-center gap-3 text-sm">{detail < 3 ? 'Start a conversation' : 'Request the investor deck'} <ArrowRight size={18}/></a></>}</dialog>
  </>;
}

function currentSystem() { return resolvePage(window.location.pathname, window.location.hash); }
export default function App() {
  const [system, setSystem] = useState(currentSystem);
  const [revealed, setRevealed] = useState(() => currentSystem() === 'not-found');
  const [bootComplete, setBootComplete] = useState(() => currentSystem() === 'not-found');
  useEffect(() => {
    const update = () => setSystem(currentSystem());
    window.addEventListener('hashchange', update);
    return () => window.removeEventListener('hashchange', update);
  }, []);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    const metadata = pageMetadata(system);
    document.title = metadata.title;
    document.querySelector('meta[name=description]')?.setAttribute('content', metadata.description);
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', metadata.title);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', metadata.description);
    document.querySelector('meta[name=robots]')?.setAttribute('content', system === 'not-found' ? 'noindex, follow' : 'index, follow');
  }, [system]);
  return <>{revealed && <div className="website-shell"><GlassNavbar key={`nav-${system || 'home'}`} current={system === 'not-found' ? undefined : system || undefined}/><KatanaProgress key={`katana-${system || 'home'}`}/>{system === 'not-found' ? <NotFoundPage/> : system === 'team' ? <TeamPage/> : system ? <SystemPage key={`page-${system}`} system={system}/> : <HomePage/>}</div>}{!bootComplete && <VideoLoadingScreen onReveal={() => setRevealed(true)} onComplete={() => setBootComplete(true)}/>}</>;
}

