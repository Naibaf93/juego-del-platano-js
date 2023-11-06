/* Variables */

/* Clase 2: Capturar al elemento canvas de html*/

const canvas = document.querySelector('#game');
console.log(canvas);

/* Clase 2: Crear el contexto de Canvas*/

const game = canvas.getContext('2d');
console.log(game);

let canvasSize;
let elementSize;
let level = 0;
let live = 3;

let timeStart;
let timePlayer;
let timeInterval;

const messages = {
    levelUp: "Chi cheñonl!🍌",
    gameOver: "Game over😔",
};

const playerPosition = {
    x: undefined,
    y: undefined,
};

const giftPosition = {
    x: undefined,
    y: undefined,
};

let enemyPositions = [];
let firePosition = [];

let gameRunning = true;

/* EVENTOS */

/*Clase 8: Crear evento que escuche botones de dirección*/

const btnUp = document.querySelector("#up");
const btnLeft = document.querySelector("#left");
const btnRight = document.querySelector("#right");
const btnDown = document.querySelector("#down");

/* Clase 22 reto de crear un boton o botones que reinicien el juego */

const btnReset = document.querySelector("#record-play-again");
const btnReset1 = document.querySelector("#record-play-again2");
const btnReset2 = document.querySelector("#record-play-again3");


/* Clase 16 sistema de vidad y corazones */

const spanLives = document.querySelector(".life--counter");

/* Clase 17 sistema de tiempo y puntaje */

const spanTime = document.querySelector(".time-counter");

/* Clase 19 guardando records del jugador */

const result = document.querySelector(".record-display");
const pRecord = document.querySelector(".new-record");
const sLevel = document.querySelector(".level"); 

/* Crear evento y función que va a contener las propiedades y métodos del contexto 2D */

window.addEventListener('load', setCanvasSize);
window.addEventListener("resize", setCanvasSize);
window.addEventListener('keydown', moveBykeys);

btnUp.addEventListener("click", moveUp);
btnLeft.addEventListener("click", moveLeft);
btnRight.addEventListener("click", moveRight);
btnDown.addEventListener("click", moveDown);

/* Clase 22 reto de crear un boton o botones que reinicien el juego */

btnReset.addEventListener("click", resetGame);
btnReset1.addEventListener("click", resetGame);
btnReset2.addEventListener("click", resetGame);


/* FUNCIONES */

function setCanvasSize() {
     // Clase N° 03
    //Establecer el tamaño de un elemento del canvas(10x10)
    

    if (window.innerHeight > window.innerWidth) {
        canvasSize = Math.floor(window.innerWidth * 0.7);
    } else {
        canvasSize = Math.floor(window.innerHeight * 0.7);
    }

    canvasSize = canvasSize.toFixed(3);

    canvas.setAttribute('width', canvasSize);
    canvas.setAttribute('height', canvasSize);

    console.log(window.innerHeight);
    console.log(window.innerWidth);
    console.log(canvas.height);
    console.log(canvas.width);

    //Establecer el tamaño de un elemento del canvas(10x10)

    elementSize = Math.floor(canvasSize / 10);

    /* Clase 20 ubicando al jugador si hacemos resize */

    playerPosition.x = undefined;
    playerPosition.y = undefined;

    startGame();
}

function startGame() {

    if(!gameRunning) {
        return;
    }

    console.log({canvasSize, elementSize});

    game.font = elementSize + "px Verdana";
    game.textAlign = "end";

    const map = maps[level];

    if (!map) {
        gameWin();
        return;
    }

    if (!timeStart) {
        timeStart = Date.now();
        timeInterval = setInterval(showTime, 100);
        showRecord();
    }
    const mapRows = map.trim().split('\n');
    const mapRowCols = mapRows.map(row => row.trim().split(''));
    console.log({map, mapRows, mapRowCols});

    showLives();
    enemyPositions = [];
    clearCanvas();

    sLevel.innerHTML = `    ${level + 1}/${maps.length}`;

    mapRowCols.forEach((row, rowI) => {
        row.forEach((col, colI) => {
            const emoji = emojis[col];
            const posX = elementSize * (colI + 1);
            const posY = elementSize * (rowI + 1);

            if (col == 'O') {
                if(!playerPosition.x && !playerPosition.y) {
                    playerPosition.x = posX;
                    playerPosition.y = posY;
                }
            } else if (col == 'I') {
                giftPosition.x = posX;
                giftPosition.y = posY; 
            } else if (col == 'X') {
                enemyPositions.push({
                    x: posX,
                    y: posY,
                });
            }
            firePosition.forEach(fire => game.fillText(emojis['BOMB_COLLISION'],fire.x,fire.y));
            game.fillText(emoji, posX, posY);
        });
    });

    movePlayer();


        // for (let row = 1; row <= 11; row++) {
        //     for (let col = 0; col < 11; col++) {
        //         game.fillText(emojis[mapRowCols[row - 1][col - 1]], elementSize * col, elementSize * row);
                
        //     }
        // }

    // game.fillStyle = 'brown';
    // game.fillRect(100,25,100,100);
    // game.clearRect(125,50,50,50);

    // game.font = '16px Verdana';
    // game.fillStyle = "blue";
    // game.fillText('HOLI!', 128, 78);
}

