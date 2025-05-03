import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'


/**
 * Base
 */
// Debug
const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight()
ambientLight.color = new THREE.Color('white')
ambientLight.intensity = 1
gui.add(ambientLight, 'intensity').min(0).max(3).step(0.001)
// scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight('green', 0.9);
directionalLight.position.set(1, 0.25, 0);

// scene.add(directionalLight);

const lightFolder = gui.addFolder('Directional Light Position');

lightFolder.add(directionalLight.position, 'x', 0, 5).step(0.001);
lightFolder.add(directionalLight.position, 'y', 0, 5).step(0.001);
lightFolder.add(directionalLight.position, 'z', 0, 5).step(0.001);


const hemisphereLight = new THREE.HemisphereLight(0xff0000, 0x0000ff, 0.9)
// scene.add(hemisphereLight)

const pointLight = new THREE.PointLight(0xff9000, 1.5)
pointLight.distance = 8
pointLight.position.set(1, -0.5, 1)
// scene.add(pointLight)

const reactAreaLight = new THREE.RectAreaLight(0x4e00ff, 3, 3, 3)
reactAreaLight.position.set(0, 0, 1)
reactAreaLight.lookAt(new THREE.Vector3(0, 0, 0))//Indirizzare la luce al centro della scena
scene.add(reactAreaLight)

const spotLight = new THREE.SpotLight(0x78ff00, 4.5, 10, Math.PI * 0.09, 0.25, 1)
spotLight.position.set(0, 2, 3)
scene.add(spotLight)
scene.add(spotLight.target)
spotLight.target.position.x = 2

// Helpers
const hemispherelighteHelper = new THREE.HemisphereLightHelper(hemisphereLight, 0.3)
scene.add(hemispherelighteHelper)
const directionallighthelper = new THREE.DirectionalLightHelper(directionalLight, 0.2)
scene.add(directionallighthelper)

const pointlightlighthelper = new THREE.PointLightHelper(pointLight, 0.2)
scene.add(pointlightlighthelper)
const spotlightHelper = new THREE.SpotLightHelper(spotLight, 0.2)
scene.add(spotlightHelper)


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

    spotLight.intensity = 0.5 * elapsedTime

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()