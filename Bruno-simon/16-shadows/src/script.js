import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "lil-gui";

/**
 * texture
 */
const textureLoader = new THREE.TextureLoader();
const bakedShadow = textureLoader.load("/textures/bakedShadow.jpg");
const simpleShadow = textureLoader.load("/textures/simpleShadow.jpg");

/**
 * Base
 */
// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);

scene.add(ambientLight);
const ambientLightFolder = gui.addFolder("AmbientLight");
ambientLightFolder.add(ambientLight, "intensity").min(0).max(1).step(0.001);
// Directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.4);
directionalLight.position.set(2, 2, -1);
directionalLight.shadow.mapSize.width = 1024;
directionalLight.shadow.mapSize.height = 1024;
const directionalLightGui = gui.addFolder("DirectionalLight");
directionalLightGui.add(directionalLight, "visible").name("Visible");
// directionalLightGui.add(directionalLightCameraHelper, 'visible').name('Helper')
directionalLightGui
  .add(directionalLight.shadow, "bias")
  .min(-0.01)
  .max(0.01)
  .step(0.0001);
directionalLightGui
  .add(directionalLight.shadow, "radius")
  .min(1)
  .max(4)
  .step(0.001);
directionalLightGui
  .add(directionalLight.shadow.camera, "near")
  .min(0.1)
  .max(3)
  .step(0.001);
directionalLightGui
  .add(directionalLight.shadow.camera, "far")
  .min(1)
  .max(10)
  .step(0.001);
directionalLightGui
  .add(directionalLight.shadow.camera, "zoom")
  .min(0.1)
  .max(2)
  .step(0.001);
directionalLightGui
  .add(directionalLight.shadow.camera, "left")
  .min(-2)
  .max(2)
  .step(0.001);
directionalLightGui
  .add(directionalLight.shadow.camera, "right")
  .min(-2)
  .max(2)
  .step(0.001);
directionalLightGui
  .add(directionalLight.shadow.camera, "top")
  .min(-2)
  .max(2)
  .step(0.001);
directionalLightGui
  .add(directionalLight.shadow.camera, "bottom")
  .min(-2)
  .max(2)
  .step(0.001);

//
directionalLight.shadow.camera.top = 2;
directionalLight.shadow.camera.right = 2;
directionalLight.shadow.camera.bottom = -2;
directionalLight.shadow.camera.left = -2;
//
directionalLight.shadow.camera.far = 6;
directionalLight.shadow.camera.near = 1;
directionalLightGui
  .add(directionalLight, "intensity")
  .min(0)
  .max(1)
  .step(0.001);
directionalLightGui
  .add(directionalLight.position, "x")
  .min(-5)
  .max(5)
  .step(0.001);
directionalLightGui
  .add(directionalLight.position, "y")
  .min(-5)
  .max(5)
  .step(0.001);
directionalLightGui
  .add(directionalLight.position, "z")
  .min(-5)
  .max(5)
  .step(0.001);
scene.add(directionalLight);

directionalLight.castShadow = false;
directionalLight.shadow.radius = 4;
directionalLightGui
  .add(directionalLight.shadow, "radius")
  .min(1)
  .max(10)
  .step(0.001);
/////SpotLight

const spotLight = new THREE.SpotLight(0xffffff, 0.5, 10, Math.PI * 0.3);
spotLight.position.set(0, 2, 2);
scene.add(spotLight);
scene.add(spotLight.target); ///target to the spotlight
spotLight.castShadow = false;
spotLight.shadow.mapSize.width = 1024;
spotLight.shadow.mapSize.height = 1024;
spotLight.shadow.camera.fov = 30;
spotLight.shadow.camera.near = 1;
spotLight.shadow.camera.far = 6;
spotLight.shadow.bias = 0.001;
spotLight.shadow.radius = 4;
const spotLightCameraHelper = new THREE.CameraHelper(spotLight.shadow.camera);
spotLightCameraHelper.visible = false;
scene.add(spotLightCameraHelper);

