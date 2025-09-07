import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { ProductService } from '../_services/product-service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-order-info',
  imports: [MatTableModule,CommonModule],
  templateUrl: './order-info.html',
  styleUrl: './order-info.css'
})
export class OrderInfo implements OnInit{
  constructor(private productService:ProductService,private cdr:ChangeDetectorRef){}
  ngOnInit(): void {
   this.getOrderInfo();
  }
  public displayedColumns: string[] = ['id', 'productName', 'name', 'contactNumber', 'address','status','action'];
  public orderInfo:any = []

  getOrderInfo(){
    this.productService.getOrderInfo().subscribe({
      next: res => {
        console.log(res);
        this.orderInfo = res;
        this.cdr.detectChanges();
      },
      error: err => {
        console.log(err);
      }
    })
  }

  markDelivered(orderId:number){
    console.log(orderId);
    this.productService.markOrderDelivered(orderId).subscribe({
      next: res => {
        console.log(res);
        this.getOrderInfo();
      },
      error: err => {
        console.log(err);
      }
    })
  }
}
