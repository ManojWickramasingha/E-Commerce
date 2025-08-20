import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../_module/Product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  PATH_API_URL: string = 'http://localhost:9090';
  constructor(private httpClient: HttpClient) {}

  public addProduct(product: FormData): Observable<Product> {
    return this.httpClient.post<Product>(
      this.PATH_API_URL + '/api/v1/admin/product',
      product
    );
  }

  public getAllProduct() : Observable<Product[]> {
    return this.httpClient.get<Product[]>(
      this.PATH_API_URL + '/api/v1/admin/product/all'
    );
  }

  public deleteProductDetails(productId: number) {
    return this.httpClient.delete(
      this.PATH_API_URL +
        `/api/v1/admin/product/deleteProductDetail/${productId}`
    );
  }

  public getProductDetailsById(productId:number):Observable<Product>{
    return this.httpClient.get<Product>(this.PATH_API_URL+`/api/v1/admin/product/getProductDetailById/${productId}`)
  }
}
