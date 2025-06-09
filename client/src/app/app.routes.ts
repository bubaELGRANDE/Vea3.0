import { Routes } from '@angular/router';
import { PublicLayoutComponent } from './layouts/public-layout.component';
import { DashboardLayoutComponent } from './layouts/dashboard-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout.component';

export const routes: Routes = [
    {
        path: '',
        component: PublicLayoutComponent,
        children: [
            { path: 'payment/:id', loadComponent: () => import('./pages/public/modules/paycar/paycar.component').then(m => m.PaycarComponent) },
            { path: 'vender', loadComponent: () => import('./pages/public/modules/beneficios/beneficios.component').then(m => m.BeneficiosComponent) },
            { path: 'tienda', loadComponent: () => import('./pages/public/modules/shop/shop.component').then(m => m.ShopComponent) },
            { path: 'inicio', loadComponent: () => import('./pages/public/modules/home/home.component').then(m => m.HomeComponent) },
            { path: 'user/wishlist', loadComponent: () => import('./pages/public/modules/wishlist/wishlist.component').then(m => m.WishlistComponent) },
            { path: 'user/info', loadComponent: () => import('./pages/public/modules/user-info/user-info.component').then(m => m.UserInfoComponent) },
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
            { path: 'post-list', loadComponent: () => import('./pages/private/modules/post-list/post-list.component').then(m => m.PostListComponent) },
            { path: 'order-list', loadComponent: () => import('./pages/private/modules/order-list/order-list.component').then(m => m.OrderListComponent) },
            { path: 'order-detail', loadComponent: () => import('./pages/private/modules/order-detail/order-detail.component').then(m => m.OrderDetailComponent) },
            { path: 'add-post', loadComponent: () => import('./pages/private/modules/add-post/add-post.component').then(m => m.AddPostComponent) },
            { path: 'metricas', loadComponent: () => import('./pages/private/modules/metricas/metricas.component').then(m => m.MetricasComponent) },
            { path: 'payments-list', loadComponent: () => import('./pages/private/modules/payments-list/payments-list.component').then(m => m.PaymentsListComponent) },
        ]
    },
];