export interface Work {
    id: string;
    title: {
        ja: string;
        en: string;
    };
    description: {
        ja: string;
        en: string;
    };
    tags: string[];
    href?: string;
    category?: string;
    os?: string;
}

export const works: Work[] = [
    {
        id: "portfolio",
        title: {
            ja: "Portfolio Website",
            en: "Portfolio Website"
        },
        description: {
            ja: "マイクロインタラクションやUIの心地よさにこだわって制作したポートフォリオサイト。",
            en: "A portfolio site created with a focus on micro-interactions and UI comfort."
        },
        tags: ["TypeScript", "Astro", "CSS"],
        href: "/"
    },
    {
        id: "minecraft-mod",
        title: {
            ja: "Minecraft Mod",
            en: "Minecraft Mod"
        },
        description: {
            ja: "Forge 1.20.1環境での独自Mod開発<br />新しいアイテムやシステムを実装。",
            en: "Development of original mods for Forge 1.20.1 environment.<br />Implementing new items and systems."
        },
        tags: ["Java", "Forge", "Minecraft"],
        href: "https://modrinth.com/user/manpuc",
        category: "GameApplication",
        os: "Windows, macOS, Linux"
    },
    {
        id: "discord-bot",
        title: {
            ja: "Custom Discord Bot",
            en: "Custom Discord Bot"
        },
        description: {
            ja: "サーバー管理やエンタメ機能を備えた多機能汎用Botの開発と運用。",
            en: "Development and operation of a multi-functional general-purpose bot with server management and entertainment features."
        },
        tags: ["Node.js", "API"],
        href: "https://github.com/manpuc/MBot",
        category: "UtilitiesApplication",
        os: "Cross-platform"
    },
    {
        id: "pomodoro",
        title: {
            ja: "Pomodoro Timer",
            en: "Pomodoro Timer"
        },
        description: {
            ja: "タスク、統計機能付きのポモドーロ<br />タイマー。",
            en: "Pomodoro timer with task and statistics functions."
        },
        tags: ["TypeScript", "Astro"],
        href: "https://pomodoro.manpuc.me/"
    },
    {
        id: "qr-maker",
        title: {
            ja: "QR Maker",
            en: "QR Maker"
        },
        description: {
            ja: "使いやすさとカスタム性にこだわったQRコード生成サービス。",
            en: "A QR code generation service focused on ease of use and customizability."
        },
        tags: ["PWA", "Astro", "TypeScript"],
        href: "https://qr.manpuc.me/"
    },
    {
        id: "ambient",
        title: {
            ja: "Ambient Dashboard",
            en: "Ambient Dashboard"
        },
        description: {
            ja: "ミニマルで美しいデジタル時計アプリ。",
            en: "A minimal and beautiful digital clock app."
        },
        tags: ["API", "PWA", "TypeScript"],
        href: "https://ambient.manpuc.me/"
    },
    {
        id: "text-flow",
        title: {
            ja: "Text Flow",
            en: "Text Flow"
        },
        description: {
            ja: "汎用性と操作性にこだわったテキスト変換サービス。",
            en: "A text conversion service focused on versatility and operability."
        },
        tags: ["Astro", "TypeScript"],
        href: "https://text.manpuc.me/"
    },
    {
        id: "pass-generator",
        title: {
            ja: "Pass Generator",
            en: "Pass Generator"
        },
        description: {
            ja: "直感的でシンプルなデザインのパスワード生成サービス。",
            en: "A password generation service with an intuitive and simple design."
        },
        tags: ["Astro", "TypeScript"],
        href: "https://pass.manpuc.me/"
    },
    {
        id: "chrome-theme",
        title: {
            ja: "Chrome Theme",
            en: "Chrome Theme"
        },
        description: {
            ja: "目に優しい配色で使いやすいChromeダークテーマ",
            en: "An easy-to-use Chrome dark theme with an eye-friendly color scheme."
        },
        tags: ["CSS", "JSON", "Theme"],
        href: "https://chromewebstore.google.com/detail/ganlcelmnoaidpmaegcmhecolonfmffk?utm_source=item-share-cb"
    },
    {
        id: "CharView",
        title: {
            ja: "CharView",
            en: "CharView"
        },
        description: {
            ja: "Google Formsの入力欄の右下に文字数をリアルタイム表示するChrome拡張機能",
            en: "Chrome extension to display character count in real-time for Google Forms input fields."
        },
        tags: ["Chrome Extension", "JavaScript"],
        href: "https://chromewebstore.google.com/detail/lgiilinkfchechjoaeojckghoamifkgd?utm_source=item-share-cb"
    },
    {
        id: "no-curseforge-legacy",
        title: {
            ja: "No Curseforge Legacy",
            en: "No Curseforge Legacy"
        },
        description: {
            ja: "旧デザインのCurseForgeを新デザインURLにリダイレクトする拡張機能。",
            en: "An extension that redirects CurseForge legacy design to the new design URL."
        },
        tags: ["Chrome Extension", "JavaScript"],
        href: "https://chromewebstore.google.com/detail/diogckmiabncebebknnoibjapaldcjgb?utm_source=item-share-cb"
    },
    {
        id: "google-search-night",
        title: {
            ja: "Google Search Night Theme",
            en: "Google Search Night Theme"
        },
        description: {
            ja: "Google検索を目に優しいダークテーマに変更する拡張機能。",
            en: "An extension that changes Google Search to an eye-friendly dark theme."
        },
        tags: ["Chrome Extension", "CSS"],
        href: "https://chromewebstore.google.com/detail/bdlpogibdkglpceadpplahmjneanbpom?utm_source=item-share-cb"
    },
    {
        id: "minecraft-server",
        title: {
            ja: "Minecraft Server",
            en: "Minecraft Server"
        },
        description: {
            ja: "Minecraft Bedrock Editionのサーバーの構築と運用。",
            en: "Construction and operation of Minecraft Bedrock Edition servers."
        },
        tags: ["Minecraft", "Server", "VPS"]
    },
    {
        id: "package-design",
        title: {
            ja: "Package Design",
            en: "Package Design"
        },
        description: {
            ja: "「宇摩のやまじ風」のリニューアルデザイン。",
            en: "Renewal design for \"Uma no Yamajikaze\"."
        },
        tags: ["Design", "Illustrator"]
    }
];