/* Funciones movimiento y deteccion de objetos */

function movePlayer() {
    const giftCollisionX = playerPosition.x.toFixed(3) == giftPosition.x.toFixed(3);
    const giftCollisionY = playerPosition.y.toFixed(3) == giftPosition.y.toFixed(3);
    const giftCollision = giftCollisionX && giftCollisionY;
    const enemyCollison = enemyPositions.find(enemy => {
        const enemyCollisionX = enemy.x == playerPosition.x;
        const enemyCollisionY = enemy.y == playerPosition.y;    
        return enemyCollisionX && enemyCollisionY;
    });


    if (giftCollision) {
        levelWin();
    } else if (enemyCollison) {
        /* se hace dentro esta funcion  por que aca se detectan las colisiones */

        firePosition.push(playerPosition.x, playerPosition.y, enemyCollison)
        levelFail();       
    }
    
    game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y);
}

function moveBykeys(event) {
    if (event.key == 'ArrowUp') moveUp();
     else if (event.key == 'ArrowLeft') moveLeft();
     else if (event.key == 'ArrowRight') moveRight();
     else if (event.key == 'ArrowDown') moveDown();
}
function moveUp() {
    console.log('me quiero mover hacia arriba');

    if((playerPosition.y - elementSize) < elementSize) {
        console.log('out');
    } else {
        playerPosition.y -= elementSize;
        startGame();
    }
}

function moveLeft() {
    console.log('me quiero mover hacia la izquierda');

    if((playerPosition.x - elementSize) < elementSize){
        console.log('out')
    } else {
        playerPosition.x -= elementSize;
        startGame();    
    }

}

function moveRight() {
    console.log('me quiero mover hacia la izquierda');

    if((playerPosition.x + elementSize) > canvasSize){
        console.log('out')
    } else {
        playerPosition.x += elementSize;
        startGame();    
    }

}
function moveDown() {
    console.log('me quiero mover hacia arriba');

    if((playerPosition.y + elementSize) > canvasSize) {
        console.log('out');
    } else {
        playerPosition.y += elementSize;
        startGame();
    }
}

/* Funciones nivel */

function levelWin() {
    console.log('subiste de nivel');
    level++;
    clearCanvas();
    firePosition=[];
    sLevel.innerHTML = ` ${level}/${maps.length}`;
    renderMessage(messages.levelUp);
    startGame();
}

function levelFail() { 
    console.log('Explosion');
    live--;

    console.log(live);
     
    if (live <= 0) {
        level = 0;
        live = 3;
        firePosition=[]; 
        timeStart = undefined;
        document.querySelector('.message--defeat').classList.remove('inactive');
        clearCanvas();
        renderMessage(messages.gameOver);
        gameRunning = false;
    }
    
    playerPosition.x = undefined;
    playerPosition.y = undefined; 

    if(gameRunning) {
        startGame();
    } 
}

function gameWin() {
    console.log('terminaste el juego :3');
    clearInterval(timeInterval);

    const recordTime = localStorage.getItem('record_time');
    const playerTime = Date.now() - timeStart;  


    if(recordTime) {
        if (recordTime >= playerTime) {
            localStorage.setItem('record_time', playerTime);
            pRecord.innerHTML = localStorage.getItem('record_time');;
        } else { 
            console.log('lo siento, no haz superado el record aun :(')
        }
    } else {
        localStorage.setItem('record_time', playerTime);
    }

    document.querySelector('.win-without-record').classList.remove('inactive');
    
    console.log({recordTime, playerTime});
}

/* Clase 22 reto de crear un boton o botones que reinicien el juego */

function resetGame() {
    location.reload();
}

/* Limpiar canva */

function clearCanvas() {
    game.clearRect(0, 0, canvasSize, canvasSize);
  }

/* Renderizar mensajes */

function renderMessage(message) {
    game.font = elementSize + "px Verdana";
    game.fontWeight = "bold";
    game.fillStyle = "#c27434";
    game.textAlign = "center";
    game.fillText(message, canvasSize / 2, canvasSize / 2);
}

/* Renderizar fuego */
function renderFire() {
    game.fillText(emojis['BOMB_COLLISION'], playerPosition.x, playerPosition.y)
}

/* Mostrar vidad */

function showLives() {
    spanLives.innerHTML = emojis['HEART'].repeat(live);
}

/* Clase 19 mostrar record */

function showRecord() {
    result.innerHTML = localStorage.getItem('record_time');
}

function newRecord() {
    document.querySelector('.message--record').classList.remove('inactive')
}

/* Mostrar tiempo */

function showTime() {
    spanTime.innerHTML = Date.now() - timeStart;
}

// function timeFormat(time_msec) {
//     const time = ~~(time_msec / 1000);
//     const min = (time / 60) | 0;
//     const sec = time - (min * 60);
//     const msec = ((time_msec / 10) | 0 - (time * 100));
//     return min + ' : ' + ((sec < 10 ? '0' : 0) + sec) + ' : ' ((msec < 10 ? '0' : 0) + msec);
// }