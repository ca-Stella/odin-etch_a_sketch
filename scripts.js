const buttons = document.querySelectorAll('button');
const grid = document.getElementById('grid');
const clear = document.querySelector('#clear');
const colPick = document.querySelector('#color-picker');

buttons.forEach(button => button.addEventListener('click', pressButton));

clear.addEventListener('click', makeGrid);
// shade.addEventListener('click', shadeSquares);
colPick.addEventListener('click', function() {
    start = false; 
    cMode = 'basic';
});
colPick.addEventListener('change', chooseColor);

let gridSize = 16;
let round = 0;
let cMode = 'basic';
let start = false; 
let color = 'black';

makeGrid();

// makeGrid() to create a grid of square divs 
function makeGrid() {
    cMode = 'basic';
    resetButtons();
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
            square.style.backgroundColor = 'rgba(255, 255, 255, 0)';
            square.dataset.shade = 0;
            square.dataset.light = 0;
            square_row.appendChild(square);
        }
    }
    round++;
    clear.classList.remove('pressed');
    basic.classList.add('pressed');
    draw();
}


// resetButtons() to press and un-press
function resetButtons() {
    buttons.forEach(button => button.classList.remove('pressed'));
    clear.classList.remove('pressed');
    basic.classList.add('pressed');
    colMode = 'basic';
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

// pressButton() to set mode
function pressButton() {
    start = false;
    cMode = this.getAttribute('id');
    buttons.forEach(button => button.classList.remove('pressed'));
    this.classList.add('pressed');

    draw();
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
        colorCode = this.style.backgroundColor;
        if (cMode == 'shade') {
            shadeStep = parseInt(this.dataset.shade);
            color = findShade(colorCode, shadeStep);
            this.style.backgroundColor = color;
            this.dataset.shade = shadeStep + 1;
        } else if (cMode == 'lighten') {
            lightenStep = parseInt(this.dataset.light);
            color = findLighten(colorCode, lightenStep);
            this.style.backgroundColor = color;
            this.dataset.light = lightenStep + 1;
        } else {
            color = chooseColor();
            this.style.backgroundColor = color;
        }
    } else {
        start = false;
    }
}

// chooseColor() to choose color to use
function chooseColor() {
    if (cMode == 'eraser') {
        color = 'transparent';
    } else if (cMode == 'random') {
        color = randomizeColor();
    } else {
        cMode = 'basic';
        color = colPick.value || 'black';
    }
    return color;
}

// fillColor() in the square by changing the background colour
function fillColor() {
    if (start) {
        colorCode = this.style.backgroundColor;
        if (cMode == 'shade') {
            shadeStep = parseInt(this.dataset.shade);
            color = findShade(colorCode, shadeStep);
            this.style.backgroundColor = color;
            this.dataset.shade = shadeStep + 1;
        } else if (cMode == 'lighten') {
            lightenStep = parseInt(this.dataset.light);
            color = findLighten(colorCode, lightenStep);
            this.style.backgroundColor = color;
            this.dataset.light = lightenStep + 1;
        } else {
            color = chooseColor();
            this.style.backgroundColor = color;
        }
    }
}

// findShade() to find current colour and return darker colour
function findShade(colorCode, shadeStep) {
    color = colorCode.substring(colorCode.indexOf('(')+1, colorCode.indexOf(')'));
    rgba = color.split(',');
    rgba[3] = (!rgba[3]) ? '1' : rgba[3];
    rgba = rgba.map(function (e) {
        return parseFloat(e);
    })
    if (shadeStep <= 15) {
        red = Math.round(rgba[0] - rgba[0] / 5);
        green = Math.round(rgba[1] - rgba[1] / 5);
        blue = Math.round(rgba[2] - rgba[2] / 5);
        if (rgba[3] == 0) {
            alpha = 0.2;
        } else {
            alpha = (rgba[3] + rgba[3] / 5).toFixed(2);
        }
    } else {
        red = blue = green = 0;
        alpha = 1;
    }
    newRGBA = [red, green, blue, alpha];
    shadedColor = 'rgba('+ newRGBA.toString() + ')';
    return shadedColor;
}

// findLighten() to find current colour and return lighter colour
function findLighten(colorCode, lightStep) {
    color = colorCode.substring(colorCode.indexOf('(')+1, colorCode.indexOf(')'));
    rgba = color.split(',');
    rgba[3] = (!rgba[3]) ? '1' : rgba[3];
    rgba = rgba.map(function (e) {
        return parseFloat(e);
    })
    if (lightStep <= 15) {
        red = Math.round(rgba[0] + rgba[0] / 5);
        green = Math.round(rgba[1] + rgba[1] / 5);
        blue = Math.round(rgba[2] + rgba[2] / 5);
        if (rgba[3] == 1) {
            alpha = 0.9;
        } else {
            alpha = (rgba[3] - rgba[3] / 5).toFixed(2);
        }
    } else {
        red = blue = green = 255;
        alpha = 0;
    }
    newRGBA = [red, green, blue, alpha];
    lighterColor = 'rgba('+ newRGBA.toString() + ')';
    return lighterColor;
}
// randomizeColor() for the rainbow option
function randomizeColor() {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    const a = (Math.floor(Math.random() * 10) + 1)/10;
    const rgba = `rgb(${r},${g},${b},${a})`
    return rgba;
}