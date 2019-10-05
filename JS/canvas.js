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
        this.pulses.push(new Pulse(this.startingX, this.startingY, this.nextPulseId, color, step, 20));
        this.nextPulseId++;
        this.nextPulseTimer = setTimeout(() => {
            this.spawnPulse();
        }, 1000);
    }
}

class Pulse {
    constructor(originX, originY, id, color, radialStep, verticiesCount) {
        this.originX = originY;
        this.originY = originX;
        this.id = id
        this.color = color;
        this.radiusStep = radialStep;
        this.radius = radialStep;
        this.radianStep = 2 / verticiesCount * Math.PI;
        this.verticies = [];

        for(let i = 0; i < verticiesCount; i++) {
            this.verticies.push(new Verticy(0));
        }
    }

    update() {
        ctx.beginPath
        for(let i = 0; i < this.verticies.length; i++) {
            if(this.verticies[i].update()) {
                //change verticy nextPosition
            }

            if (i == this.verticies.length - 1) {
                ctx.closePath();
            }
            else {
                let x = this.originX;
                let y = this.originY - this.radius + this.verticies[i].currentPosition;
    
                let x1 = ((x * Math.cos(this.radianStep * i)) + this.originX) - ((y * Math.sin(this.radianStep * i)) + this.originY);
                let y1 = ((x * Math.sin(this.radianStep * i)) + this.originX) + ((y * Math.cos(this.radianStep * i)) + this.originY);
    
                if (i == 0) ctx.moveTo(x1, y1);
                else ctx.lineTo(x1, y1);
            }
        }
        ctx.lineWidth = 10;
        ctx.strokeStyle = this.color;
        ctx.stroke;
        this.radius += this.radiusStep;
    }
}

class Verticy {
    constructor(positionDifference) {
        this.prevPosition = positionDifference;
        this.currentPosition = positionDifference;
        this.nextPosition;
    }

    update() {
        // move between points here
        return false;
    }
}

const canvas = document.querySelector('#background');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');
const step = 5;
const handler = new PulseHandler(0, canvas.height/2);