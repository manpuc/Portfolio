const fs = require('fs');
const path = require('path');

const root = 'e:\\kuki\\Documents\\.Dev\\Portfolio\\src\\pages';

// 1. Fix literal \n in all astro files
const fixLiterals = (dirPath) => {
    const files = fs.readdirSync(dirPath);
    for (const file of files) {
        const fullPath = path.join(dirPath, file);
        if (fs.statSync(fullPath).isDirectory()) {
            fixLiterals(fullPath);
        } else if (fullPath.endsWith('.astro')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            if (content.includes('\\n')) {
                // replace literal backslash+n with an actual newline
                content = content.replace(/\\\\n/g, '\\n');
                fs.writeFileSync(fullPath, content);
            }
        }
    }
};

fixLiterals(path.join(root, 'works'));
if (fs.existsSync(path.join(root, 'en', 'works'))) {
    fixLiterals(path.join(root, 'en', 'works'));
}

// 2. Expand missing projects
const contentMap = {
    "packbridge": {
        ja: {
            overview: "<strong>PackBridge</strong> は、Minecraft のリソースパックを異なるエディション間（Java版とBedrock版など）で簡単に相互変換できるWebサービスです。",
            features: [
                { title: "サーバーサイド変換", desc: "ブラウザ上でファイルをアップロードするだけで、即座に他エディション用のパックに変換します。" },
                { title: "高速な処理", desc: "TypeScriptによる最適化された変換ロジックで、重いリソースパックもスムーズに処理します。" },
                { title: "ユーザーフレンドリーなUI", desc: "インストール不要で誰でも直感的に操作できるデザインを採用しています。" }
            ]
        },
        en: {
            overview: "<strong>PackBridge</strong> is a web service that effortlessly converts Minecraft resource packs between different editions (such as Java and Bedrock).",
            features: [
                { title: "Server-side Conversion", desc: "Simply upload your pack directly in the browser and instantly convert it for other editions." },
                { title: "High-speed Processing", desc: "Optimized conversion logic in TypeScript ensures smooth processing even for heavy resource packs." },
                { title: "User-friendly UI", desc: "Features an intuitive design that anyone can use without needing to install external tools." }
            ]
        }
    },
    "charview": {
        ja: {
            overview: "<strong>CharView</strong> は、Google Formsの入力欄の右下に、入力中の文字数をリアルタイムで表示する便利なChrome拡張機能です。",
            features: [
                { title: "リアルタイム文字数カウント", desc: "長文入力時に現在の文字数を即座に確認でき、文字数制限のあるフォームで役立ちます。" },
                { title: "シームレスな統合", desc: "Google FormsのUIを邪魔することなく、自然な形で画面の右下に表示されます。" },
                { title: "軽量で高速", desc: "JavaScriptで軽量に実装されており、ブラウザの動作を重くしません。" }
            ]
        },
        en: {
            overview: "<strong>CharView</strong> is a handy Chrome extension that displays a real-time character count at the bottom right of Google Forms input fields.",
            features: [
                { title: "Real-time Character Counting", desc: "Instantly check your current character count while typing long texts, useful for strict form limits." },
                { title: "Seamless Integration", desc: "Naturally blends into the bottom right of the screen without interfering with the Google Forms UI." },
                { title: "Lightweight & Fast", desc: "Implemented cleanly in JavaScript, ensuring it won't slow down your browser performance." }
            ]
        }
    },
    "flicker": {
        ja: {
            overview: "<strong>FLICKER</strong> は、直感的なシンプル操作で誰でも手軽に楽しめるWebブラウザベースのゲームです。",
            features: [
                { title: "直感的なゲームプレイ", desc: "クリックやフリックなどのシンプルな操作だけで、すぐにゲームの世界に没入できます。" },
                { title: "スムーズなアニメーション", desc: "Next.jsとCSSアニメーションを駆使し、滑らかで心地よい画面の動きを実現しています。" },
                { title: "ランキング機能", desc: "SQLデータベースと連携し、他のプレイヤーとスコアを競い合うリーダーボードを搭載しています。" }
            ]
        },
        en: {
            overview: "<strong>FLICKER</strong> is a web-browser-based game that anyone can easily enjoy through intuitive and simple controls.",
            features: [
                { title: "Intuitive Gameplay", desc: "Immerse yourself instantly into the game world using basic controls like clicks and flicks." },
                { title: "Smooth Animations", desc: "Utilizes Next.js and CSS animations to deliver fluid and pleasing visual transitions." },
                { title: "Ranking System", desc: "Features a leaderboard integrated with an SQL database, allowing you to compete with players worldwide." }
            ]
        }
    },
    "loudness": {
        ja: {
            overview: "<strong>Loudness Insight</strong> は、Web Audio APIとFFmpeg (WebAssembly) を活用し、ブラウザ上で直接音声ファイルのラウドネス（音量感）を分析できるWebアプリです。",
            features: [
                { title: "クライアントサイド分析", desc: "サーバーに音声をアップロードせず、WASMを利用してローカルで安全かつ高速に分析します。" },
                { title: "詳細な音量データの視覚化", desc: "統合ラウドネス（LUFS）やトゥルーピークなど、プロフェッショナルな指標を分かりやすく表示します。" },
                { title: "幅広いフォーマット対応", desc: "FFmpegの強力なデコード機能により、様々な形式の音声ファイルに対応しています。" }
            ]
        },
        en: {
            overview: "<strong>Loudness Insight</strong> is a web application that analyzes the loudness of audio files directly in the browser, powered by the Web Audio API and FFmpeg (WebAssembly).",
            features: [
                { title: "Client-side Analysis", desc: "Securely and rapidly analyzes audio locally using WASM, meaning files are never uploaded to a server." },
                { title: "Detailed Loudness Visualization", desc: "Clearly displays professional audio metrics such as Integrated Loudness (LUFS) and True Peak." },
                { title: "Broad Format Support", desc: "Supports a massive variety of audio file formats thanks to FFmpeg's robust decoding capabilities." }
            ]
        }
    },
    "chrome-theme": {
        ja: {
            overview: "<strong>Tokyo Night Theme</strong> は、開発者に人気の高いダーク系カラースキーム「Tokyo Night」をベースに作成した、目に優しいChromeブラウザ用テーマです。",
            features: [
                { title: "洗練されたカラーパレット", desc: "Tokyo Nightの美しいネオンカラーと深いブルーの背景を採用しています。" },
                { title: "視認性の向上", desc: "アクティブなタブと非アクティブなタブのコントラストを最適化し、長時間の作業でも目が疲れにくい設計です。" },
                { title: "ワンクリック導入", desc: "Chrome Web Storeから1クリックで簡単にインストールできます。" }
            ]
        },
        en: {
            overview: "<strong>Tokyo Night Theme</strong> is an eye-friendly Chrome browser theme based on 'Tokyo Night', a highly popular dark color scheme among developers.",
            features: [
                { title: "Polished Color Palette", desc: "Employs Tokyo Night's beautiful neon accents against a deep, soothing blue background." },
                { title: "Enhanced Visibility", desc: "Optimized contrast between active and inactive tabs ensures reduced eye strain during long working sessions." },
                { title: "One-click Installation", desc: "Easily install the theme directly from the Chrome Web Store with a single click." }
            ]
        }
    },
    "qr-maker": {
        ja: {
            overview: "<strong>QR Maker</strong> は、使いやすさとカスタマイズ性に徹底的にこだわったQRコード生成サービスです。URLやテキストから一瞬でQRコードを作成できます。",
            features: [
                { title: "豊富なカスタマイズ", desc: "色の変更やアイコンの埋め込み、ドットの形状など、自分好みのQRコードにデザインできます。" },
                { title: "PWA対応のオフライン生成", desc: "アプリとしてインストールすれば、オフライン環境でも瞬時にQRコードを生成可能です。" },
                { title: "高解像度ダウンロード", desc: "印刷物にも耐えうる高画質なSVG/PNG形式での保存に対応しています。" }
            ]
        },
        en: {
            overview: "<strong>QR Maker</strong> is a QR code generation service rigorously designed for ease of use and maximum customizability. Create QR codes from URLs or text instantly.",
            features: [
                { title: "Extensive Customization", desc: "Design your QR codes by changing colors, embedding center icons, and modifying dot shapes." },
                { title: "Offline Generation via PWA", desc: "Install it as an app to instantly generate QR codes even without an internet connection." },
                { title: "High-resolution Downloads", desc: "Supports saving in high-quality SVG and PNG formats, suitable even for professional printing." }
            ]
        }
    },
    "mc-link": {
        ja: {
            overview: "<strong>MCLink</strong> は、Minecraftサーバーへの参加をワンクリックで可能にする、招待用ディープリンク（mc://）を簡単に作成できるサービスです。",
            features: [
                { title: "簡単なリンク生成", desc: "サーバーのアドレスとポートを入力するだけで、瞬時に招待用のURLを発行します。" },
                { title: "プレイヤーの利便性向上", desc: "スマホ版（Bedrock）のプレイヤーがリンクをタップするだけで、サーバー一覧に自動で追加されます。" },
                { title: "シンプルな共有", desc: "生成されたリンクは短くまとまっており、SNSやDiscordでの共有に最適です。" }
            ]
        },
        en: {
            overview: "<strong>MCLink</strong> is a service that easily creates invitation deep links (mc://) to allow one-click joining of Minecraft servers.",
            features: [
                { title: "Simple Link Generation", desc: "Just enter your server address and port to instantly generate a playable invitation URL." },
                { title: "Improved Player Convenience", desc: "Bedrock Edition players can simply tap the link on mobile to automatically add your server to their list." },
                { title: "Easy Sharing", desc: "The generated links are short and concise, making them perfect for sharing on social media and Discord." }
            ]
        }
    },
    "google-search-night": {
        ja: {
            overview: "<strong>Google Search Night Theme</strong> は、Google検索の画面をモダンで美しいダークテーマに変更するChrome拡張機能です。",
            features: [
                { title: "完全なダークモード化", desc: "検索結果だけでなく、画像検索やニュースタブなどGoogle検索のあらゆる画面を暗くします。" },
                { title: "目への負担軽減", desc: "真っ黒ではなく、視認性を保ったエレガントなダークグレーを基調とし、夜間のブラウジングを快適にします。" },
                { title: "軽量なCSS実装", desc: "余計なスクリプトを使わずCSSのみでスタイリングしているため、ページの読み込み速度に影響を与えません。" }
            ]
        },
        en: {
            overview: "<strong>Google Search Night Theme</strong> is a Chrome extension that transforms the Google Search interface into a modern, beautiful dark theme.",
            features: [
                { title: "Complete Dark Mode", desc: "Darkens not just the search results, but also Image Search, News tabs, and every aspect of Google Search." },
                { title: "Reduced Eye Strain", desc: "Uses an elegant dark gray instead of pitch black, maintaining visibility while making late-night browsing comfortable." },
                { title: "Lightweight CSS Implementation", desc: "Styled purely with CSS without unnecessary scripts, ensuring no impact on your page load speeds." }
            ]
        }
    },
    "no-curseforge-legacy": {
        ja: {
            overview: "<strong>No Curseforge Legacy</strong> は、ユーザーを古いデザインのCurseForgeから新しいモダンなデザインのURLへ自動的にリダイレクトするChrome拡張機能です。",
            features: [
                { title: "自動リダイレクト", desc: "古いリンクを踏んでしまった場合でも、一瞬で新デザインのページへと転送します。" },
                { title: "ユーザー体験の向上", desc: "常に最新のCurseForge UIを利用できるようになり、Mod探しの効率が上がります。" },
                { title: "バックグラウンド処理", desc: "ユーザーの操作を必要とせず、バックグラウンドでシームレスに機能します。" }
            ]
        },
        en: {
            overview: "<strong>No Curseforge Legacy</strong> is a Chrome extension that automatically redirects users from the old, legacy CurseForge design to the new, modern design URL.",
            features: [
                { title: "Automatic Redirection", desc: "Instantly routes you to the new layout page even if you accidentally click an outdated link." },
                { title: "Improved User Experience", desc: "Ensures you are always using the latest CurseForge UI, increasing your mod-searching efficiency." },
                { title: "Background Processing", desc: "Operates completely seamlessly in the background without requiring any user input." }
            ]
        }
    }
};

