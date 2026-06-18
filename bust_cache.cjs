const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else if (file.endsWith('.astro')) {
            results.push(file);
        }
    });
    return results;
}

const files = walk('src/pages');
let changedCount = 0;
for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;

    // Replace src="/images/works/..."
    content = content.replace(/src=\"(\/images\/works\/[^\"]+?)\"/g, (match, p1) => {
        if (!p1.includes('?v=')) return `src="${p1}?v=2"`;
        return match;
    });

    // Replace url('/images/works/...')
    content = content.replace(/url\('(\/images\/works\/[^']+?)'\)/g, (match, p1) => {
        if (!p1.includes('?v=')) return `url('${p1}?v=2')`;
        return match;
    });

    // Replace image="/images/works/..." (Layout prop)
    content = content.replace(/image=\"(\/images\/works\/[^\"]+?)\"/g, (match, p1) => {
        if (!p1.includes('?v=')) return `image="${p1}?v=2"`;
        return match;
    });

    if (content !== original) {
        fs.writeFileSync(file, content);
        changedCount++;
        console.log('Updated: ' + file);
    }
}
console.log('Files updated: ' + changedCount);
