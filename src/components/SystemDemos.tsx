import { useEffect, useId, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Check, LockKeyhole, Pause, Play, Sparkles } from 'lucide-react';
import { SystemName } from './GlassNavbar';

type Action = 'wave' | 'jump' | 'surprise';
function Character({ bandage = false, scarf = '#B7484D', scene = 0, action, playing = false, plain = false }: { bandage?: boolean; scarf?: string; scene?: number; action?: Action; playing?: boolean; plain?: boolean }) {
  const reduced = useReducedMotion();
  const move = playing && !reduced;
  const id = useId().replace(/:/g, '');
  return <svg viewBox="0 0 260 230" className="demo-character" aria-hidden="true">
    <defs><radialGradient id={`scene-${id}`}><stop stopColor={plain ? '#30302B' : '#2E3B32'}/><stop offset="1" stopColor="#131513"/></radialGradient></defs>
    <rect width="260" height="230" fill={`url(#scene-${id})`}/>
    {!plain && <g opacity=".22" stroke="#DEDBC8" fill="none" strokeWidth="1">{scene === 0 ? <><path d="M30 190V60L10 100M30 80L52 40M230 200V50L210 90M230 72L250 30"/><path d="M5 210Q130 180 255 210"/></> : scene === 1 ? <><path d="M20 205L35 95L65 205M195 205L218 72L245 205"/><path d="M5 215H255"/></> : <><path d="M20 205V150L55 115L90 150V205M190 205V140L220 110L250 140V205"/><path d="M8 210H252"/></>}</g>}
    <ellipse cx="130" cy="211" rx="42" ry="6" fill="#000" opacity=".4"/>
    <motion.g animate={move && action === 'jump' ? { y: [0, -30, 0] } : { y: 0 }} transition={{ duration: 1.1, repeat: move && action === 'jump' ? Infinity : 0, repeatDelay: .35, ease: 'easeInOut' }}>
      <path d="M112 174L106 207M146 174L153 207" stroke={plain ? '#B5B5AD' : '#DEDBC8'} strokeWidth="10" strokeLinecap="round"/>
      <path d="M99 137Q130 116 158 137L153 181H108Z" fill={plain ? '#8F928A' : '#727D68'} stroke="#111" strokeWidth="2"/>
      <path d="M106 140L90 165" stroke={plain ? '#B5B5AD' : '#DEDBC8'} strokeWidth="9" strokeLinecap="round"/>
      <motion.g style={{ transformOrigin: '153px 140px' }} animate={move && action === 'wave' ? { rotate: [-22, 14, -22] } : { rotate: 0 }} transition={{ duration: .9, repeat: move && action === 'wave' ? Infinity : 0 }}><path d={action === 'wave' ? 'M153 140L172 115L172 91' : 'M153 140L170 165'} fill="none" stroke={plain ? '#B5B5AD' : '#DEDBC8'} strokeWidth="9" strokeLinecap="round"/></motion.g>
      <path d="M101 119Q130 109 157 121L148 137L107 131Z" fill={plain ? '#777D76' : scarf}/>
      <path d="M148 127L166 157L150 153L140 130Z" fill={plain ? '#777D76' : scarf}/>
      <ellipse cx="130" cy="89" rx="29" ry="34" fill={plain ? '#CBCBC3' : '#E1D8BF'} stroke="#121212" strokeWidth="2"/>
      {plain ? <path d="M103 75Q130 49 155 76L150 65Q131 45 111 62Z" fill="#72766D"/> : <path d="M99 84L103 59L115 65L124 44L136 60L149 52L161 86L149 75L138 83L125 70L116 84L109 75Z" fill="#0D1010"/>}
      <ellipse cx="119" cy="91" rx={action === 'surprise' ? 4 : 2.5} ry={action === 'surprise' ? 5 : 3} fill="#171717"/><ellipse cx="140" cy="91" rx={action === 'surprise' ? 4 : 2.5} ry={action === 'surprise' ? 5 : 3} fill="#171717"/>
      {action === 'surprise' ? <ellipse cx="130" cy="108" rx="4" ry="5" fill="#171717"/> : <path d="M124 108Q130 113 136 107" fill="none" stroke="#171717" strokeWidth="1.5" strokeLinecap="round"/>}
      <path d="M145 99L150 107" stroke="#AC5C52" strokeWidth="2"/>
      {bandage && <g><rect x="100" y="73" width="58" height="10" rx="2" fill="#EDEBDC" stroke="#171717"/><path d="M116 73V83M125 73V83M134 73V83M143 73V83" stroke="#B7B4A2" strokeWidth=".8"/></g>}
    </motion.g>
    {action === 'surprise' && !plain && <motion.g animate={move ? { opacity: [0.3, 1, 0.3] } : { opacity: 1 }} transition={{ duration: 1.4, repeat: move ? Infinity : 0 }} stroke="#DEDBC8" strokeWidth="2" strokeLinecap="round"><path d="M176 62L187 48M183 76L199 73M170 46L174 31"/></motion.g>}
  </svg>;
}
function Toggle({ children, selected, onClick }: { children: React.ReactNode; selected: boolean; onClick: () => void }) { return <button className={`demo-toggle ${selected ? 'selected' : ''}`} aria-pressed={selected} onClick={onClick}>{children}</button>; }

