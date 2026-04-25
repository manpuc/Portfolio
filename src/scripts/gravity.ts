export function initGravityEasterEgg() {
    let konamiCode = [
        "ArrowUp",
        "ArrowUp",
        "ArrowDown",
        "ArrowDown",
        "ArrowLeft",
        "ArrowRight",
        "ArrowLeft",
        "ArrowRight",
        "b",
        "a",
    ];
    let konamiIndex = 0;

    document.addEventListener("keydown", (e) => {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                triggerGravityCollapse();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });

    async function triggerGravityCollapse() {
        document.body.style.overflow = "hidden";
        const elements: HTMLElement[] = [];
        const selectors = [
            ".container > header",
            ".container > .header-divider",
            ".container > section",
            ".floating-controls .icon-btn",
            "footer",
        ];

        selectors.forEach((selector) => {
            document.querySelectorAll(selector).forEach((el) => {
                if (el instanceof HTMLElement) elements.push(el);
            });
        });

        const elementInfos = elements.map((el) => ({
            el,
            rect: el.getBoundingClientRect(),
        }));

        const physicsObjects = elementInfos.map((info) => {
            const { el, rect } = info;
            el.style.animation = "none";
            el.classList.remove("animate-fade-up");
            el.style.position = "fixed";
            el.style.top = rect.top + "px";
            el.style.left = rect.left + "px";
            el.style.width = rect.width + "px";
            el.style.height = rect.height + "px";
            el.style.margin = "0";
            el.style.zIndex = "20000";
            el.style.transition = "none";
            el.style.transformOrigin = "center";

            return {
                el,
                x: rect.left,
                y: rect.top,
                baseX: rect.left,
                baseY: rect.top,
                width: rect.width,
                height: rect.height,
                vx: (Math.random() - 0.5) * 12,
                vy: Math.random() * 5,
                rotation: 0,
                vr: (Math.random() - 0.5) * 0.3,
            };
        });

        const gravity = 0.8;
        const friction = 0.99;
        const bounce = -0.6;
        const ground = window.innerHeight;
        const wallWidth = window.innerWidth;

        function loop() {
            let active = false;
            physicsObjects.forEach((p) => {
                p.vy += gravity;
                p.vx *= friction;
                p.x += p.vx;
                p.y += p.vy;
                p.rotation += p.vr;

                if (p.y + p.height > ground) {
                    p.y = ground - p.height;
                    p.vy *= bounce;
                    p.vx *= 0.8;
                    p.vr *= 0.8;
                }

                if (p.x < 0) {
                    p.x = 0;
                    p.vx *= bounce;
                } else if (p.x + p.width > wallWidth) {
                    p.x = wallWidth - p.width;
                    p.vx *= bounce;
                }

                const tx = p.x - p.baseX;
                const ty = p.y - p.baseY;
                p.el.style.transform = `translate(${tx}px, ${ty}px) rotate(${p.rotation}rad)`;

                if (
                    Math.abs(p.vy) > 0.5 ||
                    Math.abs(p.vx) > 0.5 ||
                    p.y + p.height < ground - 10
                ) {
                    active = true;
                }
            });

            if (active) requestAnimationFrame(loop);
        }
        setTimeout(loop, 16);
    }
}
