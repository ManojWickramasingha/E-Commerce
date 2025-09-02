import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../_module/Product';
import {MatGridListModule} from '@angular/material/grid-list';
import { CdkTableModule } from "@angular/cdk/table";
import { ProductService } from '../_services/product-service';




@Component({
  selector: 'app-product-view-details',
  imports: [MatGridListModule, CdkTableModule],
  templateUrl: './product-view-details.html',
  styleUrl: './product-view-details.css'
})
export class ProductViewDetails implements OnInit{

  constructor(private activateRoute:ActivatedRoute,private route:Router,private productService:ProductService){}

 

  public productIndex = 0;
  product:Product = {
    name:'',
    description:'',
    actualPrice:0,
    discountedPrice:0,
    id:0,
    productImages:[]
  }
  ngOnInit(): void {
    this.product = this.activateRoute.snapshot.data['product'];
    
  }

  changeIndex(index:number){
    this.productIndex = index;
  }


  buyProduct(isSingleProductCheckOut:boolean,productId:number){
    this.route.navigate(['/buyProduct', {isSingleProductCheckOut:isSingleProductCheckOut, id:productId}]);
  }

  addCart(productId:number){
    this.productService.addCart(productId).subscribe({
      next: res =>{
        console.log(res);
      },
      error: err =>{
        console.log(err);
      }
    })
  }


}
