import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { Product } from '../_module/Product';
import { FormsModule, NgForm } from '@angular/forms';
import { ProductService } from '../_services/product-service';
import { FileHandle } from '../_module/FileHandle.model';
import { DomSanitizer } from '@angular/platform-browser';
import { MatGridListModule } from '@angular/material/grid-list';
import { NgFor } from '@angular/common';
import { Drag } from '../drag';

@Component({
  selector: 'app-create-new-product',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatButtonModule,
    FormsModule,
    MatGridListModule,
    NgFor,
    Drag,
  ],
  templateUrl: './create-new-product.html',
  styleUrl: './create-new-product.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateNewProduct {
  constructor(
    private productService: ProductService,
    private sanitizer: DomSanitizer
  ) {}
  protected product: Product = {
    name: '',
    description: '',
    discountedPrice: 0,
    actualPrice: 0,
    productImages: [],
  };

  public addProduct(productForm: NgForm) {
    const productFormData = this.prepareFormData(this.product);

    this.productService.addProduct(productFormData).subscribe({
      next: (response) => {
        console.log(response);
        productForm.reset();
        this.product.productImages = [];
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onFileselected(event: any) {
    const file = event.target.files[0];

    const fileHandle: FileHandle = {
      file: file,
      url: this.sanitizer.bypassSecurityTrustUrl(
        window.URL.createObjectURL(file)
      ),
    };

    this.product.productImages.push(fileHandle);

    
  }

  prepareFormData(product: Product): FormData {
    const formData = new FormData();

    formData.append(
      'product',
      new Blob([JSON.stringify(product)], { type: 'application/json' })
    );

    for (let i = 0; i < product.productImages.length; i++) {
      formData.append(
        'images',
        product.productImages[i].file,
        product.productImages[i].file.name
      );
    }

    return formData;
  }

  removeImage(index: number) {
    this.product.productImages.splice(index, 1);
  }

  fileDrop(fileHandle: FileHandle) {
    this.product.productImages.push(fileHandle);
  }
}
