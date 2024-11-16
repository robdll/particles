/**
 * INITIAL CONFIG
 */


const settings = {
    radius: 80,
    scanner: {
        sTop: 0,
        sLeft: 0,
        width: 400,
        height: 300
    },
    opacityTreeshold: 128,
    line: {
        width: 2,
        maxLength: 45,
        color: 'rgba(255,255,255,1)'
    },
    magnet: {
        force: 10
    },
    offsetX: 50,
    offsetY: -200,
    endedTouch: false,
    restart: false
}
const mouse = {
    x: null,
    y: null,
    radius: settings.radius,
};

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight - (window.innerWidth <= 400 ? 175 : 115);
canvas.style.letterSpacing = '2px';
let particles = [];
ctx.font = `${getTextSize()}px Verdana`;
ctx.fillStyle = 'white';
let textString = window.innerWidth < 800 ? 'C' : 'Code' ; 
ctx.fillText(textString, 0, 30);
const {sTop, sLeft, width, height} = settings.scanner;
let textCoords = ctx.getImageData(sTop, sLeft, width, height);
textCoords.data = textCoords.data.filter( (_, idx) => (idx + 1) % 4 === 0 );

function getTextSize() {
    if (window.innerWidth < 800) return 12;
    if (window.innerWidth < 1200) return 18;
    return 21;
}

function changeText() {
    settings.restart = true;
    particles = [];
    const text = document.getElementById("textInp").value;
    textString = window.innerWidth < 800 ? text[0] : text; 
    ctx.fillText(textString, 0, 30);
    textCoords = ctx.getImageData(sTop, sLeft, width, height);
    textCoords.data = textCoords.data.filter( (_, idx) => (idx + 1) % 4 === 0 );
    init();
    animate(); 
}
/**
 * CLASS INITIALIZATION
 */
class Particle {
    
    constructor(x, y, size = 3) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = Math.random() * 30 + 1;
        this.elasticity = Math.random() * 50 + 1;
        this.maxDistance = mouse.radius + this.elasticity;
    }

    draw() {
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }

    update() {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.maxDistance && !settings.endedTouch) {
            let force = (this.maxDistance - distance) / this.maxDistance;
            this.x -= (dx / distance) * force * this.density * 2;
            this.y -= (dy / distance) * force * this.density * 2;
        } else {
            let magnetForce = settings.magnet.force;
            this.x -= (this.x - this.baseX) / magnetForce;
            this.y -= (this.y - this.baseY) / magnetForce;
        }
    }
}

// PROGRAM BODY
init();
animate(); 

function init() {
    let i = 0;
    for(let y=0; y < textCoords.height; y++ ) {
        for(let x=0; x < textCoords.width; x++) {
            if(textCoords.data[i] > settings.opacityTreeshold && x%4 === 0) {
                let positionX = (x * 5) + settings.offsetX;
                let positionY = (y * 5) + settings.offsetY;
                particles.push(new Particle(positionX, positionY) );
            }
            i++;
        }
    }
    settings.restart = false;
}

function animate() {
    ctx.clearRect(0,0,canvas.width, canvas.height);
    particles.forEach( particle => {
        particle.draw();
        particle.update();
    })
    connect();
    if(!settings.restart) requestAnimationFrame(animate)
}

function connect() {
    for(let a = 0; a < particles.length; a++ ) {
        for(let b = a; b < particles.length; b++) {
            let dx = particles[a].x - particles[b].x;
            let dy = particles[a].y - particles[b].y;
            let distance = Math.sqrt(dx * dx + dy * dy) ;
            let color = settings.line.color;
            let opacity = 1 - (distance/settings.line.maxLength);
            if(distance < settings.line.maxLength) {
                ctx.strokeStyle = color.replace('1', opacity );
                ctx.lineWidth = settings.line.width;
                ctx.beginPath()
                ctx.moveTo(particles[a].x, particles[a].y);
                ctx.lineTo(particles[b].x, particles[b].y);
                ctx.stroke();
            }
        }
    }
}


window.addEventListener('mousemove', event => {
    mouse.x = event.x;
    mouse.y = event.y;
    //console.log(mouse.x, mouse.y)
});


window.addEventListener('touchmove', event => {
    settings.endedTouch = false;
    mouse.x = event.touches[0].clientX;
    mouse.y = event.touches[0].clientY;
    console.log(event)
});

window.addEventListener('touchend', event => {
    //mouse.x = event.touches[0].clientX;
    //mouse.y = event.touches[0].clientY;
    settings.endedTouch = true;
});


