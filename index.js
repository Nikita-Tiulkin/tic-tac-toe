const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

let hot = true;
let gameAlive = true;
let boardSize = 3;
let field =[
    [EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY]
]

const container = document.getElementById('fieldWrapper');

startGame();
addResetListener();

function startGame () {
    renderGrid(3);
}

function renderGrid (dimension) {
    container.innerHTML = '';

    for (let i = 0; i < dimension; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < dimension; j++) {
            const cell = document.createElement('td');
            cell.textContent = EMPTY;
            cell.addEventListener('click', () => cellClickHandler(i, j));
            row.appendChild(cell);
        }
        container.appendChild(row);
    }
}

function IsBoardeFull(){
    for (let row = 0; row < boardSize; row++) {
        for(let col = 0; col < boardSize; col++) {
            if(field[row][col] === EMPTY)
                return false;
        }
    }
    return true;
}
function cellClickHandler (row, col) {
    // Пиши код тут
    console.log(`Clicked on cell: ${row}, ${col}`);

    // ИСПРАВЛЕНО: теперь вызывается правильная функция IsBoardeFull()
    if (IsBoardeFull()) {
        alert('Победила дружба! Ничья!');
        return;
    }

    if(field[row][col] === EMPTY)
    {
        if(hot){
            renderSymbolInCell(CROSS, row, col);
            field[row][col] = CROSS;
        } else{
            renderSymbolInCell(ZERO, row, col);
            field[row][col] = ZERO;
        }
        hot =! hot
    }
    if(IsBoardeFull())
    {
        gameAlive = false;
        alert('Победила дружба!');
        return;
    }

    const winer = checkWinner()
    if(winer)
    {
        gameAlive = false;
        alert(`${winer}`);
    }




}

function checkWinner() {
    for (let row = 0; row < boardSize; row++) {
        if (field[row][0] !== EMPTY &&
            field[row][0] === field[row][1] &&
            field[row][1] === field[row][2]) {
            return field[row][0];
        }
    }

    for (let col = 0; col < boardSize; col++) {
        if (field[0][col] !== EMPTY &&
            field[0][col] === field[1][col] &&
            field[1][col] === field[2][col]) {
            return field[0][col];
        }
    }

    if (field[0][0] !== EMPTY &&
        field[0][0] === field[1][1] &&
        field[1][1] === field[2][2]) {
        return field[0][0];
    }

    if (field[0][2] !== EMPTY &&
        field[0][2] === field[1][1] &&
        field[1][1] === field[2][0]) {
        return field[0][2];
    }

    return null;
}

function renderSymbolInCell (symbol, row, col, color = '#333') {
    const targetCell = findCell(row, col);

    targetCell.textContent = symbol;
    targetCell.style.color = color;
}

function findCell (row, col) {
    const targetRow = container.querySelectorAll('tr')[row];
    return targetRow.querySelectorAll('td')[col];
}

function addResetListener () {
    const resetButton = document.getElementById('reset');
    resetButton.addEventListener('click', resetClickHandler);
}

function resetClickHandler () {
    console.log('reset!');
}




/* Test Function */
/* Победа первого игрока */
function testWin () {
    clickOnCell(0, 2);
    clickOnCell(0, 0);
    clickOnCell(2, 0);
    clickOnCell(1, 1);
    clickOnCell(2, 2);
    clickOnCell(1, 2);
    clickOnCell(2, 1);
}

/* Ничья */
function testDraw () {
    clickOnCell(2, 0);
    clickOnCell(1, 0);
    clickOnCell(1, 1);
    clickOnCell(0, 0);
    clickOnCell(1, 2);
    clickOnCell(1, 2);
    clickOnCell(0, 2);
    clickOnCell(0, 1);
    clickOnCell(2, 1);
    clickOnCell(2, 2);
}

function clickOnCell (row, col) {
    findCell(row, col).click();
}
