import { Component } from '@angular/core';

@Component({
  selector: 'app-ar-view',
  template: `
    <ion-content>
      <ion-header>
        <ion-toolbar>
          <ion-title>AR View</ion-title>
        </ion-toolbar>
      </ion-header>

      <div *ngIf="!isARMode" class="ion-padding">
        <ion-button expand="block" (click)="startAR()">
          Start AR Experience
        </ion-button>
      </div>

      <div *ngIf="isARMode" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%;">
        <a-scene embedded arjs="sourceType: webcam; debugUIEnabled: false;">
          <a-marker preset="hiro">
            <a-box position="0 0.5 0" material="color: red;"></a-box>
          </a-marker>
          <a-entity camera></a-entity>
        </a-scene>
      </div>
    </ion-content>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
      height: 100%;
    }
  `]
})
export class ArViewComponent {
  isARMode = false;

  constructor() {
    console.log('ArViewComponent initialized');
  }

  async startAR() {
    try {
      console.log('Requesting camera permission...');
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'environment' 
        } 
      });
      console.log('Camera permission granted:', stream);
      this.isARMode = true;
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert('Camera access is required for AR. Please allow camera access and try again.');
    }
  }
} 