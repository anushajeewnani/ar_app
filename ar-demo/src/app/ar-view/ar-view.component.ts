import { Component, OnDestroy } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-ar-view',
  templateUrl: './ar-view.component.html',
  styleUrls: ['./ar-view.component.scss']
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