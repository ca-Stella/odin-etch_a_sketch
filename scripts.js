const grid = document.getElementById('grid');
const clear = document.querySelector('#clear');
const eraser = document.querySelector('#eraser');

clear.addEventListener('click', makeGrid);
eraser.addEventListener('click', erase);

let gridSize = 16;
let round = 0;
let cMode = 'basic';
let start = false; 

makeGrid();

// makeGrid() to create a grid of square divs 
function makeGrid() {
    if (round !== 0) {
        let sizeNum = checkSize();
        if (sizeNum === null) {
            return;
        } else {
            clearAll();
            gridSize = sizeNum;
        }
    }

    for (let i = 0; i < gridSize; i++) {
        let square_row = document.createElement('div');
        square_row.classList.add('square_row');
        grid.appendChild(square_row);

        for (let j = 0; j < gridSize; j++) {
            let square = document.createElement('div');
            square.classList.add('square');
            square_row.appendChild(square);
        }
    }
    round++;
    draw();
}

// checkSize() to see if inputted size is appropriate
function checkSize() {
    let inputVal = window.prompt('grid size: ');
    let inputNum = Number(inputVal)
    while (!(0 < inputNum && inputNum <= 100)) {
        if (inputVal === null) {
            return inputVal;
        } else if (inputVal === '') {
            inputNum = 16;
        } else if (inputNum > 100) {
            alert("That's too big! Enter a smaller number!");
            inputNum = checkSize();
        } else {
            alert('Please enter a valid value between 1-100');
            inputNum = checkSize();
        }
    }
    return inputNum;
}

// clearAll() to erase current grid
function clearAll() {
    grid.innerHTML = '';
}

// draw() in each square when hovering
function draw() {
    start = false;
    const squares = document.querySelectorAll('.square');
    squares.forEach(square => square.addEventListener('click', startOrEnd));
    squares.forEach(square => square.addEventListener('mouseenter', fillColor));
}

// startOrEnd() painting or erasing
function startOrEnd() {
    if (!start) {
        start = true;
        color = chooseColor();
        this.style.backgroundColor = color;
    } else {
        start = false;
    }
}

// chooseColor() to choose color to use
function chooseColor() {
    if (cMode == 'eraser') {
        return 'transparent';
    } else {
        return 'black';
    }
}

// fillColor() in the square by changing the background colour
function fillColor() {
    if (start) {
        this.style.opacity = 1;
        this.style.backgroundColor = color;
    }
}

// erase() to turn painted square into transparent square
function erase() {
    cMode = 'eraser';
    draw();
}