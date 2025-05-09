import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { Timer } from 'three/addons/misc/Timer.js'
import { Sky } from 'three/addons/objects/Sky.js'
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

//Axeshelper
const axesHelper = new THREE.AxesHelper(6)
scene.add(axesHelper)


/**
 * Textures
 */

const textureLoader = new THREE.TextureLoader()

//Floor
const floorAlphaTexture = textureLoader.load('./floor/alpha.webp')
const floorColorTexture = textureLoader.load('./floor/rocky_terrain_03/rocky_terrain_03_diff_1k.webp')
const floorARMTexture = textureLoader.load('./floor/rocky_terrain_03/rocky_terrain_03_arm_1k.webp')
const floorDisplacementTexture = textureLoader.load('./floor/rocky_terrain_03/rocky_terrain_03_disp_1k.webp')
const floorNormalTexture = textureLoader.load('./floor/rocky_terrain_03/rocky_terrain_03_nor_gl_1k.webp')

floorColorTexture.colorSpace = THREE.SRGBColorSpace

floorColorTexture.repeat.set(8, 8)
floorColorTexture.wrapS = THREE.RepeatWrapping
floorColorTexture.wrapT = THREE.RepeatWrapping
 

floorARMTexture.repeat.set(8, 8)
floorARMTexture.wrapS = THREE.RepeatWrapping
floorARMTexture.wrapT = THREE.RepeatWrapping


floorDisplacementTexture.repeat.set(8, 8)
floorDisplacementTexture.wrapS = THREE.RepeatWrapping
floorDisplacementTexture.wrapT = THREE.RepeatWrapping


floorNormalTexture.repeat.set(8, 8)
floorNormalTexture.wrapS = THREE.RepeatWrapping
floorNormalTexture.wrapT = THREE.RepeatWrapping

//Walls
const wallsColorTexture = textureLoader.load('./walls/medieval_red_brick_diff_1k.webp')
const wallsARMTexture = textureLoader.load('./walls/medieval_red_brick_arm_1k.webp')
const wallsNormalTexture = textureLoader.load('./walls/medieval_red_brick_nor_gl_1k.webp')
wallsColorTexture.colorSpace = THREE.SRGBColorSpace

//Roof
const roofColorTexture = textureLoader.load('./roof/roof_slates_02_diff_1k.webp')
const roofARMTexture = textureLoader.load('./roof/roof_slates_02_arm_1k.webp')
const roofNormalTexture = textureLoader.load('./roof/roof_slates_02_nor_gl_1k.webp')
roofColorTexture.colorSpace = THREE.SRGBColorSpace
roofNormalTexture.repeat.set(3, 1)
roofARMTexture.repeat.set(3, 1)
roofColorTexture.repeat.set(3, 1)

roofColorTexture.wrapS = THREE.RepeatWrapping
roofARMTexture.wrapS = THREE.RepeatWrapping
roofNormalTexture.wrapS = THREE.RepeatWrapping


//bush
const bushColorTexture = textureLoader.load('./bush/leaves_forest_ground_diff_1k.webp')
const bushARMTexture = textureLoader.load('./bush/leaves_forest_ground_arm_1k.webp')
const bushNormalTexture = textureLoader.load('./bush/leaves_forest_ground_nor_gl_1k.webp')
bushColorTexture.colorSpace = THREE.SRGBColorSpace

bushNormalTexture.repeat.set(2, 1)
bushARMTexture.repeat.set(2, 1)
bushColorTexture.repeat.set(2, 1)

bushColorTexture.wrapS = THREE.RepeatWrapping
bushARMTexture.wrapS = THREE.RepeatWrapping
bushNormalTexture.wrapS = THREE.RepeatWrapping

//Grave
const graveColorTexture = textureLoader.load('./grave/plastered_stone_wall_diff_1k.webp')
const graveARMTexture = textureLoader.load('./grave/plastered_stone_wall_arm_1k.webp')
const graveNormalTexture = textureLoader.load('./grave/plastered_stone_wall_nor_gl_1k.webp')
graveColorTexture.colorSpace = THREE.SRGBColorSpace

graveNormalTexture.repeat.set(0.3, 0.4)
graveARMTexture.repeat.set(0.3, 0.4)
graveColorTexture.repeat.set(0.3, 0.4)



//Door
const doorAlphaTexture = textureLoader.load('./door/alpha.webp')
const doorColorTexture = textureLoader.load('./door/color.webp')
const doorAOTexture = textureLoader.load('./door/ambientOcclusion.webp')
const doorDisplacementTexture = textureLoader.load('./door/height.webp')
const doorNormalTexture = textureLoader.load('./door/normal.webp')
const doorMetalnessTexture = textureLoader.load('./door/metalness.webp')
const doorRoughnessTexture = textureLoader.load('./door/roughness.webp')
doorColorTexture.colorSpace = THREE.SRGBColorSpace
/**
 * House
 */


