const fs = require('fs');

['src/pages/works/pitch-analyzer/index.astro', 'src/pages/en/works/pitch-analyzer/index.astro'].forEach(p => {
    if (!fs.existsSync(p)) { console.warn('[Warning] File not found, skipping: ' + p); return; }
    let c = fs.readFileSync(p, 'utf8');
    if (!c.includes('hero-image')) {
        const isEn = p.includes('/en/');
        const imgPath = isEn ? '/images/works/pitchanalyzer/pitchanalyzer_en.webp' : '/images/works/pitchanalyzer/pitchanalyzer_ja.webp';
        const heroHtml = `
        <div class="hero-image animate-fade-up delay-4" style="margin-bottom: 2.5rem; border-radius: var(--border-radius); overflow: hidden; box-shadow: var(--neumorph-shadow-sm);">
            <img src="${imgPath}" alt="Pitch Analyzer Screenshot" style="width: 100%; height: auto; display: block;" />
        </div>

        <section `;
        c = c.replace(/<section\s+class="neumorph-card/, heroHtml + 'class="neumorph-card');
        fs.writeFileSync(p, c);
        console.log('Patched: ' + p);
    }
});
