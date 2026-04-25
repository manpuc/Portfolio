export function setupMarquee() {
    const containers = document.querySelectorAll(".marquee-container");
    containers.forEach((container) => {
        const content = container.querySelector(
            ".marquee-content",
        ) as HTMLElement;
        if (!content) return;

        let animation = content.getAnimations()[0] as Animation;
        const duration = 90000;

        if (!animation) {
            animation = content.animate(
                [
                    { transform: "translateX(0)" },
                    { transform: "translateX(-50%)" },
                ],
                {
                    duration: duration,
                    iterations: Infinity,
                },
            );
        }

        let targetRate = 1;
        let currentRate = 1;
        let isDragging = false;
        let startX = 0;
        let initialTime = 0;

        const onStart = (e: any) => {
            isDragging = true;
            startX = "touches" in e ? e.touches[0].clientX : e.clientX;
            initialTime = animation.currentTime as number;
            targetRate = 0;
            container.classList.add("dragging");
        };

        const onMove = (e: any) => {
            if (!isDragging) return;
            const x = "touches" in e ? e.touches[0].clientX : e.clientX;
            const walk = (x - startX) * 50;

            let newTime = initialTime - walk;
            newTime = ((newTime % duration) + duration) % duration;
            animation.currentTime = newTime;
        };

        const onEnd = () => {
            isDragging = false;
            targetRate = 1;
            container.classList.remove("dragging");
        };

        container.addEventListener("mousedown", onStart);
        window.addEventListener("mousemove", onMove);
        window.addEventListener("mouseup", onEnd);

        container.addEventListener("touchstart", onStart, {
            passive: true,
        });
        window.addEventListener("touchmove", onMove, {
            passive: false,
        });
        window.addEventListener("touchend", onEnd);

        container.addEventListener("mouseenter", () => {
            if (!isDragging) targetRate = 0;
        });

        container.addEventListener("mouseleave", () => {
            if (!isDragging) targetRate = 1;
        });

        const update = () => {
            if (!isDragging) {
                // Smooth easing
                currentRate += (targetRate - currentRate) * 0.04;
                animation.playbackRate = currentRate;
            }
            requestAnimationFrame(update);
        };
        update();
    });
}
