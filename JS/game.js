const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');

window.addEventListener('load', startGame);

function startGame () {
    game.fillStyle = 'brown';
    game.fillRect(100,25,100,100);
    game.clearRect(125,50,50,50);

    game.font = '16px Verdana';
    game.fillStyle = "blue";
    game.fillText('HOLI!', 128, 78);
}