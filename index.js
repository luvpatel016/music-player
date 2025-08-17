const image = document.getElementById('cover'),
    title = document.getElementById('music-title'),
    artist = document.getElementById('music-artist'),
    currentTimeEl = document.getElementById('current-time'),
    durationEl = document.getElementById('duration'),
    progress = document.getElementById('progress'),
    playerProgress = document.getElementById('player-progress'),
    prevBtn = document.getElementById('prev'),
    nextBtn = document.getElementById('next'),
    playBtn = document.getElementById('play'),
    background = document.getElementById('bg-img');

const music = new Audio();

const songs = [
    {
        path: '1.mp3',
        displayName: 'The Charmer\'s Call',
        cover: '1.jpg',
        artist: 'Hanu Dixit',
    },
    {
        path: '3.mp3',
        displayName: 'Intellect',
        cover: '3.jpg',
        artist: 'Yung Logos',
    },
    {
        path: '4.mp3',
        displayName: 'Let\'s Go Outside',
        cover: '4.jpg',
        artist: 'Far Caspian',
    },
    {
        path: '5.mp3',
        displayName: 'Meet The Grahams',
        cover: '5.jpg',
        artist: 'Kendrick Lamar',
    },
    {
        path: '6.mp3',
        displayName: 'Ayala (outro)',
        cover: '6.jpg',
        artist: 'XXXTENTACION',
    },
    {
        path: '7.mp3',
        displayName: 'True Love',
        cover: '7.jpg',
        artist: 'Kanye West ft. XXXTENTACION'
    },
    {
        path: '8.mp3',
        displayName: 'Mahabharat Krishna Flute',
        cover: '8.jpg.webp',
        artist: 'Krishna | Bhagavad Gita'
    },
    {
        path: '9.mp3',
        displayName: 'I Was All Over Her',
        cover: '9.jpg',
        artist: 'Salvia Palth'
    },
    {
        path: '10.mp3',
        displayName: 'New Flesh',
        cover: '10.jpeg',
        artist: 'Current Joys'
    },
    {
        path: '11.mp3',
        displayName: 'I don\'t even speak spanish lol',
        cover: '11.jpg',
        artist: 'XXXTENTACION'
    }
];

let musicIndex = 0;
let isPlaying = false;

function togglePlay() {
    if (isPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }
}

function playMusic() {
    isPlaying = true;
    // Change play button icon
    playBtn.classList.replace('fa-play', 'fa-pause');
    // Set button hover title
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

function pauseMusic() {
    isPlaying = false;
    // Change pause button icon
    playBtn.classList.replace('fa-pause', 'fa-play');
    // Set button hover title
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

function loadMusic(song) {
    music.src = song.path;
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    image.src = song.cover;
    background.src = song.cover;
}

function changeMusic(direction) {
    musicIndex = (musicIndex + direction + songs.length) % songs.length;
    loadMusic(songs[musicIndex]);
    playMusic();
}

function updateProgressBar() {
    const { duration, currentTime } = music;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const formatTime = (time) => String(Math.floor(time)).padStart(2, '0');
    durationEl.textContent = `${formatTime(duration / 60)}:${formatTime(duration % 60)}`;
    currentTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(currentTime % 60)}`;
}

function setProgressBar(e) {
    const width = playerProgress.clientWidth;
    const clickX = e.offsetX;
    music.currentTime = (clickX / width) * music.duration;
}

playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', () => changeMusic(-1));
nextBtn.addEventListener('click', () => changeMusic(1));
music.addEventListener('ended', () => changeMusic(1));
music.addEventListener('timeupdate', updateProgressBar);
playerProgress.addEventListener('click', setProgressBar);

loadMusic(songs[musicIndex]);