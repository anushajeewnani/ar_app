import * as THREE from 'three';

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';


// Scene setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffe4c4);

// Camera setup
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Renderer setup
const canvas = document.querySelector('#webgl');
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xffe4c4, 1);

// Add OrbitControls for interactivity
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Smooth movement
controls.dampingFactor = 0.05; // Fine-tune damping
controls.rotateSpeed = 0.8; // Adjust rotation speed
controls.zoomSpeed = 1.2; // Adjust zoom speed

const loader = new GLTFLoader();
const dracoLoader = new DRACOLoader();

dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/'); 

loader.setDRACOLoader(dracoLoader);

loader.load(
  '../v-flap.glb',
  (gltf) => {
    const model = gltf.scene; 
    model.scale.set(5, 3, 15); 
    scene.add(model);
    console.log('GLB model loaded successfully');
  },
  (xhr) => {
    console.log((xhr.loaded / xhr.total) * 100 + '% loaded'); 
  },
  (error) => {
    console.error('An error occurred while loading the GLB file:', error);
  }
);

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

// Handle window resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Start animation
animate();


/*
import { Component, OnInit, OnDestroy, ViewChild,AfterViewInit, ElementRef } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-threejs-scene',
  templateUrl: './index.html',
  styleUrls: ['./style.css'],
})


// export class ThreejsScenePage implements OnInit, OnDestroy {
//   private scene: THREE.Scene;
//   private camera: THREE.PerspectiveCamera;
//   private renderer: THREE.WebGLRenderer;
//   private cube: THREE.Mesh;

//   constructor(private el: ElementRef) {}

//   ngOnInit() {
//     this.initializeThreeJS();
//   }

//   ngOnDestroy() {
//     if (this.renderer) {
//       this.renderer.dispose();
//     }
//   }

//   private initializeThreeJS() {
//     const canvas = this.canvasRef.nativeElement;

//     // Set up the scene
//     this.scene = new THREE.Scene();

//     // Set up the camera
//     this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//     this.camera.position.z = 5;

//     // Set up the renderer
//     this.renderer = new THREE.WebGLRenderer({ canvas });
//     this.renderer.setSize(window.innerWidth, window.innerHeight);

//     // Add a rotating cube
//     const geometry = new THREE.BoxGeometry();
//     const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
//     this.cube = new THREE.Mesh(geometry, material);
//     this.scene.add(this.cube);

//     // Animation loop
//     const animate = () => {
//       requestAnimationFrame(animate);

//       // Rotate the cube
//       this.cube.rotation.x += 0.01;
//       this.cube.rotation.y += 0.01;

//       // Render the scene
//       this.renderer.render(this.scene, this.camera);
//     };
//     this.animate();
//   }

//   private animate() {
//     requestAnimationFrame(() => this.animate());

//     // Rotate the cube for animation
//     this.cube.rotation.x += 0.01;
//     this.cube.rotation.y += 0.01;

//     // Render the scene
//     this.renderer.render(this.scene, this.camera);
//   }
// }
export class ThreejsScenePage implements OnInit, OnDestroy,AfterViewInit {
  @ViewChild('canvas') canvasRef: ElementRef<HTMLCanvasElement>;

  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private cube: THREE.Mesh;

  constructor() {}
  ngOnInit() {
    this.initThreeJs();
  }

  ngOnDestroy() {
    if (this.renderer) {
      this.renderer.dispose();
    }
  }
  ngAfterViewInit() {
    this.initThreeJs();
  }

  private initThreeJs() {
    const canvas = this.canvasRef.nativeElement; // Get the canvas element reference

    // Set up the scene
    this.scene = new THREE.Scene();

    // Set up the camera
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.z = 5;

    // Set up the renderer
    this.renderer = new THREE.WebGLRenderer({ canvas });
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    // Add a rotating cube
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    this.cube = new THREE.Mesh(geometry, material);
    this.scene.add(this.cube);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Rotate the cube
      this.cube.rotation.x += 0.01;
      this.cube.rotation.y += 0.01;

      // Render the scene
      this.renderer.render(this.scene, this.camera);
    };

    animate();
  }
}
*/
