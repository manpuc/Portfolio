const fs = require('fs');

function patchFile(path, replacer) {
    if (!fs.existsSync(path)) return;
    let content = fs.readFileSync(path, 'utf8');
    let newContent = replacer(content);
    if (content !== newContent) {
        fs.writeFileSync(path, newContent);
        console.log('Patched: ' + path);
    }
}

// 1. chrome-theme (Tokyo Night Theme)
const chromePaths = ['src/pages/works/chrome-theme/index.astro', 'src/pages/en/works/chrome-theme/index.astro'];
chromePaths.forEach(p => patchFile(p, (c) => {
    c = c.replace('/images/works/chrome-theme/screenshot.webp', '/images/works/google-search-night/screenshot.webp');
    if (!c.includes('changelog-timeline')) {
        const isEn = p.includes('/en/');
        const changelogHtml = `
            <h3 style="margin-top: 2rem;">${isEn ? 'Version History' : '変更履歴'}</h3>
            <div class="changelog-timeline" style="position: relative; padding-left: 1.5rem; display: flex; flex-direction: column; gap: 1.5rem; margin-top: 1rem;">
                <div style="position: absolute; top: 0.5rem; bottom: 0.5rem; left: 6px; width: 2px; background-color: rgba(128, 128, 128, 0.2); z-index: 1;"></div>
                
                <div class="changelog-item" style="position: relative; z-index: 2;">
                    <div style="position: absolute; left: -1.5rem; top: 0.4rem; width: 12px; height: 12px; border-radius: 50%; background-color: var(--bg-color); border: 2px solid var(--primary); transform: translateX(1px); box-shadow: 0 0 0 2px var(--bg-color);"></div>
                    <div style="font-weight: 600; color: var(--text-color);">${isEn ? 'Initial Release' : '初版リリース'} <span style="font-size: 0.85em; color: var(--text-muted); margin-left: 0.5rem; font-weight: normal;">(2023/11/05)</span></div>
                    <div style="font-size: 0.95em; color: var(--text-muted); margin-top: 0.25rem;">${isEn ? 'Project published.' : 'プロジェクトを公開しました。'}</div>
                </div>
            </div>
        </section>`;
        c = c.replace('</section>', changelogHtml);
    }
    return c;
}));

// 2. pitch-analyzer
const pitchPaths = ['src/pages/works/pitch-analyzer/index.astro', 'src/pages/en/works/pitch-analyzer/index.astro'];
pitchPaths.forEach(p => patchFile(p, (c) => {
    if (!c.includes('hero-image')) {
        const isEn = p.includes('/en/');
        const imgPath = isEn ? '/images/works/pitchanalyzer/pitchanalyzer_en.webp' : '/images/works/pitchanalyzer/pitchanalyzer_ja.webp';
        const heroHtml = `
        <div class="hero-image animate-fade-up delay-4" style="margin-bottom: 2.5rem; border-radius: var(--border-radius); overflow: hidden; box-shadow: var(--neumorph-shadow-sm);">
            <img src="${imgPath}" alt="Pitch Analyzer Screenshot" style="width: 100%; height: auto; display: block;" />
        </div>

        <section class="neumorph-card`;
        c = c.replace('<section class="neumorph-card', heroHtml);
    }
    return c;
}));

// 3. hostile-illagers
const hostilePaths = ['src/pages/works/hostile-illagers/index.astro', 'src/pages/en/works/hostile-illagers/index.astro'];
hostilePaths.forEach(p => patchFile(p, (c) => {
    if (!c.includes('changelog-timeline')) {
        const isEn = p.includes('/en/');
        const changelogHtml = `
            <h3 style="margin-top: 2rem;">${isEn ? 'Version History' : '変更履歴'}</h3>
            <div class="changelog-timeline" style="position: relative; padding-left: 1.5rem; display: flex; flex-direction: column; gap: 1.5rem; margin-top: 1rem;">
                <div style="position: absolute; top: 0.5rem; bottom: 0.5rem; left: 6px; width: 2px; background-color: rgba(128, 128, 128, 0.2); z-index: 1;"></div>
                
                <div class="changelog-item" style="position: relative; z-index: 2;">
                    <div style="position: absolute; left: -1.5rem; top: 0.4rem; width: 12px; height: 12px; border-radius: 50%; background-color: var(--bg-color); border: 2px solid var(--primary); transform: translateX(1px); box-shadow: 0 0 0 2px var(--bg-color);"></div>
                    <div style="font-weight: 600; color: var(--text-color);">${isEn ? 'Initial Release' : '初版リリース'} <span style="font-size: 0.85em; color: var(--text-muted); margin-left: 0.5rem; font-weight: normal;">(2023/11/05)</span></div>
                    <div style="font-size: 0.95em; color: var(--text-muted); margin-top: 0.25rem;">${isEn ? 'Project published.' : 'プロジェクトを公開しました。'}</div>
                </div>
            </div>
        </section>`;
        c = c.replace('</section>', changelogHtml);
    }
    return c;
}));

// 4. ore-multiplier
const orePaths = ['src/pages/works/ore-multiplier/index.astro', 'src/pages/en/works/ore-multiplier/index.astro'];
orePaths.forEach(p => patchFile(p, (c) => {
    if (!c.includes('changelog-timeline')) {
        const isEn = p.includes('/en/');
        const changelogHtml = `
            <h3 style="margin-top: 2rem;">${isEn ? 'Version History' : '変更履歴'}</h3>
            <div class="changelog-timeline" style="position: relative; padding-left: 1.5rem; display: flex; flex-direction: column; gap: 1.5rem; margin-top: 1rem;">
                <div style="position: absolute; top: 0.5rem; bottom: 0.5rem; left: 6px; width: 2px; background-color: rgba(128, 128, 128, 0.2); z-index: 1;"></div>
                
                <div class="changelog-item" style="position: relative; z-index: 2;">
                    <div style="position: absolute; left: -1.5rem; top: 0.4rem; width: 12px; height: 12px; border-radius: 50%; background-color: var(--bg-color); border: 2px solid var(--primary); transform: translateX(1px); box-shadow: 0 0 0 2px var(--bg-color);"></div>
                    <div style="font-weight: 600; color: var(--text-color);">${isEn ? 'Initial Release' : '初版リリース'} <span style="font-size: 0.85em; color: var(--text-muted); margin-left: 0.5rem; font-weight: normal;">(2023/11/04)</span></div>
                    <div style="font-size: 0.95em; color: var(--text-muted); margin-top: 0.25rem;">${isEn ? 'Project published.' : 'プロジェクトを公開しました。'}</div>
                </div>
            </div>
        </section>`;
        c = c.replace('</section>', changelogHtml);
    }
    return c;
}));
