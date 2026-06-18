const fs = require('fs');

const targetUrl = 'https://cdn.modrinth.com/data/o4l55ob1/730ea4dda3281cedf3d31acb800eb3b07d108607_96.webp';

['src/pages/works/ore-multiplier/index.astro', 'src/pages/en/works/ore-multiplier/index.astro'].forEach(p => {
    if (!fs.existsSync(p)) { console.warn('[Warning] File not found, skipping: ' + p); return; }
    let c = fs.readFileSync(p, 'utf8');

    // Replace all instances of MBot icon paths with the new URL
    c = c.split('/images/works/mbot/MbotIcon2_.png').join(targetUrl);

    fs.writeFileSync(p, c);
    console.log('Patched: ' + p);
});
