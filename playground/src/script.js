import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import gsap from "gsap";
import GUI from "lil-gui";

// NOTE ---------------------------------------------------------------- Reusables

const scaler = (folderVar, meshName) => {
  const scaleX = folderVar.add(meshName.scale, "x");
  scaleX
    .min(0)
    .max(100)
    .step(0.01)
    .name("x-scale");

const scaleY = folderVar.add(meshName.scale, "y");
  scaleY
    .min(0)
    .max(100)
    .step(0.01)
    .name("y-scale");

const scaleZ = folderVar.add(meshName.scale, "z");
  scaleZ
    .min(0)
    .max(100)
    .step(0.01)
    .name("z-scale");
}

// NOTE ---------------------------------------------------------------- Starters

// Canvas
const canvas = document.querySelector("canvas.webgl");
const gui = new GUI({ width: 400 });

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const aspectRatio = sizes.width / sizes.height;
const scene = new THREE.Scene();
const axesHelper = new THREE.AxesHelper(100);
const camera = new THREE.PerspectiveCamera(75, aspectRatio);
const renderer = new THREE.WebGL1Renderer({
  canvas,
});

// NOTE ---------------------------------------------------------------- Resize canvas
window.addEventListener('resize', () => {

  // Update size
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update Camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update Renderer
  renderer.setSize(sizes.width, sizes.height);

  // Remove jagged edges
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
})

const colors = {
  base: "#99582a",
};

// NOTE ---------------------------------------------------------------- Whole Couch
const sectionalCouch = new THREE.Group();

// NOTE ---------------------------------------------------------------- Section 1

const section1X = 27;
const section1Y = 14;
const section1Z = 55;

const section1 = new THREE.Mesh(
  new THREE.BoxGeometry(section1X, section1Y, section1Z),
  new THREE.MeshBasicMaterial({
    color: colors.base,
  })
);
section1.castShadow = true;
section1.receiveShadow = true;
sectionalCouch.add(section1);

const couchSection1 = gui.addFolder("Section1");
scaler(couchSection1, section1);

section1.position.x = section1X / 2;
section1.position.z = (section1X / 2) + 14;
section1.position.y = section1Y / 2;

// NOTE ---------------------------------------------------------------- Section 2

const section2X = 57;
const section2Y = 14;
const section2Z = 31;

const section2 = new THREE.Mesh(
  new THREE.BoxGeometry(section2X, section2Y, section2Z),
  new THREE.MeshBasicMaterial({
    color: "#d4a373",
  })
);

const couchSection2 = gui.addFolder("Section2");
scaler(couchSection2, section2);

section2.position.x = (section2X / 2) + section1X;
section2.position.z = section2Z / 2;
section2.position.y = section2Y / 2;
sectionalCouch.add(section2);

// NOTE ---------------------------------------------------------------- Add to scene
scene.add(sectionalCouch);
scene.add(axesHelper);

camera.position.set(70, 70, 90);
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
