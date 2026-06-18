const fs = require('fs');
const path = require('path');

const logs = require('./git_logs_summary.json');
const root = 'e:\\kuki\\Documents\\.Dev\\Portfolio\\src\\pages';

const idMap = {
    "pitchanalyzer": "pitch-analyzer",
    "midi": "midi-daw",
    "pomodoro": "pomodoro",
    "ambient": "ambient",
    "text": "text-flow",
    "pass": "pass-generator",
    "md": "md-preview"
};
const reverseMap = {
    "pitch-analyzer": "pitch-analyzer",
    "midi-daw": "midi-daw",
    "pomodoro": "pomodoro",
    "ambient": "ambient",
    "text-flow": "text-flow",
    "pass-generator": "pass-generator",
    "md-preview": "md-preview"
};

function summarize(month, msgs, isEn) {
    const count = msgs.length;
    let summaryJa = "";
    let summaryEn = "";

    if (count > 20) {
        summaryJa = `UI改善や機能追加、バグ修正など大幅なアップデートを実施（計${count}回のコミット）。`;
        summaryEn = `Major updates including UI improvements, new features, and bug fixes (${count} commits).`;
    } else if (count > 5) {
        summaryJa = `各種機能の追加および最適化を実施（計${count}回のコミット）。`;
        summaryEn = `Added various features and optimizations (${count} commits).`;
    } else {
        summaryJa = `プロジェクトの初期リリースおよび基盤構築を実施（計${count}回のコミット）。`;
        summaryEn = `Initial release and project foundation built (${count} commits).`;
    }

    // specific checks
    const fullText = msgs.join(" ").toLowerCase();
    if (fullText.includes("pwa")) {
        summaryJa += "PWAへの対応が含まれています。";
        summaryEn += " Includes PWA support.";
    }
    if (fullText.includes("i18n") || fullText.includes("localized")) {
        summaryJa += "多言語対応（i18n）を追加しました。";
        summaryEn += " Added internationalization (i18n) support.";
    }
    if (fullText.includes("initial") && !summaryJa.includes("リリース")) {
        summaryJa = "プロジェクトを公開・初期リリースしました。";
        summaryEn = "Project published and initially released.";
    }

    return isEn ? summaryEn : summaryJa;
}

for (const [projectId, monthData] of Object.entries(logs)) {
    if (typeof monthData === 'string') continue; // Skip errors

    const targetDir = reverseMap[projectId] || projectId;
    const jaPath = path.join(root, 'works', targetDir, 'index.astro');
    const enPath = path.join(root, 'en', 'works', targetDir, 'index.astro');

    if (!fs.existsSync(jaPath) || !fs.existsSync(enPath)) continue;

    const buildChangelog = (isEn) => {
        let html = `
            <h3 style="margin-top: 2rem;">${isEn ? 'Changelog' : '変更履歴'}</h3>
            <div
                class="changelog-timeline"
                style="position: relative; padding-left: 1.5rem; display: flex; flex-direction: column; gap: 1.5rem; margin-top: 1rem;"
            >
                <div
                    style="position: absolute; top: 0.5rem; bottom: 0.5rem; left: 6px; width: 2px; background-color: rgba(128, 128, 128, 0.2); z-index: 1;"
                >
                </div>
`;
        // Sort months descending
        const months = Object.keys(monthData).sort((a, b) => b.localeCompare(a));
        for (const month of months) {
            const data = monthData[month];
            const [y, m] = month.split('-');
            const displayDateJa = `${y}年${parseInt(m)}月`;
            const displayDateEn = new Date(y, m - 1).toLocaleString('en-US', { month: 'long', year: 'numeric' });
            
            const summary = summarize(month, data.msgs, isEn);

            html += `
                <div
                    class="changelog-item"
                    style="position: relative; z-index: 2;"
                >
                    <div
                        style="position: absolute; left: -1.5rem; top: 0.4rem; width: 12px; height: 12px; border-radius: 50%; background-color: var(--bg-color); border: 2px solid var(--primary); transform: translateX(1px); box-shadow: 0 0 0 2px var(--bg-color);"
                    >
                    </div>
                    <div style="font-weight: 600; color: var(--text-color);">
                        ${isEn ? 'Updates in' : 'アップデート'} <span
                            style="font-size: 0.85em; color: var(--text-muted); margin-left: 0.5rem; font-weight: normal;"
                            >(${isEn ? displayDateEn : displayDateJa})</span>
                    </div>
                    <div
                        style="font-size: 0.95em; color: var(--text-muted); margin-top: 0.25rem;"
                    >
                        ${summary}
                    </div>
                </div>
`;
        }

        html += `            </div>`;
        return html;
    };

    const injectChangelog = (filePath, isEn) => {
        let content = fs.readFileSync(filePath, 'utf8');
        if (!content.includes('class="changelog-timeline"')) {
            const newHtml = buildChangelog(isEn);
            content = content.replace('</section>', newHtml + '\\n        </section>');
            fs.writeFileSync(filePath, content);
        }
    };

    injectChangelog(jaPath, false);
    injectChangelog(enPath, true);
}

console.log("Changelogs injected successfully.");
