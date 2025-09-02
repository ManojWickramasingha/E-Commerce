import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../_module/Product';
import { Observable } from 'rxjs';
import { OrderDetail } from '../_module/Order-Detail.module';

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

  requestHeader = new HttpHeaders({ 'No-Auth': 'True' });
  public getAllProduct(pageNumber:number, searchKey:string = ""): Observable<Product[]> {
    return this.httpClient.get<Product[]>(
      this.PATH_API_URL + `/api/v1/admin/product/all`,
      {params:{'pageNumber':pageNumber, 'searchKey':searchKey}, headers:this.requestHeader},
    );
  }

  public deleteProductDetails(productId: number) {
    return this.httpClient.delete(
      this.PATH_API_URL +
        `/api/v1/admin/product/deleteProductDetail/${productId}`
    );
  }

  public getProductDetailsById(productId: number): Observable<Product> {
    return this.httpClient.get<Product>(
      this.PATH_API_URL +
        `/api/v1/admin/product/getProductDetailById/${productId}`,
      { headers: this.requestHeader }
    );
  }

  public getProductDetails(
    isSingleProductCheckOut: boolean,
    productId: number
  ): Observable<Product[]> {
    return this.httpClient.get<Product[]>(
      this.PATH_API_URL +
        `/api/v1/admin/product/getProductDetail/${isSingleProductCheckOut}/${productId}`
    );
  }

  public placeOrder(orderDetail: OrderDetail) {
    return this.httpClient.post(this.PATH_API_URL + `/placeOrder`, orderDetail);
  }

  public addCart(productId:number){
    return this.httpClient.get(this.PATH_API_URL+`/add_cart/`+productId);
  }
}
