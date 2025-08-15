import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Admin } from './admin/admin';
import { User } from './user/user';
import { Login } from './login/login';
import { Forbidden } from './forbidden/forbidden';
import { AuthGuard } from './_auth/auth-guard';
import { CreateNewProduct } from './create-new-product/create-new-product';

export const routes: Routes = [
  { path: '', component: Home },
  {
    path: 'admin',
    component: Admin,
    canActivate: [AuthGuard],
    data: { roles: ['admin'] },
  },
  {
    path: 'user',
    component: User,
    canActivate: [AuthGuard],
    data: { roles: ['user'] },
  },
  { path: 'login', component: Login },
  { path: 'forbidden', component: Forbidden },
  {
    path: 'createNewProduct',
    component: CreateNewProduct,
    canActivate: [AuthGuard],
    data: { roles: ['admin'] },
  },
];
