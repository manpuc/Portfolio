const ICONS = {
    RESET: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8m0 0v-5m0 5h-5M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16m0 0v5m0-5h5"/></svg>`,
    WIN: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
    LOSE: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`
};

export class Minesweeper {
    rows: number;
    cols: number;
    minesCount: number;
    board: any[][];
    mineLocations: [number, number][];
    revealedCount: number;
    flagsCount: number;
    gameOver: boolean;
    timer: number;
    timerInterval: ReturnType<typeof setInterval> | null;
    firstClick: boolean;

    overlay: HTMLElement;
    boardElement: HTMLElement;
    resetBtn: HTMLElement;
    mineCountElement: HTMLElement;
    timerElement: HTMLElement;
    closeBtn: HTMLElement;

    constructor() {
        this.rows = 10;
        this.cols = 10;
        this.minesCount = 15;
        this.board = [];
        this.mineLocations = [];
        this.revealedCount = 0;
        this.flagsCount = 0;
        this.gameOver = false;
        this.timer = 0;
        this.timerInterval = null;
        this.firstClick = true;

        this.overlay = document.getElementById(
            "minesweeper-game-overlay",
        ) as HTMLElement;
        this.boardElement = document.getElementById(
            "minesweeper-board",
        ) as HTMLElement;
        this.resetBtn = document.getElementById(
            "minesweeper-reset",
        ) as HTMLElement;
        this.mineCountElement = document.getElementById(
            "minesweeper-mine-count",
        ) as HTMLElement;
        this.timerElement = document.getElementById(
            "minesweeper-timer",
        ) as HTMLElement;
        this.closeBtn = document.getElementById(
            "minesweeper-close",
        ) as HTMLElement;

        this.initEventListeners();
    }

    initEventListeners() {
        this.resetBtn?.addEventListener("click", () => this.startNewGame());
        this.closeBtn?.addEventListener("click", () => this.close());
    }

    open() {
        this.overlay.classList.add("active");
        document.body.style.overflow = "hidden";
        this.startNewGame();
    }

    close() {
        this.overlay.classList.remove("active");
        document.body.style.overflow = "";
        this.stopTimer();
    }

    startNewGame() {
        this.gameOver = false;
        this.firstClick = true;
        this.revealedCount = 0;
        this.flagsCount = 0;
        this.timer = 0;
        this.stopTimer();
        this.updateStats();
        this.resetBtn.innerHTML = ICONS.RESET;
        this.resetBtn.classList.remove("win", "lose");
        this.createBoard();
    }

    createBoard() {
        this.boardElement.innerHTML = "";
        this.board = [];
        this.mineLocations = [];

        for (let r = 0; r < this.rows; r++) {
            let row = [];
            for (let c = 0; c < this.cols; c++) {
                const cell = document.createElement("div");
                const isEven = (r + c) % 2 === 0;
                cell.classList.add(
                    "cell",
                    isEven ? "cell-even" : "cell-odd",
                );
                cell.dataset.row = r.toString();
                cell.dataset.col = c.toString();
                cell.setAttribute("role", "gridcell");
                cell.setAttribute("aria-label", `Cell at ${r + 1}, ${c + 1}, unrevealed`);

                cell.addEventListener("click", (e) =>
                    this.handleCellClick(r, c),
                );
                cell.addEventListener("contextmenu", (e) => {
                    e.preventDefault();
                    this.handleRightClick(r, c);
                });

                this.boardElement.appendChild(cell);
                row.push({
                    mine: false,
                    revealed: false,
                    flagged: false,
                    element: cell,
                });
            }
            this.board.push(row);
        }
    }

    placeMines(startR: number, startC: number) {
        let minesPlaced = 0;
        while (minesPlaced < this.minesCount) {
            let r = Math.floor(Math.random() * this.rows);
            let c = Math.floor(Math.random() * this.cols);

            // Don't place mine on the first click and surrounding cells
            if (
                !this.board[r][c].mine &&
                (Math.abs(r - startR) > 1 || Math.abs(c - startC) > 1)
            ) {
                this.board[r][c].mine = true;
                this.mineLocations.push([r, c]);
                minesPlaced++;
            }
        }
    }

    handleCellClick(r: number, c: number) {
        if (
            this.gameOver ||
            this.board[r][c].flagged ||
            this.board[r][c].revealed
        )
            return;

        if (this.firstClick) {
            this.firstClick = false;
            this.placeMines(r, c);
            this.startTimer();
        }

        if (this.board[r][c].mine) {
            this.revealMines();
            this.endGame(false);
        } else {
            this.revealCell(r, c);
            if (
                this.revealedCount ===
                this.rows * this.cols - this.minesCount
            ) {
                this.endGame(true);
            }
        }
    }

    handleRightClick(r: number, c: number) {
        if (this.gameOver || this.board[r][c].revealed) return;

        this.board[r][c].flagged = !this.board[r][c].flagged;
        const cell = this.board[r][c].element;

        if (this.board[r][c].flagged) {
            cell.classList.add("flagged");
            cell.textContent = "🚩";
            cell.setAttribute("aria-label", `Cell at ${r + 1}, ${c + 1}, flagged`);
            this.flagsCount++;
        } else {
            cell.classList.remove("flagged");
            cell.textContent = "";
            cell.setAttribute("aria-label", `Cell at ${r + 1}, ${c + 1}, unrevealed`);
            this.flagsCount--;
        }
        this.updateStats();
    }

    revealCell(r: number, c: number) {
        if (
            r < 0 ||
            r >= this.rows ||
            c < 0 ||
            c >= this.cols ||
            this.board[r][c].revealed ||
            this.board[r][c].flagged
        )
            return;

        this.board[r][c].revealed = true;
        this.revealedCount++;
        const cell = this.board[r][c].element;
        cell.classList.add("revealed");

        const count = this.getAdjacentMines(r, c);
        if (count > 0) {
            cell.textContent = count.toString();
            cell.dataset.count = count.toString();
            cell.setAttribute("aria-label", `Cell at ${r + 1}, ${c + 1}, revealed, ${count} mines adjacent`);
        } else {
            cell.setAttribute("aria-label", `Cell at ${r + 1}, ${c + 1}, revealed, no mines adjacent`);
            // Flood fill for empty cells
            for (let dr = -1; dr <= 1; dr++) {
                for (let dc = -1; dc <= 1; dc++) {
                    this.revealCell(r + dr, c + dc);
                }
            }
        }
    }

    getAdjacentMines(r: number, c: number) {
        let count = 0;
        for (let dr = -1; dr <= 1; dr++) {
            for (let dc = -1; dc <= 1; dc++) {
                let nr = r + dr;
                let nc = c + dc;
                if (
                    nr >= 0 &&
                    nr < this.rows &&
                    nc >= 0 &&
                    nc < this.cols &&
                    this.board[nr][nc].mine
                ) {
                    count++;
                }
            }
        }
        return count;
    }

    revealMines() {
        this.mineLocations.forEach(([r, c]) => {
            const cell = this.board[r][c].element;
            cell.classList.add("revealed", "mine");
            cell.textContent = "💣";
            cell.setAttribute("aria-label", `Cell at ${r + 1}, ${c + 1}, revealed mine`);
        });
    }

    startTimer() {
        this.timerInterval = setInterval(() => {
            this.timer = Math.min(999, this.timer + 1);
            this.timerElement.textContent = String(this.timer).padStart(
                3,
                "0",
            );
        }, 1000);
    }

    stopTimer() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
    }

    updateStats() {
        this.mineCountElement.textContent = String(
            Math.max(0, this.minesCount - this.flagsCount),
        ).padStart(3, "0");
    }

    endGame(win: boolean) {
        this.gameOver = true;
        this.stopTimer();
        this.resetBtn.innerHTML = win ? ICONS.WIN : ICONS.LOSE;
        this.resetBtn.classList.add(win ? "win" : "lose");
        if (win) {
            // Flag remaining mines
            this.mineLocations.forEach(([r, c]) => {
                if (!this.board[r][c].flagged) {
                    this.board[r][c].flagged = true;
                    this.board[r][c].element.classList.add("flagged");
                    this.board[r][c].element.textContent = "🚩";
                }
            });
            this.flagsCount = this.minesCount;
            this.updateStats();
        }
    }
}
