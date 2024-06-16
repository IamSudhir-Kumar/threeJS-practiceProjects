import * as THREE from "three";
import { getBodies, getMouseBall, createBackground, createLights } from "./getElements.js";
import RAPIER from 'https://cdn.skypack.dev/@dimforge/rapier3d-compat@0.11.2';
import { EffectComposer } from "jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "jsm/postprocessing/UnrealBloomPass.js";
import { SMAAPass } from "jsm/postprocessing/SMAAPass.js";
import { FilmPass } from "jsm/postprocessing/FilmPass.js";
import { GUI } from "lil-gui";

// Initialize the scene, camera, and renderer
const w = window.innerWidth;
const h = window.innerHeight;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
camera.position.z = 5;
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(w, h);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.outputColorSpace = THREE.SRGBColorSpace;
document.body.appendChild(renderer.domElement);

// Define sceneMiddle at the top level
const sceneMiddle = new THREE.Vector3(0, 0, 0);

// Initialize physics
let mousePos = new THREE.Vector2();
await RAPIER.init();
const gravity = { x: 0.0, y: 0, z: 0.0 };
const world = new RAPIER.World(gravity);

// Create initial objects
let numBodies = 100;
let bodies = getBodies(numBodies, RAPIER, world);
bodies.forEach(body => scene.add(body.mesh));

const mouseBall = getMouseBall(RAPIER, world);
scene.add(mouseBall.mesh);

// Keep references to lights
const lights = createLights(scene);
const cursorLight = mouseBall.mesh.children.find(child => child instanceof THREE.PointLight);

createBackground(scene);

// Patterns
function applyPattern(pattern) {
  const patternFunctions = {
    spiral: (index, numBodies) => {
      const angle = index / numBodies * Math.PI * 2 * 5;
      const radius = 0.5 + index / numBodies * 3;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      const z = (index / numBodies) * 5 - 2.5;
      return { x, y, z };
    },
    grid: (index, numBodies) => {
      const gridSize = Math.ceil(Math.sqrt(numBodies));
      const x = (index % gridSize - gridSize / 2) * 0.5;
      const y = (Math.floor(index / gridSize) - gridSize / 2) * 0.5;
      const z = 0;
      return { x, y, z };
    }
  };

  return patternFunctions[pattern];
}

// Apply initial pattern
let currentPattern = 'spiral';
function applyPatternToBodies(pattern) {
  const patternFunction = applyPattern(pattern);
  bodies.forEach((body, index) => {
    const { x, y, z } = patternFunction(index, numBodies);
    body.rigid.setTranslation({ x, y, z }, true);
    body.mesh.position.set(x, y, z);
  });
}

applyPatternToBodies(currentPattern);

// Post-processing effects
const renderScene = new RenderPass(scene, camera);
const bloomPass = new UnrealBloomPass(new THREE.Vector2(w, h), 1.5, 0.4, 100);
bloomPass.threshold = 0.005;
bloomPass.strength = 2.0;
bloomPass.radius = 0;

const smaaPass = new SMAAPass();
const filmPass = new FilmPass(0.35, 0.025, 648, false);

const composer = new EffectComposer(renderer);
composer.addPass(renderScene);
composer.addPass(bloomPass);  // Start with bloomPass

function updateComposer(effect) {
  composer.passes = [renderScene];
  if (effect === 'UnrealBloomPass') {
    composer.addPass(bloomPass);
  } else if (effect === 'SMAAPass') {
    composer.addPass(smaaPass);
  } else if (effect === 'FilmPass') {
    composer.addPass(filmPass);
  }
}

// Animate function
function animate() {
  requestAnimationFrame(animate);
  world.step();
  mouseBall.update(mousePos);
  bodies.forEach(b => b.update());
  composer.render(scene, camera);
}

animate();

// Handle window resize
function handleWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', handleWindowResize, false);

// Handle mouse move
function handleMouseMove(evt) {
  mousePos.x = (evt.clientX / window.innerWidth) * 2 - 1;
  mousePos.y = -(evt.clientY / window.innerHeight) * 2 + 1;
}
window.addEventListener('mousemove', handleMouseMove, false);

// GUI for controlling various aspects
const gui = new GUI();
const settings = {
  numBodies: 100,
  lightColor: 0xffffff,
  takeScreenshot: () => {
    renderer.render(scene, camera);
    const screenshot = renderer.domElement.toDataURL("image/png");
    const link = document.createElement('a');
    link.href = screenshot;
    link.download = 'screenshot.png';
    link.click();
  },
  randomMovement: false,
  pattern: 'spiral',
  postProcessingEffect: 'UnrealBloomPass'
};

gui.add(settings, 'numBodies', 10, 200).step(1).onChange(value => {
  numBodies = value;
  bodies.forEach(body => scene.remove(body.mesh));
  bodies = getBodies(numBodies, RAPIER, world);
  bodies.forEach(body => scene.add(body.mesh));
  applyPatternToBodies(settings.pattern);
});

gui.addColor(settings, 'lightColor').onChange(value => {
  lights.forEach(light => {
    light.color.setHex(value);
  });
  cursorLight.color.setHex(value);
});

gui.add(settings, 'takeScreenshot');

gui.add(settings, 'randomMovement').onChange(value => {
  applyPatternToBodies(value ? 'grid' : currentPattern);
});

gui.add(settings, 'pattern', ['spiral', 'grid']).onChange(value => {
  currentPattern = value;
  applyPatternToBodies(value);
});

gui.add(settings, 'postProcessingEffect', ['UnrealBloomPass', 'SMAAPass', 'FilmPass']).onChange(value => {
  updateComposer(value);
});
