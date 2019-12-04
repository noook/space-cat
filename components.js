function cos(v) {
  return Math.cos((v - 180) * (Math.PI / 180.0));
}

function sin(v) {
  return Math.sin((v - 180) * (Math.PI / 180.0));
}


function tan(v) {
  return Math.tan((v - 180) * (Math.PI / 180.0));
}

function distance(a, b) {
  return Math.sqrt(Math.pow((a.x - b.x), 2) + Math.pow((a.y - b.y), 2) + Math.pow((a.z - b.z), 2))
}

let step = 0.05

AFRAME.registerComponent('foo', {
  init() {
    document.addEventListener('keypress', (e) => {
      if (e.code === 'Space') {
        window.moving = !window.moving;
      }
    });
  },
  tick() {
    if (window.moving) {
      let newP = this.el.components.camera.camera.parent.position.add(this.el.components.camera.camera.getWorldDirection().multiplyScalar(step));
      this.el.setAttribute('position', newP)
      // const el = document.createElement('a-sphere');
      // el.setAttribute('src', '#rainbow');
      // el.setAttribute('height', 0.2);
      // el.setAttribute('width', 0.2);
      // el.setAttribute('scale', '0.05 0.05 0.05');
      // el.setAttribute('rotation', getRandomPosition());
      // const position = { ...camera.object3D.position};
      // el.setAttribute('position', position);
      // scene.appendChild(el);
    }
  },
});

let score = 0;
var audio = new Audio('success.mp3');

AFRAME.registerComponent('collidable', {
  init() {
    this.camera = document.querySelector('#camera');
  },
  tick() {
    let cameraPos = this.camera.object3D.position
    let circlePos = this.el.object3D.position
    let dist = distance(cameraPos, circlePos);
    if (dist < 1) {
      const id = parseInt(this.el.dataset.id, 10);
      if (!window.passed[id]) {
        audio.currentTime = 0;
        audio.play();
        step += 0.01
        window.passed[id] = true;
        // const entity = this.el;
        // entity.parentNode.removeChild(entity);
        score++
      }
    }
  },
});

let idx = 0;

AFRAME.registerComponent('rotate-animation', {
  init() {
    this.id = idx
    idx++;
  },
  tick() {
    let rotation = this.el.getAttribute('rotation')
    rotation.z = (rotation.z + 1) % 360;
    this.el.setAttribute('rotation', rotation);
  },
});

AFRAME.registerComponent('scores', {
  init() {},
  tick() {
    this.el.setAttribute('value', score);
  },
});

AFRAME.registerComponent('nyan', {
  init() {
    this.destination = getRandomPosition();
  },
  tick() {
    const player = document.querySelector('a-camera')
    let r = player.getAttribute('rotation');
    var pos = this.el.getAttribute('position')
    pos.x += step * sin(r.y);
    pos.y += step * tan(r.x);
    pos.z += step * cos(r.y);
    this.el.setAttribute('position', pos);
  }
})