function KyoDemo() {
  const [mood, setMood] = useState('Adventure');
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const scenes = ['Mira finds a key.', 'A door opens in the forest.', 'She returns with a new friend.'];
  useEffect(() => { if (!playing) return; const timer = setTimeout(() => { if (active === 2) setPlaying(false); else setActive(active + 1); }, 1800); return () => clearTimeout(timer); }, [playing, active]);
  return <><div className="demo-toolbar"><span>Choose the feeling</span><div className="demo-options">{['Gentle', 'Adventure', 'Exciting'].map(item => <Toggle key={item} selected={mood === item} onClick={() => { setMood(item); setActive(0); setPlaying(false); }}>{item}</Toggle>)}</div></div><div className="kyo-preview"><div className="demo-source"><span className="demo-label">Your chapter</span><div className="chapter-cover"><span className="chapter-star">*</span><span>THE FOREST<br/>KEY</span><small>A story about Mira</small></div><p>She finds a key, opens a door and makes a friend.</p></div><div className="episode-preview"><div className="episode-top"><span className="demo-label">Your episode</span><span className="demo-chip">{mood} · {mood === 'Gentle' ? '18' : mood === 'Adventure' ? '24' : '20'} min</span></div><div className="episode-stage"><AnimatePresence mode="wait"><motion.div key={`${active}-${mood}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .3 }}><Character scene={active} action={active === 1 ? 'surprise' : 'wave'} playing={playing}/></motion.div></AnimatePresence><span className="scene-caption">{scenes[active]}</span></div><div className="episode-scenes">{scenes.map((scene, index) => <button key={scene} className={index === active ? 'active' : ''} aria-pressed={index === active} aria-label={scene} onClick={() => { setActive(index); setPlaying(false); }}><span>0{index + 1}</span>{['The discovery', 'The doorway', 'A new friend'][index]}</button>)}</div><button className="demo-play" onClick={() => { if (!playing && active === 2) setActive(0); setPlaying(!playing); }}>{playing ? <Pause size={15}/> : <Play size={15}/>} {playing ? 'Pause' : 'Play the episode preview'}</button></div></div><div className="demo-footnote"><LockKeyhole size={13}/>Same key. Same adventure. Same ending. You choose how it feels.</div></>;
}
function KageDemo() {
  const [consistent, setConsistent] = useState(true);
  const [injury, setInjury] = useState(false);
  return <><div className="demo-toolbar"><div className="demo-options"><Toggle selected={consistent} onClick={() => setConsistent(!consistent)}>{consistent ? <Check size={14}/> : <XMark/>}Keep the same look</Toggle><Toggle selected={injury} onClick={() => setInjury(!injury)}>Remember the bandage</Toggle></div></div><div className="character-scenes">{['In the forest', 'After the fight', 'On the way home'].map((label, index) => <div key={label} className="character-scene"><span className="demo-label">SCENE 0{index + 1}</span><Character scene={index} scarf={consistent || index === 0 ? '#B7484D' : index === 1 ? '#547DA0' : '#699064'} bandage={injury && index > 0}/><p>{label}</p><span className="scene-detail">{injury && index > 0 ? 'Same hero. Bandage remembered.' : consistent ? 'Same face. Same red scarf.' : index === 0 ? 'The original red scarf.' : 'Oops—the scarf changed.'}</span></div>)}</div><p className="demo-footnote" aria-live="polite">{injury ? 'Mira gets a bandage in scene 2. It stays with her in scene 3.' : consistent ? 'Mira looks like Mira, wherever the story takes her.' : 'Turn “Keep the same look” back on to bring Mira’s red scarf back.'}</p></>;
}
function XMark() { return <span aria-hidden="true">×</span>; }
function JarvisDemo() {
  const [action, setAction] = useState<Action>('wave');
  const [playing, setPlaying] = useState(false);
  return <><div className="demo-toolbar"><span>Choose a moment</span><div className="demo-options">{(['wave', 'jump', 'surprise'] as Action[]).map(item => <Toggle key={item} selected={action === item} onClick={() => setAction(item)}>{item === 'wave' ? 'A happy wave' : item === 'jump' ? 'A little jump' : 'A surprise'}</Toggle>)}</div></div><div className="performance-pair"><div><span className="demo-label">A simple performance</span><Character plain action={action} playing={playing}/><p>The movement you bring.</p></div><ArrowRight className="performance-arrow" size={24}/><div><span className="demo-label">An animated character</span><Character action={action} playing={playing}/><p>The feeling brought to life.</p></div></div><div className="demo-bottom"><button className="demo-play" onClick={() => setPlaying(!playing)}>{playing ? <Pause size={15}/> : <Play size={15}/>} {playing ? 'Pause movement' : 'Bring it to life'}</button><span className="demo-footnote" role="status" aria-live="polite">{playing ? "Animation playing. Choose another moment or pause." : "Ready. Choose a moment, then bring it to life."}</span></div></>;
}
const storyModes = {
  Start: { before: 'A girl finds a key in the forest.', after: ['Mira finds a tiny silver key.', 'It opens a door hidden in an old tree.', 'Inside, she meets a fox who has been waiting for a friend.'], note: 'A little idea becomes a beginning, a discovery and an ending.' },
  Improve: { before: 'Mira finds a key. She opens a door. She meets a fox.', after: ['Mira follows a trail of glowing leaves to a silver key.', 'The door only opens when she promises to be kind.', 'She keeps her promise—and finds a friend on the other side.'], note: 'A richer adventure. The same friendship at the end.' },
  Polish: { before: 'mira find a key. she open the tree door and meet a fox.', after: ['Mira finds a key.', 'She opens the door in the tree.', 'Inside, she meets a fox.'], note: 'Clearer words. The same story.' }
};
function GuiderDemo() {
  const [mode, setMode] = useState<keyof typeof storyModes>('Start');
  const story = storyModes[mode];
  return <><div className="demo-toolbar"><span>What would you like to do?</span><div className="demo-options">{(['Start', 'Improve', 'Polish'] as const).map(item => <Toggle key={item} selected={mode === item} onClick={() => setMode(item)}>{item === 'Start' ? 'Start a story' : item === 'Improve' ? 'Make it richer' : 'Polish the words'}</Toggle>)}</div></div><div className="story-preview"><div className="story-input"><span className="demo-label">Your idea</span><span className="story-quote">“</span><p>{story.before}</p><span className="demo-chip"><LockKeyhole size={12}/>A friendship at the end</span></div><div className="story-pages" aria-live="polite">{story.after.map((text, index) => <motion.div key={`${mode}-${index}`} className="story-page" initial={{ opacity: .4 }} animate={{ opacity: 1 }} transition={{ duration: .3, delay: index * .08 }}><span>0{index + 1}</span><p>{text}</p><span className="story-illustration">{['✧', '⌑', '♡'][index]}</span></motion.div>)}</div></div><p className="demo-footnote"><Sparkles size={13}/>{story.note}</p></>;
}
function AlignDemo() {
  const [bandage, setBandage] = useState(false);
  return <><div className="demo-toolbar"><span>One adventure. One team.</span><Toggle selected={bandage} onClick={() => setBandage(!bandage)}>{bandage ? <Check size={14}/> : <Sparkles size={14}/>} {bandage ? 'Bandage added everywhere' : 'Give Mira a bandage'}</Toggle></div><div className="studio-deliverables"><div className="studio-story"><span className="demo-label">GUIDER · The story</span><p>“Mira steps through the forest{bandage ? ', a fresh bandage wrapped around her forehead' : ', her red scarf fluttering behind her'}.”</p><span className="studio-ok"><Check size={13}/>The story remembers.</span></div><div><span className="demo-label">KAGE · The picture</span><Character bandage={bandage}/><span className="studio-ok"><Check size={13}/>The picture matches.</span></div><div><span className="demo-label">JARVIS · The performance</span><Character bandage={bandage} action="wave"/><span className="studio-ok"><Check size={13}/>The character matches.</span></div><div className="studio-episode"><span className="demo-label">KYO · The episode</span><div className="mini-reel"><Check size={25}/><span className="demo-chip">Episode preview</span><span>The forest adventure</span><small>{bandage ? 'Mira wears her bandage.' : 'Mira wears her red scarf.'}</small></div><span className="studio-ok"><Check size={13}/>The episode stays in sync.</span></div></div><div className="demo-footnote" aria-live="polite"><LockKeyhole size={13}/>{bandage ? 'One agreed change, carried through the same adventure.' : 'Every part of the studio tells the same story.'} Your approval comes first.</div></>;
}
export function SystemDemo({ system }: { system: SystemName }) { return system === 'kyo' ? <KyoDemo/> : system === 'jarvis' ? <JarvisDemo/> : system === 'kage' ? <KageDemo/> : system === 'guider' ? <GuiderDemo/> : <AlignDemo/>; }
