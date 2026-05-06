export function initGlowEffect() {
    if (typeof window === "undefined") return;

    const setupGlow = () => {
        const skillsSection = document.getElementById('skills');
        if (skillsSection) {
            skillsSection.addEventListener('mousemove', (e: MouseEvent) => {
                const tags = skillsSection.querySelectorAll('.tag');
                tags.forEach(tag => {
                    const el = tag as HTMLElement;
                    const rect = el.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    el.style.setProperty('--mouse-x', `${x}px`);
                    el.style.setProperty('--mouse-y', `${y}px`);
                });
            });
        }
    };

    // 初回実行
    setupGlow();

    // 動的に追加された要素にも対応できるようにObserverなどで監視するか、ページ遷移（AstroのViewTransitions等）に備える
    document.addEventListener("astro:page-load", setupGlow);
}
