import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product-service';
import { product } from '../_module/Product';
import { HttpErrorResponse } from '@angular/common/http';
import {MatTableModule} from '@angular/material/table';
@Component({
  selector: 'app-show-products-details',
  imports: [MatTableModule],
  templateUrl: './show-products-details.html',
  styleUrl: './show-products-details.css'
})
export class ShowProductsDetails implements OnInit {
  public productDetails : product[] = [];
  
  displayedColumns: string[] = ['Name', 'Description', 'Discounted Price', 'Actual Price'];
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

}
