export class FlappyBird {
    canvas: HTMLCanvasElement | null = null;
    ctx: CanvasRenderingContext2D | null = null;
    overlay: HTMLElement | null = null;
    scoreElement: HTMLElement | null = null;
    finalScoreElement: HTMLElement | null = null;
    messageLayer: HTMLElement | null = null;
    avatar: HTMLImageElement;

    gameState: "ready" | "playing" | "gameover" = "ready";
    score: number = 0;
    bird: any = null;
    pipes: any[] = [];
    frameCount: number = 0;
    animationId: number | null = null;

    // Background elements
    stars: any[] = [];
    clouds: any[] = [];

    constructor() {
        this.avatar = new Image();
        this.avatar.src = "/avatar.webp";
        this.init();
    }

    init() {
        this.refreshElements();
        this.initBackground();
        this.setupEventListeners();
    }

    initBackground() {
        this.stars = Array.from({ length: 50 }, () => ({
            x: Math.random() * 400,
            y: Math.random() * 600,
            size: Math.random() * 2,
            opacity: Math.random(),
        }));

        this.clouds = Array.from({ length: 4 }, () => ({
            x: Math.random() * 400,
            y: 50 + Math.random() * 150,
            speed: 0.2 + Math.random() * 0.3,
            scale: 0.5 + Math.random() * 0.5,
        }));
    }

    refreshElements() {
        this.canvas = document.getElementById(
            "flappy-canvas",
        ) as HTMLCanvasElement;
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext("2d");
        this.overlay = document.getElementById("flappy-game-overlay");
        this.scoreElement = document.getElementById("flappy-score");
        this.finalScoreElement =
            document.getElementById("flappy-final-score");
        this.messageLayer = document.getElementById("flappy-message-layer");

        // Re-bind buttons
        const startBtn = document.getElementById("flappy-start-btn");
        const restartBtn = document.getElementById("flappy-restart-btn");
        const closeBtn = document.getElementById("flappy-close");

        startBtn?.replaceWith(startBtn.cloneNode(true));
        restartBtn?.replaceWith(restartBtn.cloneNode(true));
        closeBtn?.replaceWith(closeBtn.cloneNode(true));

        document
            .getElementById("flappy-start-btn")
            ?.addEventListener("click", () => this.startGame());
        document
            .getElementById("flappy-restart-btn")
            ?.addEventListener("click", () => this.startGame());
        document
            .getElementById("flappy-close")
            ?.addEventListener("click", () => this.close());

        this.setupCanvas();
        this.resetGameData();
    }

    setupCanvas() {
        if (!this.canvas) return;
        this.canvas.width = 400;
        this.canvas.height = 600;
    }

    resetGameData() {
        this.bird = {
            x: 80,
            y: 300,
            radius: 20,
            velocity: 0,
            gravity: 0.25,
            jump: -5,
            rotation: 0,
        };
        this.pipes = [];
        this.score = 0;
        this.frameCount = 0;
        if (this.scoreElement) this.scoreElement.textContent = "0";
    }

    setupEventListeners() {
        // Space key listener
        window.addEventListener('keydown', (e) => {
            if (
                e.code === "Space" &&
                this.overlay?.classList.contains("active")
            ) {
                if (this.gameState === "playing") this.jump();
                else if (this.gameState === "ready") this.startGame();
            }
        });

        // Canvas click/touch
        if (this.canvas) {
            this.canvas.onmousedown = () => {
                if (this.gameState === "playing") this.jump();
            };
            this.canvas.ontouchstart = (e) => {
                e.preventDefault();
                if (this.gameState === "playing") this.jump();
            };
        }
    }

    open() {
        this.refreshElements();
        this.gameState = "ready";
        this.resetGameData();
        this.updateMessage();
        this.overlay?.classList.add("active");
        document.body.style.overflow = "hidden";
        if (this.animationId) cancelAnimationFrame(this.animationId);
        this.loop();
    }

    close() {
        this.overlay?.classList.remove("active");
        document.body.style.overflow = "";
        this.gameState = "ready";
        if (this.animationId) cancelAnimationFrame(this.animationId);
    }

    startGame() {
        this.resetGameData();
        this.gameState = "playing";
        this.updateMessage();
    }

