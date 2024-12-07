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

/*

import * as THREE from 'three';

// Scene setup
const scene = new THREE.Scene();

// Camera setup
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Renderer setup
const canvas = document.querySelector('#webgl');
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);

// Create a cube
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    
    // Rotate the cube
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

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
*/ 