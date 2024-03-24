import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as lil from 'lil-gui'


// Debug
const gui = new lil.GUI()

// Textures
const textureLoader = new THREE.TextureLoader()
const cubeTextureLoader = new THREE.CubeTextureLoader()

const doorColorTexture = textureLoader.load('/textures/door/color.jpg')
const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const doorAmbientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const doorHeightTexture = textureLoader.load('/textures/door/height.jpg')
const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg')
const doorRoughnessTexture = textureLoader.load('/textures/door/roughness.jpg')
const matcapTexture = textureLoader.load('/textures/matcaps/3.png')
const gradientTexture = textureLoader.load('/textures/gradients/5.jpg')
gradientTexture.minFilter = THREE.NearestFilter
gradientTexture.magFilter = THREE.NearestFilter
gradientTexture.generateMipmaps = false
/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')


// Scene
const scene = new THREE.Scene()
//Objects
// const material = new THREE.MeshBasicMaterial()
// // material.map = doorColorTexture //materail.map is the color of the object
// // material.color = new THREE.Color("white") // It can be used to change the color of the object 
// //material.wireframe = true // It can be used to make the object wireframe
// material.transparent = true // It can be used to make the object transparent
// // material.opacity = 0.5 // It can be used to change the opacity of the object
// material.alphaMap = doorAlphaTexture // It can be used to change the alpha of the object
// //we can combine the color and the map together to get the color of the object with the texture
// material.side = THREE.DoubleSide // It can be used to make the object double sided


// const material = new THREE.MeshNormalMaterial()
// material.flatShading = true // It can be used to make the object flatshading through this you can see the faces of the object 

// const material = new THREE.MeshMatcapMaterial()
// material.matcap = matcapTexture // It can be used to change the matcap of the object

// const material = new THREE.MeshDepthMaterial()
//const material = new THREE.MeshLambertMaterial() // It can be used to make the object lambert material

// const material = new THREE.MeshPhongMaterial()
// material.shininess = 100 // It can be used to change the shininess of the object
// material.specular = new THREE.Color("red") // It can be used to change the color of the specular

// const material = new THREE.MeshToonMaterial()
// material.gradientMap = gradientTexture // It can be used to change the gradient of the object
// const material = new THREE.MeshStandardMaterial()
//  material.metalness = 0.45 // It can be used to change the metalness of the object
//  material.roughness = 0.65 // It can be used to change the roughness of the object
// material.map = doorColorTexture // It can be used to change the color of the object
// material.aoMap = doorAmbientOcclusionTexture // It can be used to change the ambient occlusion of the object
// material.aoMapIntensity = 1 // It can be used to change the intensity of the ambient occlusion
// material.displacementMap = doorHeightTexture // It can be used to change the height of the object
// material.displacementScale = 0.05 // It can be used to change the scale of the displacement
// material.metalnessMap = doorMetalnessTexture // It can be used to change the metalness of the object
// material.roughnessMap = doorRoughnessTexture // It can be used to change the roughness of the object
// material.normalMap = doorNormalTexture // It increses the detail of the object
// material.normalScale.set(0.5, 0.5) // It can be used to change the scale of the normal map
// material.alphaMap = doorAlphaTexture // It can be used to change the alpha of the object
// material.transparent = true // It can be used to make the object transparent

const material = new THREE.MeshStandardMaterial()
 material.metalness = 0.45 // It can be used to change the metalness of the object
 material.roughness = 0.65 // It can be used to change the roughness of the object

material.envMap = cubeTextureLoader.load([
    '/textures/environmentMaps/2/px.jpg',
    '/textures/environmentMaps/2/nx.jpg',
    '/textures/environmentMaps/2/py.jpg',
    '/textures/environmentMaps/2/ny.jpg',
    '/textures/environmentMaps/2/pz.jpg',
    '/textures/environmentMaps/2/nz.jpg',
])

gui.add(material, 'metalness').min(0).max(1).step(0.0001)
gui.add(material, 'roughness').min(0).max(1).step(0.0001)
gui.add(material, 'aoMapIntensity').min(0).max(10).step(0.0001)
gui.add(material, 'wireframe')
gui.add(material, 'displacementScale').min(0).max(1).step(0.0001)


const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 64, 64),
    material
)
sphere.position.x = -1.5
sphere.geometry.setAttribute('uv2', new THREE.BufferAttribute(sphere.geometry.attributes.uv.array, 2))
const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1, 100, 100),
    material
)
plane.geometry.setAttribute('uv2', new THREE.BufferAttribute(plane.geometry.attributes.uv.array, 2))
const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 64, 128),
    material
)
torus.geometry.setAttribute('uv2', new THREE.BufferAttribute(torus.geometry.attributes.uv.array, 2))
torus.position.x = 1.5
scene.add(sphere , plane, torus) 

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight)
const pointLight = new THREE.PointLight(0xffffff, 0.5)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)

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
    plane.rotation.y = 0.1 * elapsedTime
    torus.rotation.y = 0.1 * elapsedTime
    sphere.rotation.x = 0.15 * elapsedTime
    plane.rotation.x = 0.15 * elapsedTime
    torus.rotation.x = 0.15 * elapsedTime

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()