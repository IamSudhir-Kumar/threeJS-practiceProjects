import * as THREE from 'three'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Objects
 */
const group = new THREE.Group()
group.position.y = 1
group.scale.y = 2
group.rotation.y = 1
scene.add(group)
const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
)
cube1.position.x = -1.5
const shape2 = new THREE.Mesh(
    new THREE.CapsuleGeometry( 1, 1, 4, 8),
    new THREE.MeshBasicMaterial({ color: 0x000ff0 })
)
shape2.position.x = 1.5
group.add(cube1 , shape2)

const group1 = new THREE.Group()
scene.add(group1)
const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0x00ff00 })
)

group1.add(cube2)
// const geometry = new THREE.BoxGeometry(1, 1, 1)
// const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
// const mesh = new THREE.Mesh(geometry, material)
// mesh.position.x = -0.7
// mesh.position.y = 0.6
// mesh.position.z = -1
// scene.add(mesh)
// /*every face of cube should be diffrent color*/
// const geometry1 = new THREE.BoxGeometry(1, 1, 1)
// const material1 = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
// const mesh1 = new THREE.Mesh(geometry1, material1)
// mesh1.position.x = 0.7
// mesh1.position.y = 0.6
// mesh1.position.z = -1
// scene.add(mesh1)

// const geometry2 = new THREE.CircleGeometry(0.5)
// const material2 = new THREE.MeshBasicMaterial({ color: 0x000ff0 })
// const mesh2 = new THREE.Mesh(geometry2, material2)
// // mesh1.position.x = 0.7
// // mesh1.position.y = 0.6
// // mesh1.position.z = -1
// mesh2.position.set(1,2,-1)
// scene.add(mesh2)
/**
 * Sizes
 */
const sizes = {
    width: 1000,
    height: 1000
}

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(100, sizes.width / sizes.height)
camera.position.set(0, 0, 3)
scene.add(camera)

// camera.lookAt(mesh2.position)
/*axis helper**/
const axesHelper = new THREE.AxesHelper( 4 );
scene.add( axesHelper );

// /** skelton helper */
// const skeletonHelper = new THREE.SkeletonHelper( mesh );
// scene.add( skeletonHelper );

/**arrow helper */
// const dir = new THREE.Vector3( 1, 2, 1 );
// const origin = new THREE.Vector3( 0, 0, 0 );
// const length = 1;
// const hex = 0xffff00;
// const arrowHelper = new THREE.ArrowHelper( dir, origin, length, hex );
// scene.add( arrowHelper );

/////** rotation */
// mesh.rotation.reorder('XYZ');
// mesh.rotation.x = Math.PI * 0.35;
// mesh.rotation.y = Math.PI * 0.25;
// mesh.rotation.z = Math.PI * 0.25;
/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)