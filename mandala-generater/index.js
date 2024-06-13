import * as THREE from 'three';
import { OrbitControls } from 'jsm/controls/OrbitControls.js';
import { OBJLoader } from 'jsm/loaders/OBJLoader.js';
import { EffectComposer } from 'jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'jsm/postprocessing/UnrealBloomPass.js';
import { ARButton } from 'jsm/webxr/ARButton.js';

// Initialize scene, camera, and renderer
const w = window.innerWidth;
const h = window.innerHeight;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
camera.position.set(0, 1.6, 3);  // Adjusted for AR
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(w, h);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.xr.enabled = true;
document.body.appendChild(renderer.domElement);

// Add ARButton
document.body.appendChild(ARButton.createButton(renderer));

// Add OrbitControls (for debugging purposes)
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.03;

// Initialize lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(5, 5, 5);
pointLight.castShadow = true;
scene.add(pointLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(-5, 5, 5);
directionalLight.castShadow = true;
scene.add(directionalLight);

// Load textures
const texLoader = new THREE.TextureLoader();
const matcap = texLoader.load('./black-n-shiney2.jpg');
const environmentMap = texLoader.load('./environment.jpg'); // Assuming you have an environment texture

// Add a simple plane to represent the floor (for AR space reference)
const floorGeometry = new THREE.PlaneGeometry(10, 10);
const floorMaterial = new THREE.ShadowMaterial({ opacity: 0.3 });
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2;
floor.receiveShadow = true;
scene.add(floor);

// Post-processing setup
const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));

const bloomPass = new UnrealBloomPass(
  new THREE.Vector2(window.innerWidth, window.innerHeight),
  1.5, 0.4, 0.85
);
bloomPass.threshold = 0.1;
bloomPass.strength = 1.5;
bloomPass.radius = 0;
composer.addPass(bloomPass);

function initScene(data) {
  const { geos } = data;
  const startHue = Math.random() * 0.5 + 0.5;

  function getInstanced(geometry, index) {
    const numObjs = 16 + index * 2;
    const step = (Math.PI * 2) / numObjs;
    const color = new THREE.Color().setHSL(startHue + index / 10, 1.0, 0.5);
    const material = new THREE.MeshMatcapMaterial({ matcap, color });
    const instaMesh = new THREE.InstancedMesh(geometry, material, numObjs);
    const matrix = new THREE.Matrix4();
    const size = 0.3;
    const radius = 0.8 + index * 0.2;
    const z = -0.2 + index * -0.1;
    const axis = new THREE.Vector3(0, 0, 1);
    for (let i = 0; i < numObjs; i += 1) {
      const x = Math.cos(step * i) * radius;
      const y = Math.sin(step * i) * radius;
      const position = new THREE.Vector3(x, y, z);
      const quaternion = new THREE.Quaternion();
      quaternion.setFromAxisAngle(axis, i * step);
      const scale = new THREE.Vector3().setScalar(size);
      matrix.compose(position, quaternion, scale);
      instaMesh.setMatrixAt(i, matrix);
    }
    return instaMesh;
  }

  const box = new THREE.BoxGeometry();
  const ball = new THREE.SphereGeometry(0.66, 16, 16);
  const knot = new THREE.TorusKnotGeometry(0.5, 0.2, 100, 16);
  const cone = new THREE.ConeGeometry(0.5, 1, 4);

  const geoms = [box, ball, knot, cone];
  const middles = [ball, knot];
  const randomGeo = middles[Math.floor(Math.random() * middles.length)];
  const numRings = 10;

  const rings = [];
  const ringGroup = new THREE.Group();
  for (let i = 0; i < numRings; i += 1) {
    let gIndex = Math.floor(Math.random() * geoms.length);
    const ring = getInstanced(geoms[gIndex], i);
    ring.userData = { baseScale: 0.5 + i * 0.1, speed: 0.02 + Math.random() * 0.01 };
    rings.push(ring);
    ringGroup.add(ring);
  }
  scene.add(ringGroup);

  const color = new THREE.Color().setHSL(startHue, 1.0, 0.5);
  const middle = new THREE.Mesh(randomGeo, new THREE.MeshStandardMaterial({
    color: color,
    metalness: 0.8,
    roughness: 0.2,
    envMap: environmentMap,
  }));
  middle.userData = { baseScale: 1.0, speed: 0.03 };
  scene.add(middle);

  function animate(t = 0) {
    renderer.setAnimationLoop(() => {
      const scaleFactor = 1 + Math.sin(t * 0.005) * 0.3;

      rings.forEach((ring, i) => {
        ring.scale.setScalar(ring.userData.baseScale * scaleFactor);
        ring.position.y = Math.sin(t * 0.005 + i * 0.2) * 0.5;
      });

      middle.scale.setScalar(middle.userData.baseScale * scaleFactor);

      ringGroup.rotation.z += 0.005;

      controls.update();
      composer.render();
    });
  }

  animate();
}

// Load and initialize scene
const sceneData = { geos: [] };
const manager = new THREE.LoadingManager();
manager.onLoad = () => initScene(sceneData);
const loader = new OBJLoader(manager);
const objs = [
  'A_12',
  'B_01',
  'B_10',
  'D_08',
  'D_16',
  'H_07',
  'goldfish3',
  'skull2',
];
const path = './mtl/';
objs.forEach((objName) => {
  loader.load(`${path}${objName}.obj`, (obj) => {
    obj.traverse((child) => {
      if (child.isMesh) {
        child.geometry.name = objName;
        sceneData.geos.push(child.geometry);
      }
    });
  });
});

// Handle window resize
function handleWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  composer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', handleWindowResize, false);

// Debugging helper to ensure AR context
renderer.xr.addEventListener('sessionstart', () => {
  console.log('XR session started');
});
renderer.xr.addEventListener('sessionend', () => {
  console.log('XR session ended');
});
