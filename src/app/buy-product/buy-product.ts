import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../_module/Product';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, NgForm } from '@angular/forms';
import { OrderDetail } from '../_module/Order-Detail.module';
import { ProductService } from '../_services/product-service';

@Component({
  selector: 'app-buy-product',
  imports: [MatFormFieldModule, MatInputModule, MatIconModule, FormsModule],
  templateUrl: './buy-product.html',
  styleUrl: './buy-product.css',
})
export class BuyProduct implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService
  ) {}
  public productdetails: Product[] = [];

  public orderDetail: OrderDetail = {
    fullName: '',
    fullAddress: '',
    contactNumber: '',
    alternateContactNumber: '',
    productQuantityList: [],
  };
  ngOnInit(): void {
    this.productdetails = this.activatedRoute.snapshot.data['productDetail'];
    console.log(this.productdetails);
    this.addProductQuantityList();
  }

  addProductQuantityList(){
    this.productdetails.forEach((x) =>
      this.orderDetail.productQuantityList.push({
        productId: x.id,
        quantity: 1,
      })
    );
  }

  PlaceOrder(PlaceOrderForm: NgForm) {
    
    this.productService.placeOrder(this.orderDetail).subscribe({
      next: (res) => {
        PlaceOrderForm.reset();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  quantityForProduct(productId: number): number {
    if (!this.orderDetail || !this.orderDetail.productQuantityList) {
      return 0;
    }

    console.log('Looking for productId:', productId);
    console.log(
      'Available productQuantityList:',
      this.orderDetail.productQuantityList
    );

    const filteredProduct = this.orderDetail.productQuantityList.find(
      (q) => q.productId == productId
    );

      console.log("match: "+ filteredProduct);
    return filteredProduct ? filteredProduct.quantity : 0;
  }

  getTotal(productId: number, discountedPrice: number): number {
    const q = this.quantityForProduct(productId);

    return q ? q * discountedPrice : 0;
  }

  changeTotalPrice(quantity:string,productId:number,price:number):number{
    let totalPrice = 0;
    if(!this.orderDetail || !this.orderDetail.productQuantityList)
        return 0;

   const filteredProduct = this.orderDetail.productQuantityList.find(
      (product) => product.productId == productId
    );

    if(filteredProduct){
        filteredProduct.quantity = parseInt(quantity);
        totalPrice = filteredProduct.quantity * price;
    }
      
    return totalPrice;
    
  }

  getGrandTotal():number{
    let GrandTotal = 0;

    this.orderDetail.productQuantityList.forEach(
      (productQuantity) => {
        let price =this.productdetails.filter(product => product.id == productQuantity.productId)[0].discountedPrice;
        GrandTotal = GrandTotal + price * productQuantity.quantity;
      }
    );

    return GrandTotal;
  }
}
