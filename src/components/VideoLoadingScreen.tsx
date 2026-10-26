import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { assetPath } from '../paths';

// Only the opening and first-screen hero need to finish before the handoff.
const media = [assetPath('media/intro-optimized.mp4'), assetPath('media/samurai.mp4')];
type Stage = 'loading' | 'playing' | 'handoff';

export default function VideoLoadingScreen({ onReveal, onComplete }: { onReveal: () => void; onComplete: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [progress, setProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [canPlay, setCanPlay] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');
  const [stage, setStage] = useState<Stage>('loading');
  const [needsPlay, setNeedsPlay] = useState(false);
  const [failed, setFailed] = useState(false);
  const revealed = useRef(false);
  const reduced = useReducedMotion();
  const reducedMotion = Boolean(reduced) || window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    const controller = new AbortController();
    const skipIntro = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const requiredMedia = skipIntro ? [assetPath('media/samurai-poster.jpg')] : media;
    const amounts = Array(requiredMedia.length + 1).fill(0);
    if (skipIntro) setCanPlay(true);
    let active = true;
    let introBlob = '';
    const timeout = setTimeout(() => {
      if (!active) return;
      setFailed(true);
      setLoaded(true);
      controller.abort();
    }, 25000);
    const update = () => { if (active) setProgress(Math.min(99, Math.floor(amounts.reduce((a, b) => a + b, 0) / amounts.length * 100))); };
    const preload = async (url: string, index: number) => {
      const response = await fetch(url, { signal: controller.signal });
      if (!response.ok) throw new Error('Media unavailable');
      const total = Number(response.headers.get('content-length'));
      const reader = response.body?.getReader();
      const chunks: Uint8Array[] = [];
      let received = 0;
      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          if (!skipIntro && index === 0) chunks.push(value);
          received += value.byteLength;
          amounts[index] = total ? Math.min(.99, received / total) : .5;
          update();
        }
      } else {
        const buffer = await response.arrayBuffer();
        if (!skipIntro && index === 0) chunks.push(new Uint8Array(buffer));
      }
      if (!skipIntro && index === 0 && active) {
        introBlob = URL.createObjectURL(new Blob(chunks as BlobPart[], { type: 'video/mp4' }));
        setVideoUrl(introBlob);
      }
      amounts[index] = 1;
      update();
    };
    const fonts = Promise.all([document.fonts.load('16px Almarai'), document.fonts.load('16px "Instrument Serif"')]).then(() => { amounts[requiredMedia.length] = 1; update(); });
    Promise.allSettled([...requiredMedia.map(preload), fonts]).then(results => {
      if (!active) return;
      clearTimeout(timeout);
      if (results.some(result => result.status === 'rejected')) setFailed(true);
      setLoaded(true);
    });
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      active = false;
      clearTimeout(timeout);
      controller.abort();
      if (introBlob) URL.revokeObjectURL(introBlob);
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  const handoff = () => {
    if (revealed.current) return;
    revealed.current = true;
    onReveal();
    setStage('handoff');
  };

  useEffect(() => {
    if (!loaded || !canPlay || failed) return;
    setProgress(100);
    const timer = setTimeout(() => {
      if (reducedMotion) { handoff(); return; }
      setStage('playing');
      videoRef.current?.play().catch(() => setNeedsPlay(true));
    }, 600);
    return () => clearTimeout(timer);
  }, [loaded, canPlay, failed, reducedMotion]);

  useEffect(() => {
    if (stage !== 'handoff') return;
    const timer = setTimeout(onComplete, reducedMotion ? 200 : 1200);
    return () => clearTimeout(timer);
  }, [stage, reducedMotion, onComplete]);

  return <motion.div className="video-loading-screen" role="dialog" aria-modal="true" aria-label="Benihime opening" data-stage={stage}
    initial={{ opacity: 1 }} animate={{ opacity: stage === 'handoff' ? 0 : 1 }} transition={{ duration: reducedMotion ? .2 : 1.1 }}>
    <motion.div className="intro-film" animate={stage === 'handoff' && !reducedMotion ? { x: '9vw', scaleX: .45, scaleY: .84 } : { x: 0, scaleX: 1, scaleY: 1 }} transition={{ duration: 1, ease: [.22, 1, .36, 1] }}>
      {videoUrl ? <motion.video ref={videoRef} src={videoUrl} poster={assetPath('media/intro-poster.webp')} muted playsInline preload="auto" onLoadedData={() => setCanPlay(true)} onEnded={handoff} onError={() => { setFailed(true); setLoaded(true); setStage('loading'); }} className="intro-video" initial={{ scale: 1.55 }} animate={{ scale: stage === 'loading' ? 1.55 : 1 }} transition={{ duration: reducedMotion ? 0 : 1.2, ease: 'easeOut' }}/> : <img src={assetPath('media/intro-poster.webp')} alt="Benihime katana and sheath" className="intro-video" style={{ transform: 'scale(1.55)' }}/>}
    </motion.div>
    {stage === 'loading' && <div className="intro-loading">
      <div className="intro-loading-label"><span>BENIHIME STUDIO</span><span aria-live="polite">{progress}%</span></div>
      <div className="intro-progress" role="progressbar" aria-label="Website loading" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress}><div style={{ width: `${progress}%` }}/></div>
      <p role={failed ? 'alert' : 'status'}>{failed ? 'Some media could not load. Retry, or enter the studio without the opening.' : progress === 100 ? 'Ready. Your story begins.' : 'Preparing your next chapter.'}</p>
      {loaded && failed && <div className="intro-recovery"><button type="button" className="intro-enter" onClick={() => window.location.reload()}>Retry loading</button><button type="button" className="intro-enter" onClick={handoff}>Enter the studio ↗</button></div>}
    </div>}
    {needsPlay && stage === 'playing' && <button className="intro-play" onClick={() => videoRef.current?.play().then(() => setNeedsPlay(false)).catch(() => setNeedsPlay(true))}>Play opening</button>}
  </motion.div>;
}
