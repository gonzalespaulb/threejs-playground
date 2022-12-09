import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import gsap from "gsap";
import GUI from "lil-gui";
// Cursor Coordinates

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");
const gui = new GUI({ width: 400 });

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const colors = {
  base: "#99582a",
};

const aspectRatio = sizes.width / sizes.height;

const scene = new THREE.Scene();
const axesHelper = new THREE.AxesHelper(3);
const camera = new THREE.PerspectiveCamera(75, aspectRatio);
const renderer = new THREE.WebGL1Renderer({
  canvas,
});

// NOTE ---------------------------------------------------------------- Chair group
const chair = new THREE.Group();

// NOTE ---------------------------------------------------------------- Seat
const seat = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({
    color: colors.base,
  })
);
chair.add(seat);

const chairSeat = gui.addFolder("Seat");
const seatScaleX = chairSeat.add(seat.scale, "x");
seatScaleX.min(0).max(10).step(0.01).name("x-scale");

const seatScaleY = chairSeat.add(seat.scale, "y");
seatScaleY.min(0).max(10).step(0.01).name("y-scale");

const seatScaleZ = chairSeat.add(seat.scale, "z");
seatScaleZ.min(0).max(10).step(0.01).name("z-scale");
// NOTE ---------------------------------------------------------------- Add to scene
scene.add(chair);
scene.add(axesHelper);

camera.position.set(0, 0, 3);

scene.add(camera);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

renderer.setClearColor("#dad7cd");
renderer.setSize(sizes.width, sizes.height);

// NOTE ---------------------------------------------------------------- CONTROL ORBIT BY DRAGGING THE MOUSE
const tick = () => {
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

tick();
