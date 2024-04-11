import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001)
scene.add(ambientLight)

// Directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
directionalLight.position.set(2, 2, - 1)
directionalLight.shadow.mapSize.width = 1024
directionalLight.shadow.mapSize.height = 1024
gui.add(directionalLight.shadow, 'bias').min(- 0.01).max(0.01).step(0.0001)
gui.add(directionalLight.shadow, 'radius').min(1).max(4).step(0.001)
gui.add(directionalLight.shadow.camera, 'near').min(0.1).max(3).step(0.001)
gui.add(directionalLight.shadow.camera, 'far').min(1).max(10).step(0.001)
gui.add(directionalLight.shadow.camera, 'zoom').min(0.1).max(2).step(0.001)
gui.add(directionalLight.shadow.camera, 'left').min(- 2).max(2).step(0.001)
gui.add(directionalLight.shadow.camera, 'right').min(- 2).max(2).step(0.001)
gui.add(directionalLight.shadow.camera, 'top').min(- 2).max(2).step(0.001)
gui.add(directionalLight.shadow.camera, 'bottom').min(- 2).max(2).step(0.001)

//
directionalLight.shadow.camera.top = 2
directionalLight.shadow.camera.right = 2
directionalLight.shadow.camera.bottom = - 2
directionalLight.shadow.camera.left = - 2
//
directionalLight.shadow.camera.far = 6
directionalLight.shadow.camera.near = 1
gui.add(directionalLight, 'intensity').min(0).max(1).step(0.001)
gui.add(directionalLight.position, 'x').min(- 5).max(5).step(0.001)
gui.add(directionalLight.position, 'y').min(- 5).max(5).step(0.001)
gui.add(directionalLight.position, 'z').min(- 5).max(5).step(0.001)
scene.add(directionalLight)

directionalLight.castShadow = true


/**
 * 
 *  Shadow camera helper
 */
const directionalLightCameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera)
directionalLightCameraHelper.visible = false
scene.add(directionalLightCameraHelper)
/**
 * Materials
 */
const material = new THREE.MeshStandardMaterial()
material.roughness = 0.7
gui.add(material, 'metalness').min(0).max(1).step(0.001)
gui.add(material, 'roughness').min(0).max(1).step(0.001)

/**
 * Objects
 */
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 32, 32),
    material
)
sphere.castShadow = true

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(5, 5),
    material
)
plane.rotation.x = - Math.PI * 0.5
plane.position.y = - 0.5
plane.receiveShadow = true
scene.add(sphere, plane)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    // renderer = new THREE.WebGLRenderer({
    //     preserveDrawingBuffer: true
    // });
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// var str = 'image/png,';
// ImgData = renderer.domElement.toDataURL('image/png');
// console.log(str);
/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.shadowMap.enabled = true
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()