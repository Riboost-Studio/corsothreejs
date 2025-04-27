import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import {RGBELoader} from 'three/examples/jsm/loaders/RGBELoader.js'

/**
 * DEBUG
 */

const gui = new GUI()

/**
 * Textures
 */
const TextureLoader = new THREE.TextureLoader()
const alphaDoor = TextureLoader.load('./textures/door/alpha.jpg')
const ambientOcclusion = TextureLoader.load('./textures/door/ambientOcclusion.jpg')
const color = TextureLoader.load('./textures/door/color.jpg')
const height = TextureLoader.load('./textures/door/height.jpg')
const metalness = TextureLoader.load('./textures/door/metalness.jpg')
const normal = TextureLoader.load('./textures/door/normal.jpg')
const roughness = TextureLoader.load('./textures/door/roughness.jpg')
const gradient = TextureLoader.load('./textures/gradients/5.jpg')
const matcaps = TextureLoader.load('./textures/matcaps/1.png')

color.colorSpace = THREE.SRGBColorSpace
matcaps.colorSpace = THREE.SRGBColorSpace
/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

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
 * Objects
 */

/**
 * MeshBasicMaterial
 */
// const material = new THREE.MeshBasicMaterial()
// // material.map = color
// // material.color = new THREE.Color('green')
// // material.wireframe = true
// material.transparent = true
// // material.opacity = 0.5
// // material.alphaMap = alphaDoor
// material.side = THREE.DoubleSide

/**
 * MeshNormalMaterial
 */
// const material = new THREE.MeshNormalMaterial()
// material.flatShading = true

/**
 * MeshMatcapMaterial
 */
// const material = new THREE.MeshMatcapMaterial()
// material.matcap = matcaps

/**
 * MeshDepthMaterial
 */
// const material = new THREE.MeshDepthMaterial()

/**
 * MeshLambertMaterial
 */
// const material = new THREE.MeshLambertMaterial()

/**
 * MeshPhongMaterial
 */
// const material = new THREE.MeshPhongMaterial()
// material.shininess = 100
// material.specular = new THREE.Color(0x1188ff)


//MeshToonMaterial

// const material = new THREE.MeshToonMaterial()
// gradient.minFilter = THREE.NearestFilter
// gradient.magFilter = THREE.NearestFilter
// material.gradientMap = gradient


 // MeshStandardMaterial
// const material = new THREE.MeshStandardMaterial()
// material.metalness = 1
// material.roughness = 1
// material.map = color
// material.aoMap = ambientOcclusion
// material.aoMapIntensity = 1
// material.displacementMap = height
// material.displacementScale = 0.2
// material.metalnessMap = metalness 
// material.roughnessMap = roughness 
// material.normalMap = normal
// material.normalScale.set( 0.5, 0.5)
// material.transparent = true
// material.alphaMap = alphaDoor

// gui.add(material, 'metalness').min(0).max(1).step(0.0001)
// gui.add(material, 'roughness').min(0).max(1).step(0.0001)

 // MeshPhysicalMaterial
 const material = new THREE.MeshPhysicalMaterial()
 material.metalness = 0
 material.roughness = 0
//  material.map = color
//  material.aoMap = ambientOcclusion
//  material.aoMapIntensity = 1
//  material.displacementMap = height
//  material.displacementScale = 0.2
//  material.metalnessMap = metalness 
//  material.roughnessMap = roughness 
//  material.normalMap = normal
//  material.normalScale.set( 0.5, 0.5)
 material.transparent = true
 material.alphaMap = alphaDoor
 
 gui.add(material, 'metalness').min(0).max(1).step(0.0001)
 gui.add(material, 'roughness').min(0).max(1).step(0.0001)

//Clearcoat
// material.clearcoat = 1
// material.clearcoatRoughness = 0
// gui.add(material, 'clearcoat').min(0).max(1).step(0.0001)
// gui.add(material, 'clearcoatRoughness').min(0).max(1).step(0.0001)

// Sheen
// material.sheen = 1
// material.sheenRoughness = 0.25
// material.sheenColor.set(1,1,1)
// gui.add(material, 'sheen').min(0).max(1).step(0.0001)
// gui.add(material, 'sheenRoughness').min(0).max(1).step(0.0001)
// gui.addColor(material, 'sheenColor')


// Iridiscensce
// material.iridescence = 1
// material.iridescenceIOR = 1
// material.iridescenceThicknessRange = [100, 100]
// gui.add(material, 'iridescenceIOR').min(0).max(1).step(0.0001)
// gui.add(material, 'iridescence').min(1).max(2.333).step(0.0001)
// gui.add(material.iridescenceThicknessRange, '0').min(1).max(10000).step(1)
// gui.add(material.iridescenceThicknessRange, '1').min(1).max(10000).step(1)

// Trasmission
material.transmission = 1
material.ior = 1.333
material.thickness = 1
gui.add(material, 'transmission').min(0).max(1).step(0.0001)
gui.add(material, 'ior').min(1).max(10).step(0.0001)
gui.add(material, 'thickness').min(0).max(1).step(0.0001)

const sphere = new THREE.SphereGeometry(0.5, 64, 64)
const torus = new THREE.TorusGeometry(0.3, 0.2, 64, 64)
const plane = new THREE.PlaneGeometry(1, 1, 100, 100)


const meshSphere = new THREE.Mesh(sphere, material)
const meshTorus = new THREE.Mesh(torus, material)
const meshPlane = new THREE.Mesh(plane, material)
scene.add(meshSphere, meshTorus, meshPlane)
meshSphere.position.x = -1.5
meshTorus.position.x = 1.5


/**
 * Lights
 */

// const ambient = new THREE.AmbientLight(0xffff, 1)
// scene.add(ambient)

// const pointLight = new THREE.PointLight(0xffff, 30)
// pointLight.position.x = 2
// pointLight.position.y = 3
// pointLight.position.z = 4
// scene.add(pointLight)

/**
 * EnviromentMap
 */
const rgbLoader = new RGBELoader()
rgbLoader.load('./textures/environmentMap/2k.hdr', (environmentMap) => {
    environmentMap.mapping = THREE.EquirectangularReflectionMapping
    scene.background = environmentMap
    scene.environment = environmentMap
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
      // objects rotation
    meshSphere.rotation.x = 0.1 * elapsedTime
    meshTorus.rotation.x= 0.1 * elapsedTime
    meshPlane.rotation.x= 0.1 * elapsedTime

    meshSphere.rotation.y = -0.15 * elapsedTime
    meshTorus.rotation.y = -0.15 * elapsedTime
    meshPlane.rotation.y = -0.15 * elapsedTime
    
    // Update controls
    controls.update()

   

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()