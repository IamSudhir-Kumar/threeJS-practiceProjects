import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import { RectAreaLightHelper } from 'three/addons/helpers/RectAreaLightHelper.js'

console.log(RectAreaLightHelper)
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
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5) // it will light up everything in the scene
scene.add(ambientLight)
const addAmbientLightFolder = gui.addFolder('AmbientLight')
addAmbientLightFolder.addColor(ambientLight, 'color').name('ambientLightColor')
addAmbientLightFolder.add(ambientLight, 'intensity').min(0).max(1).step(0.01).name('ambientLightIntensity')
 
const directionalLight = new THREE.DirectionalLight(0x00fffc, 0.3) // it will light up everything in the scene  from a specific direction
directionalLight.position.set(1, 0.25, 0)
scene.add(directionalLight)
const addDirectionalLightFolder = gui.addFolder('DirectionalLight')
addDirectionalLightFolder.add(directionalLight, 'intensity').min(0).max(1).step(0.01).name('directionalLightIntensity')
addDirectionalLightFolder.addColor(directionalLight, 'color').name('directionalLightColor')

const hemisphereLight = new THREE.HemisphereLight("blue", "black", 0.3) // it will light up everything in the scene with a gradient color between the sky and the ground
scene.add(hemisphereLight)
const addHemisphereLightFolder = gui.addFolder('HemisphereLight')
addHemisphereLightFolder.add(hemisphereLight, 'intensity').min(0).max(1).step(0.01).name('hemisphereLightIntensity')
addHemisphereLightFolder.addColor(hemisphereLight, 'groundColor').name('hemisphereLightGroundColor')
// addHemisphereLightFolder.addColor(hemisphereLight, 'skyColor').name('hemisphereLightSkyColor')

const pointLight = new THREE.PointLight("yellow", 0.3) // it will light up everything in the scene from a specific point
pointLight.position.set(1,-0.5,1)
pointLight.distance = 10 // this is the parameter that will make the light fade away form the distance
pointLight.decay = 2 // this is the parameter that will make the light fade away
scene.add(pointLight)
const addPointLightFolder = gui.addFolder('PointLight')
addPointLightFolder.add(pointLight, 'intensity').min(0).max(1).step(0.01).name('pointLightIntensity')
addPointLightFolder.add(pointLight, 'distance').min(0).max(10).step(0.01).name('pointLightDistance')
addPointLightFolder.add(pointLight, 'decay').min(0).max(10).step(0.01).name('pointLightDecay')

const rectAreaLight = new THREE.RectAreaLight("red", 2, 1, 1) // it will light up everything in the scene from a specific rectangle
rectAreaLight.position.set(-1.5, 0, 1.5)
rectAreaLight.lookAt(new THREE.Vector3())
scene.add(rectAreaLight)
const addRectAreaLightFolder = gui.addFolder('RectAreaLight')
addRectAreaLightFolder.add(rectAreaLight, 'intensity').min(0).max(10).step(0.01).name('rectAreaLightIntensity')
addRectAreaLightFolder.add(rectAreaLight, 'width').min(0).max(10).step(0.01).name('rectAreaLightWidth')
addRectAreaLightFolder.add(rectAreaLight, 'height').min(0).max(10).step(0.01).name('rectAreaLightHeight')

const spotlight = new THREE.SpotLight("green", 0.5, 10, Math.PI * 0.1, 0.25, 1) // it will light up everything in the scene from a specific point in a cone shape like a flashlight
spotlight.position.set(0,2,3)
spotlight.target.position.x = -0.75
scene.add(spotlight.target)
scene.add(spotlight)
const addSpotlightFolder = gui.addFolder('Spotlight')
addSpotlightFolder.add(spotlight, 'intensity').min(0).max(10).step(0.01).name('spotlightIntensity')
addSpotlightFolder.add(spotlight, 'distance').min(0).max(10).step(0.01).name('spotlightDistance')
addSpotlightFolder.add(spotlight, 'angle').min(0).max(Math.PI).step(0.01).name('spotlightAngle')
addSpotlightFolder.add(spotlight, 'penumbra').min(0).max(1).step(0.01).name('spotlightPenumbra')
addSpotlightFolder.add(spotlight, 'decay').min(0).max(10).step(0.01).name('spotlightDecay')
addSpotlightFolder.add(spotlight.target.position, 'x').min(-3).max(3).step(0.01).name('spotlightTargetX')

//helpers
const hemisphereLightHelper = new THREE.HemisphereLightHelper(hemisphereLight, 0.3)
scene.add(hemisphereLightHelper)

const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 0.3)
scene.add(directionalLightHelper)

const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.3)
scene.add(pointLightHelper)

const spotlightHelper = new THREE.SpotLightHelper(spotlight)
scene.add(spotlightHelper)

// const helper = new RectAreaLightHelper( light )
// light.add( helper )
// // scene.add(helper)
/**
 * Objects
 */
// Material
const material = new THREE.MeshStandardMaterial()
material.roughness = 0.4

// Objects
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 32, 32),
    material
)
sphere.position.x = - 1.5

const cube = new THREE.Mesh(
    new THREE.BoxGeometry(0.75, 0.75, 0.75),
    material
)

const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 32, 64),
    material
)
torus.position.x = 1.5

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(5, 5),
    material
)
plane.rotation.x = - Math.PI * 0.5
plane.position.y = - 0.65

scene.add(sphere, cube, torus, plane)

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

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = 0.1 * elapsedTime
    cube.rotation.y = 0.1 * elapsedTime
    torus.rotation.y = 0.1 * elapsedTime

    sphere.rotation.x = 0.15 * elapsedTime
    cube.rotation.x = 0.15 * elapsedTime
    torus.rotation.x = 0.15 * elapsedTime

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()