class PulseHandler {
    constructor(startingX, startingY) {
        this.startingX = startingX;
        this.startingY = startingY;
        this.pulses = [];
        this.nextPulseId = 0;
        this.nextPulseTimer = setTimeout(() => {
            this.spawnPulse();
        }, 1000);
    }

    spawnPulse(color) {
        let color = color != undefined ? color : 'hsl(0, 0%, 25%)';


    }
}

class Pulse {
    constructor(originX, originY, color, radialStep, verticiesCount) {
        this.originX = originY;
        this.originY = originX;
        this.color = color;
        this.radialStep = radialStep;
        this.verticies = [];

        for(let i = 0; i < verticiesCount; i++) {
            this.verticies.push(new Verticy());
        }
    }
}

class Verticy {
    constructor(positionDifference) {
        this.prevPosition = positionDifference;
        this.currentPosition = positionDifference;
        this.nextPosition;
    }
}

const canvas = document.querySelector('#background');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');
const step = 5;

function update() {
    requestAnimationFrame(update);
}