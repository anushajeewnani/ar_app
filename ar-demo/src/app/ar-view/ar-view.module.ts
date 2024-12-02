import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ArViewComponent } from './ar-view.component';
import { ArViewRoutingModule } from './ar-view-routing.module';

@NgModule({
  declarations: [
    ArViewComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    ArViewRoutingModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ArViewModule { } 