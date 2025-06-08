import { Routes } from '@angular/router';
import { PublicLayoutComponent } from './layouts/public-layout.component';
import { DashboardLayoutComponent } from './layouts/dashboard-layout.component';

import { PostListComponent } from './pages/private/post-list/post-list.component';
import { OrderListComponent } from './pages/private/order-list/order-list.component';
import { OrderDetailComponent } from './pages/private/order-detail/order-detail.component';
import { AddPostComponent } from './pages/private/add-post/add-post.component';
import { MetricasComponent } from './pages/private/metricas/metricas.component';
import { PaymentsListComponent } from './pages/private/payments-list/payments-list.component';

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
            { path: 'singin', loadComponent: () => import('./pages/auths/sign-in/sign-in.component').then(m => m.SignInComponent) },
            { path: 'singup', loadComponent: () => import('./pages/auths/sign-up/sign-up.component').then(m => m.SignUpComponent) },
            { path: 'recover', loadComponent: () => import('./pages/auths/forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent) }
        ]
    },
    {
        path: 'dashboard',
        component: DashboardLayoutComponent,
        children: [
            { path: '', redirectTo: 'metricas', pathMatch: 'full' },
            { path: 'post-list', component: PostListComponent },
            { path: 'order-list', component: OrderListComponent },
            { path: 'order-detail/:id', component: OrderDetailComponent },
            { path: 'add-post', component: AddPostComponent },
            { path: 'metricas', component: MetricasComponent },
            { path: 'payments-list', component: PaymentsListComponent },
        ]
    },
];