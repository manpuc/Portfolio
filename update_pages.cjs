const fs = require('fs');
const path = require('path');

const root = 'e:\\kuki\\Documents\\.Dev\\Portfolio\\src\\pages';

// 1. Update existing pages with images and correct URLs
const updates = {
    "Pitch-Analyzer": { dir: "pitchanalyzer", img: "/images/works/pitchanalyzer/pitchanalyzer", hasLocales: true },
    "Midi-DAW": { dir: "midi-daw", img: "/images/works/midi/midi", hasLocales: true },
    "pomodoro": { dir: "pomodoro", img: "/images/works/pomodoro/pomodoro", hasLocales: false },
    "ambient": { dir: "ambient", img: "/images/works/ambient/ambient", hasLocales: true },
    "text-flow": { dir: "text-flow", img: "/images/works/text/text", hasLocales: true },
    "pass-generator": { dir: "pass-generator", img: "/images/works/pass/pass", hasLocales: true },
    "md-preview": { dir: "md-preview", img: "/images/works/md/md", hasLocales: true }
};

function injectImage(filePath, imgSrc, isMbotStyle = false) {
    if (!fs.existsSync(filePath)) return;
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Remove old header closing and add image
    let imageHtml = "";
    if (isMbotStyle) {
        imageHtml = `
        <div
            class="hero-image animate-fade-up delay-4"
            style="margin-bottom: 2.5rem; border-radius: var(--border-radius); overflow: hidden; box-shadow: var(--neumorph-shadow-sm); position: relative; width: 100%; aspect-ratio: 21 / 9; display: flex; justify-content: center; align-items: center; background-color: var(--bg-color);"
        >
            <div
                style="position: absolute; inset: -40px; background-image: url('\${imgSrc}'); background-size: cover; background-position: center; filter: blur(30px); opacity: 0.5; z-index: 0;"
            >
            </div>
            <img
                src="\${imgSrc}"
                alt="Icon"
                style="position: relative; z-index: 1; height: 70%; width: auto; max-width: 100%; border-radius: 20%; box-shadow: 0 15px 35px rgba(0,0,0,0.3);"
            />
        </div>
`;
    } else {
        imageHtml = `
        <div
            class="hero-image animate-fade-up delay-4"
            style="margin-bottom: 2.5rem; border-radius: var(--border-radius); overflow: hidden; box-shadow: var(--neumorph-shadow-sm);"
        >
            <img
                src="\${imgSrc}"
                alt="Screenshot"
                style="width: 100%; height: auto; display: block;"
            />
        </div>
`;
    }

    if (!content.includes('class="hero-image"')) {
        content = content.replace('</header>', '</header>\n' + imageHtml);
        fs.writeFileSync(filePath, content);
    }
}

for (const [id, data] of Object.entries(updates)) {
    const jaPath = path.join(root, 'works', data.dir, 'index.astro');
    const enPath = path.join(root, 'en', 'works', data.dir, 'index.astro');
    
    injectImage(jaPath, data.hasLocales ? data.img + '_ja.webp' : data.img + '.webp');
    injectImage(enPath, data.hasLocales ? data.img + '_en.webp' : data.img + '.webp');
}

// 2. Create new Minecraft pages (ore-multiplier, hostile-illagers)
const mods = {
    "ore-multiplier": {
        title: "Ore Multiplier", descJa: "鉱石を倍増させるMinecraft Forge 1.20.1 MOD", descEn: "Ore multiplier mod for Minecraft Forge 1.20.1",
        url: "https://modrinth.com/mod/ore-multiplier", github: "", img: ""
    },
    "hostile-illagers": {
        title: "Illagers' Hostility", descJa: "イリジャーの敵対性を高めるMinecraft Forge 1.20.1 MOD", descEn: "A mod that increases Illagers' hostility for Minecraft Forge 1.20.1",
        url: "https://cdn.modrinth.com/data/wTsRPW6B/85ad8cc3f5b7dd6d2935629955bf9898f4791475_96.webp", github: "", img: "https://cdn.modrinth.com/data/wTsRPW6B/85ad8cc3f5b7dd6d2935629955bf9898f4791475_96.webp"
    }
};

