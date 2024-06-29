const startingMinutes = 4;
let time = startingMinutes * 60;
let interval;
let isRunning = false;
let wrongAttempts = 0;
const hints = [
    'Hint : Zoek de getallen in het radiologieverslag.',
    'Hint : Meet de lijnen op de fotos(in het kistje).',
    'Hint : Kijk op de liniaal welke letters bij de getallen horen.',
    'Hint : Vorm een woord met de letters die je hebt.',
    // Voeg meer hints toe zoals nodig
];

const countdownEl = document.getElementById('countdown');
const startPauseButton = document.getElementById('startPauseButton');
const wordInput = document.getElementById('wordInput');
const confirmButton = document.getElementById('confirmButton');
const popup = document.getElementById('popup');
const nextSceneButton = document.getElementById('nextSceneButton');
const customVideo = document.getElementById('customVideo');
const customVideo2 = document.getElementById('customVideo2');

startPauseButton.addEventListener('click', toggleTimer);
confirmButton.addEventListener('click', checkWord);
nextSceneButton.addEventListener('click', showScene1);

function toggleTimer() {
    if (isRunning) {
        clearInterval(interval);
        startPauseButton.textContent = 'Start';
    } else {
        interval = setInterval(updateCountdown, 1000);
        startPauseButton.textContent = 'Pause';
    }
    isRunning = !isRunning;
}

function updateCountdown() {
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;

    seconds = seconds < 10 ? '0' + seconds : seconds;

    countdownEl.innerHTML = `${minutes}:${seconds}`;
    if (time > 0) {
        time--;
    } else {
        clearInterval(interval);
        startPauseButton.textContent = 'Start';
        isRunning = false;
        playVideo();
    }
}

function checkWord() {
    const word = wordInput.value.trim().toLowerCase();
    if (word === 'help') {
        playVideo();
    } else {
        showHintPopup();
    }
}

function showHintPopup() {
    if (wrongAttempts < hints.length) {
        popup.textContent = hints[wrongAttempts];
    } else {
        popup.textContent = 'Geen verdere hints beschikbaar!';
    }
    popup.style.display = 'block';
    wrongAttempts++;
    setTimeout(() => {
        popup.style.display = 'none';
    }, 3000);
}

function playVideo() {
    document.getElementById('scene2').style.display = 'none';
    document.getElementById('scene3').style.display = 'block';
    customVideo2.classList.add('fullscreen');
}

function showScene1() {
    document.getElementById('scene0').style.display = 'none';
    document.getElementById('scene1').style.display = 'block';
    customVideo.classList.add('fullscreen');
}

customVideo.onended = function() {
    document.getElementById('scene1').style.display = 'none';
    customVideo.classList.remove('fullscreen');
    document.getElementById('scene2').style.display = 'block';
    toggleTimer(); // Start de timer automatisch wanneer scene2 wordt getoond
};

customVideo2.onended = function() {
    document.getElementById('scene3').style.display = 'none';
    customVideo2.classList.remove('fullscreen');
    document.getElementById('scene4').style.display = 'block';
};