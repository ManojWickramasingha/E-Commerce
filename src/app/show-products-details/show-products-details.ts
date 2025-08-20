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
@Component({
  selector: 'app-show-products-details',
  imports: [MatTableModule, MatIcon, MatButtonModule, MatDialogModule],
  templateUrl: './show-products-details.html',
  styleUrl: './show-products-details.css',
})
export class ShowProductsDetails implements OnInit {
  readonly dialog = inject(MatDialog);
  public productDetails: Product[] = [];

  displayedColumns: string[] = [
    'Id',
    'Name',
    'Description',
    'Discounted Price',
    'Actual Price',
    'Images',
    'Edit',
    'Delete',
  ];
  ngOnInit(): void {
    this.showAllProduct();
  }

  constructor(
    private productService: ProductService,
    private cdr: ChangeDetectorRef,
    private imageProcess: ImageProcess,
    private router:Router
  ) {}

  showAllProduct() {
    this.productService
      .getAllProduct()
      .pipe(
        map((products: Product[]) =>
          products.map((product: Product) => this.imageProcess.createImage(product))
        )
      )
      .subscribe({
        next: (response: Product[]) => {
          this.productDetails = response;
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
        this.showAllProduct();
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
}
