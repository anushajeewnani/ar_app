import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArViewComponent } from './ar-view.component';

const routes: Routes = [
  {
    path: '',
    component: ArViewComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArViewRoutingModule {} 