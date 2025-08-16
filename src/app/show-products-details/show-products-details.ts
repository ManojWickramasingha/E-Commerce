import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product-service';
import { product } from '../_module/Product';
import { HttpErrorResponse } from '@angular/common/http';
import {MatTableModule} from '@angular/material/table';
import { MatIcon } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
@Component({
  selector: 'app-show-products-details',
  imports: [MatTableModule,MatIcon,MatButtonModule],
  templateUrl: './show-products-details.html',
  styleUrl: './show-products-details.css'
})
export class ShowProductsDetails implements OnInit {
  public productDetails : product[] = [];
  
  displayedColumns: string[] = ['Id','Name', 'Description', 'Discounted Price', 'Actual Price','Edit','Delete'];
  ngOnInit(): void {
    this.showAllProduct();
  }

  constructor(private productService:ProductService, private cdr:ChangeDetectorRef){}

  showAllProduct(){
    this.productService.getAllProduct().subscribe({
      next: (response:product[])=>{
        console.log(response);
        this.productDetails = response;
        this.cdr.detectChanges();
      },
      error: (error:HttpErrorResponse)=>{
        console.log(error);
      }
    })
  }

  deleteProductDetails(productId:number){
    this.productService.deleteProductDetails(productId).subscribe({
      next: (response)=>{
        this.showAllProduct();
      },
      error: (error:HttpErrorResponse)=>{
        console.log(error);
      }
    })
  }

}
