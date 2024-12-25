const grid = document.getElementById('grid');
const colorPicker = document.getElementById('colorPicker');
const socket = io();

// Create a 50x50 grid
for (let i = 0; i < 50 * 50; i++) {
  const pixel = document.createElement('div');
  pixel.classList.add('pixel');
  pixel.addEventListener('click', () => {
    const index = Array.from(grid.children).indexOf(pixel);
    const color = colorPicker.value;
    pixel.style.backgroundColor = color;
    socket.emit('pixelChange', { index, color });
  });
  grid.appendChild(pixel);
}

// Update grid in real-time
socket.on('pixelChange', ({ index, color }) => {
  document.querySelectorAll('.pixel')[index].style.backgroundColor = color;
});
