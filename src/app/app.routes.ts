import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Admin } from './admin/admin';
import { User } from './user/user';
import { Login } from './login/login';
import { Forbidden } from './forbidden/forbidden';
import { AuthGuard } from './_auth/auth-guard';
import { CreateNewProduct } from './create-new-product/create-new-product';
import { ShowProductsDetails } from './show-products-details/show-products-details';
import { ProductResolve } from './_services/product-resolve';
import { ProductViewDetails } from './product-view-details/product-view-details';

import { BuyProduct } from './buy-product/buy-product';
import { BuyProductResolver } from './_services/buy-product-resolver';


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
    resolve: { product: ProductResolve },
  },

  {
    path: 'showProductsDetails',
    component: ShowProductsDetails,
    canActivate: [AuthGuard],
    data: { roles: ['admin'] },
  },


  {
    path: 'productViewDetails',
    component: ProductViewDetails,
    resolve: { product: ProductResolve },
  },

  {
    path: 'buyProduct',
    component: BuyProduct,
    canActivate: [AuthGuard],
    data: { roles: ['user'] },
    resolve:{productDetail:BuyProductResolver}
  },

  {path:'productViewDetails', component:ProductViewDetails, resolve:{product:ProductResolve}}

];
