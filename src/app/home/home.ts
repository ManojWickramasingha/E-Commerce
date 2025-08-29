
import { ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {MatGridListModule} from '@angular/material/grid-list';
import { ProductService } from '../_services/product-service';
import { map } from 'rxjs';
import { Product } from '../_module/Product';
import { ImageProcess } from '../_services/image-process';
import {MatButtonModule} from '@angular/material/button';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  imports: [MatGridListModule,MatButtonModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {
    constructor(private productService:ProductService,private imageProcessing:ImageProcess,private cdr:ChangeDetectorRef
      ,private router:Router
    ){}
    ngOnInit(): void {
      this.loadProducts(this.pageNumber);
    }
    public productDetailsList:Product[] = [];
    public pageNumber: number = 0;
    

    loadProducts(pageNumber:number){
      this.productService.getAllProduct(pageNumber)
      .pipe(
        map((products:Product[])=> products.map((product:Product) => this.imageProcessing.createImage(product) ))
      )
      .subscribe({
        next:res => {
          console.log(res);
          this.productDetailsList = res
          this.cdr.detectChanges();
        },
        error: err => {
          console.log(err);
        }
      })
    }

    productViewDetails(productId:number){
      this.router.navigate(['/productViewDetails',{productId:productId}]);
    }

   public viewMore(){
      this.pageNumber = this.pageNumber + 1;
      this.loadProducts(this.pageNumber);
    }
}
