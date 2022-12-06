import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
// Cursor Coordinates

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const aspectRatio = sizes.width / sizes.height;

const scene = new THREE.Scene();
const axesHelper = new THREE.AxesHelper(3);
const camera = new THREE.PerspectiveCamera(75, aspectRatio)
const renderer = new THREE.WebGL1Renderer({
  canvas, 
})


// NOTE ---------------------------------------------------------------- BASE 1
const base = new THREE.Group();

const block1 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 0.5, 1), 
  new THREE.MeshBasicMaterial({color: "#e76f51"})
)

const block2 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 0.5, 1), 
  new THREE.MeshBasicMaterial({color: "#f4a261"})
)

const block3 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 0.5, 1), 
  new THREE.MeshBasicMaterial({color: "#f4a261"})
)

block2.position.set(1, 0, 0);
block3.position.set(-1, 0, 0);

base.add(block1, block2, block3);


// NOTE ---------------------------------------------------------------- BASE 2

const block4 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 0.5, 1), 
  new THREE.MeshBasicMaterial({color: "#e76f51"})
);
block4.position.set(-1, 0, -1);

const block5 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 0.5, 1), 
  new THREE.MeshBasicMaterial({color: "#f4a261"})
);
block5.position.set(0, 0, -1);

const block6 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 0.5, 1), 
  new THREE.MeshBasicMaterial({color: "#e76f51"})
)
block6.position.set(1, 0, -1);

base.add(block4, block5, block6);

scene.add(base);
scene.add(axesHelper);

camera.position.set(0, 3, 3);

// camera.lookAt(base.position);

scene.add(camera);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

renderer.setClearColor("#264653");
renderer.setSize(sizes.width, sizes.height);

// NOTE ---------------------------------------------------------------- CONTROL ORBIT BY DRAGGING THE MOUSE
const tick = () => {

  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
}

tick();