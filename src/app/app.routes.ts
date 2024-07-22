import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: "",
        loadComponent: () => import('./features/home/home.component')
            .then(m => m.HomeComponent),
        children: [
            {
                path: "",
                loadComponent: () => import('./features/products/products.component')
                    .then(m => m.ProductsComponent)
            },
            {
                path: "cart",
                loadComponent: () => import('./features/cart/cart/cart.component')
                    .then(m => m.CartComponent)
            },
            {
                path: "orders",
                loadComponent: () => import('./features/orders/order-list/order-list.component')
                    .then(m => m.OrderListComponent)
            },
            {
                path: "review",
                loadComponent: () => import('./shared/components/review/review.component')
                    .then(m => m.ReviewComponent)
            }
        ]
    },

    {
        path: "login",
        loadComponent: () => import('./features/auth/login/login.component')
            .then(m => m.LoginComponent)
    },
    {
        path: "register",
        loadComponent: () => import('./features/auth/register/register.component')
            .then(m => m.RegisterComponent)
    },

    {
        path: 'success',
        loadComponent: () => import('./shared/components/payment-success/payment-success.component')
            .then(m => m.PaymentSuccessComponent)
    },
    {
        path: 'cancle',
        loadComponent: () => import('./shared/components/not-found/not-found.component')
            .then(m => m.NotFoundComponent)
    },
    {
        path: 'admin',
        loadComponent: () => import('./features/admin/admin.component')
            .then(m => m.AdminComponent),
        children: [
            {
                path: "",
                loadComponent: () => import('./features/admin/dashboard/dashboard.component')
                    .then(m => m.DashboardComponent)
            },
            {
                path: "products",
                loadComponent: () => import('./features/admin/product-management/product-management.component')
                    .then(m => m.ProductManagementComponent)
            },
            {
                path: "products/add",
                loadComponent: () => import('./features/admin/product-management/add-product/add-product.component')
                    .then(m => m.AddProductComponent)
            },
            {
                path: "customers",
                loadComponent: () => import('./features/admin/user-management/user-management.component')
                    .then(m => m.UserManagementComponent)
            },
            {
                path: "orders",
                loadComponent: () => import('./features/admin/orders/orders.component')
                    .then(m => m.OrdersComponent)
            },
            {
                path: "analytics",
                loadComponent: () => import('./features/admin/analytics/analytics.component')
                    .then(m => m.AnalyticsComponent)
            },
            {
                path: "settings",
                loadComponent: () => import('./features/admin/settings/settings.component')
                    .then(m => m.SettingsComponent)
            },
            {
                path: "category",
                loadComponent: () => import('./features/admin/categories/categories.component')
                    .then(m => m.CategoriesComponent),
            },
            {
                path: "category/add",
                loadComponent: () => import('./features/admin/categories/add-category/add-category.component')
                    .then(m => m.AddCategoryComponent),
            },
            {
                path: "tag",
                loadComponent: () => import('./features/admin/tag/tag.component')
                    .then(m => m.TagComponent)
            },
            {
                path: "tag/add",
                loadComponent: () => import('./features/admin/tag/add-tag/add-tag.component')
                    .then(m => m.AddTagComponent)
            },
            {
                path: '**',
                loadChildren: () => import('./shared/components/not-found/not-found.component')
                    .then(m => m.NotFoundComponent)
            }
        ]
    },

];
