import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../_services/product-service';
import { Product } from '../_module/Product';
import { HttpErrorResponse } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { ShowImages } from '../show-images/show-images';
import { MatDialogModule } from '@angular/material/dialog';
import { ImageProcess } from '../_services/image-process';
import { map } from 'rxjs';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
 feature/home_pagination
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';



@Component({
  selector: 'app-show-products-details',
 feature/home_pagination
  imports: [MatTableModule, MatIcon, MatButtonModule, MatDialogModule,CommonModule,MatFormFieldModule,MatInputModule],

  templateUrl: './show-products-details.html',
  styleUrl: './show-products-details.css',
})
export class ShowProductsDetails implements OnInit {
  readonly dialog = inject(MatDialog);
  public productDetails: Product[] = [];
  public pageNumber:number = 0;
  public showTable:boolean = false;
  public viewMoreBtn:boolean = false;

  displayedColumns: string[] = [
    'Id',
    'Name',
    'description',
    'Discounted Price',
    'Actual Price',
    'Images',
    'Edit',
    'Delete',
  ];
  ngOnInit(): void {
    this.showAllProduct(this.pageNumber);
  }

  constructor(
    private productService: ProductService,
    private cdr: ChangeDetectorRef,
    private imageProcess: ImageProcess,
    private router:Router
  ) {}

 feature/home_pagination
  showAllProduct(pageNumber:number, searchKey:string = "") {
    this.showTable = false;
    this.viewMoreBtn = false;
    this.productService
      .getAllProduct(pageNumber,searchKey)

      .pipe(
        map((products: Product[]) =>
          products.map((product: Product) => this.imageProcess.createImage(product))
        )
      )
      .subscribe({
        next: (response: Product[]) => {
        response.forEach(product => this.productDetails.push(product))
        console.log(this.productDetails);
        this.showTable = true;
        

        if(response.length == 12)
            this.viewMoreBtn = true;
        else
           this.viewMoreBtn = false;

        this.cdr.detectChanges();
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
        },
      });
  }

  deleteProductDetails(productId: number) {
    this.productService.deleteProductDetails(productId).subscribe({
      next: (response) => {
        this.showAllProduct(this.pageNumber);
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      },
    });
  }

  showImage(product: Product): void {
    this.dialog.open(ShowImages, { height: '300px', width: '800px', data: {
      images: product.productImages
    } });
  }

  editProductDetails(productId:number){
    this.router.navigate(['/createNewProduct',{productId:productId}]);
  }

  viewMore(){
    this.pageNumber = this.pageNumber + 1;
    this.showAllProduct(this.pageNumber);
  }
 feature/home_pagination

  searchKeyWord(searchKeyWord: string){
    this.pageNumber = 0;
    this.productDetails = [];
    this.showAllProduct(this.pageNumber,searchKeyWord);
  }

}