const svgIcon = `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="var(--primary)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="position: absolute; left: 0; top: 0.3rem;"><polyline points="20 6 9 17 4 12"></polyline></svg>`;

for (const [id, langs] of Object.entries(contentMap)) {
    for (const isEn of [false, true]) {
        const langStr = isEn ? 'en' : 'ja';
        const langData = langs[langStr];
        const dirPath = isEn ? path.join(root, 'en', 'works', id) : path.join(root, 'works', id);
        const filePath = path.join(dirPath, 'index.astro');

        if (fs.existsSync(filePath)) {
            let content = fs.readFileSync(filePath, 'utf8');

            // If it already has Key Features or 主な機能と特徴, skip
            if (content.includes('Key Features') || content.includes('主な機能と特徴')) {
                continue;
            }

            const overviewRegex = /<h2>(?:機能概要|Overview)<\/h2>\\s*<p>[\\s\\S]*?<\/p>/;
            
            const featuresTitle = isEn ? "Key Features" : "主な機能と特徴";
            let featuresHtml = `
            <h3 style="margin-top: 2rem;">${featuresTitle}</h3>
            <ul style="list-style: none; padding-left: 0; display: flex; flex-direction: column; gap: 0.75rem;">
                ${langData.features.map(f => `<li style="position: relative; padding-left: 1.75rem; line-height: 1.6;">
                    ${svgIcon}
                    <strong>${f.title}:</strong> ${f.desc}
                </li>`).join('\\n                ')}
            </ul>
`;

            const replacementHtml = `<h2>${isEn ? 'Overview' : '機能概要'}</h2>
            <p>
                ${langData.overview}
            </p>
${featuresHtml}`;

            content = content.replace(overviewRegex, replacementHtml);
            fs.writeFileSync(filePath, content);
        }
    }
}

console.log('Fixed literals and expanded missing projects.');
