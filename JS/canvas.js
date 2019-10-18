class AnimHandler {
    constructor(fps, callback) {
        this.fpsInterval = 1000 / fps;
        this.then = Date.now();
        this.startTime = this.then;
        this.elapsed;
        this.callback = callback;

        requestAnimationFrame(() => this.checkDeltaTime());
    }

    checkDeltaTime() {
        let now = Date.now();
        this.elapsed = now - this.then;

        if (this.elapsed >= this.fpsInterval) {
            this.then = Date.now(); - (this.elapsed % this.fpsInterval);
            this.callback();
        }

        requestAnimationFrame(() => this.checkDeltaTime());
    }
}

class PulseHandler {
    constructor(startingX, startingY) {
        console.log(startingX, startingY)
        this.startingX = startingX;
        this.startingY = startingY;
        this.pulses = [];
        this.nextPulseId = 0;
        this.spawnPulse();
        this.nextPulseTimer = setTimeout(() => {
            this.spawnPulse();
        }, 3000);
        
        this.AnimHandler = new AnimHandler(30, () => {
            this.update();
        });
    }

    spawnPulse(color) {
        color = color != undefined ? color : 'hsl(0, 0%, 50%)';
        this.pulses.push(new Pulse(this.startingX, this.startingY, this, this.nextPulseId, color, step, 200));
        this.nextPulseId++;
        this.nextPulseTimer = setTimeout(() => {
            if (randNumber(1, 7) == 6) {
                this.spawnPulse('rgb(153,50,204)');
            }
            else {
                this.spawnPulse();
            }
        }, 3000);
    }

    update() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for(let i = 0; i < this.pulses.length; i++) {
            this.pulses[i].update();
        }
    }

    cullPulse(cullid) {
        for(let i = 0; i < this.pulses.length; i++) {
            if(cullid == this.pulses[i].id) {
                this.pulses.splice(i, 1);
                break;
            }
        }
    }
}

class Pulse {
    constructor(originX, originY, handler, id, color, radialStep, verticiesCount) {
        this.originX = originX;
        this.originY = originY;
        this.handler = handler;
        this.id = id;
        this.color = color;
        this.radiusStep = radialStep;
        this.radius = radialStep;
        this.radianStep = (2 / verticiesCount) * Math.PI;
        this.verticies = [];

        for(let i = 0; i < verticiesCount; i++) {
            this.verticies.push(new Verticy(0));
        }
    }

    update() {
        ctx.beginPath();
        // for(let i = 0; i < this.verticies.length; i++) {
        //     if(this.verticies[i].update()) {
        //         //change verticy nextPosition
        //     }
        //     let x = 0;
        //     let y = this.radius;

        //     let x1 = ((x * Math.cos(i * this.radianStep))) - ((y * Math.sin(i * this.radianStep)));
        //     let y1 = ((x * Math.sin(i * this.radianStep))) + ((y * Math.cos(i * this.radianStep)));

        //     if (i == 0) ctx.moveTo(x, y + this.originY);
        //     else ctx.lineTo(x1, y1 + this.originY);
        // }
        // ctx.closePath();
        ctx.arc(0, this.originY, this.radius, 0, 2 * Math.PI);
        ctx.lineWidth = 10;
        ctx.strokeStyle = this.color;
        ctx.stroke();
        this.radius += this.radiusStep;

        if(this.radius > canvas.width * 1.25) {
            this.handler.cullPulse(this.id);
        }
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
// ctx.globalAlpha = 0.75;
const step = 5;
const handler = new PulseHandler(canvas.width/2, canvas.height/2);
console.log(canvas);

function randNumber(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}