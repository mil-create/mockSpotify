let currentGenre = '';
let currentArtist = '';
let currentPlaylist = []; // Holds the list of songs for the footer player
let isPlaying = false; // Track play/pause state
let currentSongIndex = 0; // Index of the current song in the playlist

const genres = {
    rock: ['Bororeds', 'En Seguida', 'Naked Tanya'],
    instrumental: ['Jiro-Kun'],
    pop: ['---ice', 'Ang Huling Pahina','Exroses','Kanah','Kerosina'],
    hiphop: ['KRT', 'LIAH','Xaint','Zielle']
};

const data = {
    rock: {
        name: 'Hard Rock / Metal',
        artists: {
            'Bororeds': ['Singles'],
            'En Seguida': ['Motherland EP'],
            'Naked Tanya': ['Singles','The Peephole EP']
        },
        albums: {
            'Singles': [
                'Hard Rock-Metal/Bororeds/2G Marlboro.mp3', 
                'Hard Rock-Metal/Bororeds/Poison.mp3'],
            'Motherland EP': [
                'Hard Rock-Metal/En Seguida/Motherland EP/Home.mp3',
                'Hard Rock-Metal/En Seguida/Motherland EP/Kandado.mp3',
                'Hard Rock-Metal/En Seguida/Motherland EP/Lupa ng mga Mandirigma.mp3',
                'Hard Rock-Metal/En Seguida/Motherland EP/Rosario.mp3',
                'Hard Rock-Metal/En Seguida/Motherland EP/Si Ifan.mp3',
                'Hard Rock-Metal/En Seguida/Motherland EP/The Oriole.mp3'
            ],
            'Singles': ['Hard Rock-Metal/Naked Tanya/Drift.mp3', 'Hard Rock-Metal/Naked Tanya/Wakas.mp3'],
            'The Peephole EP': [
                'Hard Rock-Metal/Naked Tanya/The Peephole EP/Basag.mp3',
                'Hard Rock-Metal/Naked Tanya/The Peephole EP/Gitnang Daliri.mp3',
                'Hard Rock-Metal/Naked Tanya/The Peephole EP/Nogadatol.mp3'
            ]
        }
    },


    pop: {
        name: 'OPM-Pop-Alternative Rock-Ballad',
        artists: {
            '---ice': ['Single'],
            'Ang Huling Pahina':['Singles'],
            'Exroses':['Single'],
            'Kanah':['Single'],
            'Kerosina':['Single']
        },
        albums: {
            'Single': [
                'OPM-Pop-Alternative Rock-Ballad/---ice/gumawa ng time machine (sa_yo mababalik).mp3'
            ],
            'Singles':[
               'OPM-Pop-Alternative Rock-Ballad/Ang Huling Pahina/Aninag (Ng Ganda Mo).mp3 ',
               'OPM-Pop-Alternative Rock-Ballad/Ang Huling Pahina/Darating.wav',
               'OPM-Pop-Alternative Rock-Ballad/Ang Huling Pahina/Empty Road.mp3',
               'OPM-Pop-Alternative Rock-Ballad/Ang Huling Pahina/May Dahilan Pa Bang Umibig_.wav',
               'OPM-Pop-Alternative Rock-Ballad/Ang Huling Pahina/Sa_yo Lang Ako (Atin ang Gabi).mp3',
               'OPM-Pop-Alternative Rock-Ballad/Ang Huling Pahina/Where Horizons Glow.mp3'
            ],
            'Single':[
                'OPM-Pop-Alternative Rock-Ballad/Exroses/I_m Home.mp3'
            ],
            'Single':[
                'OPM-Pop-Alternative Rock-Ballad/Kanah/Umafi.mp3'
            ],
            'Single':[
                'OPM-Pop-Alternative Rock-Ballad/Kerosina/Gunita.flac'
            ]
        }
    },
    

    instrumental: {
        name: 'Instrumental',
        artists: {
            'Jiro-Kun': ['Single']
        },
        albums: {
            'Single': [
                'Instrumental/Jiro-Kun/Polygonalyst - Jiro-Kun.mp3'
            ]
        }
    },

   hiphop: {
    name: 'RnB-Hiphop-EDM',
    artists: {
        'KRT': ['Missed Calls'],
        'LIAH': ['LIAH Singles'], // Renamed for uniqueness
        'Xaint': ['Xaint Singles'], // Renamed for uniqueness
        'Zielle': ['Single']
    },
    albums: {
        'Missed Calls': [
            'RnB-Hiphop-EDM/KRT/missed calls Album/admit it.mp3',
            'RnB-Hiphop-EDM/KRT/missed calls Album/blur.mp3',
            'RnB-Hiphop-EDM/KRT/missed calls Album/freetime.mp3',
            'RnB-Hiphop-EDM/KRT/missed calls Album/missed calls.mp3',
            'RnB-Hiphop-EDM/KRT/missed calls Album/missed out.mp3',
            'RnB-Hiphop-EDM/KRT/missed calls Album/panghalip(wag ka nalang bumalik).mp3',
            'RnB-Hiphop-EDM/KRT/missed calls Album/pasakalye.mp3'
        ],
        'LIAH Singles': [ // Renamed for uniqueness
            'RnB-Hiphop-EDM/LIAH/Intoxicated at 7_11 - LIAH.mp3',
            'RnB-Hiphop-EDM/LIAH/This Room - LIAH.mp3',
            'RnB-Hiphop-EDM/LIAH/TXT - LIAH.mp3'
        ],
        'Xaint Singles': [ // Renamed for uniqueness
            'RnB-Hiphop-EDM/Xaint/Lagi - Xaint.mp3',
            'RnB-Hiphop-EDM/Xaint/Luwalhati - Xaint.mp3'
        ],
        'Single': [
            'RnB-Hiphop-EDM/Zielle/NADA.mp3'
        ]
    }
}

    
    
};

