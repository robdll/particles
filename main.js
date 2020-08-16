const settings = {
    radius: 150
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
    console.log(mouse.x, mouse.y)
});


