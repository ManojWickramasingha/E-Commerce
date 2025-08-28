import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, MaybeAsync, RedirectCommand, Resolve, RouterStateSnapshot } from '@angular/router';
import { Product } from '../_module/Product';
import { ProductService } from './product-service';
import { map } from 'rxjs';
import { ImageProcess } from './image-process';

@Injectable({
  providedIn: 'root'
})
export class BuyProductResolver implements Resolve<Product[]> {

  constructor(private productService:ProductService,private imageProcess:ImageProcess){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<Product[] | RedirectCommand> {
    const idParam = route.paramMap.get("id");
    const id: number = idParam !== null ? Number(idParam) : 0; 
    const isSingleProductCheckOut: boolean = route.paramMap.get("isSingleProductCheckOut") === 'true' ? true:false;


    return this.productService.getProductDetails(isSingleProductCheckOut, id).pipe(
      map((products: Product[]) => products.map((product: Product) => this.imageProcess.createImage(product)))
    );
    
  }
  
}
