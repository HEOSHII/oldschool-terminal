const customCursor = document.querySelector('.custom-cursor');
customCursor.style = 'top: -100%';
document.body.addEventListener('mousemove', e => {
  const [x, y] = [e.pageX, e.pageY];
  if (x - 30 <= 0 || y - 30 <= 0 || x + 30 >= window.innerWidth || y + 30 >= window.innerHeight) {
    customCursor.style = 'top: -100%';
    return;
  }
  customCursor.style.top = `${y}px`;
  customCursor.style.left = `${x}px`;
});
