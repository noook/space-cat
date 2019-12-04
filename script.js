const shootingStars = new Audio('shooting-stars.mp3');
document.querySelector('a-scene').addEventListener('enter-vr', function () {
  shootingStars.loop = true;
  setTimeout(() => {
    shootingStars.play();
  }, 1000);
});

window.moving = false;
setTimeout(() => {
  window.moving = true;
}, 5000);

function getRandomPosition() {
  return [...Array(3)]
    .map(() => randomIntFromInterval(-30, 30))
    .join(' ');
}

function getRandomRotation() {
  return [...Array(3)]
  .map(() => randomIntFromInterval(0, 360))
  .join(' ');
}

function randomIntFromInterval(min, max) {
  return Math.floor((Math.random() * (max - min + 1) + min) * 100) / 100;
}

const scene = document.querySelector('#scene');

window.passed = {};

for (let i = 0; i < 20; i += 1) {
  const [position, rotation] = [getRandomPosition(), getRandomRotation()]
  const el = document.createElement('a-torus');
  el.setAttribute('src', '#spiral');
  el.setAttribute('radius', 2);
  el.setAttribute('radius-tubular', .1);
  el.setAttribute('rotate-animation', '');
  el.setAttribute('arc', 360);
  el.setAttribute('position', position);
  el.setAttribute('rotation', rotation);

  const target = document.createElement('a-circle');
  target.setAttribute('color', '#000000');
  target.setAttribute('radius', 2);
  target.setAttribute('opacity', 0);
  target.setAttribute('position', position);
  target.setAttribute('rotation', rotation);
  target.setAttribute('collidable', '');
  target.dataset.id = i;

  window.passed[i] = false;

  scene.appendChild(el);
  scene.appendChild(target);
}

for (let i = 0; i < 10; i += 1) {
  const el = document.createElement('a-entity');
  el.setAttribute('obj-model', 'obj: #nyan-obj; mtl: #nyan-mtl');
  el.setAttribute('scale', "0.05 0.05 0.05")
  el.setAttribute('nyan', '');
  el.setAttribute('position', getRandomPosition())
  el.setAttribute('rotation', getRandomRotation())
  el.setAttribute('animation', `property: position; to: ${getRandomPosition()}; dur: 3000; easing: easeOutQuad`) 

  scene.appendChild(el);
}

setInterval(() => {
  for (let i = 0; i < 20; i += 1) {
    window.passed[i] = false;
  }
}, 2000)

const camera = document.querySelector('#camera');

setInterval(() => {
  if (window.moving) {
    const el = document.createElement('a-sphere');
    el.setAttribute('src', '#rainbow');
    el.setAttribute('height', 0.2);
    el.setAttribute('width', 0.2);
    el.setAttribute('scale', '0.05 0.05 0.05');
    el.setAttribute('rotation', getRandomPosition());
    const position = { ...camera.object3D.position};
    el.setAttribute('position', position);
    scene.appendChild(el);
  }
}, 250);
