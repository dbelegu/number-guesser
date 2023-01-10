// Initial game values
let min = 1,
    max = 10,
    winningNum = Math.floor(Math.random() * 10) + 1,
    guessesLeft = 3;


// UI Elements
const game = document.querySelector('#game'),
    minNum = document.querySelector('.min-num'),
    maxNum = document.querySelector('.max-num'),
    guessBtn = document.querySelector('#guess-btn'),
    playAgainBtn = document.querySelector('#play-again-btn'),
    guessInput = document.querySelector('#guess-input'),
    message = document.querySelector('.message');

playAgainBtn.style.display = 'none';

// Assign UI to min and max
minNum.textContent = min;
maxNum.textContent = max;

// Listen for guess
guessBtn.addEventListener('click', function () {
    let guess = parseInt(guessInput.value);

    // Validate
    if (isNaN(guess) || guess < min || guess > max) {
        setMessage(`Please enter a number between ${min} and ${max}`, 'red');
        return
    }
    guessesLeft--;
    if (guessesLeft === 0) {
        stopGame();
        playAgainBtn.style.display = '';
        return;
    }

    // Check if won
    if (guess === winningNum) {
        guessInput.disabled = true;
        guessInput.style.borderColor = 'green';
        setMessage(`${winningNum} is correct, you win!`, 'green', '20px');

        guessBtn.style.display = 'none';
        playAgainBtn.style.display = '';
    } else {
        setMessage(`Incorrect, you have ${guessesLeft} guesses left.`, 'orange');
    }
});

playAgainBtn.addEventListener('click', function () {
    // Restore initial state
    guessesLeft = 3;
    playAgainBtn.style.display = 'none';
    guessBtn.style.display = '';
    guessInput.style.borderColor = '';
    guessInput.disabled = false;
    guessBtn.disabled = false;
    setMessage('');

    // Refresh the winning number
    winningNum = Math.floor(Math.random() * 10) + 1;
});


// Set message
function setMessage(msg, color = '', size = '') {
    message.style.color = color;
    message.textContent = msg;
    message.style.fontSize = size;
}

function stopGame() {
    guessInput.style.borderColor = 'red';
    guessBtn.style.display = 'none';
    setMessage("You are out of tries, better luck next time!", 'red');
    guessInput.disabled = true;
    guessBtn.disabled = true;
}
