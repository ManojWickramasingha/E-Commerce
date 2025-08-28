import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  MaybeAsync,
  RedirectCommand,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Product } from '../_module/Product';
import { map, Observable, of } from 'rxjs';
import { ProductService } from './product-service';
import { ImageProcess } from './image-process';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductResolve implements Resolve<Product> {
  constructor(private productService:ProductService,private imageProcess:ImageProcess){}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Product> {
    const id = route.paramMap.get('productId');

    let requestHeader = new HttpHeaders({'No-Auth':'True'});

    if (id) {
      return this.productService.getProductDetailsById(parseInt(id)).pipe(
        map(p => this.imageProcess.createImage(p))
      )
    } else {
      return of({
        id:0,
        name: '',
        description: '',
        discountedPrice: 0,
        actualPrice: 0,
        productImages: [],
      });
    }
  }
}
