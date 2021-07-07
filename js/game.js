const gameSummary = {
    numbers: 0,
    wins: 0,
    losses: 0,
    draws: 0,
}

const game = {
    playerHand: null,
    aiHand: null,
}

const btnStart = document.querySelector('.start');
const hands = [...document.querySelectorAll('.select div')];

function computerChoice() {
    return hands[Math.floor(Math.random() * 3)].dataset.option
}

function handSelect() {
    game.playerHand = this.dataset.option;
    hands.forEach(hand => hand.classList.remove('changeColor'));
    this.classList.add('changeColor');
}

hands.forEach(hand => hand.addEventListener('click', handSelect));

function checkResult(player, ai) {
    if (player === ai) {
        return 'draw'
    } else if ((player === 'paper' && ai === "rock") || (player === 'rock' && ai === "scissors") || (player === 'scissors' && ai === 'paper')) {
        return 'win'
    } else {
        return 'loss'
    }

}

function publishResult(player, ai, result) {
    document.querySelector('[data-summary="your-choice"]').textContent = player;
    document.querySelector('[data-summary="ai-choice"]').textContent = ai;

    document.querySelector('p.numbers span').textContent = ++gameSummary.numbers;
    if (result === 'win') {
        document.querySelector('p.wins span').textContent = ++gameSummary.wins;
        document.querySelector('[data-summary = "who-win"]').textContent = 'You WIN!';
        document.querySelector('[data-summary = "who-win"]').style.color = "green";
    } else if (result === 'loss') {
        document.querySelector('p.losses span').textContent = ++gameSummary.losses;
        document.querySelector('[data-summary = "who-win"]').textContent = 'You LOSS!';
        document.querySelector('[data-summary = "who-win"]').style.color = "red";
    } else {
        document.querySelector('p.draws span').textContent = ++gameSummary.draws;
        document.querySelector('[data-summary = "who-win"]').textContent = 'DRAW!';
        document.querySelector('[data-summary = "who-win"]').style.color = "orange";
    }
}


function startGame() {
    btnStart.addEventListener('mousedown', () => {
        btnStart.classList.add('changeSize');
    })
    btnStart.addEventListener('mouseup', () => {
        btnStart.classList.remove('changeSize');
    })
    if (!game.playerHand) return
    game.aiHand = computerChoice();
    const gameResult = checkResult(game.playerHand, game.aiHand);
    publishResult(game.playerHand, game.aiHand, gameResult);
    endGame();
}

function endGame() {
    document.querySelector(`[data-option="${game.playerHand}"]`).classList.remove('changeColor');
    game.playerHand = null;
    game.aiHand = null;
}



btnStart.addEventListener('click', startGame);