class PulseHandler {
    constructor()
}

const canvas = document.querySelector('#background');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');
const step = 5;

function update() {
    requestAnimationFrame(update);
}