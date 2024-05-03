function createBoard()
{
    for (let i = 0; i < boardSize; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < boardSize; j++) {
            const cell = document.createElement('td');
            cell.addEventListener('click', toggleCell);
            cell.classList.toggle('on', true);
            row.appendChild(cell);
        }
        board.appendChild(row);
    }
}

function initBoard() {
    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
            const cell = document.getElementsByTagName('td')[i*boardSize+j];
            cell.addEventListener('click', toggleCell);
            cell.classList.toggle('on', initialState[i][j] === 1);
        }
    }
    moves = 0;
    document.getElementById('moves').innerHTML = moves;
    timeS = new Date().getTime();
}

function checkWin(){
    let off = 0;
    for (let i = 0; i < boardSize; i++){
        for (let j = 0; j < boardSize; j++){
            let elem = document.getElementsByTagName('td')[i*boardSize + j];
            if (! elem.classList.contains('on')) off++;
        }
    }
    return (off==25);
}

function toggleCell(event) {
    const cell = event.target;
    const currentColor = cell.style.backgroundColor;
    cell.classList.toggle('on');
    const rowIndex = cell.parentNode.rowIndex;
    const cellIndex = cell.cellIndex;
    
    

    if (rowIndex == last_move_y && cellIndex == last_move_x && moves > 0) moves--;
    else moves++;
    document.getElementById('moves').innerHTML = moves;

    flipNeighbors(rowIndex, cellIndex);

    if (checkWin()){
        timeF = new Date().getTime();
        alert("You won! Moves: " + moves +  " time: " + (timeF-timeS)/10+ " s");
    }    
    last_move_x = cellIndex;
    last_move_y = rowIndex;
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


// AJAX
function updateBoard(){
    let request = new XMLHttpRequest();
    request.open("GET","data/data1.json");
    request.onreadystatechange = () =>
    {
        if (request.readyState === XMLHttpRequest.DONE)
        {
            let rtext = request.responseText;
            let rjson = JSON.parse(rtext);
            initialState = rjson.boards[Math.trunc(Math.random()*rjson.boards.length)];
            initBoard();
        }
    }
    request.send();
}

const boardSize = 5;
let initialState;
const board = document.getElementById('game-board');
const update = document.getElementById('update-board');

let moves = 0, timeS, timeF, last_move_x, last_move_y;
createBoard();

updateBoard();
