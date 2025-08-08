import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { product } from '../_module/Product';
import { FormsModule, NgForm } from '@angular/forms';
import { ProductService } from '../_services/product-service';

@Component({
  selector: 'app-create-new-product',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatButtonModule,
    FormsModule,
  ],
  templateUrl: './create-new-product.html',
  styleUrl: './create-new-product.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateNewProduct {
  constructor(private productService:ProductService){}
  protected product: product = {
    name: '',
    description: '',
    discountedPrice: 0,
    actualPrice: 0,
  };

  public addProduct(productForm:NgForm){
    this.productService.addProduct(this.product).subscribe({
      next: response=>{
        console.log(response);
        productForm.reset();
      },
      error:err=>{
        console.log(err);
      }
    })
  }
}