const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20, 25, 25),
    new THREE.MeshStandardMaterial({
        transparent: true,
        alphaMap: floorAlphaTexture,
        map: floorColorTexture,
        aoMap: floorARMTexture,
        metalnessMap: floorARMTexture,
        roughnessMap: floorARMTexture,
        normalMap: floorNormalTexture,
        displacementMap: floorDisplacementTexture,
        displacementScale: 0.3,
        displacementBias: -0.1,
    })
)
 floor.rotation.x = - Math.PI * 0.5
 gui.add(floor.material, 'displacementScale').min(0).max(1).step(0.001).name('Floor displacemetScale')
 gui.add(floor.material, 'displacementBias').min(-1).max(1).step(0.001).name('Floor displacemetScale')
scene.add(floor)


//Group house
const house = new THREE.Group()
scene.add(house)

//Walls
const walls = new THREE.Mesh(
    new THREE.BoxGeometry(4, 2.5, 4),
    new THREE.MeshStandardMaterial({
        map: wallsColorTexture,
        aoMap: wallsARMTexture,
        metalnessMap: wallsARMTexture,
        roughnessMap: wallsARMTexture,
        normalMap: wallsNormalTexture
    })
)
walls.position.y += 1.25
house.add(walls)

//Roof
const roof = new THREE.Mesh(
    new THREE.ConeGeometry(3.5, 1.5, 4),
    new THREE.MeshStandardMaterial({
        map: roofColorTexture,
        aoMap: roofARMTexture,
        metalnessMap: roofARMTexture,
        roughnessMap: roofARMTexture,
        normalMap: roofNormalTexture
    })
)
roof.position.y += 2.5 + 0.75 
roof.rotation.y =  Math.PI * 0.25
house.add(roof)

//Door
const door = new THREE.Mesh(
    new THREE.PlaneGeometry(2.2, 2.2, 20, 20),
    new THREE.MeshStandardMaterial(
        {
            transparent: true,
            alphaMap: doorAlphaTexture,
            map: doorColorTexture,
        aoMap: doorAOTexture,
        displacementMap: doorDisplacementTexture,
        displacementScale: 0.15,
        displacementBias: -0.04,
        metalnessMap: doorMetalnessTexture,
        roughnessMap: doorRoughnessTexture,
        normalMap: doorNormalTexture
        }
    )
)
door.position.y += 1
door.position.z +=  2 + 0.001
house.add(door)

//Bushes
const bushGeometry = new THREE.SphereGeometry(1, 16, 10)
const bushMaterial = new THREE.MeshStandardMaterial({
    color: '#ccffcc', 
    map: bushColorTexture,
    aoMap: bushARMTexture,
    metalnessMap: bushARMTexture,
    roughnessMap: bushARMTexture,
    normalMap: bushNormalTexture})

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial)
bush1.scale.set(0.5, 0.5, 0.5)
bush1.position.set(0.8, 0.2, 2.2)
bush1.rotation.x = -0.7

const bush2 = new THREE.Mesh(bushGeometry, bushMaterial)
bush2.scale.set(0.25, 0.25, 0.25)
bush2.position.set(1.4, 0.1, 2.1)
bush2.rotation.x = -0.7

const bush3 = new THREE.Mesh(bushGeometry, bushMaterial)
bush3.scale.set(0.4, 0.4, 0.4)
bush3.position.set(-0.8, 0.1, 2.1)
bush3.rotation.x = -0.7

const bush4 = new THREE.Mesh(bushGeometry, bushMaterial)
bush4.scale.set(0.15, 0.15, 0.15)
bush4.position.set(-1, 0.05, 2.6)
bush4.rotation.x = -0.7

house.add(bush1, bush2, bush3, bush4)

// Group Lapidi
const graves = new THREE.Group()
scene.add(graves)
//Lapidi
const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2)
const graveMaterial = new THREE.MeshStandardMaterial({
    map: graveColorTexture,
    aoMap: graveARMTexture,
    metalnessMap: graveARMTexture,
    roughnessMap: graveARMTexture,
    normalMap: graveNormalTexture}
)
for(let i = 0; i < 30; i++){

    const angle = Math.random() * Math.PI * 2
    const radius = 3 + Math.random() * 4
    const x = Math.sin(angle) * radius
    const z = Math.cos(angle) * radius

    const grave = new THREE.Mesh(graveGeometry, graveMaterial)

    grave.position.x = x
    grave.position.y = Math.random() * 0.4
    grave.position.z = z
    grave.rotation.x = (Math.random() - 0.5) * 0.4
    grave.rotation.y = (Math.random() - 0.5) * 0.4
    grave.rotation.z = (Math.random() - 0.5 )* 0.4
    graves.add(grave)
}


/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#86cdff', 0.275)
scene.add(ambientLight)

// Directional light
const directionalLight = new THREE.DirectionalLight('#86cdff', 1)
directionalLight.position.set(3, 2, -8)
scene.add(directionalLight)

//Door Light
const doorLight = new THREE.PointLight('#ff7d46', 5)

doorLight.position.set(0, 2.2, 2.5)
house.add(doorLight)


/**
 * Ghost
 */

const ghost1 = new THREE.PointLight('#8800ff', 6)
const ghost2 = new THREE.PointLight('#ff0088', 6)
const ghost3 = new THREE.PointLight('#ff0000', 6)
scene.add( ghost1, ghost2, ghost3)


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
camera.position.x = 4
camera.position.y = 2
camera.position.z = 5

scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.minDistance = 4;
controls.maxDistance = 30;
controls.maxPolarAngle = Math.PI / 2.1;

// Audio
const listener = new THREE.AudioListener();
camera.add( listener );

// create a global audio source
const sound = new THREE.Audio( listener );

// load a sound and set it as the Audio object's buffer
const audioLoader = new THREE.AudioLoader();
audioLoader.load( 'sounds/sound.mp3', function( buffer ) {
	sound.setBuffer( buffer );
	sound.setLoop( true );
	sound.setVolume( 1 );
	sound.play();
});

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Shadows
 */
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap

//Cast and receive
directionalLight.castShadow = true
ghost1.castShadow = true
ghost2.castShadow = true
ghost3.castShadow = true

walls.castShadow = true
walls.receiveShadow = true
roof.castShadow = true
floor.receiveShadow = true

for(const grave of graves.children){
    grave.castShadow = true
    grave.receiveShadow = true
}

//Mapping
directionalLight.shadow.mapSize.width = 256
directionalLight.shadow.mapSize.height = 256
directionalLight.shadow.camera.top = 8
directionalLight.shadow.camera.right = 8
directionalLight.shadow.camera.bottom = - 8
directionalLight.shadow.camera.left = - 8
directionalLight.shadow.camera.far = 1
directionalLight.shadow.camera.near = 20

ghost1.shadow.mapSize.width = 256
ghost1.shadow.mapSize.height = 256
ghost1.shadow.camera.far = 10

ghost2.shadow.mapSize.width = 256
ghost2.shadow.mapSize.height = 256
ghost2.shadow.camera.far = 10

ghost3.shadow.mapSize.width = 256
ghost3.shadow.mapSize.height = 256
ghost3.shadow.camera.far = 10

/**
 * Sky
 */
const sky = new Sky()
sky.scale.set( 100, 100, 100)
sky.material.uniforms['turbidity'].value = 10
sky.material.uniforms['rayleigh'].value = 3
sky.material.uniforms['mieCoefficient'].value = 0.1
sky.material.uniforms['mieDirectionalG'].value = 0.95
sky.material.uniforms['sunPosition'].value.set(0.3, -0.038, -0.95)
scene.add(sky)

/**
 * Fog
 */
scene.fog = new THREE.FogExp2('#04343f', 0.15)
/**
 * Animate
 */
const timer = new Timer()

const tick = () =>
{
    // Timer
    timer.update()
    const elapsedTime = timer.getElapsed()

//Ghost 
const ghost1Angle = elapsedTime * 0.5
ghost1.position.x = Math.cos(ghost1Angle)  * 4
ghost1.position.z = Math.sin(ghost1Angle) * 4
ghost1.position.y = Math.sin(ghost1Angle) * Math.sin(ghost1Angle * 2.34) * Math.sin(ghost1Angle * 3.45)

const ghost2Angle = - elapsedTime *  0.38
ghost2.position.x = Math.cos(ghost2Angle)  * 5
ghost2.position.z = Math.sin(ghost2Angle) * 5
ghost2.position.y = Math.sin(ghost2Angle) * Math.sin(ghost2Angle * 2.34) * Math.sin(ghost2Angle * 3.45)

const ghost3Angle =  elapsedTime *  0.23
ghost3.position.x = Math.cos(ghost3Angle)  * 6
ghost3.position.z = Math.sin(ghost3Angle) * 6
ghost3.position.y = Math.sin(ghost3Angle) * Math.sin(ghost3Angle * 2.34) * Math.sin(ghost3Angle * 3.45)

//DoorLight
const doorLightAngle = elapsedTime * 250
doorLight.intensity = Math.cos(doorLightAngle) * 2


    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
// Supponiamo che la tua camera sia "camera"
// floor è una Mesh con PlaneGeometry

function updateSoundVolume() {
    // Calcola la distanza tra la camera e il centro del piano (floor)
    const floorPosition = new THREE.Vector3();
    floor.getWorldPosition(floorPosition);

    const distance = camera.position.distanceTo(floorPosition);


    const minDistance = 2;  
    const maxDistance = 20; // distanza massima: volume minimo (o 0)

    // Calcola un valore normalizzato tra 0 e 1 (inverso alla distanza)
    const normalized = 1 - THREE.MathUtils.clamp((distance - minDistance) / (maxDistance - minDistance), 0, 1);

    // Imposta il volume
    sound.setVolume(normalized * 0.5); // massimo volume 0.5
}

// Chiama questa funzione nel tuo loop di animazione
function animate() {
    requestAnimationFrame(animate);

    updateSoundVolume();

    renderer.render(scene, camera);
}

animate();
