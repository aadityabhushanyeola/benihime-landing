# Benihime Studio

React 18 + Vite + TypeScript + Tailwind CSS website.

Run `npm.cmd run dev`. Production build: `npm.cmd run build`.

## Publishing

The repository includes a GitHub Pages workflow in `.github/workflows/deploy.yml`. It builds the site whenever `main` is pushed, using the repository name as the Pages path so media and hash-route links also work at a project URL. In the repository's **Settings → Pages**, select **GitHub Actions** as the publishing source. The workflow publishes only the built `dist` folder. The `.gitignore` excludes internal PDFs, the architecture archive, raw source videos in the project root, and temporary files from GitHub.

When `benihime.co.in` is ready to point to GitHub Pages, configure that custom domain in Pages and set repository Actions variables `SITE_BASE_PATH=/` and `SITE_PUBLIC_URL=https://benihime.co.in/`, then redeploy. Configure DNS at the domain registrar according to GitHub's Pages instructions. Until then, the workflow uses the working `github.io` project URL in its social-sharing metadata.

The homepage keeps the cinematic template: inset samurai-video hero, oversized cream wordmark, centered About card, four-column Features grid, and footer. On a fresh page load, the first frame of the intro stays paused while the optimized opening, first-screen hero and fonts load. The progress bar tracks those resources and waits for the opening video to be ready. At 100%, the intro plays once and moves into the right-edge katana scroll indicator. Route changes do not replay the intro. Reduced-motion users load a still hero poster and get a short fade without downloading the opening or background videos.

Our Team has its own `/#/team` page and a separate navbar link before Contact us. Names use plain text with normal spacing. Name asterisks have been removed. The feature card uses the selected Tenor animation as a local MP4, with the caption “Your manga. Brought to life.” Source: https://tenor.com/view/baal-genshin-impact-gif-22525631.

The shared iOS-style glass navbar links to five service pages. Hash routes work on static hosting and can be opened directly:

- `/#/systems/kyo` — finished story to episode, with a selectable mood and three-scene preview.
- `/#/systems/jarvis` — performance to expressive animation, with wave, jump and surprise controls.
- `/#/systems/kage` — character consistency, with the same scarf and a bandage carried into later scenes.
- `/#/systems/guider` — story creation, improvement and language polishing, with three illustrative examples.
- `/#/systems/align` — the planned studio coordinator, showing one approved detail across story, picture, performance and episode.

All service pages share the dark-and-cream typography, rounded cards, spacing and footer. Demos use fictional, hardcoded examples; they do not call AI services or reveal system mechanisms. ALIGN is described as planned because its dedicated specification is not complete.

Content references include the supplied `benihime-architecture-main.zip` architecture documentation and the local KAGE, JARVIS, KYO and GUIDER PDFs. Extracted reference text is retained under `tmp/docs` and is not bundled into the public website. Company, founders, contact and investor content on the homepage came from https://benihime2027.github.io/.

## Site quality audit

Every page uses the browser title “Benihime Studio” and retains its own meta description. The favicon uses the company’s circular logo. Unknown hashes and paths show a custom 404 with recovery links, and `dist/404.html` provides a standalone fallback for static hosts. Static hosting must serve that file for unknown paths; the Vite development server instead renders the SPA 404.

The mobile menu closes on link selection, Escape, outside clicks and desktop resizing. It scrolls within short screens. Footer links lead to existing pages. The brand links to Home. Both public phone numbers use `tel:` links and the email uses `mailto:`. Copy email has accessible success and error feedback; email links open the user's email app and do not claim to send messages. Media loading failures offer retry and entry without the intro. A render-error boundary offers reload or Home.

Copyright years use the current year in Asia/Kolkata. The loading poster is 81,726 bytes in WebP versus the original 149,358-byte JPEG (45% smaller). The 1080p intro was recompressed from 6,564,189 to 4,049,185 bytes; the original remains only in the local workspace and is excluded from the GitHub upload. The feature video loads when its card approaches the viewport, after the opening handoff. Decorative feature icons are inline SVGs rather than remote 1280px raster requests. Fictional service demos remain intentionally labeled illustrative; no lorem ipsum or temporary product text is displayed.

The 1200 × 630 social preview at `public/media/social-preview.jpg` uses the approved company logo, and Open Graph/Twitter metadata targets `https://benihime.co.in/`. The image URL will work for social crawlers after this build is deployed at that domain. Anchor links clear the fixed navbar, small secondary text has stronger contrast, and team cards have less empty space.

Media rights check: the opening sword video was confirmed cleared by the project owner. Clearance for the samurai video is not yet documented. The Genshin/Tenor feature clip is retained at the project owner’s request, but no commercial-use permission has been established: [Tenor’s terms](https://tenor.com/legal-terms) prohibit commercial use of Tenor, and [HoYoverse’s game terms](https://genshin.hoyoverse.com/en-us/company/terms) require permission for use of its copyrighted material. Replace the clip or obtain the necessary permissions before a public commercial launch.

Validated all seven content pages at 320px, 768px and 1440px; no horizontal scrolling, clipped main text, or missing home anchors. Footer navigation, metadata, phone links, 404 recovery, mobile menu dismissal and email-copy success were checked in the browser. Production builds include the favicon and standalone 404.

This site uses hash routes. Descriptions update in the rendered app; crawlers that do not execute JavaScript see the static homepage metadata. Separate server-rendered service metadata would require a different routing/hosting setup.
