const canvas = document.getElementById('graphCanvas');
const ctx = canvas.getContext('2d');

let a = 1, b = 0, c = 0;
const scale = 50; // better visibility on large screens

function updateValues() {
    a = parseFloat(document.getElementById('slider-a').value);
    b = parseFloat(document.getElementById('slider-b').value);
    c = parseFloat(document.getElementById('slider-c').value);

    document.getElementById('val-a').innerText = a;
    document.getElementById('val-b').innerText = b;
    document.getElementById('val-c').innerText = c;

    updateInfo();
    draw();
}

function updateInfo() {
    const vx = -b / (2 * a);
    const vy = a * vx * vx + b * vx + c;
    document.getElementById('vert').innerText = `(${vx.toFixed(2)}, ${vy.toFixed(2)})`;

    const disc = b * b - 4 * a * c;
    document.getElementById('disc').innerText = disc.toFixed(2);

    if (disc < 0) {
        document.getElementById('roots').innerText = "Não possui raízes reais";
    } else {
        const x1 = (-b + Math.sqrt(disc)) / (2 * a);
        const x2 = (-b - Math.sqrt(disc)) / (2 * a);
        document.getElementById('roots').innerText = `${x1.toFixed(2)}, ${x2.toFixed(2)}`;
    }
}

function draw() {
    const w = canvas.width;
    const h = canvas.height;
    const ox = w / 2;
    const oy = h / 2;

    ctx.clearRect(0, 0, w, h);

    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let x = ox % scale; x < w; x += scale) {
        ctx.moveTo(x, 0); ctx.lineTo(x, h);
    }
    for (let y = oy % scale; y < h; y += scale) {
        ctx.moveTo(0, y); ctx.lineTo(w, y);
    }
    ctx.stroke();

    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, oy); ctx.lineTo(w, oy);
    ctx.moveTo(ox, 0); ctx.lineTo(ox, h);
    ctx.stroke();

    ctx.strokeStyle = '#60a5fa';
    ctx.lineWidth = 3;
    ctx.beginPath();
    let first = true;

    for (let px = 0; px < w; px++) {
        const x = (px - ox) / scale;
        const y = a * x * x + b * x + c;
        const py = oy - (y * scale);
        if (first) { ctx.moveTo(px, py); first = false; }
        else { ctx.lineTo(px, py); }
    }
    ctx.stroke();

    const vx = -b / (2 * a);
    const vy = a * vx * vx + b * vx + c;

    const vx_px = ox + vx * scale;
    const vy_px = oy - vy * scale;

    ctx.fillStyle = '#fbbf24';
    ctx.beginPath();
    ctx.arc(vx_px, vy_px, 6, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = '#6366f1';
    ctx.setLineDash([10, 5]);
    ctx.beginPath();
    ctx.moveTo(vx_px, 0);
    ctx.lineTo(vx_px, h);
    ctx.stroke();
    ctx.setLineDash([]);

    const disc = b*b - 4*a*c;
    if (disc >= 0) {
        const x1 = (-b + Math.sqrt(disc)) / (2 * a);
        const x2 = (-b - Math.sqrt(disc)) / (2 * a);

        ctx.fillStyle = '#ef4444';
        [x1, x2].forEach(root => {
            const rx = ox + root * scale;
            ctx.beginPath();
            ctx.arc(rx, oy, 5, 0, Math.PI * 2);
            ctx.fill();
        });
    }
}

function resetValues() {
    document.getElementById('slider-a').value = 1;
    document.getElementById('slider-b').value = 0;
    document.getElementById('slider-c').value = 0;
    updateValues();
}

document.getElementById('slider-a').addEventListener('input', updateValues);
document.getElementById('slider-b').addEventListener('input', updateValues);
document.getElementById('slider-c').addEventListener('input', updateValues);

updateValues();
