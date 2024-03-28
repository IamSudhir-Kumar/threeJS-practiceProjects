import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "lil-gui";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
/**
 * Base
 */

// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();
// const axes = new THREE.AxesHelper();
// scene.add(axes);
/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
const matcapTexture = textureLoader.load("/textures/matcaps/3.png");
const matcapTexture2 = textureLoader.load("/textures/matcaps/8.png");
/*
font
*/
const fontLoader = new FontLoader();
fontLoader.load("/fonts/helvetiker_regular.typeface.json", (font) => {
  const textGeometry = new TextGeometry("Sudhir Kumar", {
    font: font,
    size: 0.5,
    height: 0.2,
    curveSegments: 5,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 4,
  });
  textGeometry.computeBoundingBox();
  textGeometry.center(); // It can be used to center the text
  const Material = new THREE.MeshMatcapMaterial({
    matcap: matcapTexture,
    wireframe: false,
  });
  const text = new THREE.Mesh(textGeometry, Material);
  scene.add(text);

  const DonutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45);
  // const DonutMaterial = new THREE.MeshMatcapMaterial({ matcap: matcapTexture2 });
  

  for (let i = 0; i < 300; i++) {
    const Donut = new THREE.Mesh(DonutGeometry, Material);
    Donut.position.x = (Math.random() - 0.5) * 10;
    Donut.position.y = (Math.random() - 0.5) * 10;
    Donut.position.z = (Math.random() - 0.5) * 10;

    Donut.rotation.x = Math.random() * Math.PI;
    Donut.rotation.y = Math.random() * Math.PI;

    const scale = Math.random();
    Donut.scale.set(scale, scale, scale);
    scene.add(Donut);
  }
});

// /**
//  * Object
//  */
// const cube = new THREE.Mesh(
//     new THREE.BoxGeometry(1, 1, 1),
//     new THREE.MeshBasicMaterial()
// )

// scene.add(cube)

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 2;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

controls.minDistance = 1;
controls.maxDistance = 7;
/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();