const canvas = document.getElementById('neuralCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let nodes = [];
class Node {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
    }
    update() {
        this.x += this.vx; this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }
}

function init() {
    for (let i = 0; i < 80; i++) nodes.push(new Node());
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    nodes.forEach(n => {
        n.update();
        nodes.forEach(n2 => {
            let dist = Math.hypot(n.x - n2.x, n.y - n2.y);
            if (dist < 150) {
                ctx.strokeStyle = `rgba(0, 242, 255, ${1 - dist/150})`;
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.moveTo(n.x, n.y);
                ctx.lineTo(n2.x, n2.y);
                ctx.stroke();
            }
        });
    });
    requestAnimationFrame(draw);
}

// Modal Logic
const modal = document.getElementById("certModal");
const modalImg = document.getElementById("certImage");

document.querySelectorAll('.cert-link').forEach(item => {
    item.addEventListener('click', function() {
        modal.style.display = "flex";
        modal.style.alignItems = "center";
        modalImg.src = this.getAttribute('data-src');
    });
});

document.querySelector('.close-modal').onclick = () => modal.style.display = "none";
window.onclick = (e) => { if (e.target == modal) modal.style.display = "none"; };

init(); draw();
