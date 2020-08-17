/**
 * INITIAL CONFIG
 */

const settings = {
    radius: 150,
    scanner: {
        sTop: 0,
        sLeft: 0,
        width: 200,
        height: 100
    },
    offset: 0
}
const mouse = {
    x: null,
    y: null,
    radius: settings.radius,
};

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const particleArray = [];
ctx.font = '30px Verdana';
ctx.fillStyle = 'white';
ctx.fillText('Test Text', 0, 30);
const {sTop, sLeft, width, height} = settings.scanner;
const data = ctx.getImageData(sTop, sLeft, width, height);

/**
 * CLASS INITIALIZATION
 */
class Particle {
    constructor(x, y, size = 3) {
        this.x = x + settings.offset;
        this.y = y;
        this.size = size;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = (Math.random() * 30) +1;
    }

    draw() {
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }
}


/**
 * PROGRAM BODY
 */

init(canvas, particleArray);
animate(); 



function init(c, arr) {
    for(let i = 0; i<100; i++) {
        let x = Math.random() * c.width;
        let y = Math.random() * c.height;
        arr.push(new Particle(x, y));
    }
}

function animate() {
    ctx.clearRect(0,0,canvas.width, canvas.height);
    particleArray.forEach( particle => {
        particle.draw();
    })
    requestAnimationFrame(animate)
}

window.addEventListener('mousemove', event => {
    mouse.x = event.x;
    mouse.y = event.y;
    //console.log(mouse.x, mouse.y)
});



