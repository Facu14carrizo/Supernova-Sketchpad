const canvas = document.getElementById('canvas');
const increaseBtn = document.getElementById('increase');
const decreaseBtn = document.getElementById('decrease');
const sizeEL = document.getElementById('size');
const colorEl = document.getElementById('color');
const clearEl = document.getElementById('clear');

const ctx = canvas.getContext('2d');

let size = 10;
let isPressed = false;
colorEl.value = 'black';
let color = colorEl.value;
let x;
let y;

canvas.addEventListener('mousedown', (e) => {
    isPressed = true;
    x = e.offsetX;
    y = e.offsetY;
});

document.addEventListener('mouseup', () => {
    isPressed = false;
    x = undefined;
    y = undefined;
});

canvas.addEventListener('mousemove', (e) => {
    if (isPressed) {
        const x2 = e.offsetX;
        const y2 = e.offsetY;

        drawCircle(x2, y2);
        drawLine(x, y, x2, y2);

        x = x2;
        y = y2;
    }
});

// Eventos para dispositivos móviles
canvas.addEventListener('touchstart', (e) => {
    isPressed = true;
    e.preventDefault(); // Prevenir el comportamiento predeterminado del navegador

    const rect = canvas.getBoundingClientRect();
    const touch = e.touches[0];
    x = touch.clientX - rect.left; // Calcular la posición relativa al canvas
    y = touch.clientY - rect.top;   // Calcular la posición relativa al canvas
});

canvas.addEventListener('touchend', () => {
    isPressed = false;
    x = undefined;
    y = undefined;
});

canvas.addEventListener('touchmove', (e) => {
    if (isPressed) {
        e.preventDefault(); // Prevenir el desplazamiento de la página

        const rect = canvas.getBoundingClientRect();
        const touch = e.touches[0];
        const x2 = touch.clientX - rect.left; // Calcular la posición relativa al canvas
        const y2 = touch.clientY - rect.top;   // Calcular la posición relativa al canvas

        drawCircle(x2, y2);
        drawLine(x, y, x2, y2);

        x = x2;
        y = y2;
    }
});

function drawCircle(x, y) {
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
}

function drawLine(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = color;
    ctx.lineWidth = size * 2;
    ctx.stroke();
}

function updateSizeOnScreen() {
    sizeEL.innerText = size;
}

increaseBtn.addEventListener('click', () => {
    size += 5;

    if (size > 50) {
        size = 50;
    }

    updateSizeOnScreen();
});

decreaseBtn.addEventListener('click', () => {
    size -= 5;

    if (size < 5) {
        size = 5;
    }

    updateSizeOnScreen();
});

colorEl.addEventListener('change', (e) => color = e.target.value);

clearEl.addEventListener('click', () => ctx.clearRect(0, 0, canvas.width, canvas.height));

function createStars(numStars) {
    const body = document.body;

    for (let i = 0; i < numStars; i++) {
        const star = document.createElement('div');
        star.classList.add('star');

        // Establecer tamaño y posición aleatoria de estrellas
        const sizeStar = Math.random() * 3 + 1; 
        star.style.width = `${sizeStar}px`;
        star.style.height = `${sizeStar}px`;
        star.style.top = `${Math.random() * 100}vh`; 
        star.style.left = `${Math.random() * 100}vw`; 

        body.appendChild(star);
    }
}

// Llama a la función para crear 900 estrellas
createStars(900);