import * as THREE from "three";
import { OrbitControls } from 'jsm/controls/OrbitControls.js';
import { OBJLoader } from "jsm/loaders/OBJLoader.js"
import { EffectComposer } from 'jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'jsm/postprocessing/UnrealBloomPass.js';
import { GUI } from 'lil-gui';

const w = window.innerWidth;
const h = window.innerHeight;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
camera.position.z = 8;
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(w, h);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.outputColorSpace = THREE.SRGBColorSpace;
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.03;

// Post-processing setup
const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));
const bloomPass = new UnrealBloomPass(
  new THREE.Vector2(w, h),
  1.5,  // strength
  0.4,  // radius
  0.85  // threshold
);
composer.addPass(bloomPass);

let isAnimating = true;
const gui = new GUI();
const guiControls = {
  stopAnimation: () => { isAnimating = false; },
  startAnimation: () => {
    if (!isAnimating) {
      isAnimating = true;
      animate();
    }
  },
  takeScreenshot: () => {
    renderer.render(scene, camera);
    const link = document.createElement('a');
    link.href = renderer.domElement.toDataURL('image/png');
    link.download = 'screenshot.png';
    link.click();
  }
};
gui.add(guiControls, 'stopAnimation');
gui.add(guiControls, 'startAnimation');
gui.add(guiControls, 'takeScreenshot');

let instancedMeshes = [];
let middleMaterial;
let shaderMaterial;
let startHue;

function initScene(data) {
  const { geos } = data;
  const texLoader = new THREE.TextureLoader();
  const matcap = texLoader.load('./black-n-shiney2.jpg');
  startHue = Math.random() * 0.5 + 0.5;
  
  function getInstanced(geometry, index) {
    const numObjs = 8 + index * 4;
    const step = (Math.PI * 2) / numObjs;
    const color = new THREE.Color().setHSL(startHue + index / 10, 1.0, 0.5);
    const material = new THREE.MeshMatcapMaterial({ matcap, color });
    const instaMesh = new THREE.InstancedMesh(geometry, material, numObjs);
    const matrix = new THREE.Matrix4();
    const size = 0.5;
    const radius = 1 + index * 0.6;
    const z = -0.5 + index * -0.25;
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
  instancedMeshes = [];
  for (let i = 0; i < numRings; i += 1) {
    let gIndex = Math.floor(Math.random() * geoms.length);
    const ring = getInstanced(geos[gIndex], i);
    scene.add(ring);
    instancedMeshes.push(ring);
  }
  // add middle piece
  const middleColor = new THREE.Color().setHSL(startHue, 1.0, 0.5);
  middleMaterial = new THREE.MeshMatcapMaterial({ matcap, color: middleColor });
  const middle = new THREE.Mesh(randomGeo, middleMaterial);
  scene.add(middle);

  // Ray marching shader
  shaderMaterial = new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0.0 },
      resolution: { value: new THREE.Vector2(w, h) },
    },
    vertexShader: `
      void main() {
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float time;
      uniform vec2 resolution;

      float sphere(vec3 ro, vec3 rd, vec3 ce, float r) {
        vec3 oc = ro - ce;
        float b = dot(oc, rd);
        float c = dot(oc, oc) - r*r;
        float h = b*b - c;
        if(h < 0.0) return -1.0;
        return -b - sqrt(h);
      }

      void main() {
        vec2 uv = gl_FragCoord.xy / resolution.xy;
        vec3 col = vec3(0.0);
        vec3 ro = vec3(0.0, 0.0, 1.0);
        vec3 rd = normalize(vec3(uv - 0.5, -1.0));

        float d = sphere(ro, rd, vec3(0.0, 0.0, -1.0), 0.5);
        if(d > 0.0) {
          vec3 p = ro + d * rd;
          col = vec3(0.5) + 0.5 * cos(time + p * 2.0);
        }

        gl_FragColor = vec4(col, 1.0);
      }
    `,
  });

  // const plane = new THREE.PlaneGeometry(2, 2);
  // const shaderMesh = new THREE.Mesh(plane, shaderMaterial);
  // scene.add(shaderMesh);

  animate();
}

function animate(t = 0) {
  if (!isAnimating) return;

  requestAnimationFrame(animate);

  // Additional animations
  scene.children.forEach((child, index) => {
    if (child.isMesh || child.isInstancedMesh) {
      child.rotation.x += 0.01 * (index % 2 ? 1 : -1);
      child.rotation.y += 0.01 * (index % 2 ? -1 : 1);
    }
  });
  shaderMaterial.uniforms.time.value = t * 0.001;

  // Animate colors
  const hueChangeSpeed = 0.0005;
  instancedMeshes.forEach((mesh, index) => {
    const material = mesh.material;
    material.color.setHSL((startHue + index / 10 + t * hueChangeSpeed) % 1, 1.0, 0.5);
  });
  middleMaterial.color.setHSL((startHue + t * hueChangeSpeed) % 1, 1.0, 0.5);

  controls.update();
  composer.render();
}

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
const path = './objs/';
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

function handleWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  composer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', handleWindowResize, false);
