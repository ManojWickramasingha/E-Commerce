import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { product } from '../_module/Product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  PATH_API_URL:string = "http://localhost:9090";
  constructor(private httpClient:HttpClient){}

  requestHeader = new HttpHeaders({'No-Auth':'True'})
  public addProduct(product:product):Observable<product>{
    return this.httpClient.post<product>(this.PATH_API_URL+'/api/v1/admin/product',product, {headers:this.requestHeader});
  }


}
