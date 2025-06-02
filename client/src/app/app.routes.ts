import { Routes } from '@angular/router';
import { PublicLayoutComponent } from './layouts/public-layout.component';
import { SignInComponent } from './pages/auths/sign-in/sign-in.component';
import { SignUpComponent } from './pages/auths/sign-up/sign-up.component';
import { DashboardLayoutComponent } from './layouts/dashboard-layout.component';
import { ForgotPasswordComponent } from './pages/auths/forgot-password/forgot-password.component';

export const routes: Routes = [
    {
        path: '',
        component: PublicLayoutComponent,
        children: [
            { path: 'shop', loadComponent: () => import('./pages/public/shop/shop.component').then(m => m.ShopComponent) },
            { path: 'home', loadComponent: () => import('./pages/public/home/home.component').then(m => m.HomeComponent) },
            { path: '', redirectTo: 'home', pathMatch: 'full' },
        ],
    },
    {
        path: 'auth',
        children: [
            { path: 'singin', component: SignInComponent },
            { path: 'singup', component: SignUpComponent },
            {path: 'recover', component: ForgotPasswordComponent}
        ]
    },
    {
        path: 'dashboard',
        component: DashboardLayoutComponent,
        children: [

        ]
    }
];