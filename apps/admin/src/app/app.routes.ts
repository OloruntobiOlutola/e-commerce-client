import { Route } from '@angular/router';
import { ShellComponent } from './shared/shell/shell.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { OrderComponent } from './pages/order/order.component';
import { CategoryComponent } from './pages/category/category.component';
import { UsersComponent } from './pages/users/users.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { CategoryFormComponent } from './pages/category/category-form/category-form.component';
import { ProductsListComponent } from './pages/products/products-list/products-list.component';
import { ProductsFormComponent } from './pages/products/products-form/products-form.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: ShellComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'products',
        component: ProductsListComponent,
      },
      {
        path: 'products/form',
        component: ProductsFormComponent,
      },
      {
        path: 'products/form/:id',
        component: ProductsFormComponent,
      },
      {
        path: 'order',
        component: OrderComponent,
      },
      {
        path: 'category',
        component: CategoryComponent,
      },
      {
        path: 'category/form',
        component: CategoryFormComponent,
      },
      {
        path: 'category/form/:id',
        component: CategoryFormComponent,
      },
      {
        path: 'users',
        component: UsersComponent,
      },
      {
        path: 'logout',
        component: LogoutComponent,
      },
    ],
  },
];