const spotLightFolder = gui.addFolder("SpotLight");
spotLightFolder.add(spotLight, "visible").name("Visible");
spotLightFolder.add(spotLightCameraHelper, "visible").name("Helper");
spotLightFolder.add(spotLight, "intensity").min(0).max(1).step(0.001);
spotLightFolder.add(spotLight.position, "x").min(-5).max(5).step(0.001);
spotLightFolder.add(spotLight.position, "y").min(-5).max(5).step(0.001);
spotLightFolder.add(spotLight.position, "z").min(-5).max(5).step(0.001);
spotLightFolder.add(spotLight, "distance").min(0).max(15).step(0.1);
spotLightFolder
  .add(spotLight, "angle")
  .min(0)
  .max(Math.PI / 3)
  .step(0.001);
spotLightFolder.add(spotLight, "penumbra").min(0).max(1).step(0.001);
spotLightFolder.add(spotLight, "decay").min(1).max(2).step(0.001);
spotLightFolder.add(spotLight.shadow, "bias").min(-0.01).max(0.01).step(0.0001);
spotLightFolder.add(spotLight.shadow, "radius").min(1).max(10).step(0.001);

//*PointLight
const pointLight = new THREE.PointLight(0xffffff, 0.3);
pointLight.position.set(-1, 1, 0);
scene.add(pointLight);
pointLight.castShadow = false;
pointLight.shadow.mapSize.width = 1024;
pointLight.shadow.mapSize.height = 1024;
pointLight.shadow.camera.fov = 30;
pointLight.shadow.camera.near = 0.1;
pointLight.shadow.camera.far = 6;
pointLight.shadow.bias = 0.001;
pointLight.shadow.radius = 4;

const pointLightCameraHelper = new THREE.CameraHelper(pointLight.shadow.camera);
pointLightCameraHelper.visible = false;
scene.add(pointLightCameraHelper);
const pointLightFolder = gui.addFolder("PointLight");
pointLightFolder.add(pointLight.position, "x").min(-5).max(5).step(0.001);
pointLightFolder.add(pointLight.position, "y").min(-5).max(5).step(0.001);
pointLightFolder.add(pointLight.position, "z").min(-5).max(5).step(0.001);

pointLightFolder.add(pointLight, "visible").name("Visible");
pointLightFolder.add(pointLightCameraHelper, "visible").name("Helper");
pointLightFolder.add(pointLight, "intensity").min(0).max(1).step(0.001);
/**
 *
 *  Shadow camera helper
 */
const directionalLightCameraHelper = new THREE.CameraHelper(
  directionalLight.shadow.camera
);
directionalLightCameraHelper.visible = false;
scene.add(directionalLightCameraHelper);
/**
 * Materials
 */
const material = new THREE.MeshStandardMaterial();
material.roughness = 0.7;
gui.add(material, "metalness").min(0).max(1).step(0.001);
gui.add(material, "roughness").min(0).max(1).step(0.001);

/**
 * Objects
 */
const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32), material);
sphere.castShadow = true;

const plane = new THREE.Mesh(
  new THREE.PlaneGeometry(5, 5),
  material
  //   new THREE.MeshBasicMaterial({
  //     map: simpleShadow,
  //   })
);
plane.rotation.x = -Math.PI * 0.5;
plane.position.y = -0.5;
plane.receiveShadow = true;
scene.add(sphere, plane);
const sphereShadow = new THREE.Mesh(
  new THREE.PlaneGeometry(1.5, 1.5),
  new THREE.MeshBasicMaterial({
    color: 0x000000,
    transparent: true,
    alphaMap: simpleShadow,
  })
);
sphereShadow.rotation.x = -Math.PI * 0.5;
sphereShadow.position.y = plane.position.y + 0.01;
scene.add(sphereShadow);
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
  // renderer = new THREE.WebGLRenderer({
  //     preserveDrawingBuffer: true
  // });
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

// var str = 'image/png,';
// ImgData = renderer.domElement.toDataURL('image/png');
// console.log(str);
/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;
// gui.add(renderer.shadowMap, 'enabled').name('ShadowMap')
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  //update the spher
  sphere.position.x = Math.cos(elapsedTime) * 1.5;
  sphere.position.z = Math.sin(elapsedTime) * 1.5;
  sphere.position.y = Math.abs(Math.sin(elapsedTime * 3));
  sphereShadow.position.x = sphere.position.x;
  sphereShadow.position.z = sphere.position.z;
  sphereShadow.material.opacity = (1 - sphere.position.y) * 0.5;
  
  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
