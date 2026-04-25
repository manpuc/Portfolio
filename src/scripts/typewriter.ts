export function initTypewriter() {
    const typewriters = document.querySelectorAll(".typewriter-text");
    typewriters.forEach((el) => {
        const targetText = el.getAttribute("data-text");
        if (!targetText) return;

        let currentText = "";
        let i = 0;

        const typeWriter = () => {
            if (i < targetText.length) {
                currentText += targetText.charAt(i);
                el.textContent = currentText;
                i++;
                setTimeout(typeWriter, 100 + Math.random() * 150);
            }
        };

        const headerInfo = document.getElementById('header-info');
        if (headerInfo) {
            headerInfo.addEventListener('animationend', (e) => {
                if (e.animationName === 'premiumReveal') {
                    setTimeout(typeWriter, 100);
                }
            }, { once: true });
        } else {
            setTimeout(typeWriter, 1800);
        }
    });

    // Hide cursor after 13s
    setTimeout(() => {
        document
            .querySelectorAll(".typewriter-cursor")
            .forEach((cursor) => {
                if (cursor instanceof HTMLElement) {
                    cursor.style.opacity = "0";
                    setTimeout(() => {
                        cursor.style.display = "none";
                    }, 1000);
                }
            });
    }, 13000);
}
