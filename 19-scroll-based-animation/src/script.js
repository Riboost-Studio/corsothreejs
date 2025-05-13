import * as THREE from 'three'
import GUI from 'lil-gui'
import gsap from 'gsap'
/**
 * Debug
 */
const gui = new GUI()


/**
 * Loader
 */
const textureLoader = new THREE.TextureLoader()
const texture = textureLoader.load('textures/gradients/3.jpg')
texture.magFilter = THREE.NearestFilter

const parameters = {
    materialColor: '#ffeded',
    lightColor: 'white',
}

gui.addColor(parameters, 'materialColor')
    .onChange( () => 
        {
            material.color.set(parameters.materialColor)
            materialPoint.color.set(parameters.materialColor)
        })
gui.addColor(parameters, 'lightColor')
.onChange( () => 
    {
        directionalLight.color.set(parameters.lightColor)
    })

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Objects
 */
//Material 
const material = new THREE.MeshToonMaterial({
    color: parameters.materialColor,
    gradientMap: texture
})

// Mesh
const objectsDistance = 4
const mesh1 = new THREE.Mesh(
    new THREE.TorusGeometry(1, 0.4, 16, 60),
    material
)
const mesh2 = new THREE.Mesh(
    new THREE.ConeGeometry(1, 2, 32),
    material
)

const mesh3 = new THREE.Mesh(
    new THREE.TorusKnotGeometry(0.8, 0.35, 100, 16),
    material
)
mesh1.position.y = - objectsDistance * 0
mesh1.position.x =  2
mesh2.position.y = - objectsDistance * 1
mesh2.position.x = - 2
mesh3.position.y = - objectsDistance * 2
mesh3.position.x =  2

scene.add( mesh1, mesh2, mesh3)

const sectionMeshes = [mesh1, mesh2, mesh3]

/** 
 * Particles
 */

const particlesCount = 200;
const positionPoints = new Float32Array(particlesCount * 3);

for (let i = 0; i < particlesCount; i++) {
    const i3 = i * 3;
    positionPoints[i3 + 0] = (Math.random() - 0.5) * 10;
    positionPoints[i3 + 1] = objectsDistance * 0.4 - Math.random() * objectsDistance *  sectionMeshes.length
    positionPoints[i3 + 2] = (Math.random() - 0.5) * 10;
}

const geometry = new THREE.BufferGeometry();
geometry.setAttribute('position', new THREE.BufferAttribute(positionPoints, 3));

const materialPoint = new THREE.PointsMaterial({ 
    color: 'red',
    size: 0.1,
    sizeAttenuation: true
 });
const points = new THREE.Points(geometry, materialPoint);
scene.add(points);


/**
 * Lights
 */
const directionalLight = new THREE.DirectionalLight()
directionalLight.color = new THREE.Color(parameters.lightColor)
directionalLight.intensity = 4
directionalLight.position.set(1, 1, 0)
scene.add(directionalLight)

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
const groupCamera = new THREE.Group()
const camera = new THREE.PerspectiveCamera(35, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 6
scene.add(groupCamera)
groupCamera.add(camera)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})

renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


/**
 * Scroll
 */
let scrollY = window.scrollY
let currentSection = 0
window.addEventListener('scroll', () =>{
    scrollY = window.scrollY

    const newSection = Math.round(scrollY /sizes.height)

    if(newSection != currentSection){
        currentSection = newSection
        gsap.to(
            sectionMeshes[currentSection].rotation,
            {
                duration: 1.5,
                ease: 'power2.inOut',
                x: '+=6',
                y: '+=3',
                z: '+=1.5',
            }
        )
    }
})

/**
 * Cursor
 */

const cursor = {}
cursor.x = 0
cursor.y = 0

window.addEventListener('mousemove', (event) =>{
    cursor.x = event.clientX / sizes.width - 0.5
    cursor.y = event.clientY / sizes.height - 0.5
})

/**
 * Animate
 */
const clock = new THREE.Clock()
let previousTime = 0

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime
     


    // Update camera
    camera.position.y = - scrollY / sizes.height * objectsDistance

    const parallaxX = cursor.x * 0.5
    const parallaxY = cursor.y * 0.5
    groupCamera.position.x += (parallaxX - groupCamera.position.x) * 5 * deltaTime
    groupCamera.position.y += (parallaxY - groupCamera.position.y) * 5 * deltaTime

    //udate Objects
    for(const mesh of sectionMeshes){
        mesh.rotation.y += deltaTime * 0.12
        mesh.rotation.x += deltaTime * 0.2
    }
  

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()