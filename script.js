// 1. Interactive Deep NN Background Animation
const canvas = document.getElementById('neuralCanvas');
const ctx = canvas.getContext('2d');
        
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

let nodes = [];
const numNodes = 80;
const connectionDist = 180;

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

function initNetwork() {
    nodes = [];
    for (let i = 0; i < numNodes; i++) nodes.push(new Node());
}

function drawNetwork() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < nodes.length; i++) {
        nodes[i].update();
        for (let j = i + 1; j < nodes.length; j++) {
            let dist = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
            if (dist < connectionDist) {
                // Connection lines that fade with distance
                ctx.strokeStyle = `rgba(0, 242, 255, ${1 - dist/connectionDist})`;
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.moveTo(nodes[i].x, nodes[i].y);
                ctx.lineTo(nodes[j].x, nodes[j].y);
                ctx.stroke();
            }
        }
    }
    requestAnimationFrame(drawNetwork);
}

initNetwork(); drawNetwork();

// 2. Modal Viewer Logic for Certificates
const modal = document.getElementById("certModal");
const modalImg = document.getElementById("certImage");
const closeBtn = document.querySelector('.close-modal');

document.querySelectorAll('.cert-link').forEach(link => {
    link.addEventListener('click', function() {
        modal.style.display = "flex";
        modalImg.src = this.getAttribute('data-src');
    });
});

closeBtn.onclick = () => modal.style.display = "none";
window.onclick = (e) => { if (e.target == modal) modal.style.display = "none"; };