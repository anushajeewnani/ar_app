import { Component } from '@angular/core';

@Component({
  selector: 'app-ar-view',
  templateUrl: './ar-view.component.html',
  styleUrls: ['./ar-view.component.scss']
})
export class ArViewComponent {
  isARMode = false;

  startAR() {
    this.isARMode = true;
  }

  exitAR() {
    this.isARMode = false;
  }
}