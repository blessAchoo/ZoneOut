
function playBackgroundMusic() {
	var audio = new Audio('media/introMusic.mp4');
	audio.loop = true;
	audio.play();
}

const audio = document.getElementById('zoneAudio');
const soundButton = document.getElementById('soundButton');

soundButton.addEventListener('click', function() {
    if (audio.paused) {
        audio.play();
        soundButton.classList.remove('sound-off');
    } else {
        audio.pause();
        soundButton.classList.add('sound-off');
    }
});