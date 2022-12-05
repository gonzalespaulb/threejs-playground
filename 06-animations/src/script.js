import './style.css'
import * as THREE from 'three';

const canvas = document.querySelector("canvas.webgl");

//NOTE =========================================================================== Sizes 
const sizes = {
    width: 800, 
    height: 600, 
};
const aspectRatio = sizes.width / sizes.height;
const scene = new THREE.Scene();

const group = new THREE.Group();
scene.add(group);

const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1), 
    new THREE.MeshBasicMaterial({color: "#bde0fe"})
)

const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1), 
    new THREE.MeshBasicMaterial({color: "#ffc8dd"}),
)

cube2.position.set(1, 0, 0);

const cube3 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1), 
    new THREE.MeshBasicMaterial({color: "#cdb4db"}), 
)

cube3.position.set(-1, 0, 0);

group.add(cube1);
group.add(cube2);
group.add(cube3);

group.rotation.x = 2.3;
group.rotation.y = 0.5;

//NOTE =========================================================================== Axes helper
const axesHelper = new THREE.AxesHelper(3);
scene.add(axesHelper);

//NOTE =========================================================================== Camera 
const camera = new THREE.PerspectiveCamera(75, aspectRatio);
camera.position.set(0, 0, 3);
scene.add(camera);

//NOTE =========================================================================== Renderer 
const renderer = new THREE.WebGLRenderer({
    canvas, 
})

renderer.setClearColor("#023047");
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);