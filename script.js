let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameOver = false;
let scoreX = 0;
let scoreO = 0;

function startGame() {
    const playerX = document.getElementById('playerX').value;
    const playerO = document.getElementById('playerO').value;

    if (!playerX || !playerO) {
        alert('Please enter names for both players.');
        return;
    }

    document.getElementById('game').classList.remove('hidden');
    document.getElementById('scoreX').textContent = `${playerX}: ${scoreX}`;
    document.getElementById('scoreO').textContent = `${playerO}: ${scoreO}`;

    document.getElementById('playerX').disabled = true;
    document.getElementById('playerO').disabled = true;

    document.getElementById('board').innerHTML = '';
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameOver = false;

    renderBoard();
    updateStatus(`It's ${playerX}'s turn.`);
}

function renderBoard() {
    const boardElement = document.getElementById('board');
    boardElement.innerHTML = '';

    for (let i = 0; i < board.length; i++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.dataset.index = i;
        cell.textContent = board[i];
        boardElement.appendChild(cell);
    }
}

function cellClick(event) {
    if (gameOver) return;

    const index = event.target.dataset.index;

    if (board[index] === '') {
        board[index] = currentPlayer;
        renderBoard();

        if (checkWinner()) {
            gameOver = true;
            updateStatus(`${currentPlayer} wins!`);
            updateScore();
        } else if (board.every(cell => cell !== '')) {
            gameOver = true;
            updateStatus('It\'s a draw!');
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            updateStatus(`It's ${currentPlayer}'s turn.`);
        }
    }
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] !== '' && board[a] === board[b] && board[b] === board[c]) {
            return true;
        }
    }

    return false;
}

function updateScore() {
    if (currentPlayer === 'X') {
        scoreX++;
        document.getElementById('scoreX').textContent = `Player X: ${scoreX}`;
    } else {
        scoreO++;
        document.getElementById('scoreO').textContent = `Player O: ${scoreO}`;
    }
}

function updateStatus(message) {
    document.getElementById('message').textContent = message;
}

function resetGame() {
    document.getElementById('playerX').value = '';
    document.getElementById('playerO').value = '';
    document.getElementById('playerX').disabled = false;
    document.getElementById('playerO').disabled = false;
    document.getElementById('game').classList.add('hidden');
}
