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
 * Galaxy
 */
const paramters = {}
paramters.count = 10000
paramters.size = 0.01
paramters.radius = 5
paramters.branches = 3
paramters.spin = 1
paramters.randomness = 0.2
paramters.randomnessPower = 2
paramters.insideColor = '#ff6030'
paramters.outsideColor = '#1b3984'
let geometry = null
let material = null
let points = null

const generateGalaxy = () => {

    if(points !== null){
        geometry.dispose()
        material.dispose()
        scene.remove(points)
    }

  geometry = new THREE.BufferGeometry()
 
 const position = new Float32Array(paramters.count * 3)
 const colors = new Float32Array(paramters.count * 3)

 const colorInside = new THREE.Color(paramters.insideColor)
 const colorOutside = new THREE.Color(paramters.outsideColor)

 for(let i = 0; i < paramters.count; i++){
    const i3 = i * 3

    // Position
    const radius = Math.random() * paramters.radius
    const spinAngle = radius * paramters.spin 
    const bracheAngle = (i % paramters.branches) / paramters.branches * Math.PI * 2

    const randomX = Math.pow(Math.random(), paramters.randomnessPower) * ( Math.random() < 0.5 ? 1 : -1) 
    const randomY = Math.pow(Math.random(), paramters.randomnessPower) * ( Math.random() < 0.5 ? 1 : -1) 
    const randomZ = Math.pow(Math.random(), paramters.randomnessPower) * ( Math.random() < 0.5 ? 1 : -1) 

    position[i3   ] = Math.cos(bracheAngle + spinAngle) * radius + randomX
    position[i3 + 1] = 0 + randomY
    position[i3 + 2 ] = Math.sin(bracheAngle + spinAngle) * radius + randomZ

    //Colors
    const mixedColor = colorInside.clone()
    mixedColor.lerp(colorOutside, radius / paramters.radius)
    colors[i3 + 0] = mixedColor.r
    colors[i3 + 1] = mixedColor.g
    colors[i3 + 2] = mixedColor.b
 }
 geometry.setAttribute('position', new THREE.BufferAttribute(position, 3))
 geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
  material = new THREE.PointsMaterial({
    size: paramters.size,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true,
    vertexColors: true,
 })
     points = new THREE.Points(geometry, material)
    scene.add(points)
}
generateGalaxy()
gui.add(paramters, 'count').min(100).max(100000).step(100).onFinishChange(generateGalaxy)
gui.add(paramters, 'size').min(0.001).max(0.1).step(0.001).onFinishChange(generateGalaxy)
gui.add(paramters, 'radius').min(0.01).max(20).step(0.01).onFinishChange(generateGalaxy)
gui.add(paramters, 'branches').min(2).max(20).step(1).onFinishChange(generateGalaxy)
gui.add(paramters, 'spin').min(- 5).max(5).step(0.001).onFinishChange(generateGalaxy)
gui.add(paramters, 'randomness').min(0).max(2).step(0.001).onFinishChange(generateGalaxy)
gui.add(paramters, 'randomnessPower').min(1).max(10).step(0.001).onFinishChange(generateGalaxy)
gui.addColor(paramters, 'insideColor').onFinishChange(generateGalaxy)
gui.addColor(paramters, 'outsideColor').onFinishChange(generateGalaxy)

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
camera.position.x = 3
camera.position.y = 3
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