import './style.css'
import * as THREE from 'three';

const canvas = document.querySelector("canvas.webgl");

// Sizes 

const sizes = {
    width: 800, 
    height: 600, 
};
const aspectRatio = sizes.width / sizes.height;


const scene = new THREE.Scene();

// Object 

const cubeGeometry = new THREE.BoxGeometry(2, 2, 1);
const cubeMaterial = new THREE.MeshBasicMaterial({color: "#003049"});
const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);
scene.add(cubeMesh);

// Camera 

const camera = new THREE.PerspectiveCamera(125, aspectRatio);
camera.position.z = 3;
camera.position.x = 2;
scene.add(camera);

// Renderer 

const renderer = new THREE.WebGLRenderer({
    canvas, 
})

renderer.setClearColor("#fcbf49");
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);