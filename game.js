let timerCount = 3;
let score = 0;
let allOptions;
let optsSequence;
let previousOpt = -1;
const innerMainBoard = document.querySelector('.inner-main-board')
const scoreBoardHeader =  document.createElement('h1');
const scoreBoard =  document.createElement('div');
const gameOverContainer =  document.createElement('div');
const gameOverHeader = document.createElement('h1')
const displayScore =  document.createElement('div');
const playAgainBtn = document.createElement('button');

const scoreArea = document.querySelector('.score-area')
const startBtn = document.querySelector('.start-button');
const redOpt = document.querySelector('.red-opt');
const blueOpt = document.querySelector('.blue-opt');
const yellowOpt = document.querySelector('.yellow-opt');
const greenOpt = document.querySelector('.green-opt');


startBtn.addEventListener('click', () => {
    startBtn.innerText = timerCount;
    const timerInterval =  setInterval(() => {
        timerCount--;
        if(timerCount > 0) {
            startBtn.innerText = timerCount;
       } else {
            startBtn.innerText = "Go";
            if(timerCount === -1) {
                startBtn.remove();
                startGame();
                clearInterval(timerInterval);
            }
        }
    }, 1000)
})

const startGame = () => {
    optsSequence = [];
    createScoreBoard();
    createColorSequence();
}

const createColorSequence = () => {
    let currentOption = generateRandomOption();
    previousOpt = currentOption;
    optsSequence.push(currentOption);
    allOptions = [...optsSequence];
    showCurrentOption(currentOption);
}

const createScoreBoard = () => {
    scoreBoardHeader.innerText = "Score";
    scoreBoard.innerText = score;
    scoreBoardHeader.classList.add('score-header');
    scoreBoard.classList.add('score-board');
    scoreArea.appendChild(scoreBoardHeader);
    scoreArea.appendChild(scoreBoard);
}

const generateRandomOption = () => {
 const newOpt = Math.floor(Math.random() * 4) + 1;
 if(newOpt !== previousOpt) {
     return newOpt;
 }
   return generateRandomOption();
}

const showCurrentOption = (currentOpt) => {
   manageColors(currentOpt, true);
    setTimeout(() => {
        manageColors(currentOpt, false);
    }, 1000)
}

redOpt.addEventListener('click', () => {
    verifyUserSelectedOption(1);
});

blueOpt.addEventListener('click', () => {
    verifyUserSelectedOption(2);
});

yellowOpt.addEventListener('click', () => {
    verifyUserSelectedOption(3);
});

greenOpt.addEventListener('click', () => {
    verifyUserSelectedOption(4);
});


const manageColors = (currentOpt, isDarkColor) => {
    switch (currentOpt) {
        case 1:
            isDarkColor ? redOpt.classList.add('dark-red') : redOpt.classList.remove('dark-red');
            break;
        case 2:
            isDarkColor ? blueOpt.classList.add('dark-blue') : blueOpt.classList.remove('dark-blue');
            break;
        case 3:
            isDarkColor? yellowOpt.classList.add('dark-yellow') : yellowOpt.classList.remove('dark-yellow');
            break;
        case 4:
            isDarkColor ? greenOpt.classList.add('dark-green') : greenOpt.classList.remove('dark-green');
            break;
        default:
    }
}

const verifyUserSelectedOption = (opt) => {
   const currentSeqOpt = allOptions.shift();
   console.log(currentSeqOpt);
   console.log(allOptions);
   if(opt === currentSeqOpt) {
       updateScoreBoard();
       if(!allOptions.length) {
           createColorSequence();
       }
   } else {
       gameOver();
   }
}

const updateScoreBoard = () => {
    score += 10;
    scoreBoard.innerText = score;
}

const gameOver = () => {
    displayScore.innerText = `Your Score: ${score}`;
    gameOverHeader.innerText = "Game Over";
    playAgainBtn.innerText = "Play Again";
    gameOverContainer.classList.add('game-over-container');
    gameOverHeader.classList.add('game-over-header');
    displayScore.classList.add('display-score');
    playAgainBtn.classList.add('play-again');
    gameOverContainer.appendChild(gameOverHeader);
    gameOverContainer.appendChild(displayScore);
    gameOverContainer.appendChild(playAgainBtn);
    innerMainBoard.appendChild(gameOverContainer);
    innerMainBoard.style.transform = 'translate(-50%, -50%) rotateY(180deg)'
}

playAgainBtn.addEventListener('click', () => {
    window.location.reload();
})