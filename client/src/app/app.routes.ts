import { Routes } from '@angular/router';
import { PublicLayoutComponent } from './layouts/public-layout.component';

export const routes: Routes = [
    {
        path: '',
        component: PublicLayoutComponent,
        children: [
            { path: '', loadComponent: () => import('./pages/public/home/home.component').then(m => m.HomeComponent) }
        ]
    },
    { path: '**', redirectTo: '' }
];
