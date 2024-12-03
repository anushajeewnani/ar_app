import { Component, OnDestroy } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-ar-view',
  template: `
    <ion-content [fullscreen]="true">
      <div *ngIf="!isARMode" class="start-screen">
        <ion-button expand="block" (click)="startAR()">
          Start AR Experience
        </ion-button>
      </div>

      <div *ngIf="isARMode" class="ar-container">
        <a-scene 
          embedded 
          arjs='sourceType: webcam; 
                debugUIEnabled: false; 
                sourceWidth: 1920; 
                sourceHeight: 1080;
                displayWidth: 1920; 
                displayHeight: 1080;'
          renderer="logarithmicDepthBuffer: true;"
          vr-mode-ui="enabled: false"
        >
          <a-marker preset="hiro">
            <!-- Replace with your 3D model -->
            <a-entity
              position="0 0.5 0"
              scale="0.05 0.05 0.05"
              gltf-model="assets/your-3d-model.glb"
            ></a-entity>
          </a-marker>
          <a-entity camera></a-entity>
        </a-scene>

        <!-- Exit AR button -->
        <ion-button 
          class="exit-button" 
          color="danger" 
          (click)="exitAR()"
        >
          Exit AR
        </ion-button>
      </div>
    </ion-content>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
      height: 100%;
    }

    .start-screen {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      padding: 20px;
    }

    .ar-container {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1000;
    }

    .exit-button {
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 2000;
    }

    a-scene {
      position: absolute;
      top: 0;
      left: 0;
      width: 100% !important;
      height: 100% !important;
    }

    .a-canvas {
      width: 100% !important;
      height: 100% !important;
      position: absolute !important;
      top: 0 !important;
      left: 0 !important;
    }
  `]
})
export class ArViewComponent implements OnDestroy {
  isARMode = false;
  private mediaStream: MediaStream | null = null;

  constructor(private platform: Platform) {
    console.log('ArViewComponent initialized');
  }

  async startAR() {
    try {
      console.log('Requesting camera permission...');
      
      // Request camera access with specific constraints
      this.mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'environment',
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        } 
      });

      console.log('Camera permission granted:', this.mediaStream);
      
      // Check if running on mobile
      if (this.platform.is('mobile') && !this.platform.is('mobileweb')) {
        // Request device orientation permission for AR
        if (typeof DeviceOrientationEvent !== 'undefined' && 
            typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
          try {
            const permission = await (DeviceOrientationEvent as any).requestPermission();
            if (permission !== 'granted') {
              throw new Error('Device orientation permission not granted');
            }
          } catch (err) {
            console.error('Error requesting device orientation:', err);
            alert('Device orientation access is required for AR.');
            return;
          }
        }
      }

      this.isARMode = true;
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert('Camera access is required for AR. Please allow camera access and try again.');
    }
  }

  exitAR() {
    // Stop all tracks in the media stream
    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach(track => track.stop());
      this.mediaStream = null;
    }
    this.isARMode = false;
  }

  ngOnDestroy() {
    // Cleanup when component is destroyed
    this.exitAR();
  }
}