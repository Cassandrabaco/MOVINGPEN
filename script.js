const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');
const pencil = document.getElementById('pencil');
const pencilImage = document.getElementById('pencilImage');

// Set canvas dimensions to fill the viewport
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Variables for drawing
let isDrawing = false;
let lastX = 0;
let lastY = 0;

// Drawing settings
ctx.strokeStyle = 'black'; // Pen color
ctx.lineWidth = 2; // Pen width

// Event listeners for drawing
canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.clientX, e.clientY];
});

canvas.addEventListener('mouseup', () => {
    isDrawing = false;
});

canvas.addEventListener('mousemove', (e) => {
    if (!isDrawing) return;

    const x = e.clientX;
    const y = e.clientY;

    ctx.beginPath();
    ctx.moveTo(lastX - canvas.offsetLeft, lastY - canvas.offsetTop);
    ctx.lineTo(x - canvas.offsetLeft, y - canvas.offsetTop);
    ctx.stroke();

    [lastX, lastY] = [x, y];
    
    // Update pencil position
    pencil.style.left = `${x - pencilImage.width / 2}px`;
    pencil.style.top = `${y - pencilImage.height / 2}px`;
});

// Adjust canvas size when the window is resized
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
