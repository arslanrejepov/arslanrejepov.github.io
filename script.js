const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let nodes = [];

class Node {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.8;
        this.vy = (Math.random() - 0.5) * 0.8;
        this.radius = Math.random() * 2 + 1;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#00f2ff';
        ctx.fill();
    }
}

function init() {
    for (let i = 0; i < 80; i++) {
        nodes.push(new Node());
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    nodes.forEach((node, i) => {
        node.update();
        node.draw();

        for (let j = i + 1; j < nodes.length; j++) {
            const dx = node.x - nodes[j].x;
            const dy = node.y - nodes[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 150) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(0, 242, 255, ${1 - distance / 150})`;
                ctx.lineWidth = 0.5;
                ctx.moveTo(node.x, node.y);
                ctx.lineTo(nodes[j].x, nodes[j].y);
                ctx.stroke();
            }
        }
    });
    requestAnimationFrame(animate);
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

init();
animate();
