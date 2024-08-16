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

// Function to start drawing
function startDrawing(e) {
    isDrawing = true;
    [lastX, lastY] = getCoordinates(e);
}

// Function to stop drawing
function stopDrawing() {
    isDrawing = false;
}

// Function to handle drawing
function draw(e) {
    if (!isDrawing) return;

    const [x, y] = getCoordinates(e);

    ctx.beginPath();
    ctx.moveTo(lastX - canvas.offsetLeft, lastY - canvas.offsetTop);
    ctx.lineTo(x - canvas.offsetLeft, y - canvas.offsetTop);
    ctx.stroke();

    [lastX, lastY] = [x, y];
    
    // Update pencil position
    pencil.style.left = `${x - pencilImage.width / 2}px`;
    pencil.style.top = `${y - pencilImage.height / 2}px`;
}

// Function to get coordinates from event
function getCoordinates(e) {
    const rect = canvas.getBoundingClientRect();
    if (e.touches) {
        // For touch events
        return [e.touches[0].clientX - rect.left, e.touches[0].clientY - rect.top];
    }
    // For mouse events
    return [e.clientX - rect.left, e.clientY - rect.top];
}

// Event listeners for drawing
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mousemove', draw);

canvas.addEventListener('touchstart', (e) => {
    e.preventDefault(); // Prevent scrolling when touching the canvas
    startDrawing(e);
});
canvas.addEventListener('touchend', stopDrawing);
canvas.addEventListener('touchmove', draw);

// Adjust canvas size when the window is resized
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
