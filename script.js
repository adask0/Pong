const section = document.querySelector('.content');
const player = document.querySelector('.player');
const enemy = document.querySelector('.enemy');
const ball = document.querySelector('.ball');
const result = document.querySelector('.result');
const play = document.querySelector('.play');

let playerScore = 0;
let enemyScore = 0;
let ballSpeedX = 5;
let ballSpeedY = 5;
let ballLeft = 490;
let ballTop = 280;

document.addEventListener('keydown', (event) => {
    if (event.keyCode === 38) {
        // Up arrow
        let top = player.offsetTop;
        if (top > 0) {
            player.style.top = `${top - 5}px`;
        }
    } else if (event.keyCode === 40) {
        // Down arrow
        let top = player.offsetTop;
        if (top <= 495) {
            player.style.top = `${top + 5}px`;
        }
    }
});


const moveEnemy = () => {
    let enemyTop = ballTop;
    
    if (ballTop > enemyTop) {
        enemy.style.top = `${enemyTop + 1}px`;
    } else {
        if(ballTop <= 510){
        enemy.style.top = `${enemyTop - 1}px`;
    }}
};

const moveBall = () => {

    ballTop -= ballSpeedY;
    ballLeft -= ballSpeedX;
    ball.style.top = `${ballTop}px`;
    ball.style.left = `${ballLeft}px`;

    if (ballTop <= 0 || ballTop >= 580) {
        ballSpeedY = -ballSpeedY;
    }
    if (ballLeft >= 980) {
        playerScore++;
        result.innerHTML = `<p>${playerScore}</p><p>:</p><p>${enemyScore}</p>`;
        resetBall();
    }
    if (ballLeft <= 10) {
        enemyScore++;
        result.innerHTML = `<p>${playerScore}</p><p>:</p><p>${enemyScore}</p>`;
        resetBall();
    }

    checkCollision(player);
    checkCollision(enemy);
};

const checkCollision = (paddle) => {
    let paddleTop = paddle.offsetTop - 20;
    let paddleBottom = paddle.offsetTop + paddle.offsetHeight;
    let paddleLeft = paddle.offsetLeft - 10;
    let paddleRight = paddle.offsetLeft + paddle.offsetWidth + 5;
    

    if (
        ballTop >= paddleTop &&
        ballTop <= paddleBottom &&
        ballLeft >= paddleLeft &&
        ballLeft < paddleRight
    ) {
        ballSpeedX = -ballSpeedX;
    }

}
const resetBall = () => {
    ballLeft = 490;
    ballTop = 280;
    ball.style.left = `${ballLeft}px`;
    ball.style.top = `${ballTop}px`;
    player.style.top = '240px';
};

const start = () => {
    setInterval(moveEnemy, 50);
    setInterval(moveBall, 50);
    section.style.display = 'flex';
    play.style.display = 'none';
}

play.addEventListener('click', start)
