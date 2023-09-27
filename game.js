const dimensions = 5; // The initial board size is dimensions x dimensions
const winLength = 5; // How many stones needed to win
const board = []; // The game board
let turn = 'X'; // Starting player. The other player is 'O'.

function initializeGame() {
    // TODO: Task 1
    // Initialize the game board to be an array of five arrays.
    // Each of the inner arrays should contain five empty strings.
    // Use the variable dimensions instead of hard coding the number five.

    for (let y = 0; y < dimensions; y++) {
        const row = [];
        for (let x = 0; x < dimensions; x++) {
            row.push('');
        }
        board.push(row);
    }
}

function nextTurn() {
    if (turn === 'X') {
        turn = 'O';
    }
    else {
        turn = 'X';
    }
    let turnLabel = document.getElementById('turn');
    turnLabel.textContent = turn;
}

function checkWin(x, y) {
    // TODO: Task 3
    // Hint: be careful to keep yourself inside of the game board!
    // Check the neighbouring squares of the square x,y.
    // If any of them contain same character as the current turn,
    // keep on checking to that direction -- and to the opposite!
    // Number of the stones needed is in variable winLength.

    const currentPlayer = board[y][x];
    
        // Define the directions to check: horizontal, vertical, and diagonal
    const directions = [
        [0, 1],  // Right
        [1, 0],  // Down
        [1, 1],  // Diagonal down-right
        [-1, 1]  // Diagonal down-left
    ];
    
    for (const [dx, dy] of directions) {
        let count = 1;
    
            // Check in one direction
        for (let i = 1; i < winLength; i++) {
            const newX = x + i * dx;
            const newY = y + i * dy;
    
            if (newX >= 0 && newX < dimensions && newY >= 0 && newY < dimensions) {
                if (board[newY][newX] === currentPlayer) {
                    count++;
                } else {
                    break;
                }
            } else {
                break;
            }
        }
    
            // Check in the opposite direction
        for (let i = 1; i < winLength; i++) {
            const newX = x - i * dx;
            const newY = y - i * dy;
    
            if (newX >= 0 && newX < dimensions && newY >= 0 && newY < dimensions) {
                if (board[newY][newX] === currentPlayer) {
                    count++;
                } else {
                    break;
                    }
            } else {
                break;
            }
        }
    
        if (count >= winLength) {
            return true;
        }
    }
    
    return false;
}
    

function expandBoard(direction) {
    // TODO: Task 2 B
    // This function adds a column or a row to the board
    // depending on the direction it gets as an argument.
   
        if (direction === 'LEFT') {
            for (let y = 0; y < dimensions; y++) {
                board[y].unshift('');
            }
            dimensions++;
        } else if (direction === 'RIGHT') {
            for (let y = 0; y < dimensions; y++) {
                board[y].push('');}
            dimensions++;
        } else if (direction === 'UP') {
            const newRow = Array(dimensions).fill('');
            board.unshift(newRow);
            dimensions++;
        } else if (direction === 'DOWN') {
            const newRow = Array(dimensions).fill('');
            board.push(newRow);
            dimensions++;
        }
    
    drawBoard(); // Redraw the board with the new dimensions
}

function handleClick(event) {
    let square = event.target;
    let x = square.dataset.x;
    let y = square.dataset.y;

    board[y][x] = turn;
    square.textContent = turn;
    square.removeEventListener('click', handleClick);

    checkWin(x, y);

    // TODO: Task 2 A
    // Implement the conditions when the board should be expanded.
    // Ie when the player clicks the extreme rows or columns.
    /* 
    if ( ) {
        expandBoard('LEFT');
    }
    else if ( ) {
        expandBoard('RIGHT');
    }
    if ( ) {
        expandBoard('UP');
    }
    else if ( ) {
        expandBoard('DOWN');
    }
    */
    if (x === 0) {
        expandBoard('LEFT');
    } else if (x === dimensions - 1) {
        expandBoard('RIGHT');
    }
    if (y === 0) {
        expandBoard('UP');
    } else if (y === dimensions - 1) {
        expandBoard('DOWN');
    }

    nextTurn();
}


function createSquare(boardDiv, x, y) {
    let element = document.createElement('div');
    element.setAttribute('class', 'square');
    element.setAttribute('data-x', x);
    element.setAttribute('data-y', y);
    element.textContent = board[y][x];

    if (board[y][x] === '') {
        element.addEventListener('click', handleClick);
    }

    boardDiv.appendChild(element);
}

function drawBoard() {
    const boardDiv = document.getElementById('board');
    boardDiv.innerHTML = ''; // Clear the board first!

    for (let y = 0; y < dimensions; y++) {
        for (let x = 0; x < dimensions; x++) {
            createSquare(boardDiv, x, y);
        }
    }
}

initializeGame();
drawBoard();
