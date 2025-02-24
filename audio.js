// Set up Audio Context
let audioContext;
let oscillator;
let gainNode;
let isPlaying = false;

const frequencyControl = document.getElementById('frequency');
const volumeControl = document.getElementById('volume');
const waveformControl = document.getElementById('waveform');
const togglePlayButton = document.getElementById('togglePlay');
const frequencyValue = document.getElementById('frequencyValue');
const volumeValue = document.getElementById('volumeValue');

function initAudio() {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    oscillator = audioContext.createOscillator();
    gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.type = waveformControl.value;
    oscillator.frequency.setValueAtTime(frequencyControl.value, audioContext.currentTime);
    gainNode.gain.setValueAtTime(volumeControl.value, audioContext.currentTime);

//     const biquadFilter = audioCtx.createBiquadFilter();
// biquadFilter.type = 'lowpass';
// biquadFilter.frequency.setValueAtTime(200, audioCtx.currentTime + 1);
// oscillator.connect(biquadFilter);

    oscillator.start();
    isPlaying = true;
    togglePlayButton.textContent = 'Stop';
}

function togglePlay() {
    if (isPlaying) {
        oscillator.stop();
        isPlaying = false;
        togglePlayButton.textContent = 'Start';
    } else {
        initAudio();
    }
}

function changeFrequency() {
    if (isPlaying) {
        oscillator.frequency.setValueAtTime(frequencyControl.value, audioContext.currentTime);
    }
    frequencyValue.textContent = `${frequencyControl.value} Hz`;
}

function changeVolume() {
    if (isPlaying) {
        gainNode.gain.setValueAtTime(volumeControl.value, audioContext.currentTime);
    }
    volumeValue.textContent = volumeControl.value;
}

function changeWaveform() {
    if (isPlaying) {
        oscillator.type = waveformControl.value;
    }
}

frequencyControl.addEventListener('input', changeFrequency);
volumeControl.addEventListener('input', changeVolume);
waveformControl.addEventListener('change', changeWaveform);
togglePlayButton.addEventListener('click', togglePlay);