    jump() {
        this.bird.velocity = this.bird.jump;
    }

    updateMessage() {
        if (!this.messageLayer) return;
        const getReady = this.messageLayer.querySelector(
            ".get-ready",
        ) as HTMLElement;
        const gameOver = this.messageLayer.querySelector(
            ".game-over",
        ) as HTMLElement;

        if (this.gameState === "playing") {
            this.messageLayer.style.display = "none";
        } else {
            this.messageLayer.style.display = "flex";
            getReady.style.display =
                this.gameState === "ready" ? "flex" : "none";
            gameOver.style.display =
                this.gameState === "gameover" ? "flex" : "none";
        }
    }

    loop() {
        if (!this.ctx || !this.canvas) return;
        this.update();
        this.draw();
        if (this.overlay?.classList.contains("active")) {
            this.animationId = requestAnimationFrame(() => this.loop());
        }
    }

    update() {
        if (this.gameState !== "playing") return;

        // Background parallax
        this.clouds.forEach((c) => {
            c.x -= c.speed;
            if (c.x < -150) c.x = 450;
        });

        this.bird.velocity += this.bird.gravity;
        this.bird.y += this.bird.velocity;
        this.bird.rotation = Math.min(
            Math.PI / 4,
            Math.max(-Math.PI / 4, this.bird.velocity * 0.1),
        );

        if (
            this.bird.y + this.bird.radius > 600 ||
            this.bird.y - this.bird.radius < 0
        ) {
            this.endGame();
        }

        if (this.frameCount % 90 === 0) {
            const gap = 160;
            const h = Math.random() * (400 - 100) + 50;
            this.pipes.push({ x: 400, y: h, gap: gap, passed: false });
        }

        this.pipes.forEach((p, i) => {
            p.x -= 2.5;
            if (!p.passed && p.x < this.bird.x) {
                p.passed = true;
                this.score++;
                if (this.scoreElement)
                    this.scoreElement.textContent = this.score.toString();
            }
            // Collision
            if (
                this.bird.x + this.bird.radius - 5 > p.x &&
                this.bird.x - this.bird.radius + 5 < p.x + 60
            ) {
                if (
                    this.bird.y - this.bird.radius + 5 < p.y ||
                    this.bird.y + this.bird.radius - 5 > p.y + p.gap
                ) {
                    this.endGame();
                }
            }
            if (p.x < -100) this.pipes.splice(i, 1);
        });
        this.frameCount++;
    }

    draw() {
        if (!this.ctx || !this.canvas) return;
        this.ctx.clearRect(0, 0, 400, 600);

        const isDark = document.body.classList.contains("dark");

        if (isDark) {
            // Draw Starry Sky
            this.ctx.fillStyle = "#0a1a2a";
            this.ctx.fillRect(0, 0, 400, 600);
            this.stars.forEach((s) => {
                this.ctx!.fillStyle = `rgba(255, 255, 255, ${s.opacity})`;
                this.ctx!.beginPath();
                this.ctx!.arc(s.x, s.y, s.size, 0, Math.PI * 2);
                this.ctx!.fill();
                // Twinkle
                s.opacity += (Math.random() - 0.5) * 0.05;
                s.opacity = Math.max(0.2, Math.min(0.8, s.opacity));
            });
        } else {
            // Draw Light Sky with Clouds & Mountains
            const skyGrad = this.ctx.createLinearGradient(0, 0, 0, 600);
            skyGrad.addColorStop(0, "#70c5ce");
            skyGrad.addColorStop(1, "#e0f7fa");
            this.ctx.fillStyle = skyGrad;
            this.ctx.fillRect(0, 0, 400, 600);

            // Mountains (Back Layer)
            this.ctx.fillStyle = "#80cbc4";
            this.ctx.beginPath();
            this.ctx.moveTo(0, 600);
            this.ctx.lineTo(0, 520);
            this.ctx.lineTo(80, 440);
            this.ctx.lineTo(160, 510);
            this.ctx.lineTo(240, 420);
            this.ctx.lineTo(320, 530);
            this.ctx.lineTo(400, 450);
            this.ctx.lineTo(400, 600);
            this.ctx.fill();

            // Mountains (Front Layer)
            this.ctx.fillStyle = "#4db6ac";
            this.ctx.beginPath();
            this.ctx.moveTo(0, 600);
            this.ctx.lineTo(0, 550);
            this.ctx.lineTo(120, 430);
            this.ctx.lineTo(250, 560);
            this.ctx.lineTo(350, 480);
            this.ctx.lineTo(400, 540);
            this.ctx.lineTo(400, 600);
            this.ctx.fill();

            // Snow Caps
            this.ctx.fillStyle = "#ffffff";
            // Cap 1
            this.ctx.beginPath();
            this.ctx.moveTo(120, 430);
            this.ctx.lineTo(100, 455);
            this.ctx.lineTo(110, 465);
            this.ctx.lineTo(120, 455);
            this.ctx.lineTo(135, 468);
            this.ctx.lineTo(145, 455);
            this.ctx.fill();
            // Cap 2
            this.ctx.beginPath();
            this.ctx.moveTo(350, 480);
            this.ctx.lineTo(335, 495);
            this.ctx.lineTo(345, 505);
            this.ctx.lineTo(355, 498);
            this.ctx.lineTo(365, 508);
            this.ctx.lineTo(370, 495);
            this.ctx.fill();

            // Clouds
            this.clouds.forEach((c) => {
                this.ctx!.save();
                this.ctx!.translate(c.x, c.y);
                this.ctx!.scale(c.scale, c.scale);

                // Cloud shadow/depth
                this.ctx!.fillStyle = "rgba(255, 255, 255, 0.4)";
                this.ctx!.beginPath();
                this.ctx!.arc(0, 5, 20, 0, Math.PI * 2);
                this.ctx!.arc(15, 10, 25, 0, Math.PI * 2);
                this.ctx!.arc(40, 5, 20, 0, Math.PI * 2);
                this.ctx!.fill();

                // Cloud body
                this.ctx!.fillStyle = "#ffffff";
                this.ctx!.beginPath();
                this.ctx!.arc(0, 0, 20, Math.PI * 0.5, Math.PI * 1.5);
                this.ctx!.arc(15, -15, 22, Math.PI * 1.0, Math.PI * 2.0);
                this.ctx!.arc(40, -5, 18, Math.PI * 1.2, Math.PI * 2.2);
                this.ctx!.arc(55, 5, 20, Math.PI * 1.5, Math.PI * 0.5);
                this.ctx!.lineTo(0, 25);
                this.ctx!.closePath();
                this.ctx!.fill();

                this.ctx!.restore();
            });
        }

        // Pipes
        this.pipes.forEach((p) => {
            const pipeColor = isDark ? "#4a752c" : "#aad751";
            const capColor = isDark ? "#385a21" : "#8ab541";

            this.ctx!.fillStyle = pipeColor;
            this.ctx!.fillRect(p.x, 0, 60, p.y);
            this.ctx!.fillRect(p.x, p.y + p.gap, 60, 600);
            this.ctx!.fillStyle = capColor;
            this.ctx!.fillRect(p.x - 5, p.y - 20, 70, 20);
            this.ctx!.fillRect(p.x - 5, p.y + p.gap, 70, 20);
        });

        // Bird
        this.ctx.save();
        this.ctx.translate(this.bird.x, this.bird.y);
        this.ctx.rotate(this.bird.rotation);

        this.ctx.beginPath();
        this.ctx.arc(0, 0, this.bird.radius, 0, Math.PI * 2);
        this.ctx.clip();

        if (this.avatar.complete) {
            this.ctx.drawImage(
                this.avatar,
                -this.bird.radius,
                -this.bird.radius,
                this.bird.radius * 2,
                this.bird.radius * 2,
            );
        } else {
            this.ctx.fillStyle = "#4299e1";
            this.ctx.fill();
        }
        this.ctx.restore();

        this.ctx.strokeStyle = "#fff";
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.arc(
            this.bird.x,
            this.bird.y,
            this.bird.radius,
            0,
            Math.PI * 2,
        );
        this.ctx.stroke();
    }

    endGame() {
        this.gameState = "gameover";
        if (this.finalScoreElement)
            this.finalScoreElement.textContent = `SCORE: ${this.score}`;
        this.updateMessage();
    }
}
