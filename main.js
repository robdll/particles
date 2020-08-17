const settings = {
    radius: 150,
    scanner: {
        sTop: 0,
        sLeft: 0,
        width: 200,
        height: 100
    },
    offset: 100
}

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const particleArray = [];

const mouse = {
    x: null,
    y: null,
    radius: settings.radius,
};

window.addEventListener('mousemove', event => {
    mouse.x = event.x;
    mouse.y = event.y;
    //console.log(mouse.x, mouse.y)
});

ctx.font = '30px Verdana';
ctx.fillStyle = 'white';
ctx.fillText('Test Text', 0, 30);
//ctx.strokeStyle = 'white';
// ctx.strokeRect(sTop, sLeft, width, height);
const {sTop, sLeft, width, height} = settings.scanner;
const data = ctx.getImageData(sTop, sLeft, width, height);

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
        ctx.ard(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
        console.log('drowing')
    }

}

