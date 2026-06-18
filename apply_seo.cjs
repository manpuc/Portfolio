const fs = require('fs');
const path = require('path');

const worksDirJa = path.join(__dirname, 'src', 'pages', 'works');
const worksDirEn = path.join(__dirname, 'src', 'pages', 'en', 'works');

// Helper to check if screenshot exists
function getImagePath(workId, lang) {
    const suffix = lang === 'ja' ? 'ja' : 'en';
    const screenshotPath = path.join(__dirname, 'public', 'images', 'works', workId.toLowerCase(), `screenshot_${suffix}.webp`);
    if (fs.existsSync(screenshotPath)) {
        return `/images/works/${workId.toLowerCase()}/screenshot_${suffix}.webp`;
    }
    // Fallback to ja if en doesn't exist
    const screenshotPathJa = path.join(__dirname, 'public', 'images', 'works', workId.toLowerCase(), `screenshot_ja.webp`);
    if (fs.existsSync(screenshotPathJa)) {
        return `/images/works/${workId.toLowerCase()}/screenshot_ja.webp`;
    }
    return null;
}

function processFile(filePath, workId, lang) {
    if (!fs.existsSync(filePath)) return;

    let content = fs.readFileSync(filePath, 'utf-8');

    // Check if already has structuredData to avoid duplicates
    if (content.includes('const structuredData = {')) {
        console.log(`Skipping ${filePath} - already processed`);
        return;
    }

    const imagePath = getImagePath(workId, lang);
    const imageUrl = imagePath ? `https://manpuc.me${imagePath}` : `https://manpuc.me/avatar.webp`;

    // Extract title and description from existing Layout tag if possible
    let titleMatch = content.match(/title="([^"]+)"/);
    let descMatch = content.match(/description="([^"]+)"/);

    const title = titleMatch ? titleMatch[1] : `${workId} - Works | manpuc`;
    const description = descMatch ? descMatch[1] : `Details for ${workId}`;

    // Create structured data string
    const structuredDataStr = `
const structuredData = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": ${JSON.stringify(title)},
    "description": ${JSON.stringify(description)},
    "url": "https://manpuc.me${lang === 'en' ? '/en' : ''}/works/${workId.toLowerCase()}/",
    "image": "${imageUrl}",
    "author": {
        "@type": "Person",
        "name": "manpuc"
    }
};
`;

    // Insert structuredData before ---
    const frontmatterEndIndex = content.indexOf('---', 3); // find second ---
    if (frontmatterEndIndex !== -1) {
        content = content.slice(0, frontmatterEndIndex) + structuredDataStr + content.slice(frontmatterEndIndex);
    }

    // Add structuredData and image to Layout
    let layoutReplacement = `<Layout`;
    if (imagePath) {
        layoutReplacement += `\n    image="${imagePath}"`;
    }
    layoutReplacement += `\n    structuredData={structuredData}`;

    content = content.replace(/<Layout/, layoutReplacement);

    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`Updated ${filePath}`);
}

// Process JA works
if (fs.existsSync(worksDirJa)) {
    const dirs = fs.readdirSync(worksDirJa, { withFileTypes: true });
    for (const dirent of dirs) {
        if (dirent.isDirectory()) {
            const workId = dirent.name;
            const filePath = path.join(worksDirJa, workId, 'index.astro');
            processFile(filePath, workId, 'ja');
        }
    }
}

// Process EN works
if (fs.existsSync(worksDirEn)) {
    const dirs = fs.readdirSync(worksDirEn, { withFileTypes: true });
    for (const dirent of dirs) {
        if (dirent.isDirectory()) {
            const workId = dirent.name;
            const filePath = path.join(worksDirEn, workId, 'index.astro');
            processFile(filePath, workId, 'en');
        }
    }
}

console.log("SEO Update Complete");
