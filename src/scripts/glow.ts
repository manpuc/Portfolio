export function initGlowEffect() {
    if (typeof window === "undefined") return;

    const setupGlow = () => {
        const skillsSection = document.getElementById('skills');
        if (skillsSection) {
            const updateGlowCoords = (clientX: number, clientY: number) => {
                const tags = skillsSection.querySelectorAll('.tag');
                tags.forEach(tag => {
                    const el = tag as HTMLElement;
                    const rect = el.getBoundingClientRect();
                    const x = clientX - rect.left;
                    const y = clientY - rect.top;
                    el.style.setProperty('--mouse-x', `${x}px`);
                    el.style.setProperty('--mouse-y', `${y}px`);
                });
            };

            // マウス操作時の追従
            skillsSection.addEventListener('mousemove', (e: MouseEvent) => {
                updateGlowCoords(e.clientX, e.clientY);
            });

            // タッチ操作時の追従
            skillsSection.addEventListener('touchstart', (e: TouchEvent) => {
                if (e.touches.length > 0) {
                    updateGlowCoords(e.touches[0].clientX, e.touches[0].clientY);
                }
            }, { passive: true });

            skillsSection.addEventListener('touchmove', (e: TouchEvent) => {
                if (e.touches.length > 0) {
                    updateGlowCoords(e.touches[0].clientX, e.touches[0].clientY);
                }
            }, { passive: true });
        }
    };

    // 初回実行
    setupGlow();

    // 動的に追加された要素にも対応できるようにObserverなどで監視するか、ページ遷移（AstroのViewTransitions等）に備える
    document.addEventListener("astro:page-load", setupGlow);
}
