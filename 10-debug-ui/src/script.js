import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as lil from 'lil-gui'
import gsap from 'gsap'

/**
 * Base
 */
///Debug
const gui = new lil.GUI()
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()
const parameters = {
    spin: () => {
        gsap.to(mesh.rotation, { duration: 1, y: mesh.rotation.y + Math.PI * 2 })
    },
    jump: () => {   
        gsap.to(mesh.position, { duration: 1, y: mesh.position.y + 1, yoyo: true, repeat: 1 })
    },
    changeShape: () => {
        const geometry = new THREE.TorusGeometry(0.7, 0.2, 16, 100);
        mesh.geometry.dispose();
        mesh.geometry = geometry;
    },
    changeToCube: () => {
        const geometry = new THREE.BoxGeometry(1, 1, 1)
        mesh.geometry.dispose()
        mesh.geometry = geometry
    },
}
/**
 * Object
 */
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)
// Debug
const positionControls = gui.addFolder('Position');
positionControls.add(mesh.position, 'x').min(-3).max(3).step(0.01).name('x');
positionControls.add(mesh.position, 'y').min(-3).max(3).step(0.01).name('y');
positionControls.add(mesh.position, 'z').min(-3).max(3).step(0.01).name('z');

const visibilityControls = gui.addFolder('Visibility');
visibilityControls.add(mesh, 'visible');

const materialControls = gui.addFolder('Material');
materialControls.add(material, 'wireframe');
materialControls.add(material, 'transparent');
materialControls.add(material, 'fog').name('fog');
materialControls.add(material, 'depthTest').name('depth test');
materialControls.add(material, 'depthWrite').name('depth write');
materialControls.add(material, 'alphaTest').min(0).max(1).step(0.01);
materialControls.add(material, 'visible');
materialControls.add(material, 'side', ['front', 'back', 'double']).name('side');
materialControls.add(material, 'blending', {
    'No': THREE.NoBlending,
    'Normal': THREE.NormalBlending,
    'Additive': THREE.AdditiveBlending,
    'Subtractive': THREE.SubtractiveBlending,
    'Multiply': THREE.MultiplyBlending,
    'Custom': THREE.CustomBlending
}).name('blending');

const appearanceControls = gui.addFolder('Appearance');
appearanceControls.addColor(material, 'color').onChange(() => {
    material.color.set(material.color);
});
appearanceControls.add(material, 'opacity').min(0).max(1).step(0.01);
appearanceControls.add(material, 'wireframeLinewidth').min(0).max(10).step(1);
appearanceControls.add(material, 'wireframeLinecap', ['butt', 'round', 'square']);
appearanceControls.add(material, 'wireframeLinejoin', ['round', 'bevel', 'miter']);
appearanceControls.add(material, 'vertexColors').name('vertex colors');

const actionControls = gui.addFolder('Actions');
actionControls.add(parameters, 'spin');
actionControls.add(parameters, 'jump');
actionControls.add(parameters, 'changeShape');
actionControls.add(parameters, 'changeToCube');

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
camera.position.z = 3
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

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()