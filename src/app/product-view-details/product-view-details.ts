import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../_module/Product';
import {MatGridListModule} from '@angular/material/grid-list';
import { CdkTableModule } from "@angular/cdk/table";

@Component({
  selector: 'app-product-view-details',
  imports: [MatGridListModule, CdkTableModule],
  templateUrl: './product-view-details.html',
  styleUrl: './product-view-details.css'
})
export class ProductViewDetails implements OnInit{
  constructor(private activateRoute:ActivatedRoute){}
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
    console.log(this.product);
  }

  changeIndex(index:number){
    this.productIndex = index;
  }

}
