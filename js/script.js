const startingMinutes = 4;
let time = startingMinutes * 60;
let interval;
let isRunning = false;

const countdownEl = document.getElementById('countdown');
const startPauseButton = document.getElementById('startPauseButton');
const wordInput = document.getElementById('wordInput');
const confirmButton = document.getElementById('confirmButton');
const popup = document.getElementById('popup');
const nextSceneButton = document.getElementById('nextSceneButton');

startPauseButton.addEventListener('click', toggleTimer);
confirmButton.addEventListener('click', checkWord);
nextSceneButton.addEventListener('click', showScene1);

// const video = document.getElementById('customVideo');
// const playBtn = document.getElementById('playBtn');
// const pauseBtn = document.getElementById('pauseBtn');

// playBtn.addEventListener('click', function() {
//     video.play();
// });

// pauseBtn.addEventListener('click', function() {
//     video.pause();
// });

// video.addEventListener('play', function() {
//     console.log('Video is playing');
//     playBtn.style.display = 'none';
//     pauseBtn.style.display = 'block';
// });

// video.addEventListener('pause', function() {
//     console.log('Video is paused');
//     playBtn.style.display = 'block';
//     pauseBtn.style.display = 'none';
// });

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
        showPopup();
    }
}

function showPopup() {
    popup.style.display = 'block';
    setTimeout(() => {
        popup.style.display = 'none';
    }, 3000);
}

function playVideo() {
    document.getElementById('scene2').style.display = 'none';
    document.getElementById('scene3').style.display = 'block';
}

function showScene1() {
    document.getElementById('scene0').style.display = 'none';
    document.getElementById('scene1').style.display = 'block';
}

let vid = document.getElementById("customVideo");
vid.onended = function() {
    document.getElementById('scene1').style.display = 'none';
    document.getElementById('scene2').style.display = 'block';
};

let vid2 = document.getElementById("customVideo2");
vid2.onended = function() {
    document.getElementById('scene3').style.display = 'none';
    document.getElementById('scene4').style.display = 'block';
};
