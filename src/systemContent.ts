import { SystemName } from './components/GlassNavbar';
export const systems: Record<SystemName, { number: string; role: string; headline: string; description: string; demoTitle: string; demoText: string; benefits: { title: string; text: string }[]; next: SystemName }> = {
  kyo: {
    number: '01', role: 'Your adaptation director', headline: 'Your story. Now an episode.',
    description: 'Give KYO a finished manga, webtoon or novel. It helps shape that story into anime episodes—with scenes, voices, music and a rhythm you choose. The story stays yours.',
    demoTitle: 'A chapter becomes an episode.', demoText: 'One little adventure, told three ways. Choose the feeling, then watch the scenes unfold.',
    benefits: [{ title: 'Make a whole episode.', text: 'Turn a finished story into a watchable episode, with motion, sound and music.' }, { title: 'Set the feeling.', text: 'Choose the length, pace and moments that matter. KYO can suggest; you have the final say.' }, { title: 'Keep the story intact.', text: 'The characters, important events and choices you approve stay part of the story.' }], next: 'jarvis'
  },
  jarvis: {
    number: '02', role: 'Your animation partner', headline: 'A little movement. A lot of life.',
    description: 'Show JARVIS a performance, or describe a moment. It helps turn that movement and feeling into expressive animation—so your character does more than stand still.',
    demoTitle: 'Same action. A new kind of life.', demoText: 'Try a wave, a jump or a surprised reaction. The feeling carries into the animated character.',
    benefits: [{ title: 'Bring a performance.', text: 'Turn a person’s movement and expression into a stylized animated performance.' }, { title: 'Or bring an idea.', text: 'Describe what should happen and the emotion you want the scene to carry.' }, { title: 'Keep the feeling.', text: 'A happy wave stays happy. A startled reaction still feels like surprise.' }], next: 'kage'
  },
  kage: {
    number: '03', role: 'Your visual continuity partner', headline: 'The same hero. Every time.',
    description: 'KAGE helps your characters keep their faces, outfits and little details across panels and shots. When the story changes something—like an injury—it remembers that too.',
    demoTitle: 'Meet Mira. Still Mira.', demoText: 'A red scarf. Familiar hair. The same face. Follow her from the forest to the fight and the journey home.',
    benefits: [{ title: 'Keep the look you love.', text: 'Your approved character design and art style stay consistent from one image to the next.' }, { title: 'Remember what happened.', text: 'A bandage, a damaged outfit or a carried object follows the story into later scenes.' }, { title: 'Change just what you need.', text: 'Revise a panel or shot while keeping the details that are already right.' }], next: 'guider'
  },
  guider: {
    number: '04', role: 'Your story companion', headline: 'An idea becomes a story.',
    description: 'GUIDER helps you start a story, make an existing one stronger, or polish the words. It remembers your characters and what has happened, so the next scene belongs in the same story.',
    demoTitle: 'One idea. More possibilities.', demoText: 'Start small. Add a little wonder. Or simply make the words clearer. You decide what stays.',
    benefits: [{ title: 'Start something new.', text: 'Grow a small idea into characters, a world and scenes you can keep building on.' }, { title: 'Make your story stronger.', text: 'Improve a quiet middle or a character moment while keeping the ending you love.' }, { title: 'Polish without rewriting.', text: 'Clean up the language while preserving your meaning, voice and story.' }], next: 'align'
  },
  align: {
    number: '05', role: 'Your studio coordinator', headline: 'Everyone on the same page.',
    description: 'ALIGN is the planned coordinator for the Benihime studio. It helps keep everyone working on the same story and brings important decisions back to you.',
    demoTitle: 'One change. One shared story.', demoText: 'Mira gets hurt in the adventure. Give her a bandage and see that detail appear across the studio’s work.',
    benefits: [{ title: 'Keep the team together.', text: 'Help the story, pictures and animation stay connected to one shared project.' }, { title: 'Carry changes forward.', text: 'Keep agreed story details consistent as the studio’s work moves ahead.' }, { title: 'Leave the final say to you.', text: 'Bring the important decisions to the creator before they become part of the story.' }], next: 'kyo'
  }
};
