import * as THREE from "three";

const sceneMiddle = new THREE.Vector3(0, 0, 0);

function getBody(RAPIER, world, shapeType) {
  const size = 0.1 + Math.random() * 0.25;
  const range = 6;
  const density = size * 1.0;
  let x = Math.random() * range - range * 0.5;
  let y = Math.random() * range - range * 0.5 + 3;
  let z = Math.random() * range - range * 0.5;

  let rigidBodyDesc = RAPIER.RigidBodyDesc.dynamic().setTranslation(x, y, z);
  let rigid = world.createRigidBody(rigidBodyDesc);
  let colliderDesc = RAPIER.ColliderDesc.ball(size).setDensity(density);
  world.createCollider(colliderDesc, rigid);

  let geometry;
  switch (shapeType) {
    case 'sphere':
      geometry = new THREE.SphereGeometry(size, 32, 32);
      break;
    case 'cube':
      geometry = new THREE.BoxGeometry(size, size, size);
      break;
    case 'cone':
      geometry = new THREE.ConeGeometry(size, size * 2, 32);
      break;
    case 'torus':
      geometry = new THREE.TorusGeometry(size, size / 4, 16, 100);
      break;
    default:
      geometry = new THREE.IcosahedronGeometry(size, 1);
  }

  const material = new THREE.MeshStandardMaterial({
    color: Math.random() * 0xffffff,
    flatShading: true
  });
  const mesh = new THREE.Mesh(geometry, material);

  const wireMat = new THREE.MeshBasicMaterial({
    color: Math.random() * 0xffffff,
    wireframe: true
  });
  const wireMesh = new THREE.Mesh(geometry, wireMat);
  wireMesh.scale.setScalar(1.001);
  mesh.add(wireMesh);

  function update() {
    rigid.resetForces(true);
    let { x, y, z } = rigid.translation();
    let pos = new THREE.Vector3(x, y, z);
    let dir = pos.clone().sub(sceneMiddle).normalize();
    rigid.addForce(dir.multiplyScalar(-0.5), true);
    mesh.position.set(x, y, z);
  }
  return { mesh, rigid, update };
}

function getBodies(numBodies, RAPIER, world) {
  const shapes = ['sphere', 'cube', 'cone', 'torus', 'icosahedron'];
  let bodies = [];
  for (let i = 0; i < numBodies; i++) {
    const shapeType = shapes[Math.floor(Math.random() * shapes.length)];
    bodies.push(getBody(RAPIER, world, shapeType));
  }
  return bodies;
}

function getMouseBall(RAPIER, world) {
  const mouseSize = 0.25;
  const geometry = new THREE.IcosahedronGeometry(mouseSize, 8);
  const material = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    emissive: 0xffffff,
  });
  const mouseLight = new THREE.PointLight(0xffffff, 1);
  const mouseMesh = new THREE.Mesh(geometry, material);
  mouseMesh.add(mouseLight);

  let bodyDesc = RAPIER.RigidBodyDesc.kinematicPositionBased().setTranslation(0, 0, 0);
  let mouseRigid = world.createRigidBody(bodyDesc);
  let dynamicCollider = RAPIER.ColliderDesc.ball(mouseSize * 3.0);
  world.createCollider(dynamicCollider, mouseRigid);

  function update(mousePos) {
    mouseRigid.setTranslation({ x: mousePos.x * 5, y: mousePos.y * 5, z: 0.2 });
    let { x, y, z } = mouseRigid.translation();
    mouseMesh.position.set(x, y, z);
  }
  return { mesh: mouseMesh, update };
}

function createBackground(scene) {
  const loader = new THREE.TextureLoader();
  loader.load('path_to_dynamic_background_image.jpg', (texture) => {
    scene.background = texture;
  });
}

function createLights(scene) {
  const colors = [0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 0xff00ff];
  const light1 = new THREE.PointLight(colors[Math.floor(Math.random() * colors.length)], 1);
  light1.position.set(10, 10, 10);
  scene.add(light1);

  const light2 = new THREE.PointLight(colors[Math.floor(Math.random() * colors.length)], 1);
  light2.position.set(-10, -10, -10);
  scene.add(light2);

  return [light1, light2];
}

export { getBodies, getMouseBall, createBackground, createLights };
