import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'ar-view',
    loadChildren: () => {
      console.log('Attempting to load AR View module...');
      return import('./ar-view/ar-view.module').then(m => {
        console.log('AR View module loaded successfully');
        return m.ArViewModule;
      });
    }
  },
  {
    path: '',
    redirectTo: 'ar-view',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor() {
    console.log('AppRoutingModule initialized');
  }
}
