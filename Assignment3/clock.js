/**
 * @description Controls the state of the clock's theme (Day or Night).
 */
let isNightMode = false;

/**
 * @param {CanvasRenderingContext2D} ctx - The canvas 2D rendering context.
 * @param {number} cx - X coordinate of the center.
 * @param {number} cy - Y coordinate of the center.
 * @param {number} radius - The radius of the clock face.
 * @returns {void} - Nothing.
 * @description Draws the static parts of the clock (face, rim, ticks) based on the current theme state.
 */
function drawClockFace(ctx, cx, cy, radius) {
    // Theme colors
    const bgColor = isNightMode ? '#1a1a1a' : '#ffffff';
    const rimColor = isNightMode ? '#555555' : '#333333';
    const tickColor = isNightMode ? '#ffffff' : '#000000';

    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, 2 * Math.PI);
    ctx.fillStyle = bgColor;
    ctx.fill();
    ctx.lineWidth = 8;
    ctx.strokeStyle = rimColor;
    ctx.stroke();

    // Draw hour markers
    for (let i = 0; i < 12; i++) {
        // Trigonometry: angle in radians
        const angle = (i * Math.PI) / 6; 
        
        ctx.beginPath();
        // Calculate start and end coordinates for ticks using Trig
        const x1 = cx + Math.cos(angle) * (radius - 20);
        const y1 = cy + Math.sin(angle) * (radius - 20);
        const x2 = cx + Math.cos(angle) * (radius - 5);
        const y2 = cy + Math.sin(angle) * (radius - 5);
        
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = tickColor;
        ctx.lineWidth = 4;
        ctx.stroke();
    }
}

/**
 * @param {CanvasRenderingContext2D} ctx - The canvas 2D rendering context.
 * @param {number} cx - Center X.
 * @param {number} cy - Center Y.
 * @param {number} angle - Angle in radians.
 * @param {number} length - Length of the hand.
 * @param {number} width - Line width of the hand.
 * @param {string} color - Hex or string color.
 * @returns {void} - Nothing.
 * @description Uses Trigonometry to calculate endpoint coordinates and draw a clock hand.
 */
function drawHand(ctx, cx, cy, angle, length, width, color) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.strokeStyle = color;
    ctx.moveTo(cx, cy);
    
    // Trigonometry: Subtract Math.PI/2 because 0 radians is at 3 o'clock, but 0 time is at 12 o'clock.
    const x = cx + Math.cos(angle - Math.PI / 2) * length;
    const y = cy + Math.sin(angle - Math.PI / 2) * length;
    
    ctx.lineTo(x, y);
    ctx.stroke();
}

/**
 * @param {DOMHighResTimeStamp} timestamp - The timestamp provided by requestAnimationFrame.
 * @returns {void} - Nothing.
 * @description The main render loop. Clears the canvas, calculates exact time angles, and redraws the clock.
 */
function animateClock(timestamp) {
    const canvas = document.getElementById('analog-clock');
    const ctx = canvas.getContext('2d');
    const radius = canvas.width / 2 - 10;
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;

    // Clear previous frame
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Get current time
    const now = new Date();
    const hours = now.getHours() % 12;
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const milliseconds = now.getMilliseconds();

    // Draw Face
    drawClockFace(ctx, cx, cy, radius);

    // Calculate angles
    const secAngle = (Math.PI * 2) * (seconds + milliseconds / 1000) / 60;
    const minAngle = (Math.PI * 2) * (minutes + seconds / 60) / 60;
    const hrAngle = (Math.PI * 2) * (hours + minutes / 60) / 12;

    // Theme specific hand colors
    const handColor = isNightMode ? '#ffffff' : '#000000';
    const accentColor = '#e74c3c'; // Red second hand

    // Draw Hands
    drawHand(ctx, cx, cy, hrAngle, radius * 0.5, 6, handColor);  // Hour
    drawHand(ctx, cx, cy, minAngle, radius * 0.75, 4, handColor); // Minute
    drawHand(ctx, cx, cy, secAngle, radius * 0.85, 2, accentColor); // Second

    // Center pivot point
    ctx.beginPath();
    ctx.arc(cx, cy, 5, 0, 2 * Math.PI);
    ctx.fillStyle = accentColor;
    ctx.fill();

    // Loop at 60fps
    window.requestAnimationFrame(animateClock);
}

// UI Interaction (State Check)
document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('theme-toggle-btn');
    
    toggleBtn.addEventListener('click', () => {
        isNightMode = !isNightMode;
        toggleBtn.textContent = isNightMode ? 'Toggle Day Mode' : 'Toggle Night Mode';
        
        // Optional: change canvas background CSS
        document.getElementById('analog-clock').style.background = isNightMode ? '#222' : '#fff';
    });

    // Start engine
    window.requestAnimationFrame(animateClock);
});