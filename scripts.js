const grid = document.getElementById('grid');

let gridSize = 16;

makeGrid();
draw();

// makeGrid() to create 16x16 grid of square divs
function makeGrid() {
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
}

// draw() in each square when hovering
function draw() {
    const squares = document.querySelectorAll('.square');
    squares.forEach(square => square.addEventListener('mouseenter', fillColor));
}

// fillColor() in the square by changing the background colour
function fillColor() {
    color = 'black';
    this.style.opacity = 1;
    this.style.backgroundColor = color;
}