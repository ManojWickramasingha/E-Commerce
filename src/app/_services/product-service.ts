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

  
  public addProduct(product:FormData):Observable<product>{
    return this.httpClient.post<product>(this.PATH_API_URL+'/api/v1/admin/product',product);
  }

  public getAllProduct(){
    return this.httpClient.get<product[]>(this.PATH_API_URL + '/api/v1/admin/product/all');
  }


}