const createModPage = (id, isEn) => {
    const d = mods[id];
    return \`---
import Layout from "\${isEn ? '../../../../layouts/Layout.astro' : '../../../layouts/Layout.astro'}";
import { works } from "\${isEn ? '../../../../data/works' : '../../../data/works'}";

const workId = "\${id}";
const work = works.find((w) => w.id === workId);
const appUrl = work?.href || "\${d.url}";
---

<Layout
    title={\`\${work?.title?.\${isEn ? 'en' : 'ja'} || "\${d.title}"} - Works | manpuc\`}
    description={work?.description?.\${isEn ? 'en' : 'ja'} || "\${isEn ? d.descEn : d.descJa}"}
    lang="\${isEn ? 'en' : 'ja'}"
>
    <div class="container main-content">
        <div class="back-nav animate-fade-up">
            <a href="\${isEn ? '/en/works/' : '/works/'}" class="back-link">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                \${isEn ? 'Back to Works' : 'Works一覧に戻る'}
            </a>
        </div>

        <header style="display: flex; flex-direction: column; align-items: flex-start; gap: 0; padding: 2.5rem 0 1.5rem;">
            <h1 class="animate-fade-up delay-1" style="margin: 0; font-size: clamp(2.5rem, 5vw, 3.5rem); line-height: 1.2; letter-spacing: -0.02em;">
                {work?.title?.\${isEn ? 'en' : 'ja'} || "\${d.title}"}
            </h1>
            <p class="subtitle animate-fade-up delay-2" style="margin: 0.75rem 0 0; font-size: clamp(1.1rem, 2vw, 1.25rem); opacity: 0.8; font-weight: 500;">
                Minecraft Forge Mod
            </p>
            {work?.tags && (
                <div class="tags animate-fade-up delay-3" style="margin-top: 1.5rem; display: flex; gap: 0.5rem; flex-wrap: wrap;">
                    {work.tags.map((tag) => (
                        <span class="tag" style="font-size: 0.85rem; padding: 0.3rem 0.8rem;">{tag}</span>
                    ))}
                </div>
            )}
            <div class="action-buttons animate-fade-up delay-4" style="display: flex; gap: 1rem; margin-top: 2.5rem; flex-wrap: wrap;">
                \${d.url.includes('modrinth') ? \`<a href={appUrl} target="_blank" rel="noopener noreferrer" class="neumorph-btn" style="display: inline-flex; gap: 0.5rem; align-items: center; color: var(--primary);">
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                    \${isEn ? 'Open Modrinth' : 'Modrinthを開く'}
                </a>\` : ''}
            </div>
        </header>

        \${d.img ? \`
        <div class="hero-image animate-fade-up delay-4" style="margin-bottom: 2.5rem; border-radius: var(--border-radius); overflow: hidden; box-shadow: var(--neumorph-shadow-sm); position: relative; width: 100%; aspect-ratio: 21 / 9; display: flex; justify-content: center; align-items: center; background-color: var(--bg-color);">
            <div style="position: absolute; inset: -40px; background-image: url('\${d.img}'); background-size: cover; background-position: center; filter: blur(30px); opacity: 0.5; z-index: 0;"></div>
            <img src="\${d.img}" alt="Icon" style="position: relative; z-index: 1; height: 70%; width: auto; max-width: 100%; border-radius: 20%; box-shadow: 0 15px 35px rgba(0,0,0,0.3);" />
        </div>\` : ''}

        <section class="neumorph-card animate-fade-up delay-5" style="margin-bottom: 0;">
            <h2>\${isEn ? 'Overview' : '機能概要'}</h2>
            <p>
                <strong>{work?.title?.\${isEn ? 'en' : 'ja'} || "\${d.title}"}</strong> \${isEn ? 'is a ' + d.descEn.toLowerCase() : 'は、' + d.descJa + 'です。'}
            </p>
        </section>
    </div>
</Layout>
\`;
}

for (const id of Object.keys(mods)) {
    const dirName = id;
    const jaDir = path.join(root, 'works', dirName);
    if (!fs.existsSync(jaDir)) fs.mkdirSync(jaDir, { recursive: true });
    fs.writeFileSync(path.join(jaDir, 'index.astro'), createModPage(id, false));
    
    const enDir = path.join(root, 'en', 'works', dirName);
    if (!fs.existsSync(enDir)) fs.mkdirSync(enDir, { recursive: true });
    fs.writeFileSync(path.join(enDir, 'index.astro'), createModPage(id, true));
}

// 3. Delete minecraft-mod
const modJaDir = path.join(root, 'works', 'minecraft-mod');
const modEnDir = path.join(root, 'en', 'works', 'minecraft-mod');
if (fs.existsSync(modJaDir)) fs.rmSync(modJaDir, { recursive: true, force: true });
if (fs.existsSync(modEnDir)) fs.rmSync(modEnDir, { recursive: true, force: true });

console.log('Update complete.');
