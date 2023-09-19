/* Variables */

/* Clase 2: Capturar al elemento canvas de html*/

const canvas = document.querySelector('#game');
console.log(canvas);

/* Clase 2: Crear el contexto de Canvas*/

const game = canvas.getContext('2d');
console.log(game);

let canvasSize;
let elementSize;


/* EVENTOS */

/* Crear evento y función que va a contener las propiedades y métodos del contexto 2D */

window.addEventListener('load', setCanvasSize);
window.addEventListener("resize", setCanvasSize);

/* FUNCIONES */

function setCanvasSize() {
     // Clase N° 03
    //Establecer el tamaño de un elemento del canvas(10x10)
    

    if (window.innerHeight > window.innerWidth) {
        canvasSize = Math.floor(window.innerWidth * 0.7);
    } else {
        canvasSize = Math.floor(window.innerHeight * 0.7);
    }

    canvas.setAttribute('width', canvasSize);
    canvas.setAttribute('height', canvasSize);

    console.log(window.innerHeight);
    console.log(window.innerWidth);
    console.log(canvas.height);
    console.log(canvas.width);

    //Establecer el tamaño de un elemento del canvas(10x10)

    elementSize = Math.floor(canvasSize / 10);

    startGame();
}

function startGame() {

    console.log({canvasSize, elementSize});

    game.font = elementSize + "px Verdana";
    game.textAlign = "end";

    const map = maps[0];
    const mapRows = map.trim().split('\n');
    const mapRowCols = mapRows.map(row => row.trim().split(''));
    console.log({map, mapRows, mapRowCols});

    for (let row = 1; row <= 11; row++) {
        for (let col = 0; col < 11; col++) {
            game.fillText(emojis[mapRowCols[row - 1][col - 1]], elementSize * col, elementSize * row);
            
        }
    }

    // game.fillStyle = 'brown';
    // game.fillRect(100,25,100,100);
    // game.clearRect(125,50,50,50);

    // game.font = '16px Verdana';
    // game.fillStyle = "blue";
    // game.fillText('HOLI!', 128, 78);
}