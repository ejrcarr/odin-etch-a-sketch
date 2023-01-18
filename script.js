const sketchContainer = document.getElementById('sketch-container');
const colorpicker = document.getElementById('colorpicker');
const value = document.getElementById('value');
const gridSizeInput = document.getElementById('grid-size');
value.textContent = gridSizeInput.value + ' x ' + gridSizeInput.value;

const DEFAULT_COLOR = '#0000ff';
const DEFAULT_GRID = 16;
let currentColor = DEFAULT_COLOR;
let currentGrid = DEFAULT_GRID;

colorpicker.addEventListener('input', (e) => setColor(e.target.value));
gridSizeInput.addEventListener('input', (e) => handleSliderChange(e));

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
				if (mouseDown) e.target.style.background = currentColor;
			});
			div.addEventListener('mousedown', (e) => {
				e.target.style.background = currentColor;
			});
			sketchContainer.appendChild(div);
		}
	}
	// sketchContainer.innerHTML = '';
	// for (let i = 0; i < currentGrid * currentGrid; i++) {
	// 	let div = document.createElement('div');
	// 	div.classList.add('grid-square');
	// 	div.addEventListener('mouseover', (e) => {
	// 		if (mouseDown) e.target.style.background = currentColor;
	// 	});
	// 	sketchContainer.appendChild(div);
	// }
}

function resetBoard() {
	sketchContainer.childNodes.forEach((div) => {
		div.style.background = 'white';
	});
}

function handleSliderChange(e) {
	value.textContent = e.target.value + ' x ' + e.target.value;
	currentGrid = e.target.value;
	initializeBoard();
}

initializeBoard();
