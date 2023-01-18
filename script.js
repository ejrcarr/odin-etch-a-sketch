const sketchContainer = document.getElementById('sketch-container');
const colorpicker = document.getElementById('colorpicker');
const value = document.getElementById('value');
const gridSizeInput = document.getElementById('grid-size');
value.textContent = gridSizeInput.value + ' x ' + gridSizeInput.value;
const optionsButton = document.getElementById('options-button');
const caret = document.querySelector('.fa-caret-down');
const optionsDropdown = document.querySelector('.options-dropdown');
const eraseButton = document.querySelector('.erase-button');
const paintButton = document.querySelector('.paint-button');
const clearButton = document.querySelector('.clear-board');
const rainbowOption = document.getElementById('rainbow');
const cog = document.querySelector('.fa-cog');
const gridLinesCheck = document.getElementById('grid-lines');

const DEFAULT_COLOR = '#0000ff';
const DEFAULT_GRID = 16;
const DEFAULT_GRIDLINES = true;
let currentColor = DEFAULT_COLOR;
let currentGrid = DEFAULT_GRID;
let isEraseActive = false;
let areGridLines = DEFAULT_GRIDLINES;

colorpicker.addEventListener('input', (e) => {
	setColor(e.target.value);
	isEraseActive = false;
});
gridSizeInput.addEventListener('input', (e) => handleSliderChange(e));
optionsButton.addEventListener('click', () => {
	caret.classList.toggle('open-caret');
	optionsDropdown.classList.toggle('open-options');
	cog.classList.toggle('open-cog');
});
eraseButton.addEventListener('click', () => {
	setColor('white');
	isEraseActive = true;
});
paintButton.addEventListener('click', () => {
	setColor(colorpicker.value);
	isEraseActive = false;
});
clearButton.addEventListener('click', resetBoard);
gridSizeInput.addEventListener('mousedown', resetBoard);
gridLinesCheck.addEventListener('change', toggleGridLines);

var mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

function setColor(color) {
	currentColor = color;
}

function initializeBoard() {
	sketchContainer.style.gridTemplateRows = `repeat(${currentGrid}, minmax(0, 1fr))`;
	sketchContainer.style.gridTemplateColumns = `repeat(${currentGrid}, minmax(0, 1fr))`;
	let currAmount = sketchContainer.childElementCount;
	if (currAmount > currentGrid * currentGrid) {
		for (let i = 0; i < currAmount - currentGrid * currentGrid; i++) {
			sketchContainer.removeChild(sketchContainer.lastChild);
		}
	} else if (currAmount < currentGrid * currentGrid) {
		for (let i = 0; i < currentGrid * currentGrid - currAmount; i++) {
			let div = document.createElement('div');
			div.classList.add('grid-square');
			div.setAttribute('draggable', false);
			div.addEventListener('mouseover', (e) => {
				if (mouseDown) {
					if (!rainbowOption.checked || isEraseActive) {
						e.target.style.background = currentColor;
					} else {
						let randomR = Math.floor(Math.random() * 256);
						let randomG = Math.floor(Math.random() * 256);
						let randomB = Math.floor(Math.random() * 256);
						e.target.style.background = `rgb(${randomR}, ${randomG}, ${randomB})`;
					}
				}
			});
			div.addEventListener('mousedown', (e) => {
				if (!rainbowOption.checked || isEraseActive) {
					e.target.style.background = currentColor;
				} else {
					let randomR = Math.floor(Math.random() * 256);
					let randomG = Math.floor(Math.random() * 256);
					let randomB = Math.floor(Math.random() * 256);
					e.target.style.background = `rgb(${randomR}, ${randomG}, ${randomB})`;
				}
			});
			if (areGridLines) {
				div.style.border = '.5px solid rgb(217, 217, 217)';
			} else {
				div.style.border = 'none';
			}
			sketchContainer.appendChild(div);
		}
	}
}

function resetBoard() {
	let squares = document.querySelectorAll('.grid-square');
	squares.forEach((square) => {
		square.style.background = 'white';
	});
}

function handleSliderChange(e) {
	value.textContent = e.target.value + ' x ' + e.target.value;
	currentGrid = e.target.value;
	initializeBoard();
}

function toggleGridLines() {
	let squares = document.querySelectorAll('.grid-square');
	areGridLines = !areGridLines;
	squares.forEach((square) => {
		if (areGridLines) {
			square.style.border = '.5px solid rgb(217, 217, 217)';
		} else {
			square.style.border = 'none';
		}
	});
}

initializeBoard();
