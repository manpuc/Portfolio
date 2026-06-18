const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, 'src', 'pages');

const updates = {
    "pitchanalyzer": { img: "/images/works/pitchanalyzer/pitchanalyzer", hasLocales: true },
    "midi-daw": { img: "/images/works/midi/midi", hasLocales: true },
    "pomodoro": { img: "/images/works/pomodoro/pomodoro", hasLocales: false },
    "ambient": { img: "/images/works/ambient/ambient", hasLocales: true },
    "text-flow": { img: "/images/works/text/text", hasLocales: true },
    "pass-generator": { img: "/images/works/pass/pass", hasLocales: true },
    "md-preview": { img: "/images/works/md/md", hasLocales: true }
};

function injectImage(filePath, imgSrc) {
    if (!fs.existsSync(filePath)) {
        console.warn('[Warning] File not found, skipping: ' + filePath);
        return;
    }
    let content = fs.readFileSync(filePath, 'utf8');

    let imageHtml = `
        <div
            class="hero-image animate-fade-up delay-4"
            style="margin-bottom: 2.5rem; border-radius: var(--border-radius); overflow: hidden; box-shadow: var(--neumorph-shadow-sm);"
        >
            <img
                src="${imgSrc}"
                alt="Screenshot"
                style="width: 100%; height: auto; display: block;"
            />
        </div>
`;

    if (!content.includes('class="hero-image"')) {
        content = content.replace('</header>', '</header>\\n' + imageHtml);
        fs.writeFileSync(filePath, content);
    }
}

for (const [dir, data] of Object.entries(updates)) {
    const jaPath = path.join(root, 'works', dir, 'index.astro');
    const enPath = path.join(root, 'en', 'works', dir, 'index.astro');

    injectImage(jaPath, data.hasLocales ? data.img + '_ja.webp' : data.img + '.webp');
    injectImage(enPath, data.hasLocales ? data.img + '_en.webp' : data.img + '.webp');
}

console.log("Updated images successfully.");
