
import { ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {MatGridListModule} from '@angular/material/grid-list';
import { ProductService } from '../_services/product-service';
import { map } from 'rxjs';
import { Product } from '../_module/Product';
import { ImageProcess } from '../_services/image-process';
import {MatButtonModule} from '@angular/material/button';
import { Router } from '@angular/router';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';


@Component({
  selector: 'app-home',
  imports: [MatGridListModule,MatButtonModule,MatFormFieldModule,MatInputModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {
    constructor(private productService:ProductService,private imageProcessing:ImageProcess,private cdr:ChangeDetectorRef
      ,private router:Router
    ){}
    ngOnInit(): void {
      this.loadProducts(this.pageNumber,this.searchKey);
    }
    public productDetailsList:Product[] = [];
    public pageNumber: number = 0;
    public searchKey: string = "";
    

    loadProducts(pageNumber:number,searchKeyWord:string){
      this.productService.getAllProduct(pageNumber,searchKeyWord)
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
      this.loadProducts(this.pageNumber,this.searchKey);
    }

  public searchKeyWord(searchKeyWord:string){
    console.log(searchKeyWord);
    this.searchKey = searchKeyWord;
    this.pageNumber = 0;
    this.productDetailsList = [];
    this.loadProducts(this.pageNumber,searchKeyWord)
  }
}
