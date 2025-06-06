import { Routes } from '@angular/router';
import { PublicLayoutComponent } from './layouts/public-layout.component';
import { DashboardLayoutComponent } from './layouts/dashboard-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout.component';

export const routes: Routes = [
    {
        path: '',
        component: PublicLayoutComponent,
        children: [
            { path: 'payment', loadComponent: () => import('./pages/public/paycar/paycar.component').then(m => m.PaycarComponent) },
            { path: 'vender', loadComponent: () => import('./pages/public/beneficios/beneficios.component').then(m => m.BeneficiosComponent) },
            { path: 'tienda', loadComponent: () => import('./pages/public/shop/shop.component').then(m => m.ShopComponent) },
            { path: 'inicio', loadComponent: () => import('./pages/public/home/home.component').then(m => m.HomeComponent) },
            { path: 'user/wishlist', loadComponent: () => import('./pages/public/wishlist/wishlist.component').then(m => m.WishlistComponent) },
            { path: '', redirectTo: 'inicio', pathMatch: 'full' },
        ],
    },
    {
        path: 'auth', component: AuthLayoutComponent,
        children: [
            { path: 'login', loadComponent: () => import('./pages/auths/sign-in/sign-in.component').then(m => m.SignInComponent) },
            { path: 'register', loadComponent: () => import('./pages/auths/sign-up/sign-up.component').then(m => m.SignUpComponent) },
            { path: 'recover', loadComponent: () => import('./pages/auths/forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent) }
        ]
    },
    {
        path: 'dashboard',
        component: DashboardLayoutComponent,
        children: [
            { path: '', redirectTo: 'metricas', pathMatch: 'full' },
            { path: 'post-list', loadComponent: () => import('./pages/private/post-list/post-list.component').then(m => m.PostListComponent) },
            { path: 'order-list', loadComponent: () => import('./pages/private/order-list/order-list.component').then(m => m.OrderListComponent) },
            { path: 'order-detail', loadComponent: () => import('./pages/private/order-detail/order-detail.component').then(m => m.OrderDetailComponent) },
            { path: 'add-post', loadComponent: () => import('./pages/private/add-post/add-post.component').then(m => m.AddPostComponent) },
            { path: 'metricas', loadComponent: () => import('./pages/private/metricas/metricas.component').then(m => m.MetricasComponent) },
            { path: 'payments-list', loadComponent: () => import('./pages/private/payments-list/payments-list.component').then(m => m.PaymentsListComponent) },
        ]
    },
];