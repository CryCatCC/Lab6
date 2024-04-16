const boardSize = 5;
const initialState = [
    [1, 1, 1, 1, 1],
    [0, 0, 1, 0, 0],
    [1, 0, 1, 0, 1],
    [1, 0, 1, 1, 0],
    [0, 1, 0, 0, 1]
];

const board = document.getElementById('game-board');


function initBoard() {
    for (let i = 0; i < boardSize; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < boardSize; j++) {
            const cell = document.createElement('td');
            cell.addEventListener('click', toggleCell);
            cell.classList.toggle('on', initialState[i][j] === 1);
            row.appendChild(cell);
        }
        board.appendChild(row);
    }
}


function toggleCell(event) {
    const cell = event.target;
    const currentColor = cell.style.backgroundColor;


    if (currentColor === 'white') {
        cell.style.backgroundColor = 'black';
    } else {
        cell.style.backgroundColor = 'white';
    }

    const rowIndex = cell.parentNode.rowIndex;
    const cellIndex = cell.cellIndex;


    flipNeighbors(rowIndex, cellIndex);
}


function flipNeighbors(rowIndex, cellIndex) {
    const directions = [
        [0, -1], // верх
        [0, 1], // низ
        [-1, 0], // ліво
        [1, 0]   // право
    ];

    directions.forEach(dir => {
        const newRowIndex = rowIndex + dir[0];
        const newCellIndex = cellIndex + dir[1];

        if (newRowIndex >= 0 && newRowIndex < boardSize && newCellIndex >= 0 && newCellIndex < boardSize) {
            const neighbor = board.rows[newRowIndex].cells[newCellIndex];
            neighbor.classList.toggle('on');
        }
    });
}

initBoard();