function showArtists(genre) {
    currentGenre = genre;
    toggleVisibility('artists');
    document.getElementById('genre-title').innerText = `Artists in ${capitalize(genre)}`;
    const grid = document.getElementById('artists-grid');
    grid.innerHTML = genres[genre]
        .map(artist => `<div class="artist-card" onclick="showAlbums('${artist}')">${artist}</div>`)
        .join('');
}

function showAlbums(artist) {
    currentArtist = artist;
    toggleVisibility('albums');
    document.getElementById('artist-title').innerText = `Albums by ${artist}`;
    const albumList = data[currentGenre].artists[artist];
    const grid = document.getElementById('albums-grid');
    grid.innerHTML = albumList
        .map(album => `<div class="album-card" onclick="showSongs('${album}')">${album}</div>`)
        .join('');
}

function showSongs(album) {
    toggleVisibility('player');
    document.getElementById('song-title').innerText = `Songs in ${album}`;
    const songList = data[currentGenre].albums[album];
    const songListElement = document.getElementById('songs-list');
    songListElement.innerHTML = '';
    currentPlaylist = songList;
    currentSongIndex = 0;

    if (songList && songList.length > 0) {
        songListElement.innerHTML = songList
            .map(song => {
                const songName = song.split('/').pop().replace('.mp3', '');
                return `<div class="song-item" onclick="playFooterSong('${song}')">${songName}</div>`;
            })
            .join('');
    } else {
        songListElement.innerHTML = '<div>No songs available in this album.</div>';
    }
}

function playFooterSong(song) {
    const audioPlayer = document.getElementById('footer-audio-player');
    const songTitle = document.getElementById('footer-song-title');
    audioPlayer.src = song;
    audioPlayer.play();
    isPlaying = true;
    songTitle.textContent = `Now Playing: ${song.split('/').pop().replace('.mp3', '')}`;
    document.getElementById('play-button').innerHTML = '&#10074;&#10074;';
}

function togglePlayPause() {
    const audioPlayer = document.getElementById('footer-audio-player');
    const playButton = document.getElementById('play-button');
    if (isPlaying) {
        audioPlayer.pause();
        playButton.innerHTML = '&#9658;';
    } else {
        audioPlayer.play();
        playButton.innerHTML = '&#10074;&#10074;';
    }
    isPlaying = !isPlaying;
}

function updateProgress() {
    const audioPlayer = document.getElementById('footer-audio-player');
    const duration = audioPlayer.duration || 1;
    const currentTime = audioPlayer.currentTime;
    const progressPercent = (currentTime / duration) * 100;
    document.getElementById('progress-bar').style.width = `${progressPercent}%`;
}

function toggleVisibility(section) {
    document.querySelectorAll('main > section').forEach(el => el.classList.add('hidden'));
    document.getElementById(section).classList.remove('hidden');
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

document.getElementById('footer-audio-player').addEventListener('timeupdate', updateProgress